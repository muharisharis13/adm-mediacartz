import React,{useState} from 'react'
import styled from "styled-components";


const Tags = (props:{state:Array,setState:any}) => {
  const {state,setState} = props
  const [value,setValue] = useState("")
  const onSubmit = (e) =>{
    if(e.key === "Enter"){
      setState(state=>([...state,e.target.value]));
      setValue("");
    }
  }

  const Delete = (index) =>{
    setState(state.filter((filter,idx) => idx !== index))
  }
  return (
    <Container>
      {
        state.map((item:any,idx:number)=>(
          <div className="tags" key={idx}>
            <span>
              {item}
            </span>
            <span className="button" onClick={()=>Delete(idx)}>x</span>
          </div>
        ))
      }
      <div  className="wrap-input">
        <input type="text" placeholder="input tags" value={value} onKeyDown={(e)=>onSubmit(e)} onChange={(e)=>setValue(e.target.value)} />
      </div>
    </Container>
  )
}

export default Tags;


Tags.defaultProps ={
  state:[]
}

const Container = styled.div `

.wrap-input{
  input{
    border:none;
    padding:5px;
    &:focus{
      outline:none;
    }
  }
}

.tags{
  border:thin solid #ddd;
  background-color:#ccc;
  color:#000;
  display:flex;
  align-items:center;
  padding:5px;
  grid-gap:10px;
  border-radius:2px;
  .button{
    display:flex;
    border:none;
    background-color: #ccc;
    border-radius:100px;
    width:20px;
    height:20px;
    font-weight:600;
    align-items:center;
    justify-content: center;
    cursor:pointer;
  }
}

grid-gap:10px;
border:thin solid #ddd;
display:flex;
align-items: center;
padding:3px;
flex-wrap:wrap;
`