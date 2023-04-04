import { api } from "./services/api";
import { format } from "date-fns";
import {TOKEN_KEY} from "./constants";

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

export const logout = async () => {
  try {
    await api.post("/auth/signout");
    localStorage.removeItem(TOKEN_KEY);
    window.location = "/";
  } catch (error) {
    console.log(error);
  }
};

const DATE_FORMAT_PT_BR = "dd/MM/yyyy";
export const formatDate = (date) => format(new Date(date), DATE_FORMAT_PT_BR);

export const formatMoney = (value) => {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return formatter.format(value / 100);
};
