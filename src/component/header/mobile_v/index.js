import React, { useState } from 'react'
import { ContainerIcon, ContainerMobile, ContainerNavigation, LinkNavMobile, SectionSubNavMobile, SubLinkNavMobile } from '../../style/header'
import { Times } from "@styled-icons/fa-solid"
import { data_nav } from '../../header/nav-data/index'
import { ArrowIosDownwardOutline } from "@styled-icons/evaicons-outline";
import { Link } from 'react-router-dom'

export const IdxHeaderMobile = ({ show = true, close }) => {
  const [isOpenBeriklan, setIsOpenBeriklan] = useState({ name: "", open: false })
  const [isOpenEvnt, setIsOpenEvnt] = useState({ name: "", open: false })
  const [isOpenRetail, setIsOpenRetail] = useState({ name: "", open: false })



  const onClickSubnav = ({ name }) => {

    switch (name) {
      case "Beriklan":
        setIsOpenBeriklan({ name, open: !isOpenBeriklan.open })
        break;
      case "Event":
        setIsOpenEvnt({ name, open: !isOpenEvnt.open })
        break;
      case "Retail":
        setIsOpenRetail({ name, open: !isOpenRetail.open })
        break;
    }
  }

  return (
    <ContainerMobile show={show}>
      <ContainerIcon>
        <Times style={{ width: "15px" }} onClick={close} />
      </ContainerIcon>

      {/* navbar mobile */}
      <ContainerNavigation>
        {
          data_nav.map((item, idx) => (
            <div>
              <LinkNavMobile key={idx} to={item.name !== "Beriklan" && item.name !== "Event" && item.name !== "Retail" ? item.path : "#"} onClick={item.name !== "Beriklan" && item.name !== "Event" && item.name !== "Retail" ? close : () => onClickSubnav({ name: item.name })}>
                {item.name}
                {
                  item.sub &&
                  <ArrowIosDownwardOutline style={{ width: "15px" }} />
                }
              </LinkNavMobile>
              <SectionSubNavMobile show={isOpenBeriklan.name === item.name ? isOpenBeriklan.open : isOpenEvnt.name === item.name ? isOpenEvnt.open : isOpenRetail.name === item.name ? isOpenRetail.open : false}>
                {
                  item.sub &&
                  item.sub.map((sub, idx2) => (
                    <SubLinkNavMobile key={idx2} to={sub.path} onClick={close}>{sub.name}</SubLinkNavMobile>
                  ))
                }

              </SectionSubNavMobile>

            </div>
          ))
        }
      </ContainerNavigation>
    </ContainerMobile>
  )
}
