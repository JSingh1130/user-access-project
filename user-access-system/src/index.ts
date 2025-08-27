import "reflect-metadata";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./ormconfig";
import authRoutes from "./routes/auth.routes";
import softwareRoutes from "./routes/software.routes";
import requestRoutes from "./routes/request.routes";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// --- CORS ---
const allowedOrigins = [
  "https://user-access-project.vercel.app", // production
  "http://localhost:5173",
  "http://localhost:3000",
];

const vercelPreviewRegex = /^https:\/\/user-access-project-.*\.vercel\.app$/;

app.use(
  cors({
    origin(origin, cb) {
      // allow tools/no-origin (curl/Postman) and our allow-listed/regex origins
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        vercelPreviewRegex.test(origin)
      ) {
        return cb(null, true);
      }
      return cb(new Error(`Not allowed by CORS: ${origin}`));
    },
    credentials: true, // keep true only if you actually set cookies
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Ensure preflights are handled for any path
app.options("*", cors());

// Parsers
app.use(express.json());

// Simple health check
app.get("/health", (_req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", softwareRoutes);
app.use("/api", requestRoutes);

// IMPORTANT on Render: bind to the provided PORT
const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;

AppDataSource.initialize()
  .then(() => {
    console.log("DB connected");
    app.listen(PORT, () => console.log("Server running on port", PORT));
  })
  .catch((err) => console.log("DB Error", err));
