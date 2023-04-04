import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import multer from "multer";
import { sequelize } from "./models/index.mjs";
import { authRoutes } from "./routes/auth.mjs";
import { userRoutes } from "./routes/users.mjs";
const upload = multer({ dest: "uploads/" });

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.post("/upload", upload.single("file"), (req, res) => {
  // TODO fazer o parsing do arquivo e salvar as transações no banco de dados
  res.sendStatus(200);
});

sequelize
  .authenticate()
  .then(() => console.log("Connection established with the database"))
  .catch((err) => console.error("Unable to connect to database", err));

app.listen(port, () => console.log(`Server is running on port: ${port}`));
