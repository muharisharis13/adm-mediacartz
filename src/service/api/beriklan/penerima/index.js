import { Method } from "../../..";
import {AlertError} from "../../../../component";
import axios from "axios"


const api_penerima = () => {

    const get_penerima = ({sort_by="DESC", page=1}) => {
        return Method.get(`/recipient?sort_by=${sort_by}&page=${page}`)
        .then(res =>{
            return res.data
        })
    }

    const get_penerima_detail = ({recipient_id}) =>{
        return Method.get(`/recipient/${recipient_id}`)
        .then(res =>{
            return res.data
        })
    }

    

    const get_penerima_company = () =>{
        return Method.get(`/company?company_active_status=1&company_verified_status_name=verified`)
        .then(res =>{
          return res.data
        })
      }

    const get_ms_channel = ()=>{
        return Method.get(`/list/ms_channel?ms_channel_has_profiling_status_name=false`)
        .then(res =>{
            return res.data
        })
    }

    const get_product = ({ms_channe_name="BROADCAST"}) =>{
        return Method.get(`/product?product_available_for_campaign_status_name=true&relate_to_ms_channel_name=${ms_channe_name}&product_active_status_name=active&limit=*`)
        
        .then(res =>{
            return res.data
        })
    }

    const put_upload_file_receipt =({receipt_id, body})=>{
        if(receipt_id){
            return Method.put(`/recipient/${receipt_id}/upload`,body,{
                headers:{
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(res =>{
                return res.data
            })
        }
        else{
            AlertError({title:"Error Fetch", text:"Masukkan Sender ID"})
        }
    }

    const post_penerima_broadcast = ({body}) =>{
        return Method.post(`/recipient`,body)
        .then(res=>{
            return res.data
        })

    }
    const put_penerima_broadcast = ({recipient_id,body}) =>{
        return Method.put(`/recipient/${recipient_id}`,body)
        .then(res =>{
            return res.data
        })
    }

    const get_inventory = () =>{
        return Method.get(`/list/ms_channel?ms_channel_has_profiling_status_name=true`)
        .then(res =>{
            return res.data
        })
    }

    const get_ms_operator = () =>{
        return Method.get(`/list/ms_operator`)
        .then(res =>{
            return res.data
        })
    }


    const get_latlong = ({place_id}) =>{
        return axios({
            url:`https://maps.googleapis.com/maps/api/place/details/json?placeid=${place_id}&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`,
            method:"get",
            secure:false
            
        },
        )
        .then(res=>{
            return res.data
        })
    }

    const get_file = ({recipient_id}) => {
        return Method.get(`/recipient/${recipient_id}/file`)
        .then(res =>{
            return res.data
        })
    }

    const put_inactive = ({recipient_id}) =>{
        return Method.put(`/recipient/${recipient_id}/inactivate`)
        .then(res =>{
            return res.data
        })
    }
    const put_active = ({recipient_id}) =>{
        return Method.put(`/recipient/${recipient_id}/activate`)
        .then(res =>{
            return res.data
        })
    }

    const get_download_file = ({recipient_id}) => {
        return Method.get(`/recipient/${recipient_id}/file`, {
            responseType:"blob"
        })
        .then(res =>{
            return res.data
        })
    }

    const get_operating_system = () =>{
        return Method.get(`/list/ms_operating_system`)
        .then(res =>{
            return res.data
        })
    }

    const get_gender = ()=>{
        return Method.get(`/list/ms_gender`)
        .then(res => res.data)
    }

    const get_religion = () =>{
        return Method.get(`/list/ms_religion`)
        .then(res =>res.data)
    }

    const get_ms_location = () =>{
        return Method.get(`/list/ms_location`)
        .then(res =>res.data)
    }


    const post_recipient_profiling = (body) =>{
        return Method.post(`recipient/profiling`, body)
        .then(res => res.data)
    }

    const put_recipient_profiling = ({body, recipient_id}) =>{
        return Method.put(`recipient/${recipient_id}/profiling`, body)
        .then(res =>res.data)
    }

    const get_ms_city =(city) =>{
        return Method.get(`list/ms_city?ms_city_active_status=1&ms_city_name_full=${city}`)
        .then(res =>res.data)
    }

    const get_ms_district =(ms_city_id) =>{
        return Method.get(`ms_district?ms_district_active_status_name=active&ms_city_id=${ms_city_id}`)
        .then(res =>res.data)
    }

    const get_ms_village =({ms_district_array,current_ms_city_id}) =>{
        return Method.get(`ms_village?limit=*&ms_village_active_status_name=active&ms_city_id=${current_ms_city_id}&${ms_district_array}`)
        .then(res =>res.data)
    }

    const get_ms_inventory = () =>{
        return Method.get(`list/ms_inventory?order_by=ms_inventory_id&limit=30&sort_by=ASC&ms_inventory_has_profiling_status_name=true`)
        .then(res =>res.data)
    }
    

    return{
        get_penerima,get_penerima_company,get_ms_channel,get_product,put_upload_file_receipt,post_penerima_broadcast,get_inventory,get_ms_operator,get_latlong,get_penerima_detail,get_file,put_penerima_broadcast,put_inactive,put_active,get_download_file,get_operating_system,get_gender,
        get_religion,get_ms_location, post_recipient_profiling, put_recipient_profiling,get_ms_city,get_ms_district,get_ms_village,get_ms_inventory
    }
}

export default api_penerima();
