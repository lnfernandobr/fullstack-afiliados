import axios from "axios";
import { TOKEN_KEY } from "../constants";

const instance = axios.create({
  baseURL: "http://localhost:5000",
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export const api = instance;
