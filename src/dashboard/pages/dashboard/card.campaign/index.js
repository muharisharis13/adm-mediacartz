import { Plus } from '@styled-icons/fa-solid'
import React from 'react'
import { ButtonCreateIklan, ContainerCardCampaign, ContainerTextDiv, StrongNumberCardCampaign, StrongTitleCardCampaign } from '../style'

export const IdxCardCampaign = ({ title, number, event, onClick }) => {
  return (
    <ContainerCardCampaign>
      <ContainerTextDiv>
        <StrongTitleCardCampaign>{title}</StrongTitleCardCampaign>
        <StrongNumberCardCampaign>{number}</StrongNumberCardCampaign>
      </ContainerTextDiv>
      <ButtonCreateIklan onClick={onClick}>
        <Plus style={{ width: "15px" }} /> &nbsp; Buat Iklan
      </ButtonCreateIklan>
    </ContainerCardCampaign>
  )
}
