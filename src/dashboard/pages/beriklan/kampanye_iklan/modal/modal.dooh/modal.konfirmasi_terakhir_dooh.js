import React, {useState, useEffect,useContext} from 'react';
import PropTypes from "prop-types";
import {Modal} from "react-bootstrap"
import { COLOR_PRIMARY, HeaderPrimary,Label,COLOR_SECONDARY, ButtonPrimary } from '../../../../../../component/style/content/default';
import styled from "styled-components";
import {FormatCurrency} from "../../../../../../util";
import {Context} from "../../../../../../service";
import moment from "moment"
import { api_kampanye_iklan } from '../../../../../../service/api';
import { AlertError,AlertSuccess } from '../../../../../../component';

export const Modal_konfirmasi_terakhir_dooh = (props) => {
  const [data, setData] = useState({});
  const {selected_company,variant_dooh,data_user,product_id} = useContext(Context)
  const [saldo, setSaldo] = useState(0);
  const [checked, setChecked] = useState(false)
  const [data_review, setData_review] = useState({})



  const btnBuatIklan = () => {

    if(checked){
      const body ={
        "product_id": product_id,
        "campaign_name": data.input?.nama_iklan,
        "user_id": data_user.id,
        "company_id": selected_company.value,
        "publisher": {
          "order_desc": data.data?.description,
          "user_product_id": data?.data?.user_product_id,
          "quantity": parseInt(data?.input?.qty),
          "preview": "false",
          "schedule": {
            "date": moment(data.input?.from_date).format("YYYY-MM-DD")
          },
          "campaign_files":data.array_file?.map(item=>({file:item.campaing_files.url})),
          "campaign_contents": data.content_file?.map(item => ({file:item.url}))
        },
        "deduct_mode": "FULL_BALANCE"
      }


      api_kampanye_iklan.post_publisher_create_dooh({body})
      .then(async res =>{
        console.log({post_publisher_create_dooh:res})
        if(res?.success){
          await AlertSuccess({title:"SUCCESS", text:res.success})
          window.location.reload();
        }
        else{
          AlertError({title:"ERROR", text:res.error})
        }
      })

    }
    else{
      AlertError({title:"Warning", text:"Please Checked !"})
    }
  }

  const get_data =()=>{
    const body ={
      "product_id": product_id,
      "campaign_name": props.data?.input?.nama_iklan,
      "user_id": data_user.id,
      "company_id": selected_company.value,
      "publisher": {
        "order_desc": props.data?.data?.description,
        "user_product_id": props?.data?.data?.user_product_id,
        "quantity": parseInt(props.data?.input?.qty),
        "preview": true,
        "schedule": {
          "date": moment(props.data?.input?.from_date).format("YYYY-MM-DD")
        },
        "campaign_files":props.data?.array_file?.map(item=>({file:item.campaing_files.url})),
        "campaign_contents": props.data?.content_file?.map(item => ({file:item.url}))
      },
      "deduct_mode": "FULL_BALANCE"
    }


    api_kampanye_iklan.post_publisher_create_dooh({body})
    .then(async res =>{
      console.log({review_product:res})
      if(res?.success){
        setData_review(res.data.data)
      }
      else{
        AlertError({title:"ERROR", text:res.error})
      }
    })
  }

  console.log("data_nya",data)

  useEffect(async()=>{
    if(props.show){
      await setData(props.data);
      await get_data()
      await api_kampanye_iklan.get_saldo(selected_company.value)
      .then(res =>{
        if(res?.success){
          setSaldo(res.data)
        }
        else{
          AlertError({title:"ERROR",text:res.error})
        }
        console.log({get_saldo:res})
      })
    }
  },[props.show])


 

  return (
    <Modal fullscreen show={props.show} onHide={props.onHide}>
      <Modal.Body>
        <div className="container mb-3 mb-md-3">
          <div>
            <HeaderPrimary color={COLOR_PRIMARY}>Konfirmasi Iklan</HeaderPrimary>
            <span>Berikut Adalah Ringkasan iklan anda dan rincian biaya</span>
          </div>
        </div>
        
        <div className="container mb-3 mb-md-3">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <ContainerInfoProduct className="mb-3 mb-md-3">
                <div className="mb-3 mb-md-3">
                  <Label color={COLOR_SECONDARY}>
                    <strong>Info Produk</strong>
                  </Label>
                </div>
                <div>
                  <strong>
                    {data?.data?.product}
                  </strong>
                  <div>
                    <small>
                      {data?.data?.description}
                    </small>
                  </div>
                  <section className="mt-2">
                    <div className='d-flex mb-1'>
                      <div style={{width:"100px"}}>
                        <strong>Durasi</strong>
                      </div>
                      <span style={{marginRight:"10px"}}>:</span>
                      <div>
                        {data?.data?.user_product_setting?.publish_duration} {data?.data?.user_product_setting?.schedule_type}
                      </div>
                    </div>
                    <div className='d-flex mb-1'>
                      <div style={{width:"100px"}}>
                        <strong>Unit</strong>
                      </div>
                      <span style={{marginRight:"10px"}}>:</span>
                      <div>
                        {data?.data?.user_product_setting?.unit}
                      </div>
                    </div>
                    <div className='d-flex mb-1'>
                      <div style={{width:"100px"}}>
                        <strong>Deskripsi</strong>
                      </div>
                      <span style={{marginRight:"10px"}}>:</span>
                      <div>
                        {data?.data?.user_product_setting?.unit_desc}
                      </div>
                    </div>
                    <div className='d-flex mb-1'>
                      <div style={{width:"100px"}}>
                        <strong>Resolusi</strong>
                      </div>
                      <span style={{marginRight:"10px"}}>:</span>
                      <div>
                      {data?.data?.user_product_setting?.video_vres}(W) x {data?.data?.user_product_setting?.video_hres}(H)
                      </div>
                    </div>
                    <div className='d-flex mb-1'>
                      <div style={{width:"100px"}}>
                        <strong>Qty</strong>
                      </div>
                      <span style={{marginRight:"10px"}}>:</span>
                      <div>
                      {data?.input?.qty}
                      </div>
                    </div>
                  </section>
                </div>
              </ContainerInfoProduct>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <ContainerInfoProduct className="mb-3 mb-md-3">
                <div className="mb-3 mb-md-3">
                  <Label color={COLOR_SECONDARY}>
                    <strong>Ringkasan Iklan</strong>
                  </Label>
                </div>

                <div>
                  <div className='d-flex mb-1'>
                    <div style={{width:"200px"}}>
                      <strong>Perusahaan</strong>
                    </div>
                    <span style={{marginRight:"10px"}}>:</span>
                    <div>
                      {selected_company?.label}
                    </div>
                  </div>
                  <div className='d-flex mb-1'>
                    <div style={{width:"200px"}}>
                      <strong>Produk</strong>
                    </div>
                    <span style={{marginRight:"10px"}}>:</span>
                    <div>
                      {variant_dooh}
                    </div>
                  </div>
                  <div className='d-flex mb-1'>
                    <div style={{width:"200px"}}>
                      <strong>Nama Iklan</strong>
                    </div>
                    <span style={{marginRight:"10px"}}>:</span>
                    <div>
                      {data?.input?.nama_iklan}
                    </div>
                  </div>
                  <div className='d-flex mb-1'>
                    <div style={{width:"200px"}}>
                      <strong>Tanggal Berakhir</strong>
                    </div>
                    <span style={{marginRight:"10px"}}>:</span>
                    <div>
                      {`${moment(data?.input?.end_date).format("YYYY-MM-DD")}`}
                    </div>
                  </div>
                  <div className='d-flex mb-1'>
                    <div style={{width:"200px"}}>
                      <strong>Jadwal</strong>
                    </div>
                    <span style={{marginRight:"10px"}}>:</span>
                    <div>
                      {`${moment(data?.input?.from_date).format("YYYY-MM-DD")}`}
                    </div>
                  </div>
                  <div className='d-flex mb-1'>
                    <div style={{width:"200px"}}>
                      <strong>Catatan</strong>
                    </div>
                    <span style={{marginRight:"10px"}}>:</span>
                    <div style={{wordBreak:"break-word",width:"auto"}}>
                      {
                        data?.input?.catatan
                      }
                    </div>
                  </div>

                </div>
              </ContainerInfoProduct>
            </div>
          </div>
        </div>

        <div className="container mb-3 mb-md-3">
          <div className="row">
            <div className="col-md-6 col-lg-6 col-sm-6">
              <ContainerInfoProduct>
                <div className="mb-3 mb-md-3">
                  <Label color={COLOR_SECONDARY}>
                    <strong>File Konten</strong>
                  </Label>
                </div>
                
                <div>
                  {
                    data?.content_file?.length ?
                      <div className="d-flex mb-1 mb-md-1" >
                        <div>
                          <div>
                            {
                              data?.content_file?.map((item,idx)=>{
                                let content_type_image = item.content_type.includes("image")
                                let content_type_video = item.content_type.includes("video")

                                if(content_type_image === true){
                                  return <img src={item.url} alt={item.url} style={{width:"200px", height:"200px",objectFit:"contain"}} key={idx} />
                                }
                                else if(content_type_video === true){
                                  return <video src={item.url} style={{width:"100%", height:"300px"}} controls key={idx} />
                                }
                              })
                            }
                          </div>
                        </div>
                      </div>
                      :"Nothing"
                  }
                </div>
              </ContainerInfoProduct>

            </div>
            <div className="col-md-6 col-lg-6 col-sm-6">
              <ContainerInfoProduct>
                  <div className="mb-3 mb-md-3">
                    <Label color={COLOR_SECONDARY}>
                      <strong>File Pendukung</strong>
                    </Label>
                  </div>
                  <div>
                    {
                      data?.array_file?.length > 0&& data?.array_file?.map((item,idx)=>{
                        let content_type_image = item.campaing_files.content_type.includes("image")
                        let content_type_video = item.campaing_files.content_type.includes("video")
                        let content_type_application = item.campaing_files.content_type.includes("application/pdf")
                        let content_type_docs =  item.campaing_files.url.includes("docx")

                        if(content_type_image){
                          return <img src={item.campaing_files.url} alt={item.campaing_files.url} style={{width:"100%", height:"200px",objectFit:"contain"}} key={idx} />
                        }

                        else if(content_type_video){
                          return <video src={item.campaing_files.url} style={{width:"100%", height:"300px"}} controls key={idx} />
                        }

                        else if(content_type_application){
                          return <embed src={item.campaing_files.url} style={{width:"100%", height:"400px"}} />
                        }
                        else{
                          return <li>
                             <a target="__blank" href={item.campaing_files.url}>{item.campaing_files.url}</a>
                          </li>
                        }
                      })
                    }
                  </div>
                </ContainerInfoProduct>
            </div>
          </div>
        </div>

        <div className="container mb-3 mb-md-3">
          <ContainerInfoProduct style={{height:"420px", overflow:"none !important"}}>
            <div className="mb-3 mb-md-3">
              <Label color={COLOR_SECONDARY}>
                <strong>Pembayaran</strong>
              </Label>
              <br />
              <small>Pembayaran dengan menggunakan saldo</small>
            </div>

            <ContainerSaldo className="mb-3 mb-md-3">
              <div>
                Saldo Sekarang
              </div>
              <div>
                <strong>
                  {FormatCurrency.currency(saldo)}
                </strong>
              </div>
            </ContainerSaldo>
            <div className="mb-md-3 mb-3">
              <div>
                <strong>Detail Biaya</strong>
              </div>
              <div className="d-flex">
                <div style={{marginRight:"20px"}}>
                  <strong>Total Biaya</strong>
                </div>
                <span style={{marginRight:"10px"}}>:</span>
                <div>
                  {
                     data.data?.publish_price ?
                      <div style={{flexDirection:"column", display:"flex"}}>
                        <strong>{FormatCurrency.currency(data_review.total_budget)}</strong>
                      </div>
                    : data.data?.standard_price  ?
                      <strong>{FormatCurrency.currency(data_review.total_budget)}</strong>
                    :null
                  }
                </div>
              </div>
            </div>


            <div className="mb-3 mb-md-3">
              <div className="d-flex" style={{color:"#ccc"}}>
                  <input type="checkbox" className="form-check-input" name="syarat" id="syarat" checked={checked} onChange={e=>setChecked(e.target.checked)}  /> &nbsp;&nbsp;&nbsp;
                  <label htmlFor="syarat">Saya menyetujui syarat dan ketentuan yang berlaku di website Mediacartz.</label>
                </div>
                <div className="mb-3" style={{color:"#ccc"}}>
                  <i>
                    Atas setiap Campaign yang dibuat oleh Pengguna menggunakan Produk dan/atau Layanan melalui Portal, Pengguna dilarang untuk mempergunakan kata-kata, komentar, gambar atau konten apapun yang mengandung unsur SARA, diskriminasi, merendahkan atau menyudutkan pihak lain, vulgar, bersifat ancaman, atau hal-hal lain yang dapat dianggap tidak sesuai dengan nilai dan norma sosial.
                  </i>
                </div>
            </div>

            <div className="mb-3 mb-md-3 d-flex">
              <div>
                  <ButtonPrimary onClick={btnBuatIklan}>Buat Iklan</ButtonPrimary>
              </div>
              <div style={{marginLeft:"20px"}}>
                <button className="btn border" onClick={props.onHide}>Kembali</button>
              </div>
            </div>
          </ContainerInfoProduct>
        </div>

      </Modal.Body>
    </Modal>
  )
}

const ContainerSaldo = styled.div `
padding:20px;
border:thin dashed #ccc;
`

const ImgFile = styled.img `
width:250px;
`


const ContainerInfoProduct = styled.div `
box-shadow: 0px 0px 15px -6px rgba(0,0,0,0.2);
-webkit-box-shadow: 0px 0px 15px -6px rgba(0,0,0,0.2);
-moz-box-shadow: 0px 0px 15px -6px rgba(0,0,0,0.2);
border:1px solid #ccc;
padding:15px;
height: 300px;
overflow-y:auto;
border-radius:6px;
`


Modal_konfirmasi_terakhir_dooh.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  data: PropTypes.object
}