# Interview Master

An AI-powered interview preparation platform. 

## Deployment Guide

This project is configured to be deployed with the Frontend on **Vercel** and the Backend on **Render**.

### Step 1: Deploy Backend (Render)
1. Create a free account at [Render](https://render.com).
2. Click **New +** and select **Web Service**.
3. Connect your GitHub repository and select this project.
4. Set the **Root Directory** to `backend`.
5. Ensure the settings are:
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Scroll down to **Environment Variables** and add:
   - `MONGO_URI`: Your MongoDB connection string
   - `GEMINI_API_KEY`: Your Google Gemini API Key
   - `JWT_SECRET`: A secure random string for JWT signing
   - `FRONTEND_URL`: Leave blank for now (we'll update this in Step 3)
7. Click **Create Web Service**. Wait for the deployment to finish and copy the generated Render URL (e.g., `https://interview-master-backend.onrender.com`).

### Step 2: Deploy Frontend (Vercel)
1. Create a free account at [Vercel](https://vercel.com).
2. Click **Add New** -> **Project**.
3. Import your GitHub repository.
4. Set the **Root Directory** to `frontend`.
5. Vercel should auto-detect **Vite** as the framework.
6. Open **Environment Variables** and add:
   - `VITE_API_URL`: Paste the Render URL from Step 1 here.
7. Click **Deploy**. Wait for the deployment to finish and copy your new Vercel URL (e.g., `https://interview-master-frontend.vercel.app`).

### Step 3: Connect Backend to Frontend
1. Go back to your Render Dashboard.
2. Select your Web Service and go to **Environment**.
3. Update the `FRONTEND_URL` variable with your new Vercel URL.
4. Save the changes. Render will automatically restart your backend.

Your application is now live and fully connected!
