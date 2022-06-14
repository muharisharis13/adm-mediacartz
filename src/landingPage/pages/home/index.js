import React, { useContext, useState } from "react";
import { DinamicContent } from "./dinamic-content";
import { OurClient } from "./our-client";
import styled from "styled-components";
import { IdxNav } from "../../../component/1.LANDINGPAGE/header/nav";
import * as service from "../../../service";
import { IdxSearch } from "../../../component/1.LANDINGPAGE";

export const IdxHome = () => {
  const json = service.json.Data_content_landing;
  const { content } = useContext(service.Context);
  const [navbar, setNavbar] = useState(null);

  const ChangeBackground = () => {
    if (window.scrollY >= 441) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  window.addEventListener("scroll", ChangeBackground);

  return (
    <div>
      <Container2
        style={{
          // position: "absolute",
          width: "100%",
          left: 0,
          // top: "100px",
          zIndex: 1,
          // background: "red",
        }}
      >
        <IdxSearch
          placeholder="What do you want to create for today?"
          navbar={navbar}
        />
        <IdxNav json_nav={json} />
      </Container2>
      <div className="mt-2">
        {/* dinamic content */}
        {content.title && (
          <div>
            <DinamicContent content={content} />
          </div>
        )}
        {/* dinamic content */}

        {/* OUR CLIENT========== */}
        <OurClient />
        {/* OUR CLIENT========== */}
      </div>
    </div>
  );
};

export const Container2 = styled.div`
  /* background:red; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
