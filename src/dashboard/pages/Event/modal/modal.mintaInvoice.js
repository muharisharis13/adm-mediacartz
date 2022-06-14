import React,{useState,useEffect} from 'react'
import * as Component from "../../../../component"
import * as Style from "../../../../component/style/content/default";
import * as Services from "../../../../service"
import * as Util from "../../../../util"
import styled from "styled-components"
import {useForm} from "react-hook-form"

const ModalMintaInvoice = (props:{show:boolean;onHide:Function,data_props:Object}) => {
  const {show,onHide,data_props} = props;
  const {register,handleSubmit,formState:{errors},setValue} = useForm();
  const [loading, setLoading] = useState(false)

  const btnSubmit = async (e)=>{
    
    console.log(e)
    try {
      const body={
        event_id:data_props?.event_id,
        organizer_id: data_props?.organizer_id,
        invoice_recipient_bank_name:e.namaBankPenerima ,
        invoice_recipient_account_name: e.namaAkunPenerima,
        invoice_recipient_account_number: e.nomorRekeningPenerima,
      }
      setLoading(true);
      await Services.api.ApiEvent.Event.postSaveInvoice({
        organizer_id:data_props?.organizer_id,
        event_id: data_props.event_id,
        body:body
      })
      .then(async res =>{
        if(res?.success){
          await data_props?.getData();
          await Component.AlertSuccess({title:"Success", text:res.success})
          await onHide();
        }
        else{
          Component.AlertError({title:"Error", text:res.error})
        }
      })
    } catch (err) {
      Component.AlertError({title:"Error",text:err})
    }
    finally{
      setLoading(false)
    }
  }

  const btnDownloadInvoice = async(invoice_number) =>{
    await Services.api.ApiEvent.Event.getDownloadInvoice({
      invoice_id:data_props?.invoice_id,
    })
    .then(res =>{
      if(res){
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(res);
        link.setAttribute('download', `invoice-${invoice_number}.pdf`);
        document.body.appendChild(link);
        link.click();
      }
      else{
        Component.AlertError({title:"Error", text:"Invoice File Not Found"})
      }
    })
  }

  useEffect(()=>{
    if(show === false){
      setValue("namaBankPenerima","")
      setValue("namaAkunPenerima","")
      setValue("nomorRekeningPenerima","")
    }
  },[show])

  console.log("error",errors)


  return (
    <Component.Modal_Component show={show} onHide={onHide} title="Request Invoice" size="xl" btnSubmit btnName={loading? <Component.LoadingIcon />:'Simpan'} onClick={handleSubmit(btnSubmit)}>
      {
        data_props?.detail?.invoice &&
        <div>
          Invoice dibuat pada {Util.Moment(data_props?.detail?.invoice?.invoice_created_datetime)} dengan status {<div dangerouslySetInnerHTML={{__html:Util.displayStatus(data_props?.detail?.invoice?.invoice_approve_status_name)}} />} <br />
          Download File : <a href={null} onClick={()=>btnDownloadInvoice(data_props?.detail?.invoice?.invoice_number)} title="Download Invoice">Download</a>
        </div>
      }
      <Container className="container">
        <div className="mb-3">
          <Style.Label color={Style.COLOR_SECONDARY}>
            Nama Bank Penerima
          </Style.Label>
          <input type="text" placeholder='Masukkan Nama Bank' className="form-control" 
            {...register("namaBankPenerima",{required:true})}
          />
          {
            errors.namaBankPenerima && "Required Input"
          }
        </div>
        <div className="mb-3">
          <Style.Label color={Style.COLOR_SECONDARY}>
            Nama Akun Penerima
          </Style.Label>
          <input type="text" placeholder='Masukkan Nama Akun' className="form-control" 
            {...register("namaAkunPenerima",{required:true})}
          />
          {
            errors.namaAkunPenerima && "Required Input"
          }
        </div>
        <div className="mb-3">
          <Style.Label color={Style.COLOR_SECONDARY}>
            Nomor Rekening Penerima
          </Style.Label>
          <input type="text" placeholder='Masukkan Nomor Rekening Penerima' className="form-control" 
            {...register(
              "nomorRekeningPenerima",
              {
                required:true,
                pattern:{
                  value:/^[0-9]+$/,
                  message:"Please Input Number Only !"
                }
              }
            )}
            pattern="[+-]?\d+(?:[.,]\d+)?"
          />
          {
            errors?.nomorRekeningPenerima?.message &&errors?.nomorRekeningPenerima?.message 
          }
        </div>
      </Container>
    </Component.Modal_Component>
  )
}

export default ModalMintaInvoice;

const Container = styled.form `
  background-color: #fff;
  box-shadow: 0px 3px 6px rgb(0 0 0 / 16%);
  color: rgba(10, 10, 10, 0.9);
  max-width: 100%;
  position: relative;
  border-radius: 10px;
  padding:10px;
`