import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import SearchIcon from "../../../asset/icon/search-white.svg";
import {
  color,
  effect,
  Text,
  Container_comp,
  Button,
} from "../../../component/1.LANDINGPAGE/style";
import { ArrowRight } from "@styled-icons/heroicons-solid";
import { IconClock } from "../../../asset";
import { Link } from "react-router-dom";

export const IdxSearch = (props) => {
  const [focused, setFocused] = useState(false);

  return (
    <Container>
      <ContainerInputSearch onMouseLeave={() => setFocused(false)}>
        <Input
          navbar={props.navbar}
          type="text"
          placeholder={props.placeholder}
          onFocus={() => setFocused(true)}
          focused={focused}
        />
        <ButtonSearch type="submit" focused={focused}>
          <ImgIcon src={SearchIcon} alt="Search" />
        </ButtonSearch>
      </ContainerInputSearch>

      <ContainerSugestion
        focused={focused}
        onMouseEnter={() => setFocused(true)}
        onMouseLeave={() => setFocused(false)}
        className="container-sugestion"
        navbar={props.navbar}
      >
        <Link
          to="/home/recomendations"
          style={{ textDecoration: "none !important" }}
        >
          <div className="our-recomended">
            <Text.HEADING_S
              className="d-flex"
              style={{ color: color.PRIMARY_100 }}
            >
              <i className="icon-star" />
              Our recommendation for you
            </Text.HEADING_S>
            <div>
              <ArrowRight width={20} color={color.PRIMARY_100} />
            </div>
          </div>
        </Link>

        <Container_comp.rectangle_55 className="container-your-favorite">
          <Text.HEADING_S>Your favorite</Text.HEADING_S>
          <div className="d-flex container-button">
            {[1, 1, 1, 1, 1].slice(0, props.navbar ? 5 : 3).map((item, idx) => (
              <Button.ButtonSecondary
                medium
                rounded
                style={{ color: color.PRIMARY_100 }}
                key={idx}
              >
                <i className="icon-bookmark" />
                Favorite {idx}
              </Button.ButtonSecondary>
            ))}
          </div>
        </Container_comp.rectangle_55>

        <Container_comp.rectangle_55 className="container-recent-search">
          <Text.HEADING_S>Recent Search</Text.HEADING_S>

          <div className="d-block" style={{ marginTop: "12px" }}>
            {[1, 1, 1].map((item, idx) => (
              <Text.BODY_M
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: color.NEUTRAL_80,
                  marginBottom: "10px",
                  cursor: "pointer",
                }}
              >
                <img src={IconClock} /> &nbsp; History {idx}
              </Text.BODY_M>
            ))}
          </div>
        </Container_comp.rectangle_55>
      </ContainerSugestion>
    </Container>
  );
};

const ImgIcon = styled.img``;
const ButtonSearch = styled.button`
  overflow: hidden;
  background-color: ${color.PRIMARY_100};
  border: 1.5px solid transparent;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  position: absolute;
  right: 8px;
  top: 8px;
  color: ${color.PRIMARY_10};
  transition: 300ms;
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;

  &:focus-visible {
    border: none;
    box-shadow: none;
  }

  ${({ focused }) =>
    focused &&
    `
&::after{
  content: " Search";
};
width: 113px;
`}
`;

const Input = styled.input`
  border: none;
  background-color: ${color.NEUTRAL_0};
  border-radius: 36px;
  padding-top: 16px;
  padding-bottom: 16px;
  padding-left: 18px;
  padding-right: 50px;
  width: 100%;
  /* width: ${({ navbar }) => (navbar ? "840px" : "840px")}; */
  border: 1.5px solid transparent;
  caret-color: ${color.INTERACTIVE_100};
  padding-right: ${({ focused }) => focused && "125px !important"};
  transition: 300ms;

  @media (min-width: 1441px) {
    width: 100%;
  }

  ${Text.BODY_S};

  &::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;

    color: ${color.NEUTRAL_60};
  }

  &:focus-visible {
    border: 1.5px solid ${color.PRIMARY_100};
  }

  &:focus {
    border: 1.5px solid ${color.PRIMARY_100};
    outline: none;
  }
`;

const ContainerSugestion = styled.div`
  position: absolute;
  width: ${({ navbar }) => (navbar ? "840px" : "536px")};

  @media (min-width: 1441px) {
    width: 100%;
  }
  transition: 300ms;
  /* height: 704px; */
  background: ${color.NEUTRAL_0};
  top: 0;
  left: 0;
  z-index: 1;
  border-radius: 36px;
  padding-top: 70px !important;
  padding: 16px;

  transform-origin: 0% 0%;
  opacity: ${({ focused }) => (focused ? 1 : 0)};
  transform: ${({ focused }) => (focused ? "scaleY(1)" : "scaleY(0)")};
  visibility: ${({ focused }) => (focused ? "visible" : "hidden")};
  height: ${({ focused }) => (focused ? "auto" : "0px")};
  ${effect.DROP_SHADOW_CARD};

  .our-recomended {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 20px 24px;

    height: 64px;

    background: ${color.PRIMARY_20};
    border-radius: 36px;
  }

  ${Container_comp.rectangle_55} {
    background: ${color.NEUTRAL_0};
    border: 1px solid ${color.PRIMARY_20};
    padding: 24px;
    margin: 16px 0px;
    border-radius: 36px;
    overflow: hidden;

    ${Text.HEADING_S} {
      color: ${color.NEUTRAL_80};
    }

    .container-button {
      justify-content: space-evenly;
      align-items: center;
      margin-top: 24px;
    }
  } ;
`;

const ContainerInputSearch = styled.div`
  display: flex;
  position: relative;
  ${effect.DROP_SHADOW_CARD};
  border-radius: 36px;
  z-index: 2;
`;
const Container = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 36px;
  width: 848px;
`;

IdxSearch.propTypes = {
  placeholder: PropTypes.string,
  navbar: PropTypes.bool,
};

IdxSearch.defaultProps = {
  placeholder: "Search",
  navbar: false,
};
