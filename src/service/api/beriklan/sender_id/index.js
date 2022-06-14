import { Method } from "../../.."


const api_sender_id = () => {


  const get_sender = ({ page = 1 }) => {
    return Method.get(`/sender?sort_by=DESC&page=${page}`)
      .then(res => {
        return res?.data
      })
  }

  const get_sender_detail = ({sender_id}) =>{
    return Method.get(`/sender/${sender_id}`)
    .then(res =>{
      return res?.data
    })
  }

  const get_sender_company = () =>{
    return Method.get(`/company?company_active_status=1&company_verified_status_name=verified`)
    .then(res =>{
      return res?.data
    })
  }

  const get_sender_channel = () =>{
    return Method.get(`/list/ms_inventory?order_by=ms_inventory_id&limit=30&sort_by=ASC&ms_inventory_has_sender_status_name=true`)
    .then(res =>{
      return res?.data
    })
  }

  const get_sender_product = () => {
    return Method.get(`/product?order_by=product_id&limit=30&sort_by=ASC&product_active_status_name=active&product_available_for_campaign_status_name=true&ms_product_id=1`)
    .then(res =>{
      return res?.data
    })
  }

  const get_sender_list_document = () => {
    return Method.get(`/list/document`)
    .then(res =>{
      return res?.data
    })
  }

  const Put_sender_upload_document = ({sender_id, body}) => {
    return Method.put(`/sender/${sender_id}/upload`, body)
    .then(res =>{
      return res?.data
    })
  }

  const post_sender = ({body}) => {
    return Method.post(`/sender`, body)
    .then(res =>{
      return res?.data
    })
  }

  const put_resend_verfikasi = ({sender_id})=>{
    return Method.put(`/sender/${sender_id}/resend_verification`)
    .then(res =>{
      return res?.data
    })
  }


  const put_sender = ({body, sender_id})=>{
    return Method.put(`/sender/${sender_id}`,body)
    .then(res =>{
      return res?.data
    })
  }


  return { get_sender,get_sender_company,get_sender_channel,get_sender_product,get_sender_list_document,Put_sender_upload_document,post_sender,put_resend_verfikasi,get_sender_detail,put_sender }

}


export default api_sender_id();
