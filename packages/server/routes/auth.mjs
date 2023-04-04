import express from "express";
import { signIn, signOut } from "../controllers/AuthController.mjs";

const router = express.Router();

router.post("/signin", signIn);
router.post("/signout", signOut);

export const authRoutes = router;
