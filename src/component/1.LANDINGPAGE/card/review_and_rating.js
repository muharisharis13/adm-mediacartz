import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { color, Text } from "../style";

export const ReviewAndRating = (props) => {
  return (
    <Container key={props.key} width={props.width}>
      <div>
        <Text.HEADING_S style={{ color: color.NEUTRAL_80 }}>
          Chinthya Putri H
        </Text.HEADING_S>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex justify-content-center align-items-center">
          <div>
            <i className="icon-logogram_color" style={{ fontSize: "24px" }} />
          </div>
          <div className="d-flex">
            <div>
              <Text.HEADING_S style={{ color: color.PRIMARY_100 }}>
                4.0
              </Text.HEADING_S>
            </div>
            <div>
              <Text.SUBHEADING_S style={{ color: color.NEUTRAL_60 }}>
                / 5.0
              </Text.SUBHEADING_S>
            </div>
          </div>
        </div>
        <div>
          <Text.BODY_S style={{ color: color.NEUTRAL_60 }}>
            21 Jan 2022
          </Text.BODY_S>
        </div>
      </div>
      <div style={{ marginTop: "24px" }}>
        <Text.BODY_M
          style={{
            color: color.NEUTRAL_80,
            height: "70px",
            overflow: "hidden",
          }}
        >
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat
          perspiciatis autem maiores itaque eos natus accusamus, placeat quos
          sed culpa cupiditate repellendus atque dolores? Dolor recusandae
          possimus dignissimos corporis rem neque nulla velit, ex incidunt
          soluta, eligendi voluptate cum sed molestias ut pariatur obcaecati
          totam. Rerum aperiam officiis odio provident!
        </Text.BODY_M>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: ${({ width }) => (width ? "100%" : "456px")};
  height: 200px;
  background: ${color.PRIMARY_10};
  border-radius: 8px;
  padding: 24px;
  overflow: hidden;
`;

ReviewAndRating.defaultProps = {};

ReviewAndRating.propTypes = {
  key: PropTypes.number,
  width: PropTypes.bool,
};
