const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Fix CORS — allow frontend to talk to backend
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

const userRoutes = require('./routes/userRoutes');
const workerRoutes = require('./routes/workerRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const adminRoutes = require('./routes/adminRoutes');
const contactRoutes = require('./routes/contactRoutes');

app.use('/api/users', userRoutes);
app.use('/api/workers', workerRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoutes);

app.get('/', (req, res) => {
  res.send('LocalHero Backend is Running!');
});

mongoose.connect('mongodb://localhost:27017/localhero')
  .then(() => {
    console.log('MongoDB Connected!');
    app.listen(5000, () => {
      console.log('Server running on port 5000!');
    });
  })
  .catch((err) => {
    console.log('MongoDB Error:', err);
  });