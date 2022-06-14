import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { color, effect } from "../../style";
import AdvertisingIcon from "../../../../asset/icon/advertising3.svg";
import EventIcon from "../../../../asset/icon/event.svg";
import ProtalIcon from "../../../../asset/icon/portal.svg";
import PieIcon from "../../../../asset/icon/pie-chart.svg";
import PubAdsIcon from "../../../../asset/icon/publisher_ads.svg";
import { Button } from "../../../../component/1.LANDINGPAGE/style";
import { Context } from "../../../../service";

const data_nav = [
  {
    name: "Advertising",
    icon: AdvertisingIcon,
    active: true,
  },
  {
    name: "Event",
    icon: EventIcon,
    active: false,
  },
  {
    name: "Portal",
    icon: ProtalIcon,
    active: false,
  },
  {
    name: "CRM",
    icon: PieIcon,
    active: false,
  },
  {
    name: "Publisher Ads",
    icon: PubAdsIcon,
    active: false,
  },
];

export const IdxNav = (props) => {
  const { json_nav } = props;
  const [nav_active, setNav_active] = useState({
    name: "",
  });
  const [nav_active2, setNav_active2] = useState("");
  const [nav_active3, setNav_active3] = useState("");
  const [nav_active4, setNav_active4] = useState("");
  const [json_nav2, setJson_nav2] = useState([]);
  const [json_nav3, setJson_nav3] = useState([]);
  const [json_nav4, setJson_nav4] = useState([]);
  const { dispatch } = useContext(Context);

  const BtnActive = ({ name }) => {
    setNav_active((state) => ({ ...state, name: name }));
    setJson_nav2(
      json_nav.find((filter) => filter.title === name).section_category
    );
    setNav_active2("");
    setJson_nav3([]);
    setJson_nav4([]);
    dispatch({ type: "SET_CONTENT", content: {} });
  };

  const BtnActive2 = (name) => {
    setNav_active2(name);
    setJson_nav3(
      json_nav2.find((find) => find.title === name)?.section_sub_category
    );
    setNav_active3("");
    setJson_nav4([]);
    dispatch({ type: "SET_CONTENT", content: {} });
  };

  const BtnActive3 = (name) => {
    setNav_active3(name);
    setJson_nav4(
      json_nav3.find((find) => find.title === name)?.section_channel_inventory
    );
    setNav_active4("");
    dispatch({ type: "SET_CONTENT", content: {} });
  };

  const BtnActive4 = (name) => {
    setNav_active4(name);
    dispatch({
      type: "SET_CONTENT",
      content: json_nav4.find((find) => find.title === name).content,
    });
  };

  return (
    <div style={{ width: "536px" }}>
      <div style={{ marginBottom: "0px" }}>
        <Container>
          <Nav>
            <div className="d-flex justify-content-between">
              {json_nav.map((item, idx) => (
                <ContainerNavText
                  key={idx}
                  active={nav_active.name === item.title ? true : false}
                  onClick={() => BtnActive({ name: item.title })}
                >
                  <div>
                    {nav_active.name === item.title && (
                      <img src={item.icon} alt="icon" />
                    )}{" "}
                    &nbsp;
                    {item.title}
                  </div>
                </ContainerNavText>
              ))}
            </div>
          </Nav>
        </Container>
      </div>

      <div
        style={{
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* {console.log(
          "ini dia",
          json_nav.find((filter) => filter.title === nav_active.name)
        )} */}
        <Container2>
          {json_nav2 &&
            json_nav2.map((item, idx) => (
              <ContainerNav2
                key={idx}
                active={item.title === nav_active2}
                onClick={() => BtnActive2(item.title)}
              >
                {item.title}
              </ContainerNav2>
            ))}
          {/* <ContainerNav2>Digital Signage</ContainerNav2>
          <ContainerNav2>TV & Radio</ContainerNav2>
          <ContainerNav2>KOL</ContainerNav2> */}
        </Container2>
        <Container3>
          {json_nav3 &&
            json_nav3.map((item, idx) => (
              <ContainerNav3
                active={item.title === nav_active3}
                key={idx}
                onClick={() => BtnActive3(item.title)}
              >
                {item.title}
              </ContainerNav3>
            ))}
          {/* <ContainerNav3>
            LBA
          </ContainerNav3>
          <ContainerNav3>
            Broadcast
          </ContainerNav3>
          <ContainerNav3>
            API
          </ContainerNav3> */}
        </Container3>
      </div>

      <div style={{ marginTop: "32px" }}>
        <Container4>
          {json_nav4 &&
            json_nav4.map((item, idx) => (
              <ContainerNav4
                small
                rounded
                active={item.title === nav_active4}
                key={idx}
                onClick={() => BtnActive4(item.title)}
              >
                <i className="icon-bookmark" />
                {item.title}
              </ContainerNav4>
            ))}
          {/* <ContainerNav4 small rounded>
            <i className="icon-bookmark" />
            SMS
          </ContainerNav4> */}
        </Container4>
      </div>
    </div>
  );
};

const ContainerNav4 = styled(Button.ButtonSecondary)`
  margin: 0px 15px;
  ${({ active }) =>
    active &&
    `
  background:${color.PRIMARY_100};
  color:${color.PRIMARY_10};
  `};

  &:hover {
    color: ${color.PRIMARY_100};
  }
`;

const Container4 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContainerNav3 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 26px 40px;
  width: 100%;
  height: 72px;
  background: ${({ active }) => (active ? color.PRIMARY_100 : color.NEUTRAL_0)};
  border-radius: 36px 36px 36px 36px;
  cursor: pointer;

  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  /* identical to box height, or 143% */

  letter-spacing: -0.02em;

  /* Primary 10 */

  color: ${({ active }) => (active ? color.PRIMARY_10 : color.NEUTRAL_60)};

  &:first-child:last-child {
    border-radius: 36px;
  }
  &:not(:first-child):not(:last-child) {
    border-radius: 0px 0px 0px 0px;
  }
  &:first-child {
    border-radius: 36px 0px 0px 36px;
  }
  &:last-child {
    border-radius: 0px 36px 36px 0px;
  }

  transition: 300ms;
  &:hover {
    background: ${color.PRIMARY_10};
    color: ${color.PRIMARY_80};
  }
`;
const Container3 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${effect.DROP_SHADOW_CARD};
  border-radius: 36px 36px 36px 36px;
  width: 100%;
`;

const ContainerNav2 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 8px 16px;
  background: ${({ active }) => (active ? color.PRIMARY_20 : color.NEUTRAL_0)};
  border-radius: 8px 8px 0px 0px;
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  cursor: pointer;

  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.02em;
  color: ${({ active }) => (active ? color.PRIMARY_100 : color.NEUTRAL_60)};
  transition: 300ms;

  &:first-child {
    border-radius: 8px 0px 0px 0px;
  }
  &:last-child {
    border-radius: 0px 8px 0px 0px;
  }
  &:not(:first-child):not(:last-child) {
    border-radius: 0px 0px 0px 0px;
  }

  &:hover {
    background: ${color.PRIMARY_10};
    color: ${color.PRIMARY_80};
  }
`;

const Container2 = styled.div`
  display: flex;
  width: calc(100% - 26%);
  justify-content: center;

  border-radius: 8px 8px 0px 0px;
  ${effect.DROP_SHADOW_CARD};
`;

const ContainerNavText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 3px solid transparent;
  padding-bottom: 5px;

  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  text-align: center;
  letter-spacing: -0.02em;
  transition: 300ms;
  ${({ active }) =>
    active
      ? `
    border-bottom: 3px solid ${color.PRIMARY_100};
    color:${color.PRIMARY_100};
  `
      : `
    border-bottom: 3px solid transparent;
    color:${color.PRIMARY_70};
  `};

  &:hover {
    color: ${color.PRIMARY_100};
  }
`;

const Nav = styled.nav`
  position: absolute;
  bottom: 0;
  right: auto;
  left: auto;
  width: 86%;
`;

const Container = styled.div`
  display: flex;
  position: relative;
  height: 50px;
  background: ${color.PRIMARY_10};
  ${effect.DROP_SHADOW_CARD};
  border-radius: 0px 0px 40px 40px;
  padding: 0px 35px;
  overflow: hidden;
`;

IdxNav.propTypes = {
  json_nav: PropTypes.any,
};

IdxNav.defaultProps = {};
