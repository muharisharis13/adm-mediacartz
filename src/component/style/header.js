import { Link } from "react-router-dom";
import styled from "styled-components";
import { Mobile_query, Tablet_query } from "../../util/Query";
import {
  COLOR_PRIMARY,
  COLOR_WHITE,
  COLOR_GRAY,
  ContainerContent,
} from "./content/default";

export const Container = styled(ContainerContent)`
  padding: 2vh 0vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* border-bottom: 0.5px solid #ccc; */
  /* background-color: gray; */

  ${Mobile_query} {
    padding: 2vh 20px;
  }

  ${Tablet_query} {
    flex-direction: column;
  }
`;

export const ImgLogo = styled.img`
  width: 150px;
  object-fit: contain;
`;

export const SectionLogo = styled.section`
  display: flex;
  width: 100%;

  ${Mobile_query} {
    justify-content: space-between;
  }
`;

export const SectionUser = styled.section`
  display: flex;
  width: 100%;
  color: #737373;
  align-items: center;
  font-size: 11pt;
  cursor: pointer;
  justify-content: end;
  flex-direction: column;

  ${Mobile_query} {
    display: none;
  }
  ${Tablet_query} {
    display: none;
  } ;
`;

export const SectionCenter = styled.section`
  display: flex;
  /* background-color: red; */
  justify-content: center;
  align-items: center;
  width: 100%;

  ${Mobile_query} {
    display: none;
  }
`;

export const LinkNav = styled(Link)`
  color: ${({ pathname1 }) =>
    pathname1 === window.location.pathname ? "#737373" : "#737373"};
  text-decoration: none;
  margin: 0px 10px;
  padding: 7px 10px;
  border-radius: 5px;
  transition: 200ms;
  display: flex;
  align-items: center;
  background-color: ${({ pathname1 }) =>
    pathname1 === window.location.pathname ? "#ccc" : "transparent"};
  font-weight: ${({ pathname1 }) =>
    pathname1 === window.location.pathname ? "normal" : "normal"};

  &:hover {
    background-color: #ccc;
    color: #737373;
  }

  ${Tablet_query} {
    margin: 0px 5px;
  }
`;

export const SubMenu = styled.div`
  /* border:0.1px solid #ccc; */
  position: absolute;
  padding-bottom: 20px;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  font-weight: 11pt;
  line-height: 20pt;
  box-shadow: 0 8px 8px rgb(10 10 10 / 10%);
  background: #fff;
  border-radius: 7px;
  width: calc(70% * 2);
  right: 10px;
  z-index: 999;

  transition: all 0.35s;
  transform-origin: 0% 0%;
  transform: ${({ show }) => (show ? "scaleY(1)" : "scaleY(0)")};
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
  opacity: ${({ show }) => (show ? "1" : "0")};

  ${Tablet_query} {
    right: 10px;
  }
`;

export const SubMenuList = styled(Link)`
  font-size: 10pt;
  border-radius: 0px;
  cursor: pointer;
  padding: 5px 20px;
  margin: 0px 5px;
  text-decoration: none;
  color: #737373;
  &:hover {
    background-color: #ccc;
    color: #fff;
  }
`;

// MBOILE===============

export const SectionIconMenu = styled.section`
  display: none;
  ${Mobile_query} {
    display: unset;
  }
`;

export const ContainerMobile = styled.div`
  display: none;
  z-index: 2;
  ${Mobile_query} {
    display: flex;
    padding: 10px 10px;
    position: fixed;
    top: ${({ show }) => (show ? "0" : "-500vh")};
    transition: 400ms;
    left: 0;
    background: #ccc;
    width: 100%;
    height: 100vh;
    /* justify-content: center; */
    flex-direction: column;
    overflow: scroll;
  }
`;

export const ContainerIcon = styled.section`
  display: flex;
  align-items: flex-end;
  justify-content: end;
`;

export const ContainerNavigation = styled.section`
  display: flex;
  flex-direction: column;
  /* background:red; */
  margin-top: 20px;
  align-items: center;
  justify-content: center;
`;

export const LinkNavMobile = styled(Link)`
  text-decoration: none;
  color: #000;
  padding: 10px 0px;
  font-weight: 700;
  /* background:red; */
  display: flex;
  width: 100%;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

export const SubLinkNavMobile = styled(Link)`
  text-decoration: none;
  color: #000;
  margin: 5px 0px;
  font-size: 10.5pt;
`;

export const SectionSubNavMobile = styled.section`
  flex-direction: column;
  /* background:red; */
  align-items: center;
  justify-content: center;

  transition: all 0.35s;
  transform-origin: 0% 0%;
  display: ${({ show }) => (show ? "flex" : "none")};
  transform: ${({ show }) => (show ? "scaleY(1)" : "scaleY(0)")};
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
  opacity: ${({ show }) => (show ? "1" : "0")};
`;

/* TABLET VERSION */

export const SectionUser_tablet = styled.section`
  display: none;
  width: 100%;
  color: #737373;
  align-items: flex-end;
  font-size: 11pt;
  cursor: pointer;
  justify-content: end;
  flex-direction: column;

  ${Tablet_query} {
    display: flex;
  } ;
`;
