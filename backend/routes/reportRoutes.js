import express from "express";
import { generatePDF, generateCSV } from "../controllers/reportController.js";

const router = express.Router();

router.get("/pdf", generatePDF);
router.get("/csv", generateCSV);

export default router;