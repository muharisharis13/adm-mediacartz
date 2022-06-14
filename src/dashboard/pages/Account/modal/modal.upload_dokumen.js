import React, {useEffect, useState, useContext} from 'react';
import { Modal_Component,AlertSuccess, AlertError } from '../../../../component';
import { COLOR_SECONDARY, Label } from '../../../../component/style/content/default';
import * as api from "../../../../service/api"
import {Context} from "../../../../service";
import styled from "styled-components"

export const Modal_upload_dokumen = (props) => {
  const [data, setData] = useState({});
  const [input, setInput] = useState({});
  const [loading, setLoading] = useState(false)

  useEffect(async ()=>{
    if(props.show){
      api.api_account.get_document_ktp(props.props?.id)
      .then(res =>{
        console.log({ktp:res})
        if(res){
          setData(state=>({...state, ktp:URL.createObjectURL(res)}))
        }
      })

      api.api_account.get_document_npwp(props.props?.id)
      .then(res =>{
        console.log({npwp:res})
        if(res){
          setData(state=>({...state, npwp:URL.createObjectURL(res)}))
        }
      })
    }

  },[props.show])

  return (
    <Modal_Component show={props.show} onHide={props.onHide} title="Upload Dokumen" btnSubmit={loading ? false:true} btnName="Upload Dokumen" onClick={btnuploadDokumen}>
      <Container className="container">
        <div className="mb-3 mb-md-3">
          <Label color={COLOR_SECONDARY}>KTP</Label>
          <div>
            <img src={data.ktp} alt="img" className='mb-3 mb-md-3' />
            <input type="file" className="form-control" name="ktp" onChange={(e)=>handlOnchangeFile(e)} />
          </div>
        </div>
        <div className="mb-3 mb-md-3">
          <Label color={COLOR_SECONDARY}>NPWP</Label>
          <div>
            <img src={data.npwp} alt="img" className='mb-3 mb-md-3' />
            <input type="file" className="form-control" name="npwp" onChange={(e)=>handlOnchangeFile(e)} />
          </div>
        </div>
      </Container>
    </Modal_Component>
  )

  function handlOnchangeFile (e){
    setInput(state=>({...state, [e.target.name]: e.target.files[0]}))
  }

  function btnuploadDokumen(){
    setLoading(true)
    const formData = new FormData();
     
    formData.append("ktp_file", input.ktp)
    formData.append("npwp_file", input.npwp)
    formData.append("user_id", props.props?.id)

    api.api_account.post_upload_dokumen({id:props.props?.id, body:formData})
    .then(async res =>{
      console.log({post_upload:res})
      if(res?.success){
        await AlertSuccess({title:"SUCCESS", text:res.success});
        await props.onHide();
        await props.getData();
      } 
      else{
        await AlertError({title:"ERROR", text:res.error})
      }
    })

    setLoading(false)
  }
};

const Container = styled.div `
img{
  width:300px;
  object-fit:contain;
}
`
