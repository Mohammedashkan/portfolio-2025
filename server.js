import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Path to store contact submissions
const dataDir = path.join(__dirname, 'data');
const contactsFilePath = path.join(dataDir, 'contacts.json');

// Ensure the data directory exists
const ensureDirectoryExists = () => {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }
  
  if (!fs.existsSync(contactsFilePath)) {
    fs.writeFileSync(contactsFilePath, JSON.stringify([]));
  }
};

// Initialize data directory
ensureDirectoryExists();

// POST endpoint to save contact form submissions
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, message, phone } = req.body;
    
    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required" });
    }
    
    // Create contact entry with timestamp
    const contactEntry = {
      id: Date.now().toString(),
      name,
      email,
      phone: phone || '',
      message,
      timestamp: new Date().toISOString()
    };
    
    // Read existing contacts
    const existingData = JSON.parse(fs.readFileSync(contactsFilePath, 'utf8'));
    
    // Add new contact
    existingData.push(contactEntry);
    
    // Save updated contacts
    fs.writeFileSync(contactsFilePath, JSON.stringify(existingData, null, 2));
    
    console.log('Contact saved successfully:', contactEntry.name);
    
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error saving contact:", error);
    return res.status(500).json({ error: "Failed to save contact information" });
  }
});

// Generate a secure random API key (or use an environment variable)
const ADMIN_API_KEY = 'portfolio-admin-2024'; // Fixed key for easier testing

// Log the API key when the server starts (you'll need this to access the admin page)
console.log('=================================================');
console.log('ADMIN API KEY (save this for admin access):', ADMIN_API_KEY);
console.log('=================================================');

// GET endpoint to retrieve contact submissions (with API key protection)
app.get('/api/contact', (req, res) => {
  try {
    const apiKey = req.query.apiKey;
    
    // Simple API key check - this is the key you'll use in the admin page
    if (apiKey !== ADMIN_API_KEY) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    
    // Read and return contacts
    const contacts = JSON.parse(fs.readFileSync(contactsFilePath, 'utf8'));
    
    return res.status(200).json({ contacts });
  } catch (error) {
    console.error("Error retrieving contacts:", error);
    return res.status(500).json({ error: "Failed to retrieve contacts" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});