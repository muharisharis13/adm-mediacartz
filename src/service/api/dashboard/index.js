import { Method } from "../..";


const Error = (data) => { throw new Error(data) }


const DashboardService = () => {
  function user(id) {
    return Method.get(`/user/${id}`)
      .then(response => {
        // if (response.data.error) throw new Error(response.data.error)
        return response;

      })
      .catch(err => err)
  }


  function get_campaign(company_id, last = 7) {
    return Method.get(`/company/${company_id}/dashboard?last=${last}`)
      .then(response => {
        // if (response.error) throw new Error(response.error)
        return response;

      })
  }

  function get_company(company_id) {
    return Method.get(`/company/${company_id}`)
      .then(res => {
        if (res.data.error) throw new Error(res.data.error);
        return res?.data
      })
  }


  function get_balance(company_id) {
    return Method.get(`/balance/company/${company_id}`)
      .then(res => {
        // if (res.data.error) throw new Error(res.data.error);
        return res?.data
      })
  }

  function get_bucket(company_id){
    return Method.get(`bucket/company/${company_id}`)
    .then(res=>res?.data)
  }

  function get_list({company_id,last}){
    return Method.get(`company/${company_id}/dashboard?last=${last}`)
    .then(res =>res?.data)

  }


  function get_balance_list({company_id,page}){
    return Method.get(`balance?company_id=${company_id}&page=${page}`)
    .then(res => res?.data)
  }


  return { user, get_campaign, get_company, get_balance,get_bucket,get_list, get_balance_list}
}

export default DashboardService();
