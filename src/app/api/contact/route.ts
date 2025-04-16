// Add this line at the top of the file
export const dynamic = "force-static";

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { google } from 'googleapis';

// Path to store contact submissions
const contactsFilePath = path.join(process.cwd(), 'data', 'contacts.json');

// Ensure the data directory exists
const ensureDirectoryExists = () => {
  const dir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  
  if (!fs.existsSync(contactsFilePath)) {
    fs.writeFileSync(contactsFilePath, JSON.stringify([]));
  }
};

// Function to save contact to local JSON file
const saveContactToFile = (contactEntry: {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  timestamp: string;
}) => {
  ensureDirectoryExists();
  
  // Read existing contacts
  const existingData = JSON.parse(fs.readFileSync(contactsFilePath, 'utf8'));
  
  // Add new contact
  existingData.push(contactEntry);
  
  // Save updated contacts
  fs.writeFileSync(contactsFilePath, JSON.stringify(existingData, null, 2));
};

// Google Sheets integration
const SPREADSHEET_ID = '1_xWQm8A-FlfVBJavlsZjasIF8eGjeD1hSIEe3ZcJET0'; // Hardcoded for testing
const SHEET_NAME = 'Sheet1'; // Try using the default sheet name instead

// Service account credentials with better error handling
const serviceAccountCredentials = {
  client_email: "portfolio-contact-form@my-admin-panel-456712.iam.gserviceaccount.com", // Hardcoded for testing
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCyodfBH7/LRYva\nlLQgrYzXN0NKvBcsseGdptoq5osMvOdZczt1HIM9d3fopuRtbZ3uxfgI+bTvGPVL\ngNpmiyJX4vPnXRL0dyemkJpUdCzaSWSPS5ivj9KpUcUi/fbBQeFly+umAcUP0fvQ\npg7BXg+kDPOPZbC4FT0YYvR4ms0bff78Nv6Emuv53QK1qj3DkAYL/jeiRlZi3k6J\nGfhDDzF4JLsKEMG7dWdpATcOoO/4cQZHiUsT4UXvpkdFGbAyxvKlLIQkoFiw/rlf\nDZL321imQHKSnR2UFAM54R41tKbdJxb5UM3IYHQHo70zEu18mXjTh9LdqrntO6Su\ncHdWX5ERAgMBAAECggEAEdty/ZfmbPQpXHMEJMYkr7kTDYwLBwlLRB7TbXl5ig7y\nU7NczMLKbeEdCBFzAWt1X9LDjmYkC8jjcKZTbu/WwZFrD4Ry6iRlPtXyz6GDgFjY\n6ChG/bnzdcC6Y9qeichDt5DwoDpKEGBN+5g2HmeAScaPrJSeW3CoGGGADfRvr6E4\nZqJV4GuPv1SORcS/4gMIrdDuXG8lnqBn8t+nX/By1Ayqnr5+q8HDEh7WSQM1NDni\nxN158jB6CoK1LWgFVz0X2W5US7mk9gaIVgfxyFs2uFqs6+JhrUk1CqeYy67eychd\n4w/6rZ0oS7vSwfmNgYLda69rxIQRRwI/mFNKIhnWiQKBgQDqUtyTU+qdfSYcteQA\nX0CdAipgtssF6iM9JJAk+z/XBvet8Psi2mluMOa50pgwMm0vf2MR4VbQn55adYIv\n+G5LANueEwxkrBm8ND1xq6pPYwFD1+EH4TgzKY5AKapY5m1lPWQIME/dshOSk+3Q\nkUZ3b4zWD2VL+em4C0xooP2qNQKBgQDDKB90PuAWuzj+pI2JOerD38dKHkdmrNEV\nchLpCqoatfe/B5MJBDyH7Pw/sn2JMDKmq7FvgVaxwx3gu3Xd/3F7zHpoNLVu50af\nj3+VjbhymzVxLJZk/rAxNayL5oCQ87DlUN1T688Z3XEfKTlVxVkulC+GljR6oJjh\na3ulTtTG7QKBgD4Sv03j8AXSTlNSt9iFYyd0mGdQZQ3nDXi4A9tYF3xN4zTX3p9H\n/p/rImPdbuVtplDrzQHCkO3pKtjJwjgU9pq12nfQkfrlQFgD+rbvA8nN71raiEk/\nF1UuT/mdT/wG5rnn/mTQ74dKEjdFKr2Sjnk7OrLGF05+ILTZgV9CLpB1AoGAbZJN\ndrsGnjyoF3DUdsOp6CfwgNDXTfKhweS2cVmngC/C1eKuz1UtlzObvTe9/BSvm5yy\nluSLhGsEj3UxDF+rm9KGt5NAevAnWtb6z0Eu2koCi3R5TGMjEb4NDs9wR/JK07W/\nTqsLMH6AUPqYUmvnUpuow2v6Mw+QRqBOX9YO6VECgYA0Vvofq6q9VlxlDE5AS166\nlwPIsuZ0YX3/VjEFGEERhLVyWkOJrkF3oCd45ocND93G+b0l+V/dCn6t99Vydm8J\nYTnAFudmpRqHZBCt2AL5OHZN3AxcKRu4rS0Qi7bZUp/B2432QtGT+0D2ANmIU4Mb\ntnIxRvXADYQW3FNlYc0Nlg==\n-----END PRIVATE KEY-----\n" // Hardcoded for testing
};

