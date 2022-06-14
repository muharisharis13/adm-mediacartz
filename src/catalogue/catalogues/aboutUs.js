import React from "react";
import styled from "styled-components";
import { generatorColor } from "../../util";

const AboutUs = (props) => {
  const { backgroundColor, text_color, title, text } = props;

  return (
    <Container text_color={text_color} backgroundColor={backgroundColor}>
      <section>
        <div className="text-center">
          <h4>{title}</h4>
        </div>
        <div className="desc" dangerouslySetInnerHTML={{ __html: text }}></div>
      </section>
    </Container>
  );
};

export default AboutUs;

const Container = styled.div`
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : generatorColor()};
  min-height: 200px;

  .desc {
    color: ${({ text_color }) => (text_color ? text_color : "#000")};
  }
`;
