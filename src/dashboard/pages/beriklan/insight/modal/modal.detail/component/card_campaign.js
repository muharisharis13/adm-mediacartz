import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {COLOR_SECONDARY} from "../../../../../../../component/style/content/default"

export const Card_campaign = ({multi,title,value1,value2,active}) =>{
return (
  <Containter className="container" active={active}>
    <ContainerRow1 active={active}>
      <div className="text-center">
        <h5>
          <strong>{title}</strong>
        </h5>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <div className="text-center" style={{paddingLeft:"10px"}}>
          <TextPrice>{value1.number}</TextPrice>
          <p >{value1.text}</p>
        </div>
        {
          multi &&
        <div className="text-center" style={{paddingLeft:"10px"}}>
         <TextPrice>{value2.number}</TextPrice>
          <p >{value2.text}</p>
        </div>
        }
      </div>
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
width:95%;

color:${({active})=> active ? `#fff`: COLOR_SECONDARY};

&:hover{
  background-image: linear-gradient(to left, #64b3c1, #7c71d5);

  color:#fff;
}
`

Card_campaign.defaultProps = {
  multi:true,
  title: "Default",
  value1: {
    number:"1",
    text:"value1"
  },
  value2: {
    number:"2",
    text:"value2"
  }
}

Card_campaign.propTypes = {
  multi: PropTypes.bool,
  title: PropTypes.string,
  value1: PropTypes.object,
  value2: PropTypes.object
}