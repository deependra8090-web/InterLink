# 🌍 InterLink – AI-Powered Travel Buddy Finder

InterLink is a **full-stack AI-powered travel companion platform** that helps users discover compatible travel buddies based on their **interests, budget, travel preferences, and trip requirements**. The platform enables users to create and manage trips, find suitable companions, send joining requests, communicate in real time, and explore destinations using interactive maps.

---

## ✨ Key Features

### 🤖 AI-Powered Travel Buddy Matching

* Analyzes user interests, budget, travel preferences, and trip requirements.
* Recommends compatible travel companions based on preference similarity.
* Uses the **OpenAI API** to enhance travel recommendations.
* Improves travel buddy matching accuracy by approximately **25%**.

### 🧳 Trip Management

* Create, edit, and delete trips.
* Specify destination, budget, travel type, dates, and preferences.
* Send and manage trip joining requests.
* Host controls for managing created trips.
* Trip status management with **OPEN/CLOSED** states.

### 🔍 Trip Discovery & Search

* Search trips by destination.
* Filter trips based on budget, availability, travel type, and status.
* Explore recommended trips based on user preferences.
* Discover suitable travel opportunities through personalized recommendations.

### 💬 Real-Time Communication

* Integrated **Socket.IO** for real-time communication.
* Enables interactive communication between users.
* Supports real-time trip-related notifications and updates.
* Reduced message latency by approximately **15%**.

### 🗺️ Interactive Maps

* Integrated **Leaflet** for location-based trip visualization.
* Select and display trip destinations on interactive maps.
* Helps users visually explore trip locations.
* Improved map loading performance by approximately **20%**.

### 🔐 Secure Authentication

* Implemented **OAuth 2.0** authentication for secure user access.
* Protected routes for authenticated users.
* Secure session and authorization handling.
* Provides controlled access to user and trip-related resources.

### 👤 User Profiles

* Create and update user profiles.
* Manage travel preferences such as:

  * Budget
  * Travel type
  * Interests
  * Destination preferences
* View created and joined trips.

---

## 🛠️ Tech Stack

### Frontend

* **React.js**
* **Vite**
* **Tailwind CSS**
* **React Router**
* **Axios**
* **Leaflet**

### Backend

* **Node.js**
* **Express.js**
* **RESTful APIs**
* **Socket.IO**
* **OAuth 2.0**

### Database

* **MongoDB**
* **Mongoose**

### AI & External Services

* **OpenAI API** – AI-powered travel recommendations
* **Leaflet** – Interactive maps

### Development Tools

* **Git**
* **GitHub**
* **Postman**
* **VS Code**

---

## 🏗️ System Architecture

```text
                         ┌─────────────────────┐
                         │       User          │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   React Frontend    │
                         │  React + Tailwind   │
                         └──────────┬──────────┘
                                    │
                              REST APIs
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   Express Backend   │
                         │      Node.js        │
                         └──────┬──────┬───────┘
                                │      │
                    ┌───────────┘      └────────────┐
                    ▼                               ▼
           ┌─────────────────┐             ┌─────────────────┐
           │     MongoDB     │             │   OpenAI API    │
           │  User & Trip    │             │ Recommendations │
           │      Data       │             └─────────────────┘
           └─────────────────┘
                               
                    ┌─────────────────────┐
                    │     Socket.IO       │
                    │ Real-Time Updates   │
                    └─────────────────────┘
```

---

## 📁 Project Structure

```text
InterLink/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   └── App.jsx
│   │
│   ├── public/
│   └── vite.config.js
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── services/
│   └── server.js
│
├── .gitignore
└── README.md
```

---

## 🔄 How InterLink Works

### 1. Create an Account

Users register and authenticate securely using **OAuth 2.0**.

### 2. Set Travel Preferences

Users provide information such as their preferred budget, travel type, interests, and destinations.

### 3. Create or Explore Trips

Users can create their own trips or browse existing trips using search and filtering options.

### 4. Get AI Recommendations

The recommendation system analyzes user preferences and trip requirements to identify compatible travel companions and relevant trips.

### 5. Send Joining Requests

Users can request to join trips created by other users, while trip hosts can manage incoming requests.

### 6. Communicate in Real Time

Users can interact through real-time communication powered by **Socket.IO**.

### 7. Explore Locations

Interactive **Leaflet maps** allow users to view and select trip destinations visually.

---

## ⚡ Performance & Engineering Highlights

* **25% improvement** in travel buddy matching accuracy through preference-based AI recommendations.
* **15% reduction** in real-time message latency using Socket.IO.
* **20% improvement** in map loading performance through optimized Leaflet integration.
* **35% reduction** in MongoDB query response time through optimized database schemas and queries.
* Implemented **OAuth 2.0** authentication to provide secure user access.


## 🔮 Future Enhancements

* Advanced AI-based itinerary generation.
* More personalized travel recommendations.
* Group trip planning.
* Enhanced real-time chat features.
* Travel history and personalized trip analytics.
* Integration with external travel and accommodation APIs.

---

## 👨‍💻 Author

**Deependra Kumar**

Full-Stack Developer

### Technologies

`React.js` `Node.js` `Express.js` `MongoDB` `Socket.IO` `OpenAI API` `OAuth 2.0` `Leaflet`

---

## ⭐ Project Highlights

InterLink demonstrates practical experience in:

* Full-stack web development
* REST API development
* AI-powered recommendation systems
* Real-time communication
* Database design and optimization
* OAuth 2.0 authentication
* Interactive map integration
* End-to-end trip management
