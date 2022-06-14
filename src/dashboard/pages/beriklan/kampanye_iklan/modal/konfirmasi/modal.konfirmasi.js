import React,{useState, useEffect,useContext} from "react";
import {Modal} from "react-bootstrap"
import { HeaderPrimary,COLOR_PRIMARY,COLOR_SECONDARY, ButtonPrimary,ButtonDanger,Label } from "../../../../../../component/style/content/default";
import styled from "styled-components"
import { AlertError, AlertSuccess, Form } from "../../../../../../component";
import {FormatCurrency,Moment} from "../../../../../../util";
import moment from "moment"
import Select from "react-select"
import { Context } from "../../../../../../service";
import { api_kampanye_iklan } from "../../../../../../service/api";

const opt_pembayaran = [
  {value:"PARTIAL_BUCKET_BALANCE", label:"Bucket dan saldo"},
  {value:"FULL_BALANCE", label:"saldo"}
]

export const Modal_konfirmasi = ({show, onHide,props={}})=>{
  const [data, setData] = useState({});
  const [input, setInput] = useState({
    testing_email:"",
    selected_pembayaran:"",
    aggrement_mediacartz:false
  })
  const [saldo, setSaldo] = useState(0);
  const {data_user, selected_company,current_campaign} = useContext(Context);
  const [balance_usage, setBalance_usage] = useState(null);
  const [original_usage, setOriginal_usage] = useState({});
  const [loading, setLoading] = useState(false);
  const [bucket, setBucket] = useState([]);
  const [product_id, setProduct_id] = useState(null);


  useEffect(()=>{
    if(show){

      if(props.props){
        api_kampanye_iklan.get_saldo(props.props?.selected_company.value)
        .then(res =>{
          if(res?.success){
            setSaldo(res.data)
          }
          console.log({get_saldo:res})
        })
      }
      if(props){
        setData(props)
      }
      console.log("ini props",props)
      if(!!selected_company.id){
        api_kampanye_iklan.get_saldo(selected_company.value)
        .then(res =>{
          if(res?.success){
            setSaldo(res.data)
          }
          console.log({get_saldo:res})
        })
      }
      if(props && (props.props.selected_channel?.name === "SMS LBA"|| props.props.selected_channel?.name === "SMS Targeted")){
        api_kampanye_iklan.get_product()
        .then(res =>{
          if(res?.success){
            console.log({get_product:res.data.find(find => find.product_name === props.props.selected_channel?.name)})
            
            if(res.data.find(find => find.product_name === props.props.selected_channel?.name)){
              let product_id = res.data.find(find => find.product_name === props.props.selected_channel?.name).product_id
  
              api_kampanye_iklan.get_bucket_detail({
                company_id:props.props.selected_company?.value,
                product_id:product_id
              })
              .then(result =>{
                if(result.success){
                  setBucket(result.data)
                }
              })
            }
            
          }
        })
      }
  
      if(props && props.props.selected_channel){
        api_kampanye_iklan.get_product()
        .then(res =>{
          if(res?.success){
            console.log({get_product:res.data.find(find => find.product_name === props.props.selected_channel?.name)})
            
            if(res.data.find(find => find.product_name === props.props.selected_channel?.name)){
              let product_id = res.data.find(find => find.product_name === props.props.selected_channel?.name).product_id
  
              setProduct_id(product_id)
            }
            
          }
        })
      }
    }
  },[show])

  console.log({data})

  const onChangeSelect = ({event}) =>{
    const body ={
      campaign_date: [{campaign_date_from_datetime: Moment(data.input.from_date), campaign_date_until_datetime: Moment(data.input.end_date)}],
      campaign_message_content: data.input.konten_builder,
      campaign_message_has_custom_parse_status: data.input.variabel.value,
      company_id: data.props.selected_company?.value,
      deduct_mode: event.value === "FULL_BALANCE" ?"FULL_BALANCE":"PARTIAL_BUCKET_BALANCE" ,
      product_id: product_id,
      recipient_id: data.input.selected_penerima.value.id
    }


    console.log({body})

    api_kampanye_iklan.post_amount({body:body})
    .then(res=>{
      console.log({post_amount:res})
      if(res?.success){
        setInput({...input, selected_pembayaran:event})
        if(res.data.balance_usage){
          setBalance_usage(res.data.balance_usage);
        }
        else{
          setBalance_usage(res.data.impression_usage)
        }
        setOriginal_usage(res.original_usage)
      }
      else{
        AlertError({title:"ERROR", text:res.error})
      }
    })
  }


  const btnKonfirmasi = () =>{
    setLoading(true)
    const formData = new FormData();

    formData.append("product_id",product_id);
    formData.append("campaign_name",data.input.nama_iklan);
    formData.append("campaign_date",data.input.from_date === null && data.input.end_date === null ? JSON.stringify([]):JSON.stringify([{"campaign_date_from_datetime":moment(data.input.from_date).format("YYYY-MM-DD HH:mm:ss"),"campaign_date_until_datetime":moment(data.input.end_date).format("YYYY-MM-DD HH:mm:ss")}]));
    formData.append("user_id",data_user.id);
    formData.append("company_id",data.props.selected_company?.value);
    formData.append("campaign_message_subject",data.input.subject_email);
    formData.append("campaign_message_content",data.input.konten_builder);
    formData.append("campaign_message_has_custom_parse_status",data.input.variabel.value);
    formData.append("recipient_id",data.input.selected_penerima.value.id);
    formData.append("template_id",data.input.selected_template.value);
    formData.append("sender_id",data.input.selected_sender.value ?data.input.selected_sender.value : "");
    formData.append("deduct_mode",input.selected_pembayaran.value);
    formData.append("campaign_message_media_file", data.input.attachment_file);
    if(current_campaign.campaign_id) formData.append("campaign_id", current_campaign.campaign_id)

   // Display the key/value pairs
    for (var pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
    }

    api_kampanye_iklan.post_campaign({body:formData})
    .then(async res =>{
      console.log({post_campaign:res})
      if(res?.success){
        await AlertSuccess({title:"SUCCESS", text:res.success});
        window.location.reload()
      }
      else{
        await AlertError({title:"ERROR", text:res.error})
      }
      setLoading(false)
    })

  }


  const BtnSimpanDraft = () =>{
    setLoading(true)
    console.log({data})
      const body={
        "product_id": product_id,
        "campaign_name": data.input.nama_iklan,
        "user_id": data_user.id,
        "company_id": data.props.selected_company?.value,
        "campaign_message_subject": data.input.subject_email,
        "campaign_message_content": data.input.konten_builder,
        "campaign_message_has_custom_parse_status": data.input.variabel.value ===1 ? true:false,
        "recipient_id": data.input.selected_penerima.value.id,
        "template_id": data.input.selected_template.value,
        "sender_id": data.input.selected_sender.value,
      }
      console.log({body})
      api_kampanye_iklan.post_draft({body})
      .then(async res=>{
        console.log({post_draft:res})
        if(res?.success){
          await AlertSuccess({title:"SUCCESS", text:res.success})
          window.location.reload()
        }
        else{
          await AlertError({title:"ERROR", text:res.error})
        }
        setLoading(false)
      })
    }

  const BtnTestRecipient = () =>{
    

    const formData = new FormData();

    formData.append("campaign_message_subject",data.input.subject_email);
    formData.append("campaign_message_content",data.input.konten_builder);
    formData.append("sender_id",data.input.selected_sender.value);
    formData.append("recipient_id",data.input.selected_penerima.value.id);
    formData.append("campaign_message_has_custom_parse_status",data.input.variabel.value);
    formData.append("product_id",data.props.selected_channel?.id);
    formData.append("user_id",data_user.id);
    formData.append("company_id",data.props.selected_company?.value);
    formData.append("testing_recipient_address",input.testing_email);


    api_kampanye_iklan.post_test({body:formData})
    .then(res =>{
      if(res?.success){
        AlertSuccess({title:"SUCCESS",text:res.success})
      }
      else{
        AlertError({title:"ERROR", text:res.error})
      }
    })
    
  }
  return(
    <Modal fullscreen show={show} onHide={onHide}>
      <Modal.Body>
        <div className="container">
          <div className="mb-3 mb-md-3">
            <HeaderPrimary color={COLOR_PRIMARY}>Konfirmasi Iklan</HeaderPrimary>
            <span>Berikut Adalah Ringkasan iklan anda dan rincian biaya</span>
          </div>

          <div className="mb-3 mb-md-3">
            <div className="row">
              <div className="col-lg-8 col-md-8">
                <ContainerAllForm>

                  <ContainerForm className="d-flex border">
                    <div style={{width:"100%", padding:"4px",color:COLOR_SECONDARY}}>
                      <strong>Perusahaan</strong>
                    </div>
                    <div style={{width:"100%", padding:"4px"}}>
                      {data.props ? data.props.selected_company?.label:null}
                    </div>
                  </ContainerForm>
                  <ContainerForm className="d-flex border">
                    <div style={{width:"100%", padding:"4px",color:COLOR_SECONDARY}}>
                      <strong>Produk</strong>
                    </div>
                    <div style={{width:"100%", padding:"4px"}}>
                      {data.props ? data.props.selected_channel?.name:null}
                    </div>
                  </ContainerForm>
                  <ContainerForm className="d-flex border">
                    <div style={{width:"100%", padding:"4px",color:COLOR_SECONDARY}}>
                      <strong>Nama Iklan</strong>
                    </div>
                    <div style={{width:"100%", padding:"4px"}}>
                      {data.input ? data.input.nama_iklan:null}
                    </div>
                  </ContainerForm>
                  <ContainerForm className="d-flex border">
                    <div style={{width:"100%", padding:"4px",color:COLOR_SECONDARY}}>
                      <strong>Sender ID</strong>
                    </div>
                    <div style={{width:"100%", padding:"4px"}}>
                      {data.input ?data.input.selected_sender.label:null}
                    </div>
                  </ContainerForm>
                  <ContainerForm className="d-flex border">
                    <div style={{width:"100%", padding:"4px",color:COLOR_SECONDARY}}>
                      <strong>Group Penerima</strong>
                    </div>
                    <div style={{width:"100%", padding:"4px"}}>
                      {data.input ?data.input.selected_penerima && data.input.selected_penerima.value.name:null}
                    </div>
                  </ContainerForm>
                  <ContainerForm className="d-flex border">
                    <div style={{width:"100%", padding:"4px",color:COLOR_SECONDARY}}>
                      <strong>Total Penerima</strong>
                    </div>
                    <div style={{width:"100%", padding:"4px"}}>
                      {data.input ? data.input.selected_penerima && data.input.selected_penerima.value.total_recipient:null}
                    </div>
                  </ContainerForm>
                  <ContainerForm className="d-flex border">
                    <div style={{width:"100%", padding:"4px",color:COLOR_SECONDARY}}>
                      <strong>Isi Konten</strong>
                    </div>
                    <div style={{width:"100%", padding:"4px"}}>
                      {data.input  ? data.input.konten_builder && data.input.konten_builder.length > 100 ? `${data.input.konten_builder.slice(0,100)} ...` : data.input.konten_builder:null }
                    </div>
                  </ContainerForm>
                  <ContainerForm className="d-flex border">
                    <div style={{width:"100%", padding:"4px",color:COLOR_SECONDARY}}>
                      <strong>Attachment</strong>
                    </div>
                    <div style={{width:"100%", padding:"4px"}}>
                    {data.input ? data.input.attachment_file.name:null}
                    </div>
                  </ContainerForm>
                  <ContainerForm className="d-flex border">
                    <div style={{width:"100%", padding:"4px",color:COLOR_SECONDARY}}>
                      <strong>Jadwal</strong>
                    </div>
                    <div style={{width:"100%", padding:"4px"}}>
                    {data.input ? data.input.from_date !== null && data.input.end_date !== null ? `${Moment(data.input.from_date)} Sampai ${Moment(data.input.end_date)}`:"Kirim Sekarang":null}
                    </div>
                  </ContainerForm>
                </ContainerAllForm>

                  {
                    data.props && (data.props.selected_channel?.name === "SMS LBA" || data.props.selected_channel?.name === "MMS LBA" ||  data.props.selected_channel?.name === "SMS Targeted"||  data.props.selected_channel?.name === "USSD Targeted") ? null:
                      <div className="mt-3 mt-md-3">
                        <Form>
                          <div>
                            <h4 style={{color:COLOR_SECONDARY}}>
                              <strong>Perlu Testing Iklan ?</strong>
                            </h4>
                            <span style={{color:"#ccc"}}>
                              {
                                `Setiap testing akan secara otomatis mendebit bucket atau saldo. Silahkan masukkan ${data.props? data.props.selected_channel?.id ===1 ? "Email" : data.props.selected_channel?.id ===2?"MSISDN" : null
                              :null
                              } penerima disini`
                              }
                            </span>
                          </div>
                          <div className="d-flex">
                            <input type="email" name="" id="" className="form-control" value={input.testing_email} onChange={e=>setInput({...input, testing_email:e.target.value})} />
                            <ButtonPrimary style={{borderRadius:"0"}} onClick={BtnTestRecipient}>Kirim</ButtonPrimary>
                          </div>
                        </Form>
                      </div>
                  }
              </div>
              <div className="col-lg-4 col-md-4">
                <div className="mb-3 mb-md-3">
                  <Form>
                    <DivSaldoText>
                      <span>Saldo Anda</span>
                    </DivSaldoText>
                    <DivSaldo>
                      <span>{FormatCurrency.currency(saldo)}</span>
                    </DivSaldo>
                  </Form>
                </div>
                {
                  data.props && (data.props.selected_channel?.name === "SMS LBA"||  data.props.selected_channel?.name === "SMS Targeted") &&
                  <div className="mb-3 mb-md-3">
                    <Form>
                      <div>
                        <DivSaldoText>
                          <span>Bucket Anda</span>
                        </DivSaldoText>
                        <ul>
                          {
                            bucket.length > 0 &&
                            bucket.map((item,indx)=>(
                              <li key={indx}>{`${item.bucket_name} (${item.bucket_impression} Sisa)`}</li>
                            ))
                          }
                        </ul>
                      </div>
                    </Form>
                  </div>
                }
                <div className="mb-3 mb-md-3">
                  <Form>
                    <div>
                      <label htmlFor="">Pembayaran</label>
                      <Select placeholder="Pilih Metode Pembayaran" value={input.selected_pembayaran} options={opt_pembayaran} onChange={(e)=>onChangeSelect({event:e})} />
                    </div>
                  </Form>
                </div>
                {
                  data.props && (data.props.selected_channel?.name === "SMS LBA" || data.props.selected_channel?.name === "SMS Targeted") ?null:
                  <div className="mb-3 mb-md-3">
                    <Form>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>Total Penerima</div>
                        <div>{original_usage.total_recipient}</div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>Harga per penerima</div>
                        <div>{FormatCurrency.currency(original_usage.base_price ?original_usage.base_price:0 )}</div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <strong>Saldo Terdebit</strong>
                        <strong>{FormatCurrency.currency(balance_usage)}</strong>
                      </div>
                    </Form>
                  </div>
                }
                {
                  data.props && (data.props.selected_channel?.name === "SMS LBA"|| data.props.selected_channel?.name === "SMS Targeted") &&
                    <div className="mb-3 mb-md-3">
                      <Form>
                        <div className="d-flex justify-content-between align-items-center">
                          <div>Total Penerima</div>
                          <div>{original_usage.total_recipient}</div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <div>Harga per penerima</div>
                          <div>{FormatCurrency.currency(original_usage.base_price ?original_usage.base_price:0 )}</div>
                        </div>
                        <div className="d-block justify-content-between align-items-center">
                          <div>Bucket Terdebit</div>
                          <div>
                            <ul>
                              {
                                bucket.length > 0 &&
                                bucket.map((item,indx)=>(
                                  <li key={indx}>{`${item.bucket_name}`}</li>
                                ))
                              }
                            </ul>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <strong>
                            {
                              input.selected_pembayaran.label === "Bucket dan saldo" ? 
                              "Impresi Terdebit":
                              "Saldo Terdebit"
                            }
                          </strong>
                          <strong>
                            {
                              input.selected_pembayaran.label === "Bucket dan saldo" ?
                              balance_usage
                              :
                              FormatCurrency.currency(balance_usage)
                            }
                          </strong>
                        </div>
                      </Form>
                    </div>
                }
              </div>
            </div>
          </div>

          <div>
            <Form>
              <div className="d-flex" style={{color:"#ccc"}}>
                <input type="checkbox" className="form-check-input" name="syarat" id="syarat" onChange={e=>setInput({...input, aggrement_mediacartz:e.target.checked})} checked={input.aggrement_mediacartz}  /> &nbsp;&nbsp;&nbsp;
                <label htmlFor="syarat">Saya menyetujui syarat dan ketentuan yang berlaku di website Mediacartz.</label>
              </div>
              <div className="mb-3" style={{color:"#ccc"}}>
                <i>
                   Atas setiap Campaign yang dibuat oleh Pengguna menggunakan Produk dan/atau Layanan melalui Portal, Pengguna dilarang untuk mempergunakan kata-kata, komentar, gambar atau konten apapun yang mengandung unsur SARA, diskriminasi, merendahkan atau menyudutkan pihak lain, vulgar, bersifat ancaman, atau hal-hal lain yang dapat dianggap tidak sesuai dengan nilai dan norma sosial.
                </i>
              </div>
              
              <div className="d-flex justify-content-around align-items-center w-50">
                {
                  loading ? "Loading ...":
                  <div className="d-flex justify-content-between">
                    <ButtonPrimary className="btn" disabled={input.aggrement_mediacartz && input.selected_pembayaran.value ? false:true} onClick={input.aggrement_mediacartz && input.selected_pembayaran.value ?btnKonfirmasi:null}>Konfirmasi & Buat Iklan</ButtonPrimary>
                    &nbsp;
                    <ButtonDanger onClick={BtnSimpanDraft}>Simpan Sebagai Draft</ButtonDanger>
                  </div>
                }
                <button className="btn border" onClick={()=>onHide()}>Kembali</button>
              </div>
            </Form>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

const DivSaldo = styled.div `
text-align:right;
color:#b49594;
`

const DivSaldoText = styled.div `
font-size:14pt;
color:${COLOR_SECONDARY};
`

const ContainerAllForm = styled.div `
box-shadow: 10px 10px 13px -9px rgba(0,0,0,0.48);
-webkit-box-shadow: 10px 10px 13px -9px rgba(0,0,0,0.48);
-moz-box-shadow: 10px 10px 13px -9px rgba(0,0,0,0.48);
`

const ContainerForm = styled.div `
background:#fff;
padding-left:10px;

&:last-child{
border-top:none !important;
};

&:not(:first-child):not(:last-child) {
  border-top:none !important;
}
`