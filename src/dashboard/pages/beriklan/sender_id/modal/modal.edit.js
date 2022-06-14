
import React, { useEffect, useState, useContext } from "react"
import { Modal_Component, AlertError,AlertSuccess } from "../../../../../component";
import Select from "react-select"
import { Label, COLOR_SECONDARY } from "../../../../../component/style/content/default";
import { api_sender_id } from "../../../../../service/api";
import {Context} from "../../../../../service"


export const Modal_edit_sender = ({ show, onHide,getData1, sender_id }) => {
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



  const [files, setFiles] = useState({
    surat_penunjuk:"",
    format_pesan:""
  })

  const {data_user} = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [props, setProps] = useState({})


  const getData = async () => {
    await api_sender_id.get_sender_detail({sender_id})
    .then(res =>{
        console.log({get_sender_detail:res})
        if(res?.success){
            setProps(res.data)

            setSelected({...selected, inventory:({value:{ms_channel_id:  res.data.ms_channel.ms_channel_id , ms_inventory_id :  res.data.ms_inventory.ms_inventory_id} , label: `${ res.data.ms_inventory.ms_inventory_identifier} ${ res.data.ms_channel.ms_channel_name}`})})
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
  }

  useEffect(() => {
    if(show){
      getData()
    }

    
  }, [show])


  const btnSimpan = async() => {
      setLoading(true)
    await api_sender_id.put_sender({body:props, sender_id:sender_id})
    .then(async res =>{
        console.log({put_sender:res});
        if(res?.success){
            await AlertSuccess({title:"SUCCESS", text:res.success});
            await onHide()
            await getData1()
        }
        else{
            await AlertError({title:"ERROR", text:res.error})
        }
        setLoading(false)
    })
  }

  return (
    <Modal_Component show={show} onHide={onHide} title="Sender ID" btnSubmit={loading?false :true} btnName="Simpan" onClick={btnSimpan} >
      <section className="container">
        <div className="mb-3 mb-md-3">
          <Label color={COLOR_SECONDARY}>Pilih Perusahaan</Label>
          <Select placeholder="Pilih Perusahaan ..." isDisabled={true} value={({value:props.company && props.company.company_id , label: props.company && props.company.company_name})} />
        </div>
        <div className="mb-3 mb-md-3">
          <div className="row">
            {/* <div className="col-lg-6 col-md-6 col-sm-12 mb-sm-3">
              <Label color={COLOR_SECONDARY}>Channel</Label>
              <Select placeholder="Pilih Tipe Channel ..." options={optns.channel} />
            </div> */}
            <div className="col-lg-12 col-md-12 col-sm-12 mb-sm-3">
              <Label color={COLOR_SECONDARY}>Inventory</Label>
              <Select placeholder="Pilih Tipe Inventory ..." options={optns.inventory}  onChange={(e)=>setSelected({...selected,inventory:e})} isDisabled={loading?true:false} value={selected.inventory} />
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        {
          (selected.inventory.label ==="Email Broadcast" ||selected.inventory.label ==="EMAIL BROADCAST") &&
          <div>
            <div className="mb-3 mb-md-3">
              <Label color={COLOR_SECONDARY}>Sender Name</Label>
              <input type="text" className="form-control" placeholder="Masukkan Sender Name" value={props.sender_name} onChange={e=>setProps({...props, sender_name:e.target.value})} disabled={loading?true:false} />
            </div>
            <div className="row">
              <div className="col-md-6 col-lg-6 col-sm-12">
                <Label color={COLOR_SECONDARY}>Email Sender</Label>
                <input type="email" className="form-control" placeholder="Masukkan Email Pengirim" value={props.sender_email} onChange={e=>setProps({...props, sender_email:e.target.value})} disabled={loading?true:false} />
              </div>
              <div className="col-md-6 col-lg-6 col-sm-12">
                <Label color={COLOR_SECONDARY}>Reply-to</Label>
                  <input type="email" className="form-control" placeholder="Masukkan Email Reply-to" value={props.sender_reply_to} onChange={e=>setProps({...props, sender_reply_to: e.target.value})} disabled={loading?true:false} />
              </div>
            </div>
          </div>
        }

        
        {
          (selected.inventory.label === "SMS Broadcast" || selected.inventory.label === "SMS BROADCAST") &&
          <section>
            <div className="mb-3 mb-md-3">
              <Label color={COLOR_SECONDARY}>Sender ID</Label>
                <input type="text" className="form-control" placeholder="Masukkan Sender ID"  value={props.sender_name} onChange={e=>setProps({...props, sender_name:e.target.value})} disabled={loading?true:false} />
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
          (selected.inventory.label === "SMS LBA" ||(selected.inventory.label === "SMS Targeted" || selected.inventory.label === "SMS TARGETED") || selected.inventory.label === "MMS LBA" || (selected.inventory.label === "USSD Targeted" ||selected.inventory.label === "USSD TARGETED")) &&
          <section>
            <div className="mb-3 mb-md-3">
                <Label color={COLOR_SECONDARY}>Sender ID</Label>
                <input type="text" className="form-control" placeholder="Masukkan Sender ID" value={props.sender_name} onChange={e=>setProps({...props, sender_name:e.target.value})} disabled={loading?true:false} />
              </div>
          </section>
        }
        
      </section>
    </Modal_Component>
  )
}