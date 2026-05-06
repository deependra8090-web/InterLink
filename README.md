# 🌍 Buddy Finder

Buddy Finder is a full-stack travel companion platform where users can **create trips**, **find travel buddies**, and **explore trips based on preferences** like budget, season, and travel type.

---

## ✨ Features

### 👤 Authentication

- User registration with email verification
- Secure login using JWT
- Protected routes

### 🧳 Trips

- Create, edit, delete trips
- Join trips created by others
- Trip status (OPEN / CLOSED)
- Host controls (edit/delete own trips)

### 🔍 Explore Trips

- Search by destination
- Filter by budget, availability, and status
- Smart recommendations based on:
  - User preferences
  - Season
  - Travel type
- Suggested places with auto-fill trip creation

### 🗺️ Maps

- Leaflet integration
- Select trip location via interactive map
- View trip locations visually

### 👤 Profile

- Edit profile details
- Upload profile image (Cloudinary)
- Set travel preferences (budget, travel type)
- View created & joined trips

### 🔔 Notifications

- Real-time notifications using Socket.IO

---

## 🛠 Tech Stack

### Frontend

- React + Vite
- Tailwind CSS
- React Router
- Axios
- Leaflet

### Backend

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Socket.IO
- Cloudinary (image uploads)

---

## 📁 Project Structure

BuddyFinder/
│
├── frontend/
│ ├── src/
│ ├── public/
│ └── vite.config.js
│
├── backend/
│ ├── controllers/
│ ├── routes/
│ ├── models/
│ ├── middleware/
│ └── server.js
│
└── .gitignore

Email Delivery Note

Email delivery may be delayed by 2–5 minutes when using free hosting services due to server cold starts.

Free SMTP providers (e.g., Gmail) may queue or scan emails, causing additional delay.

For instant email delivery, it is recommended to use a transactional email service like SendGrid / Resend / Brevo in production.

👨‍💻 Author

Deependra kumar
Full-Stack Developer
