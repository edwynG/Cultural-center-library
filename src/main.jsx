import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./css/index.css";
import { ContextProvider } from "./context/Context.jsx";
import { CssBaseline } from "@mui/material";
import { HashRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <ContextProvider>
        <CssBaseline />
        <App />
      </ContextProvider>
    </HashRouter>
  </React.StrictMode>
);
