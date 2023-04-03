import { App } from "./App";
import { BrowserRouter } from "react-router-dom";

export const AppContainer = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};
