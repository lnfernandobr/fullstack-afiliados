import express from "express";
import {
  requireAuth,
  signIn,
  signOut,
} from "../controllers/AuthController.mjs";

const router = express.Router();

router.post("/signin", signIn);
router.post("/signout", requireAuth, signOut);

export const authRoutes = router;
