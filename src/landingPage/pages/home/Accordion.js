import React, { useState } from "react";
import { Accordion, Step } from "../../../component/1.LANDINGPAGE";
import styled from "styled-components";
import { color, Text } from "../../../component/1.LANDINGPAGE/style";
import { ArrowIosDownwardOutline } from "@styled-icons/evaicons-outline";

export const AccordionDinamicContent = (props) => {
  const { simulasi_visual, syarat_membuat_iklan } = props;
  return (
    <section>
      <Accordion title="How To Make Ads">
        <HowToMakeAds data={simulasi_visual} />
      </Accordion>
      <Accordion title="Payment method">
        <MethoPayment />
      </Accordion>
      <Accordion title="How Your Ads Will Look Like">
        <LookLike />
      </Accordion>
      <Accordion title="Term And Conditions">
        <TermAndCondition data={syarat_membuat_iklan} />
      </Accordion>
    </section>
  );
};

function LookLike() {
  return (
    <ContainerLookLike>
      <div className="content"></div>
    </ContainerLookLike>
  );
}

const ContainerLookLike = styled.div`
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 488px;
  background-color: ${color.PRIMARY_10};

  .content {
    width: 408px;
    height: 440px;
    background: ${color.PRIMARY_20};
    border-radius: 8px;
  }
`;

function HowToMakeAds(props) {
  const { data } = props;
  const [active, setActive] = useState(0);

  return (
    <Container>
      <div className="d-flex">
        {data.map((item, idx) => (
          <Step.Step
            arrow={idx === 3 ? false : true}
            active={active === idx ? true : false}
            number={idx + 1}
            onClick={() => setActive(idx)}
          />
        ))}
      </div>

      <div className="wrapper-content">
        {data?.map(
          (item, idx) =>
            active === idx && (
              <div className="content">
                <Text.HEADING_S className="title">{item.title}</Text.HEADING_S>
                <div className="content-text">
                  <Text.BODY_M>{item.content}</Text.BODY_M>
                </div>
                <div className="content-image">
                  <img src={item.image} alt={item.image} />
                </div>
              </div>
            )
        )}
      </div>
    </Container>
  );
}

const Container = styled.section`
  .wrapper-content {
    margin-top: 25px;

    .content {
      display: flex;
      flex-direction: column;
      background-color: ${color.PRIMARY_10};
      width: 100%;
      padding: 16px;

      .title {
        color: ${color.PRIMARY_100};
      }

      .content-text {
        margin-top: 16px;

        div {
          color: ${color.NEUTRAL_80};
        }
      }

      .content-image {
        margin-top: 16px;

        img {
          width: 912px;
          height: 456px;
          object-fit: cover;
          border-radius: 8px;
        }
      }
    }
  }
`;

function TermAndCondition(props) {
  const { data } = props;
  return (
    <ContainerTerm>
      {data?.map((item, idx) => (
        <Text.BODY_M key={idx} className="content-term">
          {idx + 1}. {item.text}
          {item.small_text &&
            item?.small_text?.map((small, idx2) => (
              <div key={idx2} style={{ marginLeft: "30px" }}>
                {small.point}. {small.text}
              </div>
            ))}
        </Text.BODY_M>
      ))}
    </ContainerTerm>
  );
}

const ContainerTerm = styled.section`
  padding: 24px;
  background-color: ${color.PRIMARY_10};

  .content-term {
    color: ${color.NEUTRAL_80};
  }
`;

function MethoPayment() {
  return (
    <ContainerPayment>
      <div className="container-header">
        <Text.HEADING_S className="text-title">Method A</Text.HEADING_S>
        <span>
          <IconArrow width={20} />
        </span>
      </div>
    </ContainerPayment>
  );
}

const IconArrow = styled(ArrowIosDownwardOutline)`
  transition: 300ms;
  transform: ${({ open }) => (open ? `rotate(180deg)` : `rotate(-90deg)`)};
`;

const ContainerPayment = styled.div`
  .container-header {
    display: flex;
    justify-content: space-between;
    background: ${color.PRIMARY_10};
    padding: 16px 24px;
    cursor: pointer;

    .text-title {
      color: ${color.NEUTRAL_80};
    }
  }
`;
