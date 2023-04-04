import { api } from "./services/api";

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

export const logout = async () => {
  try {
    await api.post("/auth/signout");
    localStorage.removeItem("token");
    window.location = "/";
  } catch (error) {
    console.log(error);
  }
};
