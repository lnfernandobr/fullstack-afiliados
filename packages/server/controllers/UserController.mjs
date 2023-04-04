import { User } from "../models/index.mjs";
import { Op } from "sequelize";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  const userDb = await User.findOne({
    where: {
      email: {
        [Op.eq]: email,
      },
    },
  });

  if (userDb) {
    return res.status(409).json({ message: "Usuário já existe" });
  }

  const user = await User.create({ name, email, password });

  return res.json(user);
};

export const listUsers = async (req, res) => {
  const users = await User.findAll();

  return res.json(users);
};
