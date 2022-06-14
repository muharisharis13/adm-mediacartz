import React from "react"
import styled from "styled-components"
import { FormatCurrency } from "../../util"
import { COLOR_PRIMARY } from "../style/content/default";
import PropTypes from "prop-types"



export const Card_dooh = (props)=>{

  return(
    <ContainerCard>
      <div style={{position:"relative"}}>
        <ImgCard src={props.item?.user_inventory_item?.item_files[0]?.file} alt="alt" />
        <DivBadge>
          {props.item?.user_product_setting?.publish_duration} {props.item?.user_product_setting?.schedule_type}
        </DivBadge>
      </div>
      <div className="p-2">
        <div>
          <strong>{props.item?.product}</strong>
        </div>
        <div className="mb-3 mb-md-3">
          <span>{props.item?.description}</span>
        </div>
        <div className="d-block justify-content-between">
          <div style={{display:"flex", flexDirection:"column"}}>
            <span>
              Harga : 
            </span>
            {
              props.item?.call_price === "true" ? 
                <strong>HUBUNGI KAMI</strong>
              :props.item?.call_price === "false" && props.item?.discount_price !== null ?
                <div>
                  {
                    props.item?.pricebook?.length > 0 ?null:
                      <small className="label-discount">
                        {FormatCurrency.currency(props.item?.standard_price)}
                      </small>
                  }
                  <h6>
                    <strong>
                      {FormatCurrency.currency(props.item?.publish_price)}
                    </strong>
                  </h6>
                </div>
              :props.item?.call_price === "false" && props.item?.discount_price === null ? 
                <div>
                  <h6>
                    <strong>
                      {FormatCurrency.currency(props.item?.standard_price)}
                    </strong>
                  </h6>
                </div>
              
              :null
            }
          </div>


          <div style={{display:"flex", flexDirection:"column"}}>
            <span>
              Tipe : 
            </span>
            <small>
              <strong style={{wordBreak:"break-word"}}>
                {props.item?.user_product_setting?.unit_desc}
              </strong>
            </small>
          </div>
        </div>
      </div>
    </ContainerCard>
  )
}


const DivBadge = styled.div `
position:absolute;
color: #fff;
background:${COLOR_PRIMARY};
top:10px;
left:10px;
padding:2px 10px;
border-radius:10px;
font-weight:500;
font-size:0.8rem
`

const ImgCard = styled.img `
width:300px;
height:300px;
border-radius: 7px 7px 0px 0px;
object-fit:cover;
`

const ContainerCard = styled.div `
display:block;
border-radius:7px;
background: #fff;
box-shadow: 0px 3px 6px rgb(0 0 0 / 16%);
width:300px;


.label-discount{
  color:#ccc;
  text-decoration:line-through;
  font-style: italic;
}
`

Card_dooh.propTypes = {
  item: PropTypes.any
}
