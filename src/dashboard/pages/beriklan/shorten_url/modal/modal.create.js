import React, {useState} from "react"
import {AlertError, AlertSuccess, Modal_Component} from "../../../../../component"
import { COLOR_SECONDARY, Label } from "../../../../../component/style/content/default"
import { api_shorten_url } from "../../../../../service/api";


export const Modal_create = ({show,onHide,getData}) =>{
  const [input, setInput] = useState("https://");
  const [loading , setLoading] = useState(false)


  const btnSimpan = async() =>{
    setLoading(true)
    const body={
      shortened_original_link:input
    }

    await api_shorten_url.post_shorten_url({body:body})
    .then(async res =>{
      console.log({post_shorten_url:res})
      if(res?.success){
        await AlertSuccess({title:"SUCCESS", text:res.success})
        await getData()
        await setInput("https://")
        await onHide()
      }
      else{
        AlertError({title:"ERROR", text:res.error})
      }
    })
    setLoading(false)
  }
  return (
    <Modal_Component show={show} onHide={onHide} title="Perpendek URL" btnSubmit={loading?false:true} btnName="Simpan" onClick={btnSimpan}>
      <div className="container">
        <div className="mb-3 mb-md-3">
          <Label color={COLOR_SECONDARY}>Original Link</Label>
          <input type="text" className="form-control" placeholder="Masukkan URL yang inginn diperpendek" value={input} onChange={(e)=>setInput(e.target.value)} />

        </div>
      </div>
    </Modal_Component>
  )
}