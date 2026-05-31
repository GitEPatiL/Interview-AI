<div align="center">
  <img src="./frontend/src/assets/logo.png" alt="Interview Master Logo" width="120" />
  
  # Interview Master 🚀
  
  **AI-Powered Technical Interview Preparation & Evaluation Platform**
  
  [![React](https://img.shields.io/badge/React-19.0-blue.svg?style=for-the-badge&logo=react)](https://reactjs.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-Backend-green.svg?style=for-the-badge&logo=node.js)](https://nodejs.org/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-Database-success.svg?style=for-the-badge&logo=mongodb)](https://mongodb.com/)
  [![TailwindCSS](https://img.shields.io/badge/Tailwind-v4.0-38B2AC.svg?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![Gemini AI](https://img.shields.io/badge/Gemini-2.5%20Flash-orange.svg?style=for-the-badge&logo=google)](https://deepmind.google/technologies/gemini/)

</div>

---

## 🌟 Overview

**Interview Master** is a premium, full-stack SaaS application designed to help candidates perfectly align their resumes with target job descriptions. 

By leveraging the cutting-edge **Google Gemini 2.5 Flash** AI model, the platform instantly analyzes uploaded resumes against job descriptions to generate a highly detailed, personalized interview preparation dashboard.

### ✨ Key Features

- **Resume vs JD Analysis:** Upload your PDF resume and paste the job description to get an instant match score.
- **AI Technical Deep-Dive:** Generates highly specific technical questions the interviewer is likely to ask, complete with the interviewer's hidden intent and the ideal response strategy.
- **Behavioral Scenarios:** Predicts situational and behavioral questions tailored to the seniority of the role.
- **Skill Gap Identification:** Automatically flags missing skills (categorized by High, Medium, and Low severity) so you aren't caught off guard.
- **7-Day Action Plan:** Provides a structured, day-by-day roadmap to prepare for the specific interview.
- **PDF Export:** Download your entire personalized interview report as a clean PDF for offline studying.
- **Premium UI/UX:** Built with a stunning glassmorphism design system, smooth micro-animations, and dynamic Bento-box layouts.

---

## 🏗️ Tech Stack

### Frontend
- **Framework:** React 19 (via Vite)
- **Styling:** Tailwind CSS v4 (PostCSS)
- **Routing:** React Router v7
- **UI Components:** Ant Design (Icons, Progress Indicators, Upload Draggers)
- **PDF Generation:** html2pdf.js

### Backend
- **Runtime:** Node.js & Express
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT (JSON Web Tokens) via secure `httpOnly` cross-site cookies
- **AI Integration:** `@google/genai` (Gemini 2.5 Flash) with strict Zod Schema enforcement
- **File Parsing:** `pdf-parse` & `multer` for secure resume handling

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas cluster or local MongoDB instance
- Google Gemini API Key

### 1. Clone the repository
```bash
git clone https://github.com/GitEPatiL/Interview-AI.git
cd Interview-AI
```

### 2. Setup the Backend
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory:
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
GOOGLE_GEMINI_API_KEY=your_gemini_api_key
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```
Start the backend server:
```bash
npm run dev
```

### 3. Setup the Frontend
```bash
cd ../frontend
npm install
```
Create a `.env` file in the `frontend` directory:
```env
VITE_API_URL=http://localhost:3000
```
Start the frontend development server:
```bash
npm run dev
```

---

## 🌍 Production Deployment

This application is designed for seamless deployment across modern cloud providers, specifically using **Vercel** for the frontend and **Render** for the backend.

### Critical Environment Variables for Production
Because the frontend and backend live on different domains in production, **Cross-Origin Resource Sharing (CORS)** and **Cross-Site Cookies** are strictly enforced.

**On Render (Backend):**
- `NODE_ENV=production` *(Crucial: Enables `SameSite=none` secure cookies)*
- `FRONTEND_URL=https://your-app.vercel.app` *(Crucial: No trailing slash!)*

**On Vercel (Frontend):**
- `VITE_API_URL=https://your-backend.onrender.com` *(Crucial: No trailing slash!)*

---

## 📝 License
This project is open-source and available under the [MIT License](LICENSE).
