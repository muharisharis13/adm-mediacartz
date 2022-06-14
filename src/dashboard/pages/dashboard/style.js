import styled from "styled-components";
import {
  COLOR_HOVER_PRIMARY,
  COLOR_HOVER_SECONDARY,
  COLOR_PRIMARY,
  COLOR_SECONDARY,
} from "../../../component/style/content/default";
import { Mobile_query, Tablet_query } from "../../../util/Query";

export const Title = styled.p`
  font-weight: 700;
  color: ${COLOR_SECONDARY};
`;

export const ContainerCardSaldo = styled.div`
  /* border:1px solid #ccc; */
  padding: 20px 20px;
  background: #fff;

  box-shadow: 1px 5px 10px #ccc;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const ButtonCardSaldo = styled.div`
  display: flex;
  align-items: center;
  background: ${COLOR_SECONDARY};
  color: #fff;
  font-weight: 700;
  padding: 7px 10px;
  border-radius: 100px;
  transition: 400ms;
  cursor: pointer;
  justify-content: center;

  &:hover {
    background: ${COLOR_HOVER_SECONDARY};
  }
`;

export const TextSaldo = styled.span`
  font-weight: 700;
  font-size: 18pt;
  color: ${COLOR_SECONDARY};
`;

export const TextKuotaAktif = styled.p`
  color: ${COLOR_SECONDARY};
  flex-wrap: wrap;
`;

// CAMPAIGN ==================

export const ContainerCardCampaign = styled.div`
  /* border:1px solid #ccc; */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  /* padding:20px 0px; */
  box-shadow: 3px 4px 5px 0px rgba(0, 0, 0, 0.26);
  border-radius: 10px;
`;

export const ContainerTextDiv = styled.div`
  padding: 20px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  text-align: center;
`;

export const StrongTitleCardCampaign = styled.div`
  color: ${COLOR_SECONDARY};
  display: block;
  font-size: 20px;
  letter-spacing: 1px;
  margin-bottom: 5px;
  text-transform: uppercase;
  ${Tablet_query} {
    font-size: 15pt;
  }
  ${Mobile_query} {
    font-size: 15pt;
  }
`;
export const StrongNumberCardCampaign = styled.div`
  color: ${COLOR_SECONDARY};
  font-size: 18pt;
  font-weight: 600;
  text-transform: uppercase;
`;

export const ButtonCreateIklan = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 400;
  font-size: 11pt;
  padding: 10px 0px;
  border-radius: 0px 0px 10px 10px;
  cursor: pointer;

  background: rgb(100, 176, 194);
  background: linear-gradient(
    90deg,
    rgba(100, 176, 194, 1) 0%,
    rgba(103, 153, 207, 1) 100%
  );
  transition: 450ms;

  &:hover {
    background-color: ${COLOR_HOVER_PRIMARY};
  }
`;
