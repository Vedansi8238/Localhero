import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">

      {/* Hero Section */}
      <div className="hero">
        <h1>Find Trusted Local Workers</h1>
        <p>Plumbers, Electricians, Carpenters and more — near you!</p>
        <div className="search-bar">
          <input type="text" placeholder="What service do you need?" />
          <input type="text" placeholder="Enter your city..." />
          <button onClick={() => navigate('/browse')}>Search 🔍</button>
        </div>
      </div>

      {/* Categories Section */}
      <div className="categories">
        <h2>Popular Services</h2>
        <div className="category-grid">
          <div className="category-card" onClick={() => navigate('/browse')}>🔧 Plumber</div>
          <div className="category-card" onClick={() => navigate('/browse')}>⚡ Electrician</div>
          <div className="category-card" onClick={() => navigate('/browse')}>🪚 Carpenter</div>
          <div className="category-card" onClick={() => navigate('/browse')}>🧹 Cleaner</div>
          <div className="category-card" onClick={() => navigate('/browse')}>🎨 Painter</div>
          <div className="category-card" onClick={() => navigate('/browse')}>❄️ AC Repair</div>
        </div>
      </div>

      {/* Why LocalHero Section */}
      <div className="why-section">
        <h2>Why LocalHero?</h2>
        <div className="why-grid">
          <div className="why-card">
            <span>✅</span>
            <h3>Verified Workers</h3>
            <p>Every worker is verified by our admin team</p>
          </div>
          <div className="why-card">
            <span>💰</span>
            <h3>Upfront Pricing</h3>
            <p>No hidden charges — see price before booking</p>
          </div>
          <div className="why-card">
            <span>⭐</span>
            <h3>Rated & Reviewed</h3>
            <p>Real reviews from real customers</p>
          </div>
          <div className="why-card">
            <span>🚨</span>
            <h3>Emergency Booking</h3>
            <p>Need urgent help? We got you covered!</p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Home;