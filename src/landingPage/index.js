import React from 'react';
import {BrowserRouter as Router , Route, Switch} from "react-router-dom";
import { AppLanding } from './App';

export const IdxLandingPageRoute = () => {
  return (
    <Switch>
        <Route exact  path="/" component={AppLanding} />
    </Switch>
  )
}
