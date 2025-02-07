import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { mongoConnect } from "./database/mongoConnect";
import { Routes } from "./routes/routes";

dotenv.config();

mongoConnect();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Express + TypeScript Server" });
});

app.use("/api/v_1", new Routes().router);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
