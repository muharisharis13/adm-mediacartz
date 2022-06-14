import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types"
import { Modal_Component,IdxGoogle_maps } from '../../../../../../component';
import {QuestionDiamond} from "@styled-icons/bootstrap";
import styled from "styled-components";
import {COLOR_SECONDARY} from "../../../../../../component/style/content/default";
import {FileMedia} from "@styled-icons/octicons"
import {Orientation} from "@styled-icons/fluentui-system-filled"
import {ResizeImage} from "@styled-icons/fluentui-system-regular"
import {Location} from "@styled-icons/entypo"
import {Schedule} from "@styled-icons/material"
import {TabsOutline} from "@styled-icons/typicons"
import {PriceTag} from "@styled-icons/entypo"
import { FormatCurrency } from '../../../../../../util';
import { Modal_detail_iklan_dooh } from './modal.detail_iklan_dooh';

export const Modal_view_dooh_detail = (props) => {
  const [data, setData] = useState({});
  const [modal, setModal] = useState({
    detail_iklan:false
  })

  console.log({props})

  useEffect(()=>{
    if(props.show === true){
      setData(props.data)
    }
  },[props.show])


  const BtnPilihProduk = () =>{
    setModal(state=>({...state, detail_iklan:true}))
  }

  return (
    <Modal_Component show={props.show} onHide={props.onHide} title="Detail DOOH" size="xl" btnSubmit={data.call_price === "true" ? false:true} btnName="Pilih Produk" onClick={BtnPilihProduk} >

      {/* Modal ====== */}
      <Modal_detail_iklan_dooh show={modal.detail_iklan} onHide={()=>setModal(state=>({...state, detail_iklan:false}))} data={data} />
      {/* Modal ====== */}


      <div className="container mb-3 mb-md-3">
        <div>
          <strong>
            {data.product}
          </strong>
        </div>
        <div>
          <small>{data.description}</small>
        </div>
      </div>

      <div className="container mb-3 mb-md-3 p-2" style={{border:"thin dashed #aaa"}}>
        <div className="mb-3 mb-md-3">
          <strong>Speksifikasi</strong>
        </div>

        <div className="d-flex justify-content-around">
          {
            data.user_inventory_item?.item_profiles?.map((item,idx)=>(
              <div className="d-flex align-items-center" style={{marginRight:"10px"}} key={idx}>
                <div>
                  {
                    item.profile_label === "Area" ? 
                    <QuestionDiamond width={22} style={{color:COLOR_SECONDARY}} />
                    :item.profile_label === "Media Type" ?
                    <FileMedia width={22} style={{color:COLOR_SECONDARY}} />
                    :item.profile_label === "Orientasi" ?
                    <Orientation width={22} style={{color:COLOR_SECONDARY}} />
                    :item.profile_label === "Ukuran" ?
                    <ResizeImage width={22} style={{color:COLOR_SECONDARY}} />
                    :item.profile_label === "Street Address" ?
                    <Location width={22} style={{color:COLOR_SECONDARY}} />
                    :null
                  }
                </div>
                <div style={{marginLeft:"5px"}}>
                  <SmallText>{item.profile_label}</SmallText>
                  <div>
                    <strong>{item.profile_value}</strong>
                  </div>
                </div>
              </div>
            ))
          }

          <div className="d-flex align-items-center" style={{marginRight:"10px"}}>
            <div>
              <Schedule width={22} style={{color:COLOR_SECONDARY}} />
            </div>
            <div style={{marginLeft:"5px"}}>
              <SmallText>Jadwal</SmallText>
              <div>
                <strong>{data.user_product_setting?.schedule_type}</strong>
              </div>
            </div>
          </div>


          {/* <div className="d-flex align-items-center" style={{marginRight:"10px"}}>
            <div>
              <PriceTag width={22} style={{color:COLOR_SECONDARY}} />
            </div>
            <div style={{marginLeft:"5px"}}>
              <SmallText>Harga</SmallText>
              <div>
                <strong>{FormatCurrency.currency(data.price)}</strong>
              </div>
            </div>
          </div> */}

        </div>
      </div>

      <div className="container mb-3 mb-md-3">
        <div>
          <div>
            <small>Harga : </small>
            <div>
              {
                data.call_price ==="true" ?
                  <strong>HUBUNGI KAMI</strong>
                :data.call_price === "false" && data.discount_price !== null ?
                  <div style={{flexDirection:"column", display:"flex"}}>
                    {
                      data.pricebook && data?.pricebook?.length > 0 ? null : 
                        <small style={{fontStyle:"italic", color:"#ccc", textDecoration:"line-through"}}>
                          {FormatCurrency.currency(data.standard_price)}
                        </small>
                    }
                    <strong>{FormatCurrency.currency(data.publish_price)}</strong>
                  </div>
                :data.call_price ==="false" && data.discount_price === null ?
                  <strong>{FormatCurrency.currency(data.standard_price)}</strong>
                :null
              }
            </div>
          </div>
          <div>
            <small>Tipe : </small>
            <div>
              <strong>{data.user_product_setting?.unit_desc}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="container mb-3 mb-md-3">
        <div className="mb-3 mb-md-3">
          <strong>Lokasi Berdasarkan Map</strong>
        </div>

        <div>
          <IdxGoogle_maps lat={data.user_inventory_item?.lat} lng={data.user_inventory_item?.long} defaultZoom={20} />
        </div>
      </div>

      {
        data.call_price === "true" ? 
        <div  style={{border:"thin solid #ccc",padding:"5px"}}>
          <div>
            <strong style={{color:"#36bded"}}>Berminat ? Hubungi Kami Sekarang Juga!</strong>
          </div>

          <div style={{marginTop:"10px"}}>
            <div className="d-flex">
              <strong style={{width:"150px"}}>Phone / Whatsapp</strong>
              <span>:</span>
              <div>+62812-1825-5224 (Nani)</div>
            </div>
            <div className="d-flex" style={{marginTop:"2px"}}>
              <strong style={{width:"150px"}}>Email Address</strong>
              <span>:</span>
              <a href="mailto:cs@mediacartz.com">cs@mediacartz.com</a>
            </div>
          </div>
        </div>
        :false
      }
    </Modal_Component>
  )
}

const SmallText = styled.small `
color: #aaa;
`


Modal_view_dooh_detail.propTypes = {
  show : PropTypes.bool.isRequired,
  onHide : PropTypes.func.isRequired,
  data: PropTypes.number.isRequired
}

