import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Provider from "./service/context";
import "rc-slider/assets/index.css";
import { IdxDashboardRoute } from "./dashboard";
import "./fontello/css/fontello.css";
import "react-datepicker/dist/react-datepicker.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <Router>
        <Switch>
          <IdxDashboardRoute />
        </Switch>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
