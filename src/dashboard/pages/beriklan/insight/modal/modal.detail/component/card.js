import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {COLOR_SECONDARY} from "../../../../../../../component/style/content/default"
import { FormatCurrency } from "../../../../../../../util";

export const Card = (props) =>{
return (
  <Containter className="container">
    <ContainerRow1>
      <div className="text-center" style={{color:COLOR_SECONDARY}}>
        <h5>
          <strong>TRANSAKSI</strong>
        </h5>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <div className="text-center">
          <TextPrice>{FormatCurrency.currency(props.saldo)}</TextPrice>
          <p style={{color:COLOR_SECONDARY}}>Saldo</p>
        </div>
        <div className="text-center">
          <TextPrice>{props.bucket}</TextPrice>
          <p style={{color:COLOR_SECONDARY}}>Bucket</p>
        </div>
      </div>
    </ContainerRow1>
    <DivButton>
      <strong>Lihat Daftar Transaksi</strong>
    </DivButton>
  </Containter>
)
}

const TextPrice = styled.div `
color:${COLOR_SECONDARY};
font-size:1.1rem;
`

const DivButton = styled.div `
background-image: linear-gradient(to right, #5fd0b1, #64b3c1);
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
  background-image: linear-gradient(to left, #5fd0b1, #64b3c1);

}
`

const ContainerRow1 = styled.div `
padding-top:20px;
display:flex;
flex-direction: column;
`

const Containter = styled.div `
background:#fff;
border-radius: 6px;
box-shadow: 0px 3px 6px rgb(0 0 0 / 16%) !important;
display:flex;
flex-direction:column;
justify-content: center;
align-items:center;
padding:0;
width:95%
`

/* Card.defaultProps = {
saldo : 0
} */

Card.propTypes = {
  saldo: PropTypes.number.isRequired,
  bucket: PropTypes.number.isRequired,
}