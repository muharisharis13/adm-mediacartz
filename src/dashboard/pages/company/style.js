import styled from "styled-components"

import { CopyAlt } from "@styled-icons/boxicons-solid"
import { Delete } from "@styled-icons/feather"
import { COLOR_DANGER } from "../../../component/style/content/default"


// MODAL API KEY ==============


export const IconCopy = styled(CopyAlt)`
width:20px;
color:#c5c5c5;
position:absolute;
right:10px;
margin:10px 0;
cursor:pointer;

&:hover{
  color:#000;
}
`

export const IconDelete = styled(Delete)`

width:20px;
color:#c5c5c5;
position:absolute;
right:10px;
margin:10px 0;
cursor:pointer;

&:hover{
  color:${COLOR_DANGER};
}
`