// Function to append data to Google Sheets with improved error handling
async function appendToGoogleSheet(contactEntry: {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  timestamp: string;
}) {
  try {
    console.log('Starting Google Sheets integration...');
    console.log('Using spreadsheet ID:', SPREADSHEET_ID);
    console.log('Using sheet name:', SHEET_NAME);
    
    // Create JWT auth client
    const auth = new google.auth.JWT({
      email: serviceAccountCredentials.client_email,
      key: serviceAccountCredentials.private_key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    // Create Google Sheets client
    const sheets = google.sheets({ version: 'v4', auth });

    // First, try to get the spreadsheet info to verify access
    try {
      const spreadsheetInfo = await sheets.spreadsheets.get({
        spreadsheetId: SPREADSHEET_ID
      });
      console.log('Successfully accessed spreadsheet:', spreadsheetInfo.data.properties?.title);
      console.log('Available sheets:', spreadsheetInfo.data.sheets?.map(s => s.properties?.title).join(', '));
    } catch (infoError) {
      console.error('Error accessing spreadsheet info:', infoError);
      // Check for specific API errors
      if (infoError instanceof Error) {
        const errorMessage = infoError.message.toLowerCase();
        if (errorMessage.includes('quota') || errorMessage.includes('429')) {
          console.warn('Google API quota exceeded. Falling back to local storage only.');
          return false;
        }
      }
    }

    // Format data for Google Sheets
    const values = [
      [
        contactEntry.id,
        contactEntry.name,
        contactEntry.email,
        contactEntry.phone || '',
        contactEntry.message,
        contactEntry.timestamp
      ]
    ];

    console.log('Attempting to append data to sheet:', SHEET_NAME);
    
    // Append data to the sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:F`,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values
      }
    });

    console.log('Data successfully appended to Google Sheets:', response.data);
    return true;
  } catch (error) {
    console.error('Detailed error appending to Google Sheets:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      
      // Handle specific API errors
      const errorMessage = error.message.toLowerCase();
      
      // Check for rate limit or quota exceeded errors
      if (errorMessage.includes('quota') || errorMessage.includes('429')) {
        console.warn('Google API quota exceeded. Falling back to local storage only.');
      } 
      // Check for authentication errors
      else if (errorMessage.includes('authentication') || errorMessage.includes('401')) {
        console.warn('Google API authentication error. Check your credentials.');
      }
      // Check for server overload
      else if (errorMessage.includes('overloaded') || errorMessage.includes('503')) {
        console.warn('Google API servers overloaded. Falling back to local storage.');
      }
    }
    return false;
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }
    
    // Create contact entry with timestamp
    const contactEntry = {
      id: Date.now().toString(),
      name: body.name,
      email: body.email,
      phone: body.phone || '',
      message: body.message,
      timestamp: new Date().toISOString()
    };
    
    // Save to local file as a backup
    saveContactToFile(contactEntry);
    console.log('Contact saved to local file');
    
    // Try to append to Google Sheets with better error handling
    const sheetResult = await appendToGoogleSheet(contactEntry);
    if (sheetResult) {
      console.log('Successfully added to Google Sheets');
    } else {
      console.log('Failed to add to Google Sheets, but saved locally');
    }
    
    // Always return success if we at least saved locally
    return NextResponse.json({ 
      success: true,
      googleSheets: sheetResult,
      message: sheetResult 
        ? "Contact information saved successfully" 
        : "Contact information saved locally (Google Sheets integration unavailable)"
    });
  } catch (error) {
    console.error("Error saving contact:", error);
    return NextResponse.json(
      { error: "Failed to save contact information" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    // This would typically require authentication
    // For now, we'll just check for a simple API key in the query params
    const url = new URL(req.url);
    const apiKey = url.searchParams.get('apiKey');
    
    if (apiKey !== 'your-secret-admin-key') {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    ensureDirectoryExists();
    
    // Read and return contacts
    const contacts = JSON.parse(fs.readFileSync(contactsFilePath, 'utf8'));
    
    return NextResponse.json({ contacts });
  } catch (error) {
    console.error("Error retrieving contacts:", error);
    return NextResponse.json(
      { error: "Failed to retrieve contacts" },
      { status: 500 });
  }}
