import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Browse.css';

// Fallback workers if MongoDB has no workers yet
const defaultWorkers = [
  { id: 1, name: "Ramesh Kumar", skill: "Plumber", city: "Ahmedabad", rating: 4.8, price: "300/hr", phone: "9876543210", verified: true },
  { id: 2, name: "Suresh Patel", skill: "Electrician", city: "Surat", rating: 4.6, price: "400/hr", phone: "9765432109", verified: true },
  { id: 3, name: "Mahesh Shah", skill: "Carpenter", city: "Ahmedabad", rating: 4.5, price: "350/hr", phone: "9654321098", verified: false },
  { id: 4, name: "Dinesh Verma", skill: "Plumber", city: "Vadodara", rating: 4.7, price: "280/hr", phone: "9543210987", verified: true },
  { id: 5, name: "Rajesh Modi", skill: "Cleaner", city: "Surat", rating: 4.4, price: "200/hr", phone: "9432109876", verified: true },
  { id: 6, name: "Hitesh Joshi", skill: "Electrician", city: "Ahmedabad", rating: 4.9, price: "450/hr", phone: "9321098765", verified: true },
  { id: 7, name: "Umesh Desai", skill: "Painter", city: "Vadodara", rating: 4.3, price: "250/hr", phone: "9210987654", verified: false },
  { id: 8, name: "Naresh Trivedi", skill: "Carpenter", city: "Surat", rating: 4.6, price: "380/hr", phone: "9109876543", verified: true },
  { id: 9, name: "Kamlesh Rao", skill: "Plumber", city: "Mehsana", rating: 4.5, price: "260/hr", phone: "9876012345", verified: true },
  { id: 10, name: "Bhavesh Patel", skill: "Electrician", city: "Mehsana", rating: 4.4, price: "350/hr", phone: "9765012345", verified: true },
  { id: 11, name: "Jignesh Shah", skill: "Painter", city: "Mehsana", rating: 4.6, price: "230/hr", phone: "9654012345", verified: false },
  { id: 12, name: "Nilesh Dave", skill: "Cleaner", city: "Rajkot", rating: 4.3, price: "180/hr", phone: "9543012345", verified: true },
  { id: 13, name: "Alpesh Solanki", skill: "Carpenter", city: "Rajkot", rating: 4.7, price: "320/hr", phone: "9432012345", verified: true },
];

function Browse() {
  const navigate = useNavigate();

  const [workers, setWorkers] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [skillFilter, setSkillFilter] = useState('All');
  const [cityFilter, setCityFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  // Fetch workers from MongoDB, fallback to default list
  useEffect(() => {
    axios.get('http://localhost:5000/api/workers')
      .then(res => {
        if (res.data && res.data.length > 0) {
          setWorkers(res.data);
        } else {
          setWorkers(defaultWorkers);
        }
      })
      .catch(() => {
        setWorkers(defaultWorkers);
      })
      .finally(() => setLoading(false));
  }, []);

  // Get unique skills and cities dynamically from worker list
  const allSkills = ['All', ...new Set(workers.map(w => w.skill))];
  const allCities = ['All', ...new Set(workers.map(w => w.city))];

  // Filter logic — name search + skill + city all work together
  const filtered = workers.filter(w => {
    const matchName = w.name.toLowerCase().includes(searchName.toLowerCase());
    const matchSkill = skillFilter === 'All' || w.skill === skillFilter;
    const matchCity = cityFilter === 'All' || w.city.toLowerCase() === cityFilter.toLowerCase();
    return matchName && matchSkill && matchCity;
  });

  const clearFilters = () => {
    setSearchName('');
    setSkillFilter('All');
    setCityFilter('All');
  };

  const isFiltering = searchName !== '' || skillFilter !== 'All' || cityFilter !== 'All';

  if (loading) return (
    <div className="browse-page">
      <div className="loading-box">⏳ Loading workers...</div>
    </div>
  );

  return (
    <div className="browse-page">
      <div className="browse-header">
        <h1>Find Local Workers 🔍</h1>
        <p>Search by name, skill, or city to find the right worker near you</p>
      </div>

      {/* SEARCH + FILTERS */}
      <div className="filters">
        <input
          type="text"
          className="search-input"
          placeholder="🔍 Search by worker name..."
          value={searchName}
          onChange={e => setSearchName(e.target.value)}
        />
        <select value={skillFilter} onChange={e => setSkillFilter(e.target.value)}>
          {allSkills.map(s => (
            <option key={s} value={s}>{s === 'All' ? '🔧 All Skills' : s}</option>
          ))}
        </select>
        <select value={cityFilter} onChange={e => setCityFilter(e.target.value)}>
          {allCities.map(c => (
            <option key={c} value={c}>{c === 'All' ? '📍 All Cities' : c}</option>
          ))}
        </select>
        {isFiltering && (
          <button className="clear-btn" onClick={clearFilters}>✖ Clear</button>
        )}
      </div>

      {/* RESULTS COUNT */}
      <div className="results-count">
        {isFiltering
  ? 'Showing ' + filtered.length + ' results for your search'
  : workers.length + ' workers available'}
      </div>
        
      {/* WORKER CARDS */}
      {filtered.length === 0 ? (
        <div className="no-results">
          <div className="no-results-icon">😕</div>
          <h3>No workers found!</h3>
          <p>Try a different city or skill — or <button onClick={clearFilters}>clear filters</button></p>
        </div>
      ) : (
        <div className="workers-grid">
          {filtered.map(worker => (
            <div className="worker-card" key={worker._id || worker.id}>
              <div className="worker-avatar">👷</div>
              <div className="worker-info">
                <h3>
                  {worker.name}
                  {worker.verified || worker.isVerified
                    ? <span className="verified">✅ Verified</span>
                    : <span className="unverified">⏳ Unverified</span>}
                </h3>
                <p>🔧 {worker.skill}</p>
                <p>📍 {worker.city}</p>
                <p>⭐ {worker.rating} / 5</p>
                <p>💰 ₹{worker.price}</p>
                <p>📞 <strong>{worker.phone}</strong></p>
              </div>
              <div className="worker-buttons">
                <a href={"tel:" + (worker.phone || '').replace(/\s/g, '')} className="call-btn">
                  📞 Call Worker
                </a>
                <a
                  href={"https://wa.me/91" + (worker.phone || '').replace(/\s/g, '')}
                  target="_blank"
                  rel="noreferrer"
                  className="whatsapp-btn"
                >                  💬 WhatsApp
                </a>
                <button
                  className="book-btn"
                  onClick={() => navigate('/booking', { state: { worker } })}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Browse;