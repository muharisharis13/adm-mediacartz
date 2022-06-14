import React, {useState} from 'react';
import PropTypes from "prop-types";
import styled from "styled-components";
import {ArrowIosDownwardOutline} from "@styled-icons/evaicons-outline";
import {Text,color} from "../style"

export const Accordion = (props) => {
  const [open, setOpen] = useState(false)
  return(
    <Container>
      <header onClick={()=>setOpen(!open)} className=' d-flex justify-content-between align-items-center' style={{cursor:"pointer",padding:"10px"}}>
        <Text.HEADING_M style={{color:color.NEUTRAL_80}}>
          <strong>{props.title}</strong>
        </Text.HEADING_M>
        <div>
          <IconArrow open={open} width={20} />
        </div>
      </header>

      {/* CONTENT=============== */}

      <ContainerCotent open={open}>
        {props.children}
      </ContainerCotent>

      {/* END CONTENT=============== */}
    </Container>
  )
};

const IconArrow = styled(ArrowIosDownwardOutline) `
transition:300ms;
transform: ${({open})=> open ? `rotate(180deg)` : `rotate(0deg)`};
`



const ContainerCotent = styled.div `
padding:10px;
transition:300ms;
transform-origin: 0% 0%;
opacity:${({open})=>open ? 1 : 0};
transform: ${({open})=> open ? "scaleY(1)" : "scaleY(0)"};
visibility: ${({open})=> open ? "visible" :"hidden"};
height: ${({open})=> open ? "100%" :"0px"};
`

const Container = styled.div `
border-top :thin solid #cccc;
border-bottom :thin solid #cccc;
transition:300ms;

&:not(:first-child):not(:last-child) {
  border-top:none ;
};
&:last-child{
  border-top:none;
}
`


Accordion.defaultProps = {
title : "TITLE",
children:"content"
};

Accordion.propTypes = {
title: PropTypes.string,
children : PropTypes.any
}
