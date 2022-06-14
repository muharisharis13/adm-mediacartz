import styled from 'styled-components'
import { Mobile_query } from '../../../util/Query'


export const ContainerTabelMobile = styled.div`
display: none;

${Mobile_query}{
display: flex;
border: 0.5px solid #ccc;
padding:10px 10px;
justify-content: space-between;
align-items:center;

&:not(:first-child):not(:last-child) {
  border-top:none;
}
&:last-child{
  border-top: none;
}
}
`

export const ContainerHeader = styled.div`
font-weight:700;
color:#767676;
`
export const ContainerContent = styled.div`

color:#767676;
`