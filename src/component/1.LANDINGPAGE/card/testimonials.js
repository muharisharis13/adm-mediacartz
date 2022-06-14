import React from 'react';
import PropTypes from "prop-types";
import styled from "styled-components";
import {color,Text} from "../style";

export const Testimonials = (props) => {
  return (
    <Container>
      <div>
        <Text.HEADING_M style={{color:color.NEUTRAL_80, wordBreak:"break-word"}}>
            {props.title}
        </Text.HEADING_M>
      </div>
      <div style={{marginTop:"16px"}}>
        <Text.BODY_M style={{color:color.NEUTRAL_80}}>
          {props.content}
        </Text.BODY_M>
      </div>
      <div style={{marginTop:"24px"}} className="d-flex justify-content-center align-items-center">
        <ImgCard src={props.img_profile} alt={props.img_profile} />
      </div>
      <div style={{marginTop:"16px", textAlign:"center"}}>
        <Text.HEADING_S>
          {props.name}
        </Text.HEADING_S>
      </div>  
    </Container>
  )
};

const ImgCard = styled.img `
width:80px;
height:80px;
object-fit:cover;
border-radius:100px;
`


const Container = styled.div `
width: 384px;
overflow: hidden;
border-radius: 8px;
background:${color.PRIMARY_10};
padding:24px;
display:flex;
flex-direction: column;
cursor:default;
transition:300ms;
&:hover{
  transform:translateY(-15px);
}

@media (max-width:1440px){
  width:350px;
};
`


Testimonials.defaultProps = {
title : " Vice President Panin Bank",
content :"Bekerja sama dengan Mediacartz dalam memasarkan salah satu produk dari usaha kami adalah pilihan yang tepat. Selain membantu kami dalam ekspansi usaha, juga tingkat responsif pelayanan yang sangat mudah, cepat, dan kooperatif. Harapan kami, usaha kami akan berkembang dengan cepat Bersama dengan mediacartz. Maju Terus!",
img_profile : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
name: "John Doe"
};

Testimonials.propTypes = {
title : PropTypes.string.isRequired,
content: PropTypes.string.isRequired,
img_profile: PropTypes.string.isRequired,
name : PropTypes.string.isRequired
}
