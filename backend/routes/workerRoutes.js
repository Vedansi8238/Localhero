const express = require('express');
const router = express.Router();
const Worker = require('../models/Worker');

router.get('/', async (req, res) => {
  try {
    const workers = await Worker.find();
    res.json(workers);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, skill, city, price } = req.body;
    const existing = await Worker.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already exists' });
    const worker = new Worker({ name, email, password, skill, city, price });
    await worker.save();
    res.status(201).json({ message: 'Worker registered successfully', worker });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const worker = await Worker.findOne({ email, password });
    if (!worker) return res.status(400).json({ message: 'Invalid email or password' });
    res.json({ message: 'Login successful', worker });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;