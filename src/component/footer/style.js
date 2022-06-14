import styled from 'styled-components'
import { Mobile_query } from '../../util/Query'

export const ContainerFooter = styled.div`
background: linear-gradient(90deg, rgba(46,56,148,1) 0%, rgba(46,56,148,1) 35%, rgba(45,187,236,1) 100%);
color:#fff;
font-size:11pt;
display: flex;
flex-direction: column;
padding:15px 0px;
align-items:center;
justify-content: center;
text-align:center;

${Mobile_query}{
  font-size:10pt;
}
`