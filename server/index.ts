import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Supabase health check
  // GET /api/supabase-health
  try {
    // lazy import to avoid loading supabase on client bundles
    const { handleSupabaseHealth } = await import("./routes/supabaseHealth");
    app.get("/api/supabase-health", handleSupabaseHealth);
  } catch (e) {
    // ignore if route couldn't be registered
    // eslint-disable-next-line no-console
    console.warn("Could not register supabase health route", e);
  }

  return app;
}
