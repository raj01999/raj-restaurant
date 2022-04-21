import React from "react";
import ReactDom from "react-dom/client";
import "./index.css";

import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import { StateProvider } from "./contaxt/StateProvider";
import { initialState } from "./contaxt/initialState";
import reducer from "./contaxt/reducer";

ReactDom.createRoot(document.getElementById("root")).render(
  <Router>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </Router>
);
