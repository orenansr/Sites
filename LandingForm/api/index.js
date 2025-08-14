// Vercel serverless function adapter
import express from 'express';
import { storage } from '../server/storage.js';
import { insertContactSchema } from '../shared/schema.js';
import { fromZodError } from 'zod-validation-error';

const app = express();

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Contact form submission
app.post('/api/contacts', async (req, res) => {
  try {
    const validatedData = insertContactSchema.parse(req.body);
    const contact = await storage.createContact(validatedData);
    res.json({ success: true, contact });
  } catch (error) {
    if (error.name === 'ZodError') {
      const validationError = fromZodError(error);
      return res.status(400).json({ 
        success: false, 
        message: validationError.message 
      });
    }
    console.error("Error creating contact:", error);
    res.status(500).json({ 
      success: false, 
      message: "Erro interno do servidor" 
    });
  }
});

// Get all contacts
app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await storage.getContacts();
    res.json({ success: true, contacts });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ 
      success: false, 
      message: "Erro interno do servidor" 
    });
  }
});

// Handle all other routes (SPA fallback)
app.get('*', (req, res) => {
  res.status(404).json({ error: 'Not found' });
});

export default app;