
import React, { useEffect, useState, useContext } from "react"
import { Modal_Component, AlertError,AlertSuccess } from "../../../../../component";
import Select from "react-select"
import { Label, COLOR_SECONDARY } from "../../../../../component/style/content/default";
import { api_sender_id } from "../../../../../service/api";
import {Context} from "../../../../../service"


export const Modal_tambah_sender = ({ show, onHide,getData1,props={} }) => {
  const [optns, setOptns] = useState({
    company: [],
    channel:[],
    inventory:[]
  })
  const [selected, setSelected] = useState({
    inventory:"",
    perusahaan:""
  })

  const [document, setDocument] = useState({
    surat_penunjuk:"",
    format_pesan:""
  })

  const [data, setData] = useState({
    company_id: null,
    ms_channel_id: null,
    ms_inventory_id: null,
    sender_email: "",
    sender_name: "",
    sender_reply_to: "",
    user_id: null
  })


  const [files, setFiles] = useState({
    surat_penunjuk:"",
    format_pesan:""
  })

  const {data_user} = useContext(Context);
  const [loading, setLoading] = useState(false)


  const getData = async () => {
    await api_sender_id.get_sender_company({})
      .then(res => {
        console.log({ get_sender_company: res })
        if (res.success) {
          setOptns(state => ({ ...state, company: res.data.map(item => ({ value: item.company_id, label: `${item.company_name} (${item.category_company.category_company_name})` })) }))
        }
      })

    await api_sender_id.get_sender_product()
    .then(res =>{
      console.log({get_sender_product:res})
      if(res?.success){
        setOptns(state =>({...state, inventory:res.data.map(item => ({value:({ms_channel_id : item.ms_channel.ms_channel_id, ms_inventory_id: item.ms_inventory.ms_inventory_id}), label:item.product_name}))}))
      }
    })
    
    await api_sender_id.get_sender_list_document()
    .then(res =>{
      console.log({get_sender_list_document:res})
      if(res?.success){
        setDocument({...document,
          surat_penunjuk:res.data.find(fil =>fil.file_name ==="appointment_letter_file").file_path,
          format_pesan:res.data.find(fil =>fil.file_name ==="data_form_file").file_path,
        })
      }
    })


    await api_sender_id.get_sender_channel()
    .then(res =>{
      console.log({get_sender_channel:res})
    })

    if(props){
      await setSelected(state=>({...state, 
        perusahaan : props.selected_company, 
        inventory:{value:{
          ms_inventory_id:props.selected_inv?.id,
          ms_channel_id:props.selected_channel?.id
      }, label:props.selected_channel?.name}}))
    }
  }

  useEffect(() => {
    if(show){
      getData()
    }
  }, [show])



  const btnSimpan = async() => {
    await setLoading(true)
    const body ={
      company_id: selected.perusahaan.value,
      ms_channel_id: selected.inventory.value.ms_channel_id,
      ms_inventory_id: selected.inventory.value.ms_inventory_id,
      sender_email: data.sender_email,
      sender_name: data.sender_name,
      sender_reply_to: data.sender_reply_to,
      user_id: data_user.id
    }
    console.log({body})

    await api_sender_id.post_sender({body:body})
    .then(async res =>{

      if(res?.success){
        if(selected.inventory.label === "SMS Broadcast"){
          const formData = new FormData()
          formData.append("sender_appointment_letter_file", files.surat_penunjuk[0])
          formData.append("sender_data_form_file", files.format_pesan[0])
          formData.append("sender_id", res.data.sender_id);
          await api_sender_id.Put_sender_upload_document({sender_id:res.data.sender_id, body:formData})
          .then(async res =>{
            console.log({put_sender_upload_document: res})
            if(res?.success){
              await AlertSuccess({title:"SUCCESS", text:res.success});
              if(!props){
                await getData1()
              }
              await onHide()
              setData({
                company_id: null,
                ms_channel_id: null,
                ms_inventory_id: null,
                sender_email: "",
                sender_name: "",
                sender_reply_to: "",
                user_id: null
              })
              setDocument({
                surat_penunjuk:"",
                format_pesan:""
              })
              setSelected({
                inventory:"",
                perusahaan:""
              })
            }
          })
        }
        else{
          console.log({post_sender:res})
          await AlertSuccess({title:"SUCCESS", text:res.success})
          if(!props){
            await getData1()
          }
          await onHide()
          setData({
            company_id: null,
            ms_channel_id: null,
            ms_inventory_id: null,
            sender_email: "",
            sender_name: "",
            sender_reply_to: "",
            user_id: null
          })
          setDocument({
            surat_penunjuk:"",
            format_pesan:""
          })
          setSelected({
            inventory:"",
            perusahaan:""
          })
        }

      }
      else{
        await AlertError({title:"ERROR", text:res.error})
      }

      await setLoading(false)
      
    })
  }

  return (
    <Modal_Component show={show} onHide={onHide} title="Sender ID" btnSubmit={loading?false :true} btnName="Simpan" onClick={btnSimpan} >
      <section className="container">
        <div className="mb-3 mb-md-3">
          <Label color={COLOR_SECONDARY}>Pilih Perusahaan</Label>
          <Select placeholder="Pilih Perusahaan ..." options={optns.company} value={selected.perusahaan} onChange={(e)=>setSelected({...selected, perusahaan:e})} isDisabled={loading || (props&&props.selected_company?.value)?true:false} />
        </div>
        <div className="mb-3 mb-md-3">
          <div className="row">
            {/* <div className="col-lg-6 col-md-6 col-sm-12 mb-sm-3">
              <Label color={COLOR_SECONDARY}>Channel</Label>
              <Select placeholder="Pilih Tipe Channel ..." options={optns.channel} />
            </div> */}
            <div className="col-lg-12 col-md-12 col-sm-12 mb-sm-3">
              <Label color={COLOR_SECONDARY}>Inventory</Label>
              <Select placeholder="Pilih Tipe Inventory ..." options={optns.inventory} value={selected.inventory} onChange={(e)=>setSelected({...selected,inventory:e})} isDisabled={loading || (props && props.selected_channel?.id)?true:false} />
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        {
          selected.inventory.label ==="Email Broadcast" &&
          <div>
            <div className="mb-3 mb-md-3">
              <Label color={COLOR_SECONDARY}>Sender Name</Label>
              <input type="text" className="form-control" placeholder="Masukkan Sender Name" value={data.sender_name} onChange={e=>setData({...data, sender_name:e.target.value})} disabled={loading?true:false} />
            </div>
            <div className="row">
              <div className="col-md-6 col-lg-6 col-sm-12">
                <Label color={COLOR_SECONDARY}>Email Sender</Label>
                <input type="email" className="form-control" placeholder="Masukkan Email Pengirim" value={data.sender_email} onChange={e=>setData({...data, sender_email:e.target.value})} disabled={loading?true:false} />
              </div>
              <div className="col-md-6 col-lg-6 col-sm-12">
                <Label color={COLOR_SECONDARY}>Reply-to</Label>
                  <input type="email" className="form-control" placeholder="Masukkan Email Reply-to" value={data.sender_reply_to} onChange={e=>setData({...data, sender_reply_to: e.target.value})} disabled={loading?true:false} />
              </div>
            </div>
          </div>
        }

        
        {
          selected.inventory.label === "SMS Broadcast" &&
          <section>
            <div className="mb-3 mb-md-3">
              <Label color={COLOR_SECONDARY}>Sender ID</Label>
                <input type="text" className="form-control" placeholder="Masukkan Sender ID"  value={data.sender_name} onChange={e=>setData({...data, sender_name:e.target.value})} disabled={loading?true:false} />
            </div>

            <div className="row">
              <div className="col-md-6 col-lg-6 col-sm-12 d-block">
                <div style={{display:"flex", flexDirection:"column"}}>
                  <Label color={COLOR_SECONDARY}>Surat Penunjukan .ZIP</Label>
                  <a style={{color:COLOR_SECONDARY}} href={document.surat_penunjuk} target="_blank">Download contoh surat</a>
                  <input type="file" className="form-control" placeholder="Pilih File" accept=".zip" onChange={e =>setFiles({...files, surat_penunjuk:e.target.files})} disabled={loading?true:false} />
                </div>

              </div>
              <div className="col-md-6 col-lg-6 col-sm-12">
                <div style={{display:"flex", flexDirection:"column"}}>
                  <Label color={COLOR_SECONDARY}>Data Format Pesan .ZIP</Label>
                  <a style={{color:COLOR_SECONDARY}} href={document.format_pesan} target="_blank">Download contoh surat</a>
                  <input type="file" className="form-control" placeholder="Pilih File" accept=".zip" onChange={e =>setFiles({...files, format_pesan:e.target.files})} disabled={loading?true:false}  />
                </div>
              </div>
            </div>
          </section>
        }

        {
          (selected.inventory.label === "SMS LBA" ||selected.inventory.label === "SMS Targeted" || selected.inventory.label === "MMS LBA" || selected.inventory.label === "USSD Targeted") &&
          <section>
            <div className="mb-3 mb-md-3">
                <Label color={COLOR_SECONDARY}>Sender ID</Label>
                <input type="text" className="form-control" placeholder="Masukkan Sender ID" value={data.sender_name} onChange={e=>setData({...data, sender_name:e.target.value})} disabled={loading?true:false} />
              </div>
          </section>
        }
        
      </section>
    </Modal_Component>
  )
}