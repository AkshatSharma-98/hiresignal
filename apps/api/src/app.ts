import "dotenv/config";
import express from "express";
import { jobsRouter } from "./routes/jobs";
import { clerkMiddleware, getAuth } from "@clerk/express";


export const app = express();
app.use(express.json());
app.use(clerkMiddleware());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/jobs", jobsRouter);