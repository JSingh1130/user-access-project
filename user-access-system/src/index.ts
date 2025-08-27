import "reflect-metadata";
import express, { type Request, type Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AppDataSource } from "./ormconfig";
import authRoutes from "./routes/auth.routes";
import softwareRoutes from "./routes/software.routes";
import requestRoutes from "./routes/request.routes";

dotenv.config();

const app = express();

/* --------------------------- CORS configuration --------------------------- */
const allowedOrigins = [
  "https://user-access-project.vercel.app", // production
  "http://localhost:5173",
  "http://localhost:3000",
];
// allow any Vercel preview like https://user-access-project-xxxxx.vercel.app
const vercelPreviewRegex = /^https:\/\/user-access-project-.*\.vercel\.app$/;

app.use(
  cors({
    origin(origin, cb) {
      if (!origin || allowedOrigins.includes(origin) || vercelPreviewRegex.test(origin)) {
        return cb(null, true);
      }
      return cb(new Error(`Not allowed by CORS: ${origin}`));
    },
    credentials: true, // keep true only if you actually set cookies
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// handle CORS preflights
app.options("*", cors());

/* ------------------------------- Body parser ------------------------------ */
app.use(express.json());

/* --------------------------------- Health -------------------------------- */
app.get("/health", (_req: Request, res: Response): void => {
  res.status(200).json({ ok: true, time: new Date().toISOString() });
});

/* --------------------------------- Routes -------------------------------- */
app.use("/api/auth", authRoutes);
app.use("/api", softwareRoutes);
app.use("/api", requestRoutes);

/* --------------------------------- Server -------------------------------- */
const PORT = Number(process.env.PORT || 5000);

AppDataSource.initialize()
  .then(() => {
    console.log("DB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log("DB Error", err));
