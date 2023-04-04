import express from "express";
import { handleTransactions } from "../controllers/TranscationController.mjs";

const router = express.Router();

router.get("/", handleTransactions);

export const transactionRoutes = router;
