import express from "express";
import multer from "multer";
import { analyzeLeafImage } from "../controllers/detectionController.js";

const router = express.Router();

// Konfigurasi Multer untuk mengontrol upload gambar di memori (ringan & cepat)
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Batasi maksimal 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Hanya format JPEG/PNG yang diperbolehkan!"), false);
    }
  },
});

router.post("/detect", upload.single("image"), analyzeLeafImage);

export default router;
