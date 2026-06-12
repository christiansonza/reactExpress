import dotenv from "dotenv";
dotenv.config();

import { fixDNS } from "./config/dns.js";
fixDNS();


import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import { connectDB } from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:'http://localhost:5173',
  methods:['GET','POST','PUT','DELETE'],
  credentials:true
}));

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port 5000");
});