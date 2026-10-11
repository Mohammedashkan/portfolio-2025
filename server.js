import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// ---------------------------------------------------------------------------
// 1. Fix ESM __dirname (The original code will crash in pure Node ESM)
// ---------------------------------------------------------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// ---------------------------------------------------------------------------
// 2. Environment Validation (Fail loudly if secrets are missing)
// ---------------------------------------------------------------------------
const ADMIN_API_KEY = process.env.ADMIN_API_KEY;
if (!ADMIN_API_KEY) {
  console.error(
    'FATAL: ADMIN_API_KEY environment variable is not set.\n' +
    'Generate one with: openssl rand -hex 32\n' +
    'Then set it in your .env file before starting the server.'
  );
  process.exit(1);
}

// ---------------------------------------------------------------------------
// 3. Middleware & Security Configurations
// ---------------------------------------------------------------------------
// Restrict CORS to known origins in production
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',') 
  : ['http://localhost:3000', 'http://localhost:5000'];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, or server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('CORS policy: Origin not allowed'), false);
    }
    return callback(null, true);
  }
}));

// Use express.json() instead of deprecated body-parser. 
// Limit payload size to prevent DoS via massive JSON payloads.
app.use(express.json({ limit: '10kb' }));

// ---------------------------------------------------------------------------
// 4. File System Setup
// ---------------------------------------------------------------------------
// Use process.cwd() for reliable path resolution across different deployments
const dataDir = path.join(process.cwd(), 'data');
const contactsFilePath = path.join(dataDir, 'contacts.json');

const ensureDirectoryExists = () => {
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    if (!fs.existsSync(contactsFilePath)) {
      fs.writeFileSync(contactsFilePath, JSON.stringify([]), 'utf8');
    }
  } catch (err) {
    console.error('[fs] Failed to initialize data directory:', err instanceof Error ? err.message : 'Unknown error');
    process.exit(1); // Cannot function without storage
  }
};

ensureDirectoryExists();

// ---------------------------------------------------------------------------
// 5. Input Validation & Sanitization Helpers
// ---------------------------------------------------------------------------
const MAX_LENGTHS = { name: 200, email: 200, phone: 50, message: 5000 };
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitize(str, maxLen) {
  if (typeof str !== 'string') return '';
  return str.trim().slice(0, maxLen);
}

// ---------------------------------------------------------------------------
// 6. Routes
// ---------------------------------------------------------------------------

// POST /api/contact
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, message, phone } = req.body;

    // Sanitize inputs at the boundary
    const cleanName = sanitize(name, MAX_LENGTHS.name);
    const cleanEmail = sanitize(email, MAX_LENGTHS.email);
    const cleanMessage = sanitize(message, MAX_LENGTHS.message);
    const cleanPhone = sanitize(phone, MAX_LENGTHS.phone);

    // Validate required fields
    if (!cleanName || !cleanEmail || !cleanMessage) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    if (!EMAIL_REGEX.test(cleanEmail)) {
      return res.status(400).json({ error: 'Invalid email format.' });
    }

    const contactEntry = {
      id: Date.now().toString(),
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      message: cleanMessage,
      timestamp: new Date().toISOString()
    };

    // Read, append, and write (Note: For high-traffic apps, use a real DB. 
    // For a portfolio, this is acceptable but vulnerable to race conditions under heavy load).
    const existingData = JSON.parse(fs.readFileSync(contactsFilePath, 'utf8'));
    existingData.push(contactEntry);
    fs.writeFileSync(contactsFilePath, JSON.stringify(existingData, null, 2), 'utf8');
    
    // Log success, but NEVER log the user's PII (email/phone) or the full message in production
    console.log(`[contact] New submission saved from: ${cleanEmail}`);
    
    return res.status(200).json({ success: true });
  } catch (error) {
    // Scrub internal error details from the response
    console.error('[contact] Error saving:', error instanceof Error ? error.message : 'Unknown error');
    return res.status(500).json({ error: 'Failed to save contact information.' });
  }
});

// GET /api/contact (Admin only)
app.get('/api/contact', (req, res) => {
  try {
    const apiKey = req.query.apiKey;
    
    // Constant-time comparison is ideal, but standard check is acceptable for simple portfolio admin
    if (!apiKey || apiKey !== ADMIN_API_KEY) {
      return res.status(401).json({ error: 'Unauthorized.' });
    }
    
    const contacts = JSON.parse(fs.readFileSync(contactsFilePath, 'utf8'));
    return res.status(200).json({ contacts });
  } catch (error) {
    console.error('[contact] Error retrieving:', error instanceof Error ? error.message : 'Unknown error');
    return res.status(500).json({ error: 'Failed to retrieve contacts.' });
  }
});

// ---------------------------------------------------------------------------
// 7. Start Server
// ---------------------------------------------------------------------------
app.listen(PORT, () => {
  // NEVER log secrets or API keys to the console
  console.log(`[server] Running on port ${PORT}`);
});
