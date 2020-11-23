import {ThemeProvider as MuiThemeProvider} from "@material-ui/styles";
import {createMuiTheme} from "@material-ui/core";
import defaultTheme from "./common/theme";
import Layout from "./layout/Layout";
import React from "react";
import {BrowserRouter as Router} from "react-router-dom";

function App() {
  return (
      <>
          <Router>
              <MuiThemeProvider theme={createMuiTheme(defaultTheme)}>
                  <Layout />
              </MuiThemeProvider>
          </Router>
      </>
  );
}

export default App;
