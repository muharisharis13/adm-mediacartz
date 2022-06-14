import React,{useEffect,useState, useContext} from 'react';
import { Modal_Component,AlertSuccess, AlertError } from '../../../../component';
import { COLOR_SECONDARY, Label } from '../../../../component/style/content/default';
import Select from "react-select";
import * as api from "../../../../service/api"
import {Context} from "../../../../service"

export const Modal_hubungkan = (props) => {
  const [options, setOptions] = useState({}) //company, ms_user
  const [input, setInput] = useState({}) // selected_company, selected_ms_user
  const {data_user} = useContext(Context)
  const [loading, setLoading] = useState(false)

  
  useEffect(async ()=>{
    if(props.show){
      await api.api_account.get_company()
      .then(res =>{
        console.log({get_company:res})
        if(res?.success){
          setOptions(state=>({...state, company :res.data.map(item=>({value:item.company_id , label:item.company_name}))}))
        }
      })

      await api.api_account.get_ms_user()
      .then(res =>{
        console.log({get_ms_user:res})
        if(res?.success){
          setOptions(state=>({...state, ms_user:res.data.map(item =>({value:item.ms_user_id , label: item.ms_user_name}))}))
        }
      })
    }
  },[props.show])

  return (
    <Modal_Component show={props.show} onHide={props.onHide} title={`Hubungkan ${props.props?.user_detail?.name} Ke Perusahaan`} btnSubmit={loading?false:true} btnName="Simpan" onClick={BtnPostData} >
      <div className="container">
        <div className="mb-3 mb-md-3">
          <Label color={COLOR_SECONDARY}>Pilih Perusahaan</Label>
          <Select placeholder="Select Perusahaan" options={options.company} value={input.selected_company} onChange={(e)=>setInput(state=>({...state, selected_company:e}))} />
        </div>
        <div className="mb-3 mb-md-3">
          <Label color={COLOR_SECONDARY}>Jabatan</Label>
          <Select placeholder="Select Tipe User" options={options.ms_user} value={input.selected_ms_user} onChange={(e)=>setInput(state=>({...state, selected_ms_user:e}))} />
        </div>
      </div>
    </Modal_Component>
  )

  async function BtnPostData(){
    setLoading(true)
    const body ={
      company_id: input.selected_company?.value,
      ms_user_id: input.selected_ms_user?.value,
      user_id: props.props?.id,
    }


    await api.api_account.post_link(body)
    .then(async res =>{
      if(res?.success){
        await setInput({})
        await AlertSuccess({title:"SUCCESS",text:res.success})
        await props.onHide()
        await props.getData()
      }
      else{
        await AlertError({title:"ERROR", text:res.error})
      }
      console.log({post_link:res})
    })
    setLoading(false)
  }

};
