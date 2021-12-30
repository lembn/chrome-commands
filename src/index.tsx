import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import FontStyles from "./styles/globalStyles/Font";
import GlobalStyles from "./styles/globalStyles/Global";

ReactDOM.render(
  <React.StrictMode>
    <FontStyles />
    <GlobalStyles />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
