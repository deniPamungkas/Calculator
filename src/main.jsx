import React, { createContext, useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import { Context } from "./components/AllComps";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Context>
      <App />
    </Context>
  </React.StrictMode>
);
