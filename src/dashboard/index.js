import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";
import {
  IdxLogin,
  IdxRegister,
  IdxForgotPassword,
  IdxResetPassword,
} from "./pages";
import App from "./App";
import { AppLanding } from "../landingPage/App";
import * as Catalogue from "../catalogue";

export const IdxDashboardRoute = () => {
  const url = window.location.pathname;
  const history = useHistory();
  return (
    <div style={{ backgroundColor: "#fcfcfc" }}>
      {url === "/" ? <Redirect to="/home" /> : null}
      <Switch>
        <Route path="/catalog/:slug" component={Catalogue.Catalogues} />
        <Route path="/home" component={AppLanding} />
        <Route path="/login" component={IdxLogin} />
        <Route path="/register" component={IdxRegister} />
        <Route path="/forgot-password" component={IdxForgotPassword} />
        <Route path="/recovery/reset" component={IdxResetPassword} />
        <Route path="/dashboard" component={App} />
      </Switch>
    </div>
  );
};
