import React, {useEffect , useState} from "react";
import { Modal_Component, AlertSuccess,AlertError } from "../../../../../component";
import { COLOR_SECONDARY, Label } from "../../../../../component/style/content/default";
import {api_sender_id} from "../../../../../service/api"



export const Modal_upload_dokumen = ({show, onHide, sender_id, getData1}) => {

  const [dokumen, setDokumen] = useState({
    surat_penunjuk:"",
    format_pesan:""
  });
  const [files, setFiles] = useState({
    surat_penunjuk:"",
    format_pesan:""
  })
  const [loading , setLoading] = useState(false)

  const getData =async () =>{
    await api_sender_id.get_sender_list_document()
    .then(res =>{
      console.log({get_sender_list_document:res})
      if(res?.success){
        setDokumen({...document,
          surat_penunjuk:res.data.find(fil =>fil.file_name ==="appointment_letter_file").file_path,
          format_pesan:res.data.find(fil =>fil.file_name ==="data_form_file").file_path,
        })
      }
    })
  }

  useEffect(()=>{
    if(show){
      getData()
    }
  },[show])

  const btnUpload = async()=>{
    setLoading(true)
    const formData = new FormData()

    formData.append("sender_appointment_letter_file",files.surat_penunjuk[0])
    formData.append("sender_data_form_file",files.format_pesan[0])
    formData.append("sender_id",sender_id)

    await api_sender_id.Put_sender_upload_document({body:formData, sender_id:sender_id})
    .then(async res =>{
      console.log({Put_sender_upload_document:res})
      if(res?.success){
        await AlertSuccess({title:"SUCCESS", text:res.success});
        await onHide();
        await getData1();
        await setFiles({
          surat_penunjuk:"",
          format_pesan:""
        })
      }
      else{
        AlertError({title:"ERROR", text:res.error})
      }
      setLoading(false)
    })
  }

    return (
      <Modal_Component show={show} onHide={onHide} title="Upload Dokumen" btnSubmit={loading?false:true} btnName="Upload Dokumen" onClick={btnUpload}>
        <div className="container">
          <div className="mb-3 mb-md-3" style={{display:"flex", flexDirection:"column"}}>
            <Label color={COLOR_SECONDARY} className="mb-2">Surat Penunjuk .Zip</Label>
            <a href={dokumen.surat_penunjuk} target="_blank" style={{color:COLOR_SECONDARY}}>Download Contoh Surat</a>
            <input type="file" name="" id="" className="form-control" onChange={e =>setFiles({...files, surat_penunjuk:e.target.files})} disabled={loading?true:false} />
          </div>
          <div className="mb-3 mb-md-3" style={{display:"flex", flexDirection:"column"}}>
            <Label color={COLOR_SECONDARY} className="mb-2">Form Pengumpulan Data .Zip</Label>
            <a href={dokumen.format_pesan} target="_blank" style={{color:COLOR_SECONDARY}}>Download Contoh Surat</a>
            <input type="file" name="" id="" className="form-control" onChange={e =>setFiles({...files, format_pesan:e.target.files})} disabled={loading?true:false} />
          </div>
        </div>
      </Modal_Component>  
    )
}