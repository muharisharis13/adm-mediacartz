import React from "react";
import styled from "styled-components"
import {color,Text} from "../../1.LANDINGPAGE/style";
import MediacartzImg from "../../../asset/icon/144px_x_40px_white-09_1.svg"

export const IdxFooter = () =>{
  return(
    <Container>
      <div className="d-flex" style={{justifyContent:"center", alignItems:"baseline"}}>
        <div className="d-block" style={{width:"50%"}}>
          <div>
            <img src={MediacartzImg} alt="" />
          </div>
          <div style={{marginTop:"28px"}}>
            <div>
              <Text.CAPS style={{color:color.PRIMARY_10}}>
                CENTENNIAL TOWER
              </Text.CAPS>
              <Text.BODY_S style={{color:color.PRIMARY_10, marginTop:"16px",width:"70%"}}>
                Lt. 38 H, Jl. Gatot Subroto, RT.2/RW.2, Karet Semanggi, Kecamatan Setiabudi, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12950
              </Text.BODY_S>
            </div>
            <div style={{marginTop:"30px"}}>
              <Text.CAPS style={{color:color.PRIMARY_10}}>
                PHONE
              </Text.CAPS>
              <Text.BODY_S style={{color:color.PRIMARY_10, marginTop:"16px"}}>
                (021) 5688526
              </Text.BODY_S>
            </div>
          </div>
        </div>
        <div  className="d-block" style={{width:"50%"}}>
          <div style={{marginBottom:"36px"}}>
            <div>
              <Text.SUBHEADING_M style={{color:color.PRIMARY_30}}>Products</Text.SUBHEADING_M>
            </div>
            <div className="d-flex" style={{marginTop:"16px"}}>
              <WrapperTextLink style={{marginRight:"48px"}}>
                <Text.CAPS style={{color:color.PRIMARY_10}}>
                  ADVERTISING
                </Text.CAPS>
                <div style={{marginTop:"14px"}}>
                  <TextBodyS>Messaging</TextBodyS>
                  <TextBodyS>Digital Signage</TextBodyS>
                  <TextBodyS>TV & Radio</TextBodyS>
                  <TextBodyS>KOL</TextBodyS>
                </div>
              </WrapperTextLink>

              <WrapperTextLink style={{marginRight:"48px"}}>
                <Text.CAPS style={{color:color.PRIMARY_10}}>
                  EVENT
                </Text.CAPS>
                <div style={{marginTop:"14px"}}>
                  <TextBodyS>Store</TextBodyS>
                  <TextBodyS>Online</TextBodyS>
                  <TextBodyS>Public</TextBodyS>
                  <TextBodyS>Private</TextBodyS>
                </div>
              </WrapperTextLink>

              <WrapperTextLink style={{marginRight:"48px"}}>
                <Text.CAPS style={{color:color.PRIMARY_10}}>
                  PORTA
                </Text.CAPS>
                <div style={{marginTop:"14px"}}>
                  <TextBodyS>Microsite</TextBodyS>
                  <TextBodyS>Portal</TextBodyS>
                </div>
              </WrapperTextLink>

              <WrapperTextLink style={{marginRight:"48px"}}>
                <Text.CAPS style={{color:color.PRIMARY_10}}>
                  CRM
                </Text.CAPS>
                <div style={{marginTop:"14px"}}>
                  <TextBodyS>Default CRM Data</TextBodyS>
                  <TextBodyS>E-commerce Insight</TextBodyS>
                </div>
              </WrapperTextLink>

              <WrapperTextLink style={{marginRight:"48px"}}>
                <Text.CAPS style={{color:color.PRIMARY_10}}>
                  PUBLISHER ADS
                </Text.CAPS>
                <div style={{marginTop:"14px"}}>
                  <TextBodyS>Signage</TextBodyS>
                  <TextBodyS>Radio</TextBodyS>
                  <TextBodyS>Kolia</TextBodyS>
                </div>
              </WrapperTextLink>
            </div>

          </div>


          <div className="d-flex">
            <WrapperTextLink2 style={{marginRight:"75px"}}>
              <div>
                <Text.SUBHEADING_M style={{color:color.PRIMARY_30}}>Meet Mediacartz</Text.SUBHEADING_M>
              </div>
              <div className="d-flex" style={{marginTop:"16px"}}>
                <WrapperTextLink>
                  <div>
                    <TextBodyS>About Us</TextBodyS>
                    <TextBodyS>Paket Iklan UMKM</TextBodyS>
                    <TextBodyS>Terms & Conditions</TextBodyS>
                    <TextBodyS>Privacy Policy</TextBodyS>
                  </div>
                </WrapperTextLink>
              </div>
            </WrapperTextLink2>

            <WrapperTextLink2 style={{marginRight:"75px"}}>
              <div>
                <Text.SUBHEADING_M style={{color:color.PRIMARY_30}}>Help</Text.SUBHEADING_M>
              </div>
              <div className="d-flex" style={{marginTop:"16px"}}>
                <WrapperTextLink>
                  <div>
                    <TextBodyS>Help Center</TextBodyS>
                    <TextBodyS>How to Make Ads</TextBodyS>
                  </div>
                </WrapperTextLink>
              </div>
            </WrapperTextLink2>

            <WrapperTextLink2 style={{marginRight:"75px"}}>
              <div>
                <Text.SUBHEADING_M style={{color:color.PRIMARY_30}}>Follow Us</Text.SUBHEADING_M>
              </div>
              <div className="d-flex" style={{marginTop:"16px"}}>
                <WrapperTextLink>
                  <div>
                    <TextBodyS>Instagram</TextBodyS>
                    <TextBodyS>Twitter</TextBodyS>
                    <TextBodyS>Youtube</TextBodyS>
                  </div>
                </WrapperTextLink>
              </div>
            </WrapperTextLink2>
          </div>
        </div>
      </div>
    </Container>
  )
}

const WrapperTextLink2 = styled.div `

&:last-child{
  margin-right:0;
}
`


const WrapperTextLink = styled.div `

&:last-child{
  margin-right:0;
}
`


const TextBodyS = styled(Text.BODY_S) `
color: ${color.PRIMARY_10};
margin-bottom:10px;
`

const Container = styled.div `
background: ${color.PRIMARY_150};
padding:133px 10vw;
color: ${color.PRIMARY_10};
`


