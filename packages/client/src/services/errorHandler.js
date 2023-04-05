import { toast } from "react-toastify";

export const clientErrorHandler = (error, isDebuging = false) => {
  if (isDebuging) {
    console.error(error);
  }
  if (error.response?.data?.error) {
    toast(error.response.data.error);
    return;
  }
  toast("Um erro inesperado aconteceu");
};
