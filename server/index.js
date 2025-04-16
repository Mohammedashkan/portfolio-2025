// server/index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');
const nodemailer = require('nodemailer');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Setup email transporter (for production, use a service like SendGrid)
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.example.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Routes
app.post('/api/chatbot', async (req, res) => {
  try {
    const { message } = req.body;

    // Portfolio information for context
    const portfolioInfo = `
      About Ashkan:
      - Full-Stack Developer and QA Automation Engineer
      - 3 years of experience in web development
      - Specializes in React, Next.js, Node.js, and TypeScript
      - Based in Sri Lanka
      - Passionate about UI/UX design
      
      Services:
      - Web Development
      - Data Science Solutions
      - AI/ML Application Development
      - QA Automation

      Contact Info:
      - Email: ashkan@example.com
      - Phone: +94 123 456 789
      - Location: Colombo, Sri Lanka
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: `You are a helpful virtual assistant for Ashkan's portfolio website. Answer questions about Ashkan, his skills, services, and portfolio. Be friendly, concise, and professional. Here's information about Ashkan's portfolio: ${portfolioInfo}`,
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    res.json({
      response: response.choices[0].message.content,
    });
  } catch (error) {
    console.error("OpenAI API error:", error);
    res.status(500).json({ error: "Failed to get response from AI" });
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate input
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'noreply@example.com',
      to: process.env.EMAIL_TO || 'ashkan@example.com',
      subject: `Portfolio Contact: ${subject}`,
      text: `
        Name: ${name}
        Email: ${email}
        
        Message:
        ${message}
      `,
      html: `
        <h2>New Message from Portfolio Contact Form</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <h3>Message:</h3>
        <p>${message}</p>
      `,
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({ error: "Failed to process contact form" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});