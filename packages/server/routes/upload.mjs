import express from "express";
import multer from "multer";
import { handleUploads } from "../controllers/UploadController.mjs";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), handleUploads);

export const uploadRoutes = router;
