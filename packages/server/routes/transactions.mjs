import express from 'express';
import { getTransactions } from '../controllers/TranscationController.mjs';
import { requireAuth } from '../controllers/AuthController.mjs';

const router = express.Router();

router.get('/', requireAuth, getTransactions);

export const transactionRoutes = router;
