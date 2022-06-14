import styled, { css } from "styled-components";
import { color, effect } from "../style";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 32px;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 100%;
  position: fixed;
  z-index: 2;
  transition: 300ms;
  background: ${({ active }) => (active ? color.NEUTRAL_0 : color.NEUTRAL_0)};
  ${({ active }) =>
    active &&
    css`
      ${effect.DROP_SHADOW_CARD};
    `}
`;

export const Logo = styled.div`
  background-image: url("https://stmember.mediacartz.com/images/logo.svg");
  width: 144px;
  height: 36.22px;
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
`;

export const Container2 = styled.div`
  .text-link-nav {
    font-size: 15px;
    line-height: 28px;
    font-weight: 600;

    &:hover {
      color: ${color.INTERACTIVE_130};
    }
  }
  display: flex;
  gap: 32px;
  align-items: center;
`;
