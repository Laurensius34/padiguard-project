import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.GEMINI_API_KEY) {
  console.warn("⚠️ Warning: GEMINI_API_KEY belum dikonfigurasi di file .env");
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
export default ai;
