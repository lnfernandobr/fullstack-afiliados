import express from 'express';
import { handleTransactions } from '../controllers/TranscationController.mjs';
import { requireAuth } from '../controllers/AuthController.mjs';

const router = express.Router();

router.get('/', requireAuth, handleTransactions);

export const transactionRoutes = router;
