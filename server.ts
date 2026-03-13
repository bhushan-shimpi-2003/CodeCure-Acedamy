import express from "express";
import { createServer as createViteServer } from "vite";
import cors from "cors";
import helmet from "helmet";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(cors());
  app.use(helmet({
    contentSecurityPolicy: false, // Disabled for development/iframe
  }));
  app.use(express.json());

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Coducure Academy API is running" });
  });

  // Mock endpoint for lead capture
  app.post("/api/leads", (req, res) => {
    const { name, email, phone } = req.body;
    console.log("New lead received:", { name, email, phone });
    // In a real app, save to MongoDB here
    res.status(201).json({ success: true, message: "Lead captured successfully" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
