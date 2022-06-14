import React, {useState} from 'react';
import PropTypes from "prop-types";
import styled from "styled-components";
import {DownArrow} from "@styled-icons/boxicons-solid"

export const Accordion = (props) => {
  const [open, setOpen] = useState(true)

  return (
    <Container>
      {/* header */}
      <ContainerHeader onClick={()=>setOpen(!open)}>
        <strong>{props.header}</strong>
        <div>
          <IconArrow width={17} open={open} />
        </div>
      </ContainerHeader>
      {/* content */}
      <ContainerContent open={open}>
        {props.children}
      </ContainerContent>
    </Container>
  )
}

const IconArrow = styled(DownArrow) `
transition:300ms;
transform:${({open})=> open ? "rotate(180deg)" : "rotate(0deg)"}
`

const ContainerContent = styled.div `
background-color: #fff;
display:block;
padding:10px 20px;
transition:300ms;
transform-origin: 0% 0%;
opacity:${({open})=>open ? 1 : 0};
transform: ${({open})=> open ? "scaleY(1)" : "scaleY(0)"};
visibility: ${({open})=> open ? "visible" :"hidden"};
height: ${({open})=> open ? "100%" :"0px"};

border-radius:0px 0px 7px 7px;
`

const ContainerHeader = styled.div `
display:flex;
justify-content: space-between;
align-items: center;
background-image: linear-gradient(to right, #64b3c1, #7c71d5);
color:#fff;
padding:10px;
border-radius:7px 7px 0px 0px;
cursor:pointer;

&:hover{
  background-image: linear-gradient(to left, #64b3c1, #7c71d5);

}
`

const Container = styled.div `
display:block;
position:relative;
transition:300ms;
`

Accordion.propTypes = {
 header : PropTypes.string.isRequired,
}
