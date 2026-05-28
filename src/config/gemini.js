import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY belum dikonfigurasi");
}

const ai = new GoogleGenAI({
  apiKey,
});

export default ai;