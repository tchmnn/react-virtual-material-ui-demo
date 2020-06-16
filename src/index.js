import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider, createMuiTheme, responsiveFontSizes } from '@material-ui/core';
import App from "./App";

let theme = responsiveFontSizes(createMuiTheme());

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  rootElement
);
