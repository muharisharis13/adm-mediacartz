import React from "react";
import styled from "styled-components";
import { generatorColor } from "../../util";

const Header = (props) => {
  const { backgroundColor, text, text_color, image } = props;

  const srcImage = image
    ? image
    : "https://images.unsplash.com/photo-1610541756109-33b81610a402?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1502&q=80";

  return (
    <ContainerHeader
      backgroundColor={backgroundColor}
      color={text_color}
      className="container-header"
    >
      <section className="d-flex align-items-center gap-2">
        <img src={srcImage} alt={srcImage} />
        <div className="text">{text}</div>
      </section>
    </ContainerHeader>
  );
};

export default Header;

const ContainerHeader = styled.header`
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : "#000"};
  padding: 0.73rem 0;
  box-shadow: 0 8px 20px 0 rgb(0 0 0 / 20%) !important;
  img {
    width: 40px;
    height: 40px;
    border-radius: 999999px;
    object-fit: cover;
  }
  .text {
    font-weight: 700;
    color: ${({ color }) => (color ? color : "#000")};
  }
`;
