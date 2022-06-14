import React from "react";
import { IdxModalLanding } from "../../../../component/1.LANDINGPAGE";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Text, color, Button } from "../../../../component/1.LANDINGPAGE/style";
import { Card } from "../../../../component/1.LANDINGPAGE";
import { LogoM } from "../../../../asset";
import { Times } from "@styled-icons/fa-solid";

export const ModalRatingAndReview = (props) => {
  return (
    <IdxModalLanding show={props.show} onHide={props.onHide} size="lg">
      <Container>
        <div className="header">
          <div className="header-left d-flex">
            <div>
              <img src={LogoM} alt="" />
            </div>
            <Text.HEADING_L>4.9</Text.HEADING_L>
            <Text.SUBHEADING_M style={{ color: color.NEUTRAL_80 }}>
              (From 13 reviews)
            </Text.SUBHEADING_M>
          </div>
          <div className="header-right d-flex align-items-center justify-content-center">
            <Button.GhostButton XL onClick={props.onHide}>
              <Times width={15} />
            </Button.GhostButton>
          </div>
        </div>

        <div className="content">
          {[2, 2, 2, 2, 2, 2].map((item, idx) => (
            <div className="container-card" key={idx}>
              <Card.ReviewAndRating width />
            </div>
          ))}
        </div>
      </Container>
    </IdxModalLanding>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 112px;

    .header-left {
      align-items: center;
      justify-content: space-between;
    }

    ${Text.HEADING_L} {
      color: ${color.PRIMARY_100} !important;
      margin: 0px 10px;
    }
  }

  .content {
    .container-card {
      margin-bottom: 24px;
    }
  }
`;

ModalRatingAndReview.defaultProps = {
  show: false,
};

ModalRatingAndReview.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func,
};
