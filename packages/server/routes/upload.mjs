import express from "express";
import multer from "multer";
import { handleUploads } from "../controllers/UploadController.mjs";
import { requireAuth } from "../controllers/AuthController.mjs";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/", requireAuth, upload.single("file"), handleUploads);

export const uploadRoutes = router;
