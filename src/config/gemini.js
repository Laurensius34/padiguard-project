import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.GEMINI_API_KEY) {
  console.warn("⚠️ Warning: GEMINI_API_KEY belum dikonfigurasi di Environment Variables");
}

// Inisialisasi SDK stabil
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// Ambil model Gemini 1.5 Flash
const ai = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default ai;