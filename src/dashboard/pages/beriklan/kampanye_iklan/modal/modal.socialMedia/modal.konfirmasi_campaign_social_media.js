import React, {useState,useEffect, useContext} from 'react'
import {Modal} from "react-bootstrap";
import PropTypes from "prop-types";
import styled from "styled-components"
import { ButtonPrimary, COLOR_PRIMARY, COLOR_SECONDARY } from '../../../../../../component/style/content/default';
import { AlertError, AlertSuccess} from '../../../../../../component';
import { FormatCurrency } from '../../../../../../util';
import { Context } from '../../../../../../service';
import { api_kampanye_iklan } from '../../../../../../service/api';
import moment from "moment";



export const Modal_konfirmasi_campaign_social_media = (props) => {
  const [data_content,setData_content] = useState([]);
  const {selected_company,product_id,data_user} = useContext(Context);
  const [saldo, setSaldo] = useState(null)
  let total = props.props?.selected_influencer?.reduce((acc,curr)=> acc + curr.post_price,0)
  const [checkbox, setCheckbox] = useState(false)

  const body_kol = {
    campaign_name: props.props?.input?.nama_campaign,//
    company_id: selected_company.value,//
    deduct_mode: "FULL_BALANCE",//
    event_id: null,//
    kol: {
      content_by_influencer: "false",//
      description: props.props?.input?.upload_media?.caption,//
      expire_date: props.props?.input?.date_batalkan_otomatis,//
      influencer: props.props?.selected_influencer?.map(item=>({
        budget: null,//
        end_date: moment(item.end_date).format("YYYY-MM-DD"),//
        followers: item.followers,//
        influencer_image: item.influencer_image,//
        start_date: moment(item.from_date).format("YYYY-MM-DD"),//
        user_id: item.id,//
        username: item.username//
      })) ,
      is_openbid: "false",//
      link_content: props.props?.input?.upload_media?.file,//
      open_bid_budget: null,//
      order_desc: props.props?.input?.deskripsi,//
      payment_type: "post",//
      platform_child_id: props.props?.input?.selected_tipe_postingan?.value,//
      preview_fee: "false"
    },
    microsite_id: null,
    product_id: product_id,
    user_id: data_user.id
  }

  useEffect(()=>{
    if(props.show === true){
     
      // console.log({body_kol})
      // api_kampanye_iklan.post_kol(body_kol)
      // .then(res =>{
      //   console.log({post_kol:res})
      // })
      api_kampanye_iklan.get_saldo(selected_company.value)
      .then(res =>{
        if(res?.success){
          setSaldo(res.data)
        }
      })
      if(props.props.input){
        if(data_content.length === 0){
          setData_content([
            {
              content:selected_company.label,
              title: "Perusahaan"
            },
            {
              content:props.props?.input?.nama_campaign,
              title: "Nama Campaign"
            },
            {
              content:props.props?.input?.selected_tipe_postingan?.label,
              title: "Tipe Postingan"
            },
            {
              content:props.props?.input?.deskripsi,
              title: "Deskripsi"
            },
            {
              content:props.props?.input?.upload_media?.file,
              title: "File Link"
            },
            {
              content:props.props?.input?.upload_media?.caption,
              title: "Catatan File"
            },
            {
              content:props.props?.selected_influencer,
              title: "Influencer"
            },
            {
              content:props.props?.input?.date_batalkan_otomatis,
              title: "Otomatis Batalkan"
            },
          ])
        }
      }
    }

    
  },[props.show])



  return (
    <Modal fullscreen show={props.show} onHide={Close}>
      <Modal.Body>
        <Container className="container">
          <div className="wrap-header">
            <h4 className="text-header">Konfirmasi Campaign</h4>
            <span>Silahkan cek kembali isi dari campaign anda sebagai konfirmasi terakhir</span>
          </div>

          <div className="wrap-content mt-5">
            
            <div className="row">
              <div className="col-lg-7 col-md-7 col-sm-7">
                <div className="form">
                  {
                    data_content.map((item,idx)=>(
                      <div className="mb-3 d-flex" key={idx}>
                        <strong className="title">
                          {item.title}
                        </strong>
                        <span>
                          {
                            item.title === "Influencer" ?  
                            item.content.map(infl=>(
                              <div>{`${infl.username} Posting Pada ${infl.from_date} Sampai ${infl.end_date}`}</div>
                            ))
                            :`${item.content}`
                          }
                        </span>
                      </div>
                    ))
                  }
                </div>
              </div>
              <div className="col-lg-5 col-md-5 col-sm-5">
                <div className="form">
                  <h5 className="title">Total Biaya</h5>
                  {
                    props.props?.selected_influencer?.map((item,idx)=>(
                      <div className="mb-4" key={idx}>
                        <div className="colm">
                          <strong>@{item.username}</strong>
                        </div>
                        <div className="colm" style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                          <div>
                            <span>1 X {FormatCurrency.currency(item.post_price)}</span>
                          </div>
                          <div>
                            {FormatCurrency.currency(item.post_price)}
                          </div>
                        </div>
                      </div>
                    ))
                  }

                  <div className="wra-summary d-flex" style={{alignItems:"center", justifyContent:'flex-end'}}>
                    <h5>
                      <strong>
                        Total : {FormatCurrency.currency(total)}
                      </strong>
                    </h5>
                  </div>
                </div>

                <div className="form mt-4">
                  <h5 className="title">Balance</h5>
                  <div className="wra-summary d-flex" style={{alignItems:"center", justifyContent:'flex-end'}}>
                    <h5>
                      <strong>
                        {FormatCurrency.currency(saldo)}
                      </strong>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="wrap-keterangan form mt-5">

            <div className="input d-flex">
              <input type="checkbox" id="syarat" className="form-check-input" style={{width:"40px"}} checked={checkbox} onChange={e=>setCheckbox(e.target.checked)} />
              <label htmlFor='syarat'>
              Saya menyetujui syarat dan ketentuan yang berlaku di website Mediacartz. <br />
                <i>
                  Atas setiap Campaign yang dibuat oleh Pengguna menggunakan Produk dan/atau Layanan melalui Portal, Pengguna dilarang untuk mempergunakan kata-kata, komentar, gambar atau konten apapun yang mengandung unsur SARA, diskriminasi, merendahkan atau menyudutkan pihak lain, vulgar, bersifat ancaman, atau hal-hal lain yang dapat dianggap tidak sesuai dengan nilai dan nPorma sosial.
                </i>
              </label>
            </div>

            <div className="button mt-4 d-flex">
              <ButtonPrimary style={{marginRight:"20px"}} onClick={BuatIklan}>
                Buat Iklan
              </ButtonPrimary>
              <button className="btn border" onClick={Close}>Kembali</button>
            </div>
          </div>
        </Container>
      </Modal.Body>
    </Modal>
  )

  function BuatIklan(){
    if(checkbox === true){
      api_kampanye_iklan.post_kol(body_kol)
      .then(async res =>{
        console.log("body",res)
        if(res?.success){
          await AlertSuccess({title:"SUCCESS",text:res.success})
          await window.location.reload()
        }
        else{
          await AlertError({title:"ERROR", text:res.error})
        }
      })
    }
    else{
       AlertError({title:"ERROR", text:"Please Checked"})
    }
  }

  function Close(){
    props.onHide();
    setData_content([])
  }
}

const Container = styled.div `

.wrap-content{

  .colm{
    border-bottom:thin solid #ccc;
    padding:5px 0px;
  }

  .title{
    color:${COLOR_SECONDARY};
    width:150px;
  }
}

.form{
  background-color: #fff;
  box-shadow: 0px 3px 6px rgb(0 0 0 / 16%);
  color: rgba(10, 10, 10, 0.5);
  max-width: 100%;
  position: relative;
  border-radius: 10px;
  padding:20px;

}

.wrap-header{
  .text-header{
    color:${COLOR_PRIMARY};
  }
}


`


Modal_konfirmasi_campaign_social_media.propTypes={
  show: PropTypes.bool.isRequired ,
  onHide:PropTypes.func.isRequired,
  props: PropTypes.object
}
