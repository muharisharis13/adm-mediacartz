import {Method} from "../../.."

class Api_shorten_url{

  get_shorten_url =({page=1})=>{
    return Method.get(`/shortened?order_by=shortened_id&sort_by=DESC&page=${page}`)
    .then(res =>{
      return res?.data
    })
  }

  get_shorten_url_detail=(params)=>{
    return Method.get(`/shortened/${params}`)
    .then(res =>{
      return res?.data
    })
  }

  post_shorten_url = ({body}) =>{
    return Method.post(`/shortened`,body)
    .then(res =>{
      return res?.data
    })
  }
}

export default new Api_shorten_url()