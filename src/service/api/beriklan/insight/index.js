import {Method} from "../../..";


class Api_insight{

  get_insight = ({page=1}) =>{
    return Method.get(`/programme?order_by=programme_id&sort_by=DESC&page=${page}`)
    .then(res =>{
      return res?.data
    })
  }

  get_insight_detail = ({insight_id}) =>{
    return Method.get(`/programme/${insight_id}`)
    .then(res =>{
      return res?.data
    })
  }

  get_company = () =>{
    return Method.get(`/company?company_active_status=1&company_verified_status_name=verified`)
    .then(res =>{
      return res?.data
    })
  }

  post_create_insight = ({body}) =>{
    return Method.post(`/programme`, body)
    .then(res =>{
      return res?.data
    })
  }

  get_campaign = ({company_id,page=1}) =>{
    return Method.get(`/campaign?page=${page}&company_id=${company_id}`)
    .then(res =>{
      return res?.data
    })
  }

  get_event_id = ({page=1}) =>{
    return Method.get(`/event/own?order_by=event_id&sort_by=DESC&page=${page}`)
    .then(res =>{
      return res?.data
    })
  }
  
  put_edit_insight = ({programme_id, body}) =>{
    return Method.put(`/programme/${programme_id}`, body)
    .then(res =>{
      return res?.data
    })
  }

  delete_insight = ({programme_id}) =>{
    return Method.delete(`/programme/${programme_id}`)
    .then(res =>{
      return res?.data
    })
  }
}

export default new Api_insight()