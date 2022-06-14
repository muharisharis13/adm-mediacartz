import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { COLOR_SECONDARY } from "../style/content/default";

const CardRetailStatistic = ({title, active, children}) =>{
return (
  <Containter className="container" active={active}>
    <ContainerRow1 active={active}>
      <div className="text-center">
        <h5>
          <strong>{title}</strong>
        </h5>
      </div>
      { children }
    </ContainerRow1>
    <DivButton>
      <strong>Lihat Detail</strong>
    </DivButton>
  </Containter>
)
}

const TextPrice = styled.div `

font-size:1.1rem;

`

const DivButton = styled.div `
background-image: linear-gradient(to right, #64b3c1, #7c71d5);
color:#fff;
display:flex;
width:100%;
border-radius: 0px 0px 6px 6px;
align-items:center;
justify-content:center;
padding:10px;
cursor:pointer;
transition: 250ms;

&:hover{
  background-image: linear-gradient(to left, #64b3c1, #7c71d5);

}
`

const ContainerRow1 = styled.div `
padding-top:20px;
display:flex;
flex-direction: column;
width:100%;
border-bottom:${({active})=> active ? `1px solid #ccc`: `1px solid transparent`};
`

const Containter = styled.div `
background:${({active})=>active ? `linear-gradient(to right, #64b3c1, #7c71d5)`:`#fff`};
border-radius: 6px;
box-shadow: 0px 3px 6px rgb(0 0 0 / 16%) !important;
display:flex;
flex-direction:column;
justify-content: center;
align-items:center;
padding:0;
width:100%;

color:${({active})=> active ? `#fff`: COLOR_SECONDARY};

&:hover{
  background-image: linear-gradient(to left, #64b3c1, #7c71d5);

  color:#fff;
}
`

export default CardRetailStatistic