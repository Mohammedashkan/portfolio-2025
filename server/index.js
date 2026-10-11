// server/index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');
const nodemailer = require('nodemailer');

// Load environment variables
dotenv.config();

// ---------------------------------------------------------------------------
// 1. Environment Validation (Fail loudly if secrets are missing)
// ---------------------------------------------------------------------------
const REQUIRED_ENV_VARS = [
  'OPENAI_API_KEY', 
  'EMAIL_HOST', 
  'EMAIL_USER', 
  'EMAIL_PASS', 
  'EMAIL_TO'
];

const missingVars = REQUIRED_ENV_VARS.filter(v => !process.env[v]);
if (missingVars.length > 0) {
  console.error(`FATAL: Missing required environment variables: ${missingVars.join(', ')}`);
  console.error('Please set them in your .env file before starting the server.');
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 5000;

// ---------------------------------------------------------------------------
// 2. Security & Middleware Configurations
// ---------------------------------------------------------------------------
// Restrict CORS to known origins in production
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',') 
  : ['http://localhost:3000', 'http://localhost:5000'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('CORS policy: Origin not allowed'), false);
    }
    return callback(null, true);
  }
}));

// Limit payload size to prevent DoS via massive JSON payloads
app.use(express.json({ limit: '10kb' }));

// ---------------------------------------------------------------------------
// 3. Service Initialization
// ---------------------------------------------------------------------------
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587', 10),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ---------------------------------------------------------------------------
// 4. Security Utilities (Input Sanitization & XSS Prevention)
// ---------------------------------------------------------------------------
const MAX_LENGTHS = { name: 100, email: 200, subject: 200, message: 5000, chat: 2000 };
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitize(str, maxLen) {
  if (typeof str !== 'string') return '';
  return str.trim().slice(0, maxLen);
}

// Prevent XSS by escaping HTML entities before interpolating into email templates
function escapeHtml(unsafe) {
  if (typeof unsafe !== 'string') return '';
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ---------------------------------------------------------------------------
// 5. Routes
// ---------------------------------------------------------------------------

// POST /api/chatbot
app.post('/api/chatbot', async (req, res) => {
  try {
    const { message } = req.body;
    const cleanMessage = sanitize(message, MAX_LENGTHS.chat);

    if (!cleanMessage) {
      return res.status(400).json({ error: "Message is required." });
    }

    console.log("[chatbot] Processing request..."); // Never log raw user prompts in production

    const portfolioInfo = `
      About Ashkan: Full-Stack Developer and QA Automation Engineer based in Sri Lanka.
      Services: Web Development, Data Science, AI/ML, QA Automation.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Updated to a more cost-effective and modern model
      messages: [
        {
          role: "system",
          content: `You are a helpful virtual assistant for Ashkan's portfolio website. Be friendly, concise, and professional. Context: ${portfolioInfo}`,
        },
        { role: "user", content: cleanMessage },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    res.json({ response: response.choices[0].message.content });
  } catch (error) {
    // Scrub internal OpenAI error details from the response
    console.error("[chatbot] OpenAI API error:", error instanceof Error ? error.message : "Unknown error");
    res.status(500).json({ error: "Failed to get response from AI." });
  }
});

// POST /api/contact
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // 1. Sanitize and Validate at the boundary
    const cleanName = sanitize(name, MAX_LENGTHS.name);
    const cleanEmail = sanitize(email, MAX_LENGTHS.email);
    const cleanSubject = sanitize(subject, MAX_LENGTHS.subject);
    const cleanMessage = sanitize(message, MAX_LENGTHS.message);

    if (!cleanName || !cleanEmail || !cleanSubject || !cleanMessage) {
      return res.status(400).json({ error: "Missing or invalid required fields." });
    }

    if (!EMAIL_REGEX.test(cleanEmail)) {
      return res.status(400).json({ error: "Invalid email format." });
    }

    // 2. Prevent XSS in HTML emails
    const safeName = escapeHtml(cleanName);
    const safeEmail = escapeHtml(cleanEmail);
    const safeSubject = escapeHtml(cleanSubject);
    // Preserve line breaks safely in HTML
    const safeMessage = escapeHtml(cleanMessage).replace(/\n/g, '<br>'); 

    // 3. Send Email
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'noreply@example.com',
      to: process.env.EMAIL_TO,
      subject: `Portfolio Contact: ${cleanSubject}`,
      text: `Name: ${cleanName}\nEmail: ${cleanEmail}\n\nMessage:\n${cleanMessage}`,
      html: `
        <h2>New Message from Portfolio Contact Form</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Subject:</strong> ${safeSubject}</p>
        <h3>Message:</h3>
        <p>${safeMessage}</p>
      `,
    });

    console.log(`[contact] Email sent successfully from: ${cleanEmail}`);
    res.json({ success: true });
  } catch (error) {
    // Scrub internal Nodemailer/SMTP error details
    console.error("[contact] Email send failed:", error instanceof Error ? error.message : "Unknown error");
    res.status(500).json({ error: "Failed to process contact form. Please try again later." });
  }
});

// ---------------------------------------------------------------------------
// 6. Start Server
// ---------------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`[server] Backend running on port ${PORT}`);
});
