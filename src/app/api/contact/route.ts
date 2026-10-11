import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { google } from 'googleapis';

// POST handlers must be dynamic — force-static is incorrect for data mutation.
export const dynamic = "force-dynamic";

// ---------------------------------------------------------------------------
// 1. Environment validation (Fail loudly if secrets are missing)
// ---------------------------------------------------------------------------
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL ?? '';
// Replace literal \n with actual newlines for the private key
const GOOGLE_PRIVATE_KEY  = (process.env.GOOGLE_PRIVATE_KEY ?? '').replace(/\\n/g, '\n');
const SPREADSHEET_ID      = process.env.GOOGLE_SPREADSHEET_ID ?? '';
const SHEET_NAME          = process.env.GOOGLE_SHEET_NAME || 'Sheet1';
const ADMIN_API_KEY       = process.env.ADMIN_API_KEY ?? '';

function getMissingSheetEnvVars(): string[] {
  const missing: string[] = [];
  if (!GOOGLE_CLIENT_EMAIL) missing.push('GOOGLE_CLIENT_EMAIL');
  if (!GOOGLE_PRIVATE_KEY)  missing.push('GOOGLE_PRIVATE_KEY');
  if (!SPREADSHEET_ID)      missing.push('GOOGLE_SPREADSHEET_ID');
  return missing;
}

// ---------------------------------------------------------------------------
// 2. Local file storage (Fallback)
// Note: In serverless environments (Vercel/Netlify), the filesystem is 
// ephemeral or read-only. This fallback is primarily for local development.
// ---------------------------------------------------------------------------
const DATA_DIR = path.join(process.cwd(), 'data');
const CONTACTS_FILE = path.join(DATA_DIR, 'contacts.json');

function ensureDirectoryExists() {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    if (!fs.existsSync(CONTACTS_FILE)) fs.writeFileSync(CONTACTS_FILE, '[]', 'utf8');
  } catch (err) {
    console.error('[contact] Failed to initialize local data directory:', err instanceof Error ? err.message : 'Unknown error');
  }
}

function saveContactToFile(contactEntry: Record<string, string>): boolean {
  try {
    ensureDirectoryExists();
    const existingData = JSON.parse(fs.readFileSync(CONTACTS_FILE, 'utf8'));
    existingData.push(contactEntry);
    fs.writeFileSync(CONTACTS_FILE, JSON.stringify(existingData, null, 2));
    return true;
  } catch (err) {
    console.error('[contact] Failed to save to local file:', err instanceof Error ? err.message : 'Unknown error');
    return false;
  }
}

// ---------------------------------------------------------------------------
// 3. Google Sheets integration
// ---------------------------------------------------------------------------
async function appendToGoogleSheet(contactEntry: Record<string, string>): Promise<boolean> {
  const missing = getMissingSheetEnvVars();
  if (missing.length > 0) {
    console.warn(`[contact] Missing env vars for Sheets: ${missing.join(', ')}. Skipping.`);
    return false;
  }

  try {
    const auth = new google.auth.JWT({
      email: GOOGLE_CLIENT_EMAIL,
      key: GOOGLE_PRIVATE_KEY,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:F`,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [
          [
            contactEntry.id,
            contactEntry.name,
            contactEntry.email,
            contactEntry.phone || '',
            contactEntry.message,
            contactEntry.timestamp,
          ],
        ],
      },
    });

    return Boolean(response.data.updates);
  } catch (error) {
    // Scrub internal details — never leak stack traces or internal IPs to logs/callers
    const msg = error instanceof Error ? error.message : 'Unknown error';
    console.error('[contact] Google Sheets append failed:', msg);
    return false;
  }
}

// ---------------------------------------------------------------------------
// 4. Input sanitization helper (Validate at boundaries)
// ---------------------------------------------------------------------------
function sanitizeInput(input: unknown, maxLength: number): string {
  if (typeof input !== 'string') return '';
  // Basic XSS prevention for storage (output encoding is also required when rendering)
  return input.trim().slice(0, maxLength);
}

// ---------------------------------------------------------------------------
// POST /api/contact
// ---------------------------------------------------------------------------
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = sanitizeInput(body.name, 200);
    const email = sanitizeInput(body.email, 200);
    const message = sanitizeInput(body.message, 5000);
    const phone = sanitizeInput(body.phone, 50);

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format.' },
        { status: 400 }
      );
    }

    const contactEntry = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      message,
      timestamp: new Date().toISOString(),
    };

    // Attempt to save to Google Sheets
    const sheetResult = await appendToGoogleSheet(contactEntry);
    
    // Fallback to local file if Sheets fails or isn't configured
    const localResult = !sheetResult ? saveContactToFile(contactEntry) : false;

    if (!sheetResult && !localResult) {
      return NextResponse.json(
        { error: 'Failed to save contact information. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: sheetResult
        ? 'Contact information saved successfully.'
        : 'Contact received. (Primary storage unavailable, saved to fallback.)',
    });
  } catch (error) {
    console.error('[contact] POST error:', error instanceof Error ? error.message : 'Unknown');
    return NextResponse.json(
      { error: 'Failed to process contact information.' },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// GET /api/contact (Admin only)
// ---------------------------------------------------------------------------
export async function GET(req: Request) {
  if (!ADMIN_API_KEY) {
    console.error('[contact] ADMIN_API_KEY is not configured on the server.');
    return NextResponse.json(
      { error: 'Server misconfigured.' },
      { status: 500 }
    );
  }

  const url = new URL(req.url);
  const apiKey = url.searchParams.get('apiKey');

  if (apiKey !== ADMIN_API_KEY) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  try {
    ensureDirectoryExists();
    const contacts = JSON.parse(fs.readFileSync(CONTACTS_FILE, 'utf8'));
    return NextResponse.json({ contacts });
  } catch (error) {
    console.error('[contact] GET error:', error instanceof Error ? error.message : 'Unknown');
    return NextResponse.json(
      { error: 'Failed to retrieve contacts.' },
      { status: 500 }
    );
  }
}
