import express from "express";
import { signIn, signOut, signUp } from "../controllers/AuthController.mjs";

const router = express.Router();

router.post("/signin", signIn);
router.post("/signout", signOut);
router.post("/signup", signUp);

export const authRoutes = router;
