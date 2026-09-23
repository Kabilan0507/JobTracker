# JobTrack

A full-stack job application tracking platform. Add, organize, and track the jobs you've applied to — with authentication, status filtering, and a clean, minimal dashboard.

**Live site:** [https://job-trackerkabi.vercel.app](https://job-trackerkabi.vercel.app)
**Backend API:** [https://jobtracker-backend-8as0.onrender.com](https://jobtracker-backend-8as0.onrender.com)

> Note: the backend is hosted on Render's free tier, which sleeps after periods of inactivity. The first request after idle time may take 30–50 seconds to respond while the server wakes up.

---

## Features

- **Authentication** — register and log in with JWT-based sessions; passwords hashed with bcrypt
- **Protected routes** — dashboard is only accessible when logged in, both on the frontend and via backend middleware
- **Full CRUD on job applications** — add, view, update status, and delete applications
- **Status tracking** — Applied, Assessment, Interview, Offer, Rejected, Withdrawn
- **Applied date** tracked per application
- **Filter by status** — view applications by stage with one click
- **Live application counter**
- **Toast notifications** for success/error feedback on every action
- **Logout** clears session and returns to login

---

## Tech Stack

**Frontend:** React, Vite, React Router, Axios, react-hot-toast, plain CSS
**Backend:** Node.js, Express
**Database:** MongoDB Atlas, Mongoose
**Auth:** JSON Web Tokens (JWT), bcryptjs

**Deployment:** Frontend on Vercel, backend on Render

---

## Project Structure

```
JobTrack/
├── backend/
│   ├── middleware/     # JWT auth middleware
│   ├── models/         # User and Job Mongoose schemas
│   ├── routes/         # Auth and job routes
│   └── server.js
├── frontend/
│   └── src/
│       ├── components/ # ProtectedRoute, JobFormModal
│       └── pages/      # Login, Register, Dashboard
```

---

## Running Locally

**Backend:**
```bash
cd backend
npm install
# create a .env file with PORT, MONGO_URI, JWT_SECRET, CLIENT_URL
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
# create a .env file with VITE_API_URL pointing to your backend
npm run dev
```

---

## Status

In development — built step by step as a portfolio project.
