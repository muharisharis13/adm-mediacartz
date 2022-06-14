import styled from "styled-components";
import {
  COLOR_HOVER_PRIMARY,
  COLOR_PRIMARY,
  COLOR_WHITE,
} from "../../../../component/style/content/default";
import { Mobile_query, Tablet_query } from "../../../../util/Query";
import { Link } from "react-router-dom";

export const ContainerLogin = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100vw;
  width: 100%;
  min-height: 100vh;
  flex-direction: column;
  margin: auto;
`;
export const ImgLogo = styled.img`
  max-width: 100px;
  object-fit: contain;
  width: 100%;
`;

export const TitleLogin = styled.div`
  color: #3b3e98;
  font-size: 20pt;
`;

export const FormContainerLogin = styled.form`
  border: 0.5px solid #ccc;
  padding: 30px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  border-radius: 7px;

  ${Tablet_query} {
    width: 50vw;
  }

  ${Mobile_query} {
    width: 85vw;
  }
`;

export const FormInputLogin = styled.div`
  margin-bottom: 30px;
  width: 100%;
  /* background:red; */
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ButtonLogin = styled.button`
  border: none;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: linear-gradient(
    90deg,
    rgba(46, 56, 148, 1) 0%,
    rgba(46, 56, 148, 1) 35%,
    rgba(45, 187, 236, 1) 100%
  );
  color: ${COLOR_WHITE};
  padding: 10px 20px;
  border-radius: 7px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.5s;
  width: 100%;
  font-size: 14pt;

  /*
&:hover{
  background: linear-gradient(90deg, rgba(45,187,236,1) 0%, rgba(45,187,236,1) 35%, rgba(46,56,148,1) 100%);

} */
`;

export const InputLogin = styled.input`
  background-color: transparent !important;
  border: 1px solid #ccc;
  padding: 10px 20px;
  width: 100%;
  &:focus {
    outline: none;
  }
`;

export const ContainerSignInGoogle = styled.div`
  display: flex;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  border: 1px solid #fff;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 25%);
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
`;

export const ImgIconGoogle = styled.img`
  object-fit: contain;
  width: 30px;
`;

export const TextSignGoogle = styled.div`
  font-weight: 600;
  color: #757575;
`;

export const ContainerOr = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 30px;
`;

export const LineLogin = styled.span`
  width: 100%;
  height: 1px;
  background: #ccc;
`;

export const TextP = styled.p`
  padding: 0px 10px;
  font-weight: 500;
  color: #757575;
  font-size: 10pt;
`;

export const ButtonRegister = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: ${COLOR_PRIMARY};
  color: ${COLOR_WHITE};
  padding: 7px 20px;
  border-radius: 7px;
  font-weight: 550;
  cursor: pointer;
  transition: 200ms;
  text-decoration: none;

  &:hover {
    color: #fff;
    background-color: ${COLOR_HOVER_PRIMARY};
  }
`;
