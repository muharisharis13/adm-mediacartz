import styled from "styled-components";
import {color,Text} from "../style"


export function Step(props){
  return(
    <Container onClick={props.onClick} >
      <StepWithArray active={props.active}>
        <Text.BUTTON_M className="angka" active={props.active}>{props.number}</Text.BUTTON_M>
      </StepWithArray>
      {
        props.arrow &&
          <Line className="line" active={props.active}></Line>
      }
    </Container>
  )
}
 const Container = styled.section `
display: flex;
align-items: center;
justify-content: center;
cursor:pointer;
`

const Line = styled.div `
width: 80px;
border-bottom: ${({active})=> active ? `2px solid ${color.PRIMARY_100}` : `2px solid ${color.PRIMARY_20}`};
transition:300ms;

`


const StepWithArray = styled.div `
background: ${({active})=> active ? color.NEUTRAL_100 :color.NEUTRAL_0};
border: ${({active})=> active ? `1.5px solid ${color.PRIMARY_100}` : `1.5px solid ${color.PRIMARY_20}`};
box-sizing: border-box;
width:40px;
height:40px;
border-radius:50%;
display: flex;
align-items:center;
justify-content: center;
&:hover{
  border: 1.5px solid ${color.PRIMARY_100};
}
  .angka{
    color:${({active})=> active ? color.NEUTRAL_0 : color.PRIMARY_100}
  }
`