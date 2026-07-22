# 💬 BIZZ — Production-Grade Real-Time Chat Application

An end-to-end, full-stack real-time messaging platform built completely from scratch using **React**, **Node.js**, and **Socket.io**. Features secure authentication,
dynamic media sharing, live user presence, deep custom styling, and zero reliance on third-party backend services like Firebase or Supabase.

---

## 🌟 Key Highlights & Features

* ⚡ **Custom Real-Time Engine:** Native WebSocket integration built from the ground up using **Socket.io** for sub-millisecond message delivery.
* 🔐 **Authentication & Security:** User management, session handling, and webhook verification via **Clerk** with robust Express middleware protection.
* 🟢 **Presence & Online Tracking:** Live online/offline status updates and active user counts.
* 🖼️ **Rich Media Sharing:** Image and video file uploads with automated optimization and cloud hosting via **ImageKit**.
* 🎨 **Deep UI/UX Customization:** 
  * Light & Dark Mode toggle
  * **11 pre-built color themes** & **13 custom chat wallpapers**
  * Built using **Hero UI** & **Tailwind CSS**
  * Optional tactile **keyboard sound effects** on typing
* ⏰ **Automated Tasks:** Custom cron jobs implemented from scratch for background cleanup and keep-alive tasks.
* 🚫 **Self-Contained Backend:** No Firebase/Supabase—complete control over your database, server logic, and webhooks.
* 🚀 **100% Free Deployment:** Pre-configured for seamless deployment to **Render** and **MongoDB Atlas**.

---

## 🛠️ Tech Stack

### Frontend
* **Core:** React (Vite)
* **Styling & UI:** Tailwind CSS, Hero UI
* **State Management:** Zustand
* **Real-Time Client:** Socket.io Client

### Backend
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (via Mongoose)
* **Real-Time Engine:** Socket.io
* **Auth & Webhooks:** Clerk
* **Media Optimization:** ImageKit

### Hosting & Infrastructure
* **Frontend Hosting:** Render
* **Backend Hosting:** Render
* **Database Hosting:** MongoDB Atlas

---

## 📂 Repository Structure

```text
.
├── backend/            # Express server, Socket.io, routes & controllers
└── frontend/           # React SPA with Zustand state management & Hero UI



# CORS
FRONTEND_URL=http://localhost:5173
