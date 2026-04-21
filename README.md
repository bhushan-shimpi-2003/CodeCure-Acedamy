# CodeCure Academy   

## Overview  
CodeCure Academy is a full-stack web application for online learning, featuring a React (Vite) frontend and a Node.js/Express backend with Supabase integration.

## Project Structure

- `frontend/` — React (Vite) app for students, teachers, and admins
- `backend/` — Node.js/Express API server with Supabase and file upload support
## Deployment
- **Frontend:** Deploy on [Vercel](https://vercel.com/)
- **Backend:** Deploy on [Render](https://render.com/)

### Environment Variables

#### Frontend (`frontend/.env.example`)
- `VITE_API_BASE_URL` — URL of your backend API (e.g., `https://your-backend-service.onrender.com`)
- `APP_URL` — URL where your frontend is hosted (e.g., `https://your-frontend-project.vercel.app`)


#### Backend (`backend/.env`)
- `PORT` — Port to run the server (default: 5000 or 10000 on Render)
- `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` — Supabase project credentials
- `JWT_SECRET` — Secret for JWT authentication
- `BACKEND_URL` — URL where your backend is hosted (e.g., `https://your-backend-service.onrender.com`)
- `FRONTEND_URL` — URL where your frontend is hosted (e.g., `https://your-frontend-project.vercel.app`)

## Local Development

1. Clone the repository
2. Set up environment variables in both `frontend/.env` and `backend/.env`
3. Install dependencies:
	- `cd frontend && npm install`
	- `cd ../backend && npm install`
4. Start the backend: `npm run dev` (from `backend/`)
5. Start the frontend: `npm run dev` (from `frontend/`)

## License
MIT
