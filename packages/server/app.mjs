import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { sequelize } from "./models/index.mjs";
import { authRoutes } from "./routes/auth.mjs";
import { userRoutes } from "./routes/users.mjs";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

sequelize
  .authenticate()
  .then(() => console.log("Connection established with the database"))
  .catch((err) => console.error("Unable to connect to database", err));

app.listen(port, () => console.log(`Server is running on port: ${port}`));
