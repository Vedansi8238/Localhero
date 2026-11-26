import React, { useState } from 'react';
import axios from 'axios';
import './Contact.css';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !email || !subject || !message) {
      setError('Please fill all required fields!');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/contact', {
        name, email, phone, subject, message
      });
      setSuccess(true);
    } catch (err) {
      setError('Failed to send message. Please try again!');
    } finally {
      setLoading(false);
    }
  };

  // SUCCESS SCREEN
  if (success) {
    return (
      <div className="contact-page">
        <div className="contact-success">
          <div className="success-emoji">🎉</div>
          <h2>Message Sent!</h2>
          <p>Thank you <strong>{name}</strong>! We received your message and will get back to you within 24 hours.</p>
          <button onClick={() => {
            setSuccess(false);
            setName(''); setEmail(''); setPhone('');
            setSubject(''); setMessage('');
          }}>Send Another Message</button>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-page">

      {/* HEADER */}
      <div className="contact-header">
        <h1>Help Center 🤝</h1>
        <p>Having a problem? We are here to help you!</p>
      </div>

      <div className="contact-layout">

        {/* LEFT — INFO CARDS */}
        <div className="contact-info">

          <div className="info-card">
            <div className="info-icon">📞</div>
            <div>
              <h4>Call Us</h4>
              <p>+91 98765 43210</p>
              <span>Mon–Sat, 9am to 6pm</span>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon">📧</div>
            <div>
              <h4>Email Us</h4>
              <p>support@localhero.com</p>
              <span>Reply within 24 hours</span>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon">💬</div>
            <div>
              <h4>WhatsApp</h4>
              <p>+91 98765 43210</p>
              <span>Quick replies on WhatsApp</span>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon">📍</div>
            <div>
              <h4>Office</h4>
              <p>Ahmedabad, Gujarat</p>
              <span>India — 380001</span>
            </div>
          </div>

          {/* FAQ SECTION */}
          <div className="faq-box">
            <h3>❓ Common Questions</h3>
            <div className="faq-item">
              <strong>How do I cancel a booking?</strong>
              <p>Go to My Bookings and contact the worker directly on phone.</p>
            </div>
            <div className="faq-item">
              <strong>Worker did not show up?</strong>
              <p>Contact us immediately using the form and we will help you.</p>
            </div>
            <div className="faq-item">
              <strong>How do I become a worker?</strong>
              <p>Contact us with your skill details and we will add you.</p>
            </div>
            <div className="faq-item">
              <strong>Is payment online or cash?</strong>
              <p>Currently cash payment directly to the worker after service.</p>
            </div>
          </div>

        </div>

        {/* RIGHT — CONTACT FORM */}
        <div className="contact-form-box">
          <h2>Send Us a Message</h2>
          <p className="form-sub">Fill the form below and we will reply soon</p>

          {error && <div className="contact-error">{error}</div>}

          <div className="form-group">
            <label>Your Name <span className="required">*</span></label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div className="form-row-two">
            <div className="form-group">
              <label>Email <span className="required">*</span></label>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Phone (optional)</label>
              <input
                type="text"
                placeholder="98765 43210"
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Subject <span className="required">*</span></label>
            <select value={subject} onChange={e => setSubject(e.target.value)}>
              <option value="">Select a topic...</option>
              <option value="Booking Problem">Booking Problem</option>
              <option value="Worker Did Not Come">Worker Did Not Come</option>
              <option value="Bad Service">Bad Service / Complaint</option>
              <option value="Payment Issue">Payment Issue</option>
              <option value="Want to Become Worker">Want to Become a Worker</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Your Message <span className="required">*</span></label>
            <textarea
              rows={5}
              placeholder="Describe your problem or question in detail..."
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
          </div>

          <button
            className="contact-submit-btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? '⏳ Sending...' : '📩 Send Message'}
          </button>
        </div>

      </div>
    </div>
  );
}

export default Contact;