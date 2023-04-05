import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import { sequelize } from './models/index.mjs';
import { authRoutes } from './routes/auth.mjs';
import { userRoutes } from './routes/users.mjs';
import { transactionRoutes } from './routes/transactions.mjs';
import { uploadRoutes } from './routes/upload.mjs';
import { errorHandler } from './middlewares/errorHnalder.mjs';
import 'express-async-errors';

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

sequelize
  .authenticate()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Connection established with the database');
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error('Unable to connect to database', err);
  });

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/transactions', transactionRoutes);
app.use('/upload', uploadRoutes);

app.use(errorHandler);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port: ${port}`);
});
