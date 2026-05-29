# CodeCure Academy   
## Overview  
CodeCure Academy is a full-stack web application for online learning, featuring a React (Vite) frontend and a Node.js/Express backend with Supabase integration.

## Project Structure
- `frontend/` — React (Vite) app for students, teachers, and admins
- `backend/` — Node.js/Express API server with Supabase and file upload support
- 
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

---

## Health Check & Keep-Alive

### `GET /health` Endpoint

A lightweight public endpoint is available at `/health` that returns the server's current status.

**Request**
```
GET /health
```

**Response — HTTP 200**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2025-01-01T00:00:00.000Z"
}
```

- No database calls are made.
- No authentication is required.
- Safe to call from external uptime monitors.

---

### Keep-Alive Cron Job

On free-tier hosting providers (e.g., **Render free tier**, **Railway hobby**), the server process is put to sleep after a period of inactivity. The built-in keep-alive job can ping the `/health` endpoint on a fixed interval to reduce cold starts.

#### Environment Variables

Add these to your `backend/.env` or your hosting provider's environment settings:

| Variable | Default | Description |
|---|---|---|
| `KEEP_ALIVE_ENABLED` | `false` | Set to `true` to activate the ping job |
| `KEEP_ALIVE_URL` | *(none)* | Full URL of your deployed `/health` endpoint, e.g. `https://your-backend.onrender.com/health` |

**Example `.env` snippet:**
```env
KEEP_ALIVE_ENABLED=true
KEEP_ALIVE_URL=https://your-backend.onrender.com/health
```

The job uses Node's built-in `setInterval` (no extra dependency) and runs every **5 minutes**.
Failures are logged but never crash the server.

---

### ⚠️ Important — Use an External Monitor Too

> The keep-alive job runs **inside** the same server process. If the hosting provider shuts down the entire container (which happens on Render's free tier after ~15 minutes of no inbound HTTP traffic), the cron job stops running too and **cannot wake the server back up**.

For reliable uptime, configure **at least one** external uptime monitor to hit your `/health` endpoint every 5 minutes:

| Service | Free Tier | Notes |
|---|---|---|
| [UptimeRobot](https://uptimerobot.com) | ✅ 5-min interval | Easiest setup |
| [Better Stack](https://betterstack.com) | ✅ 3-min interval | Richer alerting |
| [cron-job.org](https://cron-job.org) | ✅ 1-min interval | Cron-based HTTP calls |

**Recommended:** Use both the built-in job (reduces in-process idle) **and** an external monitor (wakes a sleeping container).

---

### Running Tests

```bash
cd backend
npm test
```

Tests use **Jest** + **Supertest** and cover:
- `GET /health` returns HTTP 200
- Response contains `success`, `message`, and `timestamp` fields
- `timestamp` is a valid ISO 8601 date string
- Keep-alive job is disabled unless `KEEP_ALIVE_ENABLED=true`
