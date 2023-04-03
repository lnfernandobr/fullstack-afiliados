import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import { User, Token } from "../models/index.mjs";
import bcrypt from "bcrypt";

const jwtSecret = process.env.JWT_SECRET;

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email: {
        [Op.eq]: email,
      },
    },
  });
  console.log("userDb", user);

  if (!user) {
    return res.status(401).json({ message: "Usuário não encontrado" });
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Senha inválida" });
  }

  const token = jwt.sign({ userId: user.id }, jwtSecret);

  await Token.create({ token });

  return res.json({ token });
};

export const signOut = async (req, res) => {
  const { authorization } = req.headers;

  await Token.destroy({ where: { token: authorization } });

  return res.json({ message: "Logout realizado com sucesso" });
};

export const signUp = async (req, res) => {
  const { email, password } = req.body;

  const userExists = await User.findOne({ where: { email } });
  if (userExists) {
    return res.status(400).json({ error: "Usuário já existe" });
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await User.create({ email, password: hash });

  const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: 3600 });

  res.json({ token });
};
