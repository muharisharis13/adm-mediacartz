import styled from "styled-components";
import { Mobile_query, Tablet_query } from "../../../util/Query";

export const COLOR_WHITE = "#FFFF";
export const COLOR_GRAY = "#CCC";
export const COLOR_PRIMARY = "#669dcc";
export const COLOR_HOVER_PRIMARY = "#7BA8CF";
export const COLOR_DANGER = "#ff1919";
export const COLOR_HOVER_DANGER = "#ff4747";

export const COLOR_SECONDARY = "#2dbded";
export const COLOR_HOVER_SECONDARY = "#85DDFB";
export const COLOR_COKLAT = "#733C3C";

export const MARGIN_PRIMARY = "50px";
export const MARGIN_SECOND = "30px";
export const MARGIN_THRIRD = "15px";

export const HeaderPrimary = styled.h1`
  font-weight: 500;
  font-size: 22pt;
  color: ${({ color }) => (color ? color : "")};
`;
export const HeaderSecondary = styled.h2`
  font-weight: 500;
  font-size: 20pt;
  color: ${({ color }) => (color ? color : "")};
`;
export const HeaderThird = styled.h5`
  font-weight: 500;
  color: ${({ color }) => (color ? color : "")};
`;

export const ContainerContent = styled.div`
  /* margin: 2vh 7vw; */
  @media screen and (min-width: 1408px) {
    max-width: 1344px;
  }

  /* @media screen and (min-width: 1216px) {
    max-width: 1152px;
  }

  @media screen and (min-width: 1024px) {
    max-width: 960px;
  } */
  flex-grow: 1;
  margin: 0 auto;
  position: relative;
  width: 96%;
  padding-bottom: 50px;

  /* ${Mobile_query}{
  overflow-x: auto;
} */
`;

export const ButtonPrimary = styled.button`
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: ${COLOR_PRIMARY};
  color: ${COLOR_WHITE};
  padding: 7px 20px;
  border-radius: 5px;
  font-weight: 550;
  cursor: pointer;
  transition: 200ms;

  ${({ margin }) => margin};

  &:hover {
    background-color: ${COLOR_HOVER_PRIMARY};
  }

  ${Mobile_query} {
    font-size: 10pt;
  }
  ${Tablet_query} {
    font-size: 10pt;
  }
`;

export const ButtonDanger = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: ${COLOR_DANGER};
  color: ${COLOR_WHITE};
  padding: 7px 20px;
  border-radius: 7px;
  font-weight: 550;
  cursor: pointer;
  transition: 200ms;

  ${({ margin }) => margin};

  &:hover {
    background-color: ${COLOR_HOVER_DANGER};
  }

  ${Mobile_query} {
    font-size: 10pt;
  }
  ${Tablet_query} {
    font-size: 10pt;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  ${Tablet_query} {
    width: 150vw;
  }
  ${Mobile_query} {
    width: 250vw;
    display: none;
  }
`;
export const Thead = styled.thead`
  text-align: center;
`;
export const Tbody = styled.tbody`
  text-align: center;
`;
export const Tr = styled.tr`
  &:hover {
    background: rgba(219, 219, 219, 0.5);
  }
`;
export const Td = styled.td`
  padding: 10px 10px;
  flex-wrap: wrap;
`;
export const Th = styled.th`
  border-bottom: 1px solid #ccc;
  padding: 10px 0px;
`;

export const TagStatus = styled.span`
  display: inline-flexbox;
  background: ${({ color_danger }) =>
    color_danger ? COLOR_DANGER : COLOR_HOVER_PRIMARY};
  color: #fff;
  align-items: center;
  justify-content: center;
  padding: 4px 10px;
  border-radius: 3px;
  font-weight: 600;
  transition: 200ms;
  border: 1px solid transparent;
  cursor: pointer;
  &:hover {
    border: 1px solid
      ${({ color_danger }) =>
        color_danger ? COLOR_DANGER : COLOR_HOVER_PRIMARY};
    background: transparent;
    color: #000;
  }
`;

export const ContainerMore = styled.span`
  position: absolute;
  z-index: 22;

  top: 25px;
  background: #fff;
  border: 1px solid #ccc;
  padding: 10px 10px;
  width: 200px;

  display: flex;
  flex-direction: column;
  max-width: 200px;

  transition: all 0.35s;
  transform-origin: 0% 0%;
  transform: ${({ show }) => (show ? "scaleY(1)" : "scaleY(0)")};
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
  opacity: ${({ show }) => (show ? "1" : "0")};

  ${Mobile_query} {
    position: absolute;
  }
`;

export const ListMore = styled.div`
  padding: 7px 0px;
  border-bottom: 0.5px solid #ccc;
  font-size: 10pt;
  cursor: pointer;
  box-sizing: border-box;
  text-align: left;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: rgba(219, 219, 219, 0.5);
  }
`;

export const Label = styled.label`
  color: ${({ color }) => (color ? color : "")};
`;

// DROPDOWN =================

export const DropdownContent = styled.div`
  /* display: none; */
  text-align: left;
  position: absolute;
  background-color: #f9f9f9;
  top: 40px;
  min-width: 160px;
  width: 250px;
  border: 1px solid #ccc;
  right: 0;
  border-radius: 5px;
  opacity: 0;
  transform: scaleY(0);
  transform-origin: 0% 0%;
  transition: all 0.35s;
  visibility: hidden;
  z-index: 999;
`;
export const Dropdown = styled.div`
  position: relative;
  display: inline-block;
  padding: 5px 10px;
  border-radius: 7px;
  cursor: pointer;

  &:hover ${DropdownContent} {
    /* display: block; */
    opacity: 1;
    transform: scaleY(1);
    visibility: visible;
    z-index: 999;
  }
`;
export const TitleDropdonw = styled.span`
  color: #fff;
`;
export const TextDropdownContent = styled.div`
  transition: 450ms;
  padding: 7px 16px;
  border-bottom: thin solid #ccc;
  text-align: left;
  font-size: 15px;

  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background: #ccc;
    color: #fff;
  }
`;

// DROPDOWN ================= END
