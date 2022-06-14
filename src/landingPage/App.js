import React from "react";
import { IdxFooter, IdxHeader } from "../component/1.LANDINGPAGE";
import { IdxHome, IdxRecommendationPage } from "./pages";
import { Route } from "react-router-dom";

export const AppLanding = () => {
  return (
    <React.Fragment>
      <section>
        <IdxHeader />
      </section>

      <section>
        <Route exact path="/home" component={IdxHome} />
        <Route path="/home/recomendations" component={IdxRecommendationPage} />
        {/* <IdxHome /> */}
      </section>
      <section style={{ marginTop: "50px" }}>
        <IdxFooter />
      </section>
    </React.Fragment>
  );
};
