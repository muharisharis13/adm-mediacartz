import styled from "styled-components"
import { COLOR_SECONDARY } from "../style/content/default"


export const Container = styled.div `
display:flex;
flex-direction:column;
background-color: red;
`
export const HeaderTab = styled.section `
display:flex;
background-color: yellow;
justify-content:center;
align-items:center
`

export const HeaderTabText = styled.div `
width:100%;
text-align:center;
padding:5px 0px;
border:1px solid #ccc;
cursor:pointer;
transition:250ms;
font-weight:600;
background: ${({active})=>active ? COLOR_SECONDARY : "transparent"};
color: ${({active})=>active ? "#fff" : "#000"};

&:hover{
  background: ${COLOR_SECONDARY};
  color:#fff;
}

&:first-child{
  border-right:0;
  border-radius:100px 00px 00px 100px;
}
&:last-child{
  border-left:0;
  border-radius:00px 100px 100px 00px;
}
`

export const ContentTab = styled.section `
/* background: blue; */
margin-top:5px;
`

export const ContainerContentTab = styled.div `
display: ${({active})=> active ? "block" : "none"};
margin-top:10px;
`