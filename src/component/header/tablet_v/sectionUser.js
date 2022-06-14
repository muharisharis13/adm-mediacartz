import { ArrowIosDownwardOutline } from '@styled-icons/evaicons-outline'
import React from 'react'
import { SectionUser_tablet, SubMenu, SubMenuList } from '../../style/header'

export const SectionUser1 = ({
  setisOpenUser, isOpenUser, data_user_nav
}) => {
  return (
    <SectionUser_tablet>
      {/* user */}
      <div style={{ position: "relative" }}>
        <div style={{ display: "flex" }}
          onClick={() => setisOpenUser(!isOpenUser)}
        >
          <strong>
            Muharis (brand)
          </strong>
          &nbsp;
          {/* <ArrowIosDownwardOutline style={{ width: "15px" }} /> */}


        </div>

        {/* <SubMenu show={isOpenUser} onMouseEnter={() => setisOpenUser(true)}
          onMouseLeave={() => setisOpenUser(false)}>
          {
            data_user_nav.map((item, idx) => (
              <SubMenuList key={idx}>
                {item.name}
              </SubMenuList>
            ))
          }
        </SubMenu> */}

      </div>
    </SectionUser_tablet>
  )
}
