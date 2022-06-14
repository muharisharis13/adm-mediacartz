import axios from "axios";
import { decrypt, encrypt } from "../encryt";
import { Cookie } from "../index"
import Cookies from "js-cookie";



const baseURL = process.env.REACT_APP_URL_CLIENT;
const timeout = 16000;

// let token2 = Cookies.get("token") ? decrypt(Cookie.get({ name: "token" })) : null;
// console.log("ini token2 ", token2)
const instance = axios.create({
  baseURL,
  timeout,
  headers: {
    "Content-Type": "application/json",
    // "Authorization": `Bearer ${token2}`
  }
});


instance.interceptors.request.use(
  async config =>{
    var token =  Cookies.get("token") ? await decrypt(Cookie.get({ name: "token" })) : "";
    config.headers["Authorization"] = `Bearer ${token}` 
    return config;
  }
)

async function refreshToken(){
  const refreshToken = Cookies.get("refreshToken") ? await decrypt(Cookie.get({ name: "refreshToken" })) : "";
  return instance.post("refresh_token", {refresh_token : refreshToken})
}

instance.setToken = (token) =>{
  instance.defaults.headers["Authorization"] = `Bearer ${token}`;
  Cookie.set({ name: "token", data: encrypt(token) })
}

let isRefreshing = false;

let requests = [];

instance.interceptors.response.use(undefined, async err =>{
  const error = err.response;
  if(error && error.status === 401){
    const config = error.config;
    if(!isRefreshing){
      isRefreshing = true
      return refreshToken().then(res =>{
        const {token, refreshToken} = res.data.data;
        Cookie.set({ name: "refreshToken", data: encrypt(refreshToken) });
        instance.setToken(token)
        requests.forEach(cb =>cb(token));
        requests = []
        return instance(config)
      })
      .catch(async res =>{
        console.error("RefreshToken Error =>", res)
        var token =  Cookies.get("token") ? await decrypt(Cookie.get({ name: "token" })) : "";
        requests.forEach(cb =>cb(token));
      })
      .finally(()=>{
        isRefreshing = false
      })
    }
    else{
      return new Promise((resolve)=>{
        requests.push((token)=>{
          config.baseURL =baseURL;
          config.headers['Authorization'] = `Bearer ${token}`;
          resolve(instance(config))
        })
      })
    }
  }
})

// instance.interceptors.request.use(
//   async config => {
//     let token = Cookies.get("token") ? decrypt(Cookie.get({ name: "token" })) : "";
//     let refreshToken = Cookies.get("refreshToken") ? decrypt(Cookie.get({ name: "refreshToken" })) : "";

//     if (token !== "") {
//       //coba encode token untuk cek exp
//       config.headers.Authorization = `Bearer ${token}`
//       const { exp } = jwt_decode(token);
//       const today = new Date().getTime()
//       const isExpired = dayjs.unix(exp).diff(dayjs()) < 1;
  
  
//       if(!isExpired) return config
  
  
//       const response = await  await axios({
//         url: `${baseURL}/refresh_token`,
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`
//         },
//         data: {
//           refresh_token: refreshToken
//         }
//       })
  
//       console.log("ini adlaah response : ", response)
      
//       if(response.data.error){
//         alert(response.data.error)
//         Cookies.remove("token")
//         Cookies.remove("refreshToken")
//         window.location.replace("/login")
//       }
//       else{
//           token = response.data.data.token;
//           refreshToken = response.data.data.refreshToken;
      
//           Cookie.set({ name: "token", data: encrypt(token) })
//           Cookie.set({ name: "refreshToken", data: encrypt(refreshToken) })
      
//           config.headers.Authorization = `Bearer ${response.data.data.token}`

//       }
//     }
    
//     return config

//   },
//   error => {
//     return Promise.reject(error)
//   }

// )


export default instance
