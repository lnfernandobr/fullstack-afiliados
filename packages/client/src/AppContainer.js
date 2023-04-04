import { App } from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./users/UserContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AppContainer = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <App />
        <ToastContainer />
      </AuthProvider>
    </BrowserRouter>
  );
};
