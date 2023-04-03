import express from "express";
import { signup, listUsers } from "../controllers/UserController.mjs";

const router = express.Router();

router.post("/signup", signup);
router.get("/users", listUsers);

export const userRoutes = router;
