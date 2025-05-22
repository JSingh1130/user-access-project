import "reflect-metadata";
import express from "express";
import cors from "cors"; // ✅ Add this
import { AppDataSource } from "./ormconfig";
import authRoutes from "./routes/auth.routes";
import dotenv from "dotenv";
import softwareRoutes from "./routes/software.routes";
import requestRoutes from "./routes/request.routes";

dotenv.config();

const app = express();

app.use(cors()); // ✅ Enable CORS for all origins (during development)

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", softwareRoutes);
app.use("/api", requestRoutes);

AppDataSource.initialize().then(() => {
  console.log("DB connected");
  app.listen(5000, () => console.log("Server running on port 5000"));
}).catch(err => console.log("DB Error", err));
