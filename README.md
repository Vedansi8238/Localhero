# LocalHero — Find Trusted Local Workers Instantly 🛠️

**LocalHero** is a Full Stack MERN (MongoDB, Express.js, React.js, Node.js) web application that connects customers with verified local service professionals—such as electricians, plumbers, carpenters, cleaners, painters, and AC repair technicians—with **upfront, transparent pricing and no hidden charges**.

---

## 🎯 Problem & Solution
* **The Problem:** Finding reliable local workers often depends on word-of-mouth, involves unpredictable pricing with hidden charges, and wastes time without guaranteed service quality.
* **The Solution:** LocalHero provides a centralized platform where admin-verified workers are listed with clear skill categories, city filters, ratings, availability status, and fixed upfront price estimates—allowing customers to book services in minutes.

---

## ✨ Key Features
* **🔍 Smart Search & Filtering:** Search workers by name, skill category (Plumber, Electrician, Carpenter, Cleaner, Painter, AC Repair, etc.), and city.
* **✅ Admin-Verified Worker Badges:** Workers go through admin verification (`Verified` / `Unverified` status) to ensure trust and reliability.
* **💰 Upfront Transparent Pricing:** Clear service charges displayed directly on each worker's profile with zero hidden fees.
* **📞 Direct Contact & Instant Booking:** Customers can call, message via WhatsApp, or book a worker for a specific date, time, and address.
* **🔐 Role-Based Authentication:** Separate login and dashboard flows for **Customers**, **Workers**, and **Admins**.
* **📊 Comprehensive Dashboards:**
  * **Customer Panel:** Book workers and track real-time booking statuses (`Pending`, `Confirmed`, `Rejected`) under *My Bookings*.
  * **Worker Dashboard:** View assigned customer bookings, addresses, schedules, and problem descriptions.
  * **Admin Control Panel:** Overview of total bookings, users, and workers; ability to confirm/reject bookings, add/edit/delete workers, and verify worker profiles.
* **🤝 Help Center & Support:** Built-in FAQ section and contact form stored directly in MongoDB for quick issue resolution.

---

## 🛠️ Tech Stack
* **Frontend:** React.js, React Router, HTML5, CSS3, JavaScript (ES6+), Axios
* **Backend:** Node.js, Express.js, RESTful APIs, JWT Authentication
* **Database:** MongoDB, Mongoose ODM (`users`, `workers`, `bookings`, `contacts` collections)
* **Tools:** Git, GitHub, VS Code, Postman, MongoDB Compass

---

## 📂 Project Structure
```text
Localhero/
├── backend/       # Node.js & Express REST APIs, MongoDB models & routes
└── frontend/      # React.js user interface, dashboards & components
```

---

## 🚀 How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com
   cd Localhero
   ```

2. **Setup & Run Backend:**
   ```bash
   cd backend
   npm install
   node server.js
   ```
   *(Runs on `http://localhost:5000`)*

3. **Setup & Run Frontend:**
   ```bash
   cd frontend
   npm install
   npm start
   ```
   *(Runs on `http://localhost:3000`)*

---

## 👩‍💻 Author
**Vedansi V Patel**  
BE Computer Engineering — Gujarat Technological University (GTU)  
*Developed during a 12-week MERN Stack Internship at Dinar Venture, Ahmedabad (2026).*
