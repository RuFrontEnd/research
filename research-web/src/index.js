import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { StyleRoot } from "radium"; // 可以使inline-style有media-qurey功能
import "components/internation/i18n";

ReactDOM.render(
  <React.StrictMode>
    <StyleRoot>
      <App />
    </StyleRoot>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
