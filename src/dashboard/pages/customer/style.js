import styled from 'styled-components'
import { Mobile_query, Tablet_query } from "../../../util/Query"
import { Table } from "react-bootstrap"

export const ContainerButton = styled.div`
${Tablet_query}{
  margin-bottom:10px;
  flex-wrap:wrap; 
}
${Mobile_query}{
  margin-bottom:10px;
  flex-wrap:wrap; 
}
`

export const TableCustomer = styled(Table)`

${Mobile_query}{
  width:150vw !important;
  display:none;
  
}

${Tablet_query}{
  width:150vw !important;
}
`


