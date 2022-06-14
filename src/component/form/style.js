import styled from "styled-components";
import { Mobile_query, Tablet_query } from "../../util/Query";

export const ContainerForm = styled.div`
  background: #fff;
  /* border:1px solid #ccc; */
  border-radius: 7px;
  padding: 40px 20px;
  box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.34);

  ${Tablet_query} {
    overflow-x: auto;
  }

  /* ${Mobile_query}{
  overflow-x: auto;
} */
`;
