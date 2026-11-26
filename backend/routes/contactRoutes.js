const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Contact Message Model
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, default: 'Unread' }
}, { timestamps: true });

const Contact = mongoose.model('Contact', contactSchema);

// Save a new contact message
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'Please fill all required fields!' });
    }
    const contact = new Contact({ name, email, phone, subject, message });
    await contact.save();
    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all messages (for admin)
router.get('/', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Mark message as read (for admin)
router.put('/:id', async (req, res) => {
  try {
    await Contact.findByIdAndUpdate(req.params.id, { status: 'Read' });
    res.status(200).json({ message: 'Marked as read!' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;