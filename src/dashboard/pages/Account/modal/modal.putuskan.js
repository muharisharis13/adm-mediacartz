import React, {useEffect, useState, useContext} from 'react';
import { Modal_Component, AlertError, AlertSuccess } from '../../../../component';
import { COLOR_SECONDARY, Label } from '../../../../component/style/content/default';
import Select from "react-select";
import * as api from "../../../../service/api"
import {Context} from "../../../../service"

export const Modal_putuskan = (props) => {
  const [options,setOptions] = useState([])
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(false);


  useEffect(()=>{
    if(props.show){
      api.api_account.get_company()
      .then(res =>{
        console.log({get_company:res})
        if(res?.success){
          setOptions(res.data.map(item=>({value:item.company_id, label:item.company_name})))
        }
      })
    }
  },[props.show])

  return (
    <Modal_Component show={props.show} onHide={props.onHide}title={`Putuskan ${props.props?.user_detail?.name} dari Perusahaan`} btnSubmit={loading?false:true} btnName="Simpan" onClick={BtnSimpan} >
      <div className="container">
        <mb-3 className="mb-md-3">
          <Label color={COLOR_SECONDARY}>Pilih Perusahaan</Label>
          <Select placeholder="Select Perusahaan" options={options} value={selected} onChange={(e)=>setSelected(e)} />
        </mb-3>
      </div>
    </Modal_Component>
  )

  function BtnSimpan(){
    setLoading(true)
    const body= {
      company_id: selected.value,
      user_id: props.props?.id
    }
    console.log(body)
    api.api_account.delete_link({body:body})
    .then(async res =>{
      console.log(res)
      if(res?.success){
        await setSelected("")
        await AlertSuccess({title:"SUCCESS", text:res.success})
        await props.getData()
        await props.onHide()
      }
      else{
        AlertError({title:"ERROR", text:res.error})
      }
    })

    setLoading(false)
  }
};
