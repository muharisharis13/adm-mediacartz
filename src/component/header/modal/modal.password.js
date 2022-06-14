import React, {useState, useContext} from "react"
import {Modal_Component,LoadingIcon,AlertError,AlertSuccess} from "../../../component"
import { COLOR_PRIMARY } from "../../style/content/default"
import {Context} from "../../../service";
import {AuthService} from "../../../service/api"

export const Modal_password=(props)=>{
  const [input, setInput] = useState({
    password:"",
    re_password:""
  })
  const {data_user} = useContext(Context)
  const [loading, setLoading] = useState(false)

  return(
    <Modal_Component show={props.show} onHide={props.onHide} title="Ubah Password" btnSubmit btnName={loading ? <LoadingIcon />:"Simpan"} onClick={loading ? null :BtnSubmit}>
      <div className="container">
        <div className="mb-3 mb-md-3">
          <label style={{color:COLOR_PRIMARY}}>
            Password
          </label>
          <input type="password" className="form-control" 
            name="password" value={input.password} onChange={onChangeValue}
            
            />
        </div>
        <div className="mb-3 mb-md-3">
          <label style={{color:COLOR_PRIMARY}}>
            Ketik Ulang Password
          </label>
          <input type="password" className="form-control" 
            name="re_password" value={input.re_password} onChange={onChangeValue}
          />
        </div>
      </div>
    </Modal_Component>
  )

  function BtnSubmit(){
    setLoading(true)
    const body ={
      id: data_user.id,
      password: input.password,
      retype_password: input.re_password
    }
    AuthService.put_password({id:data_user.id, body:body})
    .then(async res =>{
      if(res?.success){
        await AlertSuccess({title:"SUCCESS", text:res.success})
        await props.onHide()
        setInput({
          password:"",
          re_password:""
        })
      }
      else{
        AlertError({title:"ERROR", text:res.error})
      }
      setLoading(false)
    })
  }

  function onChangeValue(e){
    setInput(state=>({
      ...state,
      [e.target.name] : e.target.value
    }))
  }
}