import styled, {css} from 'styled-components';
import color from "./color";
import effect from "./effect"



const ButtonPrimary = styled.button `


${({rounded, bulat_large, bulat_medium, bulat_small})=>
  rounded ? css `
    border-radius:28px;
  `
  :bulat_small ? css `
    border-radius:100%;
    padding:0 !important;
    align-items:center !important;
    justify-content:center !important;
    width: 32px;
    height: 32px;
  `
  :bulat_medium ? css `
    border-radius:100%;
    padding:0 !important;
    align-items:center !important;
    justify-content:center !important;
    width: 40px;
    height: 40px;
  `
  :bulat_large? css `
    border-radius:100%;
    padding:0 !important;
    align-items:center !important;
    justify-content:center !important;
    width: 56px;
    height: 56px;
  `
  :
  css `
    border-radius:8px;
  `
};

${({large,medium,small})=>(

  large ? css `
    padding:16px 24px;
    font-size:18px;
  `
  :medium ? css `
    padding:8px 16px;
    font-size:16px;  
  `
  :small ? css `
    padding:6px 16px;
    font-size:14px;
  `
  : css `
    padding:16px 24px;
    font-size:18px;
  `
  


)}


display: flex;
flex-direction: row;
align-items: flex-start;
background: ${color.PRIMARY_100};
border:1.5px solid transparent;
color:${color.PRIMARY_10};
font-family: Inter;
font-style: normal;
font-weight: 600;
line-height: 24px;
letter-spacing: -0.04em;
transition:300ms;
&:hover{
  background:${color.PRIMARY_130};
};
&:active{
  background:${color.INTERACTIVE_100}
};
&:disabled{
  background:${color.NEUTRAL_20};
  color: ${color.NEUTRAL_40};
}
`


const ButtonSecondary = styled.button `

${({rounded, bulat_large, bulat_medium, bulat_small})=>
  rounded ? css `
    border-radius:28px;
  `
  :bulat_small ? css `
    border-radius:100%;
    padding:0 !important;
    align-items:center !important;
    justify-content:center !important;
    width: 32px;
    height: 32px;
  `
  :bulat_medium ? css `
    border-radius:100%;
    padding:0 !important;
    align-items:center !important;
    justify-content:center !important;
    width: 40px;
    height: 40px;
  `
  :bulat_large? css `
    border-radius:100%;
    padding:0 !important;
    align-items:center !important;
    justify-content:center !important;
    width: 56px;
    height: 56px;
  `
  :
  css `
    border-radius:8px;
  `
};


${({large,medium,small})=>(

  large ? css `
    padding:16px 24px;
    font-size:18px;
  `
  :medium ? css `
    padding:8px 16px;
    font-size:16px;  
  `
  :small ? css `
    padding:6px 16px;
    font-size:14px;
  `
  : css `
    padding:16px 24px;
    font-size:18px;
  `
  


)}


display: flex;
flex-direction: row;
align-items: flex-start;
background: ${color.PRIMARY_10};
border:1.5px solid ${color.PRIMARY_20};
color:${color.PRIMARY_100} ;
font-family: Inter;
font-style: normal;
font-weight: 600;
line-height: 24px;
letter-spacing: -0.04em;
transition:300ms;

&:focus-visible{
  color:${color.INTERACTIVE_100} ;
};

&:hover{
  background:${color.PRIMARY_10};
  border:1.5px solid ${color.PRIMARY_100};
};
&:active{
  background:${color.PRIMARY_20};
  border:1.5px solid ${color.PRIMARY_30};
};
&:disabled{
  background:${color.NEUTRAL_10};
  color: ${color.NEUTRAL_40};
  border:1.5px solid ${color.NEUTRAL_15};
}
`


const GhostButton = styled.button `
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px;
transition:300ms;
background:transparent;
color:${color.PRIMARY_100};
border:none;


${({XXL,XL,L,M,S}) =>
  XXL ? css `
    width: 64px;
    height: 64px;
    border-radius: 8px;
  `
  :XL ? css `
    width: 56px;
    height: 56px;
    border-radius: 8px;
  `
  :L ? css `
    width: 40px;
    height: 40px;
    border-radius: 20px;
  `
  :M ? css `
    width: 32px;
    height: 32px;
    border-radius: 8px;
  `
  :S ? css `
    width: 24px;
    height: 24px;
    border-radius: 8px;
  `
  : css `
    width: 64px;
    height: 64px;
    border-radius: 8px;
  `
};

&:hover{
  background:${color.PRIMARY_20};
};

&:active{
  background:${color.PRIMARY_100};
  color:${color.NEUTRAL_10};
};
`



export {
  ButtonSecondary,
  ButtonPrimary,
  GhostButton
}