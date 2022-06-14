import Cookies from "js-cookie";



const Cookie = () => {


  const get = function ({ name }) {
    return Cookies.get(name)
  }

  const set = ({ name, data }) => {
    return Cookies.set(name, data, { expires: 7 })
  }


  return { get, set }
}

export default Cookie()