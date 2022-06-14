import React from "react";
import styled from "styled-components";
import MediaCartzLogo from "asset/logo/media_cartz_logo.png";

const Footer = () => {
  return (
    <Container className="px-5">
      <div className="text">Powered by</div>
      <a href="https://www.mediacartz.com" target="__blank">
        <img src={MediaCartzLogo} alt={MediaCartzLogo} />
      </a>
    </Container>
  );
};

export default Footer;

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  height: 100%;
  max-height: 70px;
  width: 100%;
  overflow: hidden;
  background-color: #ddd;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  flex-direction: column;
  .text {
    font-weight: 600;
  }
`;
