import { User } from "../models/index.mjs";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.create({ name, email, password });

  return res.json(user);
};

export const listUsers = async (req, res) => {
  const users = await User.findAll();

  return res.json(users);
};
