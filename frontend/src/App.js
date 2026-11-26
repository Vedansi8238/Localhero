import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Browse from './pages/Browse';
import Booking from './pages/Booking';
import MyBookings from './pages/MyBookings';
import Contact from './pages/Contact';
import AdminPanel from './pages/AdminPanel';
import Navbar from './components/Navbar';
import WorkerLogin from './pages/WorkerLogin';
import WorkerDashboard from './pages/WorkerDashboard';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/mybookings" element={<MyBookings />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/worker-login" element={<WorkerLogin />} />
        <Route path="/worker-dashboard" element={<WorkerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;