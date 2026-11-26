const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Worker = require('../models/Worker');
const Booking = require('../models/Booking');

const ADMIN_EMAIL = 'admin@localhero.com';
const ADMIN_PASSWORD = 'admin123';

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    res.status(200).json({ message: 'Admin login successful!', role: 'admin' });
  } else {
    res.status(401).json({ message: 'Wrong email or password!' });
  }
});

router.get('/stats', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalWorkers = await Worker.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const pendingBookings = await Booking.countDocuments({ status: 'Pending' });
    const confirmedBookings = await Booking.countDocuments({ status: 'Confirmed' });
    const rejectedBookings = await Booking.countDocuments({ status: 'Rejected' });
    res.status(200).json({ totalUsers, totalWorkers, totalBookings, pendingBookings, confirmedBookings, rejectedBookings });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.put('/bookings/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.status(200).json({ message: 'Status updated!', booking });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.delete('/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'User deleted!' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get('/workers', async (req, res) => {
  try {
    const workers = await Worker.find().sort({ createdAt: -1 });
    res.status(200).json(workers);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.post('/workers', async (req, res) => {
  try {
    const worker = new Worker(req.body);
    await worker.save();
    res.status(201).json({ message: 'Worker added!', worker });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.put('/workers/:id', async (req, res) => {
  try {
    const worker = await Worker.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: 'Worker updated!', worker });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.delete('/workers/:id', async (req, res) => {
  try {
    await Worker.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Worker deleted!' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;