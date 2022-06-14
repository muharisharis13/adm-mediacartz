import { Method } from "../../..";


const api_template = () =>{

  const get_template_list = ({page=1})=>{
    return Method.get(`/template?page=${page}&sort_by=DESC`)
    .then(res =>{
      return res?.data
    })
  }
  
  const get_template_detail = ({template_id}) =>{
    return Method.get(`/template/${template_id}`)
    .then(res =>{
      return res?.data
    })
  }


  const get_media = ({template_id}) =>{
    return Method.get(`/template/${template_id}/media`,{
      responseType:"blob"
  })
    .then(res =>{
      return res?.data
    })
  }

  const get_company = () =>{
    return Method.get(`/company?company_active_status=1&company_verified_status_name=verified`)
    .then(res =>{
      return res?.data
    })
  }

  const get_channel = () =>{
    return Method.get(`/list/ms_inventory?order_by=ms_inventory_id&limit=30&sort_by=ASC&ms_inventory_has_template_status_name=true`)
    .then(res =>{
      return res?.data
    })
  }
  const post_shorten_url =({body})=>{
    return Method.post(`/shortened`, body)
    .then(res =>{
      return res?.data
    })
  }

  const post_template = ({body}) =>{
    return Method.post(`/template`,body)
    .then(res =>{
      return res?.data
    })
  }
  const put_template = ({body, template_id}) =>{
    return Method.put(`/template/${template_id}`,body)
    .then(res =>{
      return res?.data
    })
  }

  const put_upload = ({body, template_id}) =>{
    return Method.put(`/template/${template_id}/upload`,body)
    .then(res =>{
      return res?.data
    })
  }
  
  


  return {
    get_template_list,get_template_detail,get_media,get_company,get_channel, post_shorten_url,post_template,put_template,put_upload
  }
}

export default api_template()