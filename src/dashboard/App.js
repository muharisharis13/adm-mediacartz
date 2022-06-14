import React from "react";
import { IdxFooter, IdxHeader } from "../component";
import { Router } from "./route";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom"

function App() {
  return (
    <React.Fragment>
      {/* Header */}
      <section>
        <IdxHeader />
      </section>
      <section style={{ minHeight: "100vh" }}>
        {
          Cookies.get("token") ?
            <Router />
            : <Redirect to="/login" />
        }
      </section>
      <section>
        <IdxFooter />
      </section>
    </React.Fragment>
  );
}

export default App;
