import express from "express";
import { signup } from "../controllers/UserController.mjs";

const router = express.Router();

router.post("/signup", signup);

export const userRoutes = router;
