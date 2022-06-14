import styled from 'styled-components'
import { COLOR_SECONDARY } from "../../../component/style/content/default"
import { Mobile_query, Tablet_query } from '../../../util/Query'



// SENDER ID=====================

export const DivDemoAccess = styled.div`
display: flex;
color:#fff;
background:#7575;
justify-content: center;
align-items:center;
flex-wrap:wrap;
border-radius: 5px;
`


// END SENDER ID ======================



//DAFTAR PENERIMA ==============

export const DropdownContent = styled.div`
  /* display: none; */
  position: absolute;
  background-color: #f9f9f9;
  top:40px;
  min-width: 160px;
  width:250px;
  z-index: 1;
  border:1px solid #ccc;
  left:0;
  border-radius:5px;
  opacity: 0;
  transform:scaleY(0);
  transform-origin:0% 0%;
  transition: all 0.35s;
  visibility: hidden;
`
export const Dropdown = styled.div`
position:relative;
display: inline-block;
background-color: ${COLOR_SECONDARY};
padding:5px 10px;
border-radius:7px;
cursor: pointer;


&:hover ${DropdownContent}{
  /* display: block; */
  opacity:1;
  transform:scaleY(1);
  
  visibility: visible;
}
`
export const TitleDropdonw = styled.span`

color:#fff;
`
export const TextDropdownContent = styled.div`
transition:450ms;
padding: 12px 16px;
&:hover{
  background:#ccc;
  color:#fff;

}
`

// END DAFTAR PENERIMA ==================




//DAFTAR API REQUEST ================


export const ContainerInput = styled.div`
display:flex;
flex-direction: column;
margin:0px 10px;

${Mobile_query}{
  margin-bottom:20px;
  width: 100%;
}
`

export const Input = styled.input`

border:1px solid #ccc;
padding:5px 0px;
padding-left:10px;
font-size:12pt;
&:focus{
  outline:none;
}

`

export const LabelInput = styled.label`
color:#757575;
`

export const DivContainerFormRow1 = styled.div`
display:flex;
align-items:center;
justify-content: center;
margin-bottom: 30px;
flex-direction: row;

${Mobile_query}{
  
 flex-wrap: wrap;
}

${Tablet_query}{
 flex-wrap: wrap;
}
`

export const DivContainerFormRow2 = styled.div`
${Mobile_query}{
  flex-direction: column;
  width:100%;
}
${Tablet_query}{
 flex-wrap: wrap;
}
`

export const DivContainerForm = styled.div`
border:2px solid ${COLOR_SECONDARY};
display:flex;
flex-direction: column;
align-items: center;
justify-content: center;
padding:15px 20px ;
border-radius:5px;



${Mobile_query}{
padding:15px 5px ;
}


`

export const BtnFilter = styled.button`
border:1px solid transparent;
display: flex;
align-items:center;
justify-content: center;
font-size:12pt;
padding:5px 15px;
border-radius:5px;
background-color:${COLOR_SECONDARY};
color:#fff;
font-weight:600;
${Mobile_query}{
margin-bottom:20px;
};
${Tablet_query}{
margin-bottom:20px;
}
`


export const BtnWithLine = styled.button`
border:1px solid #ccc;
display: flex;
align-items:center;
justify-content: center;
font-size:12pt;
padding:5px 15px;
border-radius:5px;
background-color:transparent;
color:#000;
font-weight:600;
${Mobile_query}{
margin-bottom:20px;
};
${Tablet_query}{
margin-bottom:20px;
}
`



//END DAFTAR API REQUEST ================