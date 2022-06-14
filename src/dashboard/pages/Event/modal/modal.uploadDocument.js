import React, {useEffect, useState} from 'react';
import * as Util from "../../../../util"
import * as Component from "../../../../component"
import * as Style from "../../../../component/style/content/default"
import * as Services from "../../../../service";
import {useForm} from "react-hook-form"

const ModalUploadDocument = (props:{show:Boolean,onHide:Function,data_props:any}) => {
  const {show,onHide,data_props} = props;
  const {organizer_id,organizer_npwp,uploaded_datetime,npwp_file_blob,getList} = data_props
  const {
    register,
    handleSubmit,
    reset,
    formState:{
      errors
    }
  } = useForm();
  const api = Services.api.ApiEvent.Organizer;
  const [loading,setLoading] = useState(false)


  const btnSubmitting = async(e) => {
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append("organizer_npwp_file", e?.file_npwp[0])
      formData.append("organizer_npwp", e.npwp)

      for (var pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    }
      await api.putUploadDocument(formData,organizer_id)
      .then(async res =>{
        if(res.success){
          await Promise.all([
            getList(),
            Component.AlertSuccess({title:"Success", text:res.success}),
            onHide(),
            reset({})
          ])
        }
        else{
           Component.AlertError({title:"Error",text:res.error})
        }
      })

    } catch (err) {
      Component.AlertError({title:"Error", text:err})
    }
    finally{
      setLoading(false)
    }
  }

  
  
  return (
    <Component.Modal_Component size="xl" title="Upload Dokumen" show={show} onHide={onHide} btnSubmit btnName={loading ? <Component.LoadingIcon />:"Simpan"} onClick={handleSubmit(btnSubmitting)}>
      <section className="container">
        {
          data_props?.uploaded_datetime &&
          <div className="mb-3">
            Di Upload pada tanggal {Util.Moment(data_props?.uploaded_datetime)}
          </div>
        }
        <div className="mb-3">
          <Style.Label color={Style.COLOR_SECONDARY}>
              Nomor Npwp          
          </Style.Label>
          <input type="number" name="" id="" placeholder='Masukkan Nomor NPWP' className="form-control" 
            {...register("npwp",{required:true})}
          />
          {
            errors?.npwp && "Please Input Npwp"
          }
        </div>
        <div className="mb-3">
          <Style.Label color={Style.COLOR_SECONDARY}>
              Unggah File NPWP          
          </Style.Label>
          <input type="file" name="" id="" className="form-control" 
            {...register("file_npwp",{required:true})}
          />
          {
            errors?.file_npwp && "Please Input File Npwp"
          }
          {
            data_props?.npwp_file_blob &&
              <img src={data_props?.npwp_file_blob} width="300" alt="" />
          }
        </div>
      </section>
    </Component.Modal_Component>
  )
}

export default ModalUploadDocument