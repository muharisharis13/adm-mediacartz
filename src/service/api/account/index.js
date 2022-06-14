import {Method} from "../..";

class account{

   get_user({page=1}){
    return Method.get(`user?sort_by=DESC&page=${page}`)
    .then(res =>{
      return res?.data
    })
  }

  post_user({body}){
    return Method.post(`user`,body)
    .then(res =>{
      return res?.data
    })
  }

  get_detail_user(id){
    return Method.get(`user/${id}`)
    .then(res =>{
      return res?.data
    })
  }

  get_company(){
    return Method.get(`company?company_active_status=1&company_verified_status_name=verified`)
    .then(res =>{
      return res?.data
    })
  }

  get_ms_user(){
    return Method.get(`list/ms_user`)
    .then(res =>{
      return res?.data
    })
  }

  post_link(body){
    return Method.post(`user/link`,body)
    .then(res =>{
      return res?.data
    })
  }

  delete_link({body}){
    return Method.delete(`user/link`,{
      data:body
    })
    .then(res =>{
      return res?.data
    })
  }

  get_document_ktp(id){
    return Method.get(`user/${id}/document/ktp`,{responseType:"blob"})
    .then(res =>{
      return res?.data
    })
  }

  get_document_npwp(id){
    return Method.get(`user/${id}/document/npwp`,{responseType:"blob"})
    .then(res =>{
      return res?.data
    })
  }

  post_upload_dokumen({id, body}){
    return Method.put(`user/${id}/upload`, body)
    .then(res =>{
      return res?.data
    })
  }

  

};

export default new account();