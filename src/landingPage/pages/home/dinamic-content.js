import React, { useState } from "react";
import styled from "styled-components";
import { Card } from "../../../component/1.LANDINGPAGE";
import { color, Text, Button } from "../../../component/1.LANDINGPAGE/style";
import text from "../../../component/1.LANDINGPAGE/style/text";
import { FormatCurrency } from "../../../util";
import { ModalRatingAndReview } from "./component";
import { AccordionDinamicContent } from "./Accordion";

const ArrImage = [
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bmF0dXJlfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8bmF0dXJlfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1588392382834-a891154bca4d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fG5hdHVyZXxlbnwwfDB8MHx8&auto=format&fit=crop&w=500&q=60",
];

export const DinamicContent = (props) => {
  const { content } = props;
  const [modal, setModal] = useState({
    rating: false,
  });

  const handleModalRating = (type) => {
    switch (type) {
      case "open":
        setModal((state) => ({ ...state, rating: true }));
        break;
      case "close":
        setModal((state) => ({ ...state, rating: false }));
        break;

      default:
        break;
    }
  };

  return (
    <Container>
      {/* modal */}
      <ModalRatingAndReview
        show={modal.rating}
        onHide={() => handleModalRating("close")}
      />
      {/* modal */}

      <SectionContainer1>
        <div
          className="d-flex justify-content-between align-items-center"
          style={{ width: "70%" }}
        >
          <div>
            <Text.DISPLAY_M>{content?.title}</Text.DISPLAY_M>
          </div>
          <div className="d-flex">
            <Button.ButtonSecondary medium bulat_medium>
              <i className="icon-bookmark" />
            </Button.ButtonSecondary>
            <Button.ButtonSecondary
              medium
              bulat_medium
              style={{ marginLeft: "26px" }}
            >
              <i className="icon-share-2" />
            </Button.ButtonSecondary>
          </div>
        </div>
        {/* TODO:row image */}
        <div
          className="d-flex justify-content-baseline"
          style={{ marginTop: "28px", alignItems: "stretch" }}
        >
          <div style={{ width: "70%" }}>
            <div className="container-banner d-flex">
              <div style={{ width: "100%" }}>
                <BigImage src={ArrImage[0]} alt="" />
              </div>
              <div style={{ display: "block" }}>
                <ContainerChildImage>
                  <ChildImage src={ArrImage[1]} alt="1" />
                </ContainerChildImage>
                <ContainerChildImage>
                  <ChildImage2 src={ArrImage[2]} alt="1" />
                </ContainerChildImage>
                <ContainerChildImage>
                  <ChildImage3 src={ArrImage[3]} alt="1" />
                </ContainerChildImage>
              </div>
            </div>
          </div>
          <div
            style={{
              width: "30%",
              padding: "0 32px",
              display: "flex",
              alignItems: "baseline",
            }}
          >
            <div>
              <div className="d-flex" style={{ marginBottom: "16px" }}>
                <Button.ButtonPrimary
                  large
                  style={{
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <i className="icon-create" /> Let's Create!
                </Button.ButtonPrimary>
              </div>
              <div className="d-flex">
                <Button.ButtonSecondary
                  large
                  style={{
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <i className="icon-cs" /> Customer Service
                </Button.ButtonSecondary>
              </div>
            </div>
          </div>
        </div>
        {/* TODO:row image */}

        <div
          className="d-flex justify-content-between"
          style={{
            marginTop: "10px",
            width: "70%",
            alignItems: "stretch",
            marginBottom: "44px",
          }}
        >
          <div>
            <div
              className="d-flex"
              style={{ justifyContent: "stretch", alignItems: "stretch" }}
            >
              <div>
                <IconLogogramColor className="icon-logogram_color" />
              </div>
              <div>
                <text.HEADING_L style={{ color: color.PRIMARY_100 }}>
                  4.8
                </text.HEADING_L>
              </div>
            </div>
            <div>
              <text.SUBHEADING_S>(From 13 reviews)</text.SUBHEADING_S>
            </div>
          </div>
          <div>
            <div className="d-block">
              <div>
                <text.HEADING_L style={{ color: color.NEUTRAL_90 }}>
                  {FormatCurrency.currency(content?.harga)}
                </text.HEADING_L>
              </div>
              <div>
                <text.SUBHEADING_S>/ {content?.satuan}</text.SUBHEADING_S>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-start" style={{ width: "70%" }}>
          <div>
            <text.SUBHEADING_L style={{ color: color.NEUTRAL_80 }}>
              {content?.deskripsi}
            </text.SUBHEADING_L>
          </div>
        </div>

        <div
          className="d-block justify-content-start"
          style={{ width: "70%", marginTop: "56px" }}
        >
          {content.manfaat_dan_kelebihan &&
            content?.manfaat_dan_kelebihan?.map((item, idx) => (
              <div
                className="d-flex"
                key={idx}
                style={{
                  alignItems: "center",
                  justifyContent: "stretch",
                  marginBottom: "24px",
                }}
              >
                <div>
                  <img src={item.icon} alt="" width={32} />
                </div>
                <div style={{ marginLeft: "10px" }}>
                  <div>
                    <text.HEADING_S style={{ color: color.NEUTRAL_90 }}>
                      {item.text}
                    </text.HEADING_S>
                  </div>
                  {item.small_text && (
                    <div>
                      <text.SUBHEADING_S style={{ color: color.NEUTRAL_60 }}>
                        {item.small_text}
                      </text.SUBHEADING_S>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </SectionContainer1>

      <SectionContainer2>
        {/* RATING AND VIEWS */}
        <div>
          <div>
            <text.HEADING_M style={{ color: color.NEUTRAL_80 }}>
              Ratings and Reviews
            </text.HEADING_M>
          </div>
          <div
            className="d-flex"
            style={{ justifyContent: "stretch", alignItems: "center" }}
          >
            <div style={{ marginRight: "8px" }}>
              <IconLogogramColor className="icon-logogram_color" />
            </div>
            <div style={{ marginRight: "8px" }}>
              <text.HEADING_M style={{ color: color.PRIMARY_100 }}>
                4.8
              </text.HEADING_M>
            </div>
            <div style={{ marginRight: "8px" }}>
              <text.SUBHEADING_S style={{ color: color.NEUTRAL_80 }}>
                (13 Reviews)
              </text.SUBHEADING_S>
            </div>
          </div>
        </div>

        <div className="d-flex" style={{ marginTop: "20px", flexWrap: "wrap" }}>
          {[2, 2].map((item, idx) => (
            <ContainerReviewAndRating key={idx}>
              <Card.ReviewAndRating />
            </ContainerReviewAndRating>
          ))}
        </div>
        <div
          style={{ marginTop: "32px" }}
          className="d-flex justify-content-end align-items-end"
        >
          <Text.BUTTON_L
            style={{ color: color.INTERACTIVE_100, cursor: "pointer" }}
            onClick={() => handleModalRating("open")}
          >
            See All Reviews
          </Text.BUTTON_L>
        </div>
        {/* END RATING AND VIEWS ======== */}

        {/* ACCORDION================== */}
        <div style={{ marginTop: "100px" }}>
          <AccordionDinamicContent
            simulasi_visual={content?.simulasi_visual}
            syarat_membuat_iklan={content?.syarat_membuat_iklan}
          />
        </div>
        {/* END ACCORDION================== */}
      </SectionContainer2>
    </Container>
  );
};

const ContainerReviewAndRating = styled.div`
  margin-right: 24px;
  margin-top: 24px;
`;

const IconLogogramColor = styled.i`
  font-size: 40px;
  margin-top: 0;
  display: flex;
`;

const ContainerChildImage = styled.div`
  margin: 8.42px 0px;

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const ChildImage = styled.img`
  width: 168px;
  height: 157px;
  object-fit: cover;
  border-radius: 0 8px 0px 0;
`;
const ChildImage2 = styled.img`
  width: 168px;
  height: 157px;
  object-fit: cover;
  border-radius: 0;
`;
const ChildImage3 = styled.img`
  width: 168px;
  height: 157px;
  object-fit: cover;
  border-radius: 0 0 8px 0;
`;

const BigImage = styled.img`
  object-fit: cover;
  width: calc(100% - 8.42px);
  height: 488px;
  border-radius: 8px 0px 0px 8px;
`;

const SectionContainer2 = styled.section`
  padding: 72px 10vw;
  overflow: hidden;
`;
const SectionContainer1 = styled.section`
  padding: 72px 10vw;
  background-color: ${color.PRIMARY_10};
`;

const Container = styled.div``;

DinamicContent.defaultProps = {};

DinamicContent.propTypes = {};
