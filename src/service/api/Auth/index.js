import { Method } from "../..";


const Error = (data) => { throw new Error(data) }


const AuthService = () => {

  function loginUser(body) {
    return Method.post("/login", body)
      .then(response => {
        // if (response.data.error) throw new Error(response.data.error)
        console.log("ini response", response)
        return response.data;

      })
  }

  function registerUser({ body, url }) {
    return Method.post("/register", body)
      .then(res => {
        // if (res.data.error) Error(res.data.error)
        return res.data;
      })
  }


  function forgotPasswordUser({ body, url }) {
    return Method.post("/recover_password", body)
      .then(res => {
        if (res.data.error) Error(res.data.error)
        return res.data;
      })
  }

  function loginUserWithGoogle(body){
    return Method.post("/login/google", body)
    .then(res =>{
      if(res.data.error) Error(res.data.error)
      return res.data
    })
  }

  function logoutUser(body){
    return Method.post(`/logout`,body)
    .then(res =>{
      if(res.data.error) Error(res.data.error)
      return res.data
    })
  }

  function profile(){
    return Method.get(`profile`)
    .then(res => res.data)
  }

  function get_ms_city(ms_city_name_full){
    return Method.get(`list/ms_city?ms_city_active_status=1&ms_city_name_full=${ms_city_name_full}`)
    .then(res => res.data)
  }

  function put_ms_city(body){
    return Method.put(`profile`, body)
    .then(res =>res.data)
  }

  function put_password({id,body}){
    return Method.put(`user/${id}/password`,body)
    .then(res =>res.data)
  }

  return { loginUser, registerUser, forgotPasswordUser,loginUserWithGoogle,logoutUser,profile,get_ms_city,put_ms_city,put_password }
}


export default AuthService()