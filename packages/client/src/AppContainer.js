import { App } from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./users/UserContext";

export const AppContainer = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  );
};
