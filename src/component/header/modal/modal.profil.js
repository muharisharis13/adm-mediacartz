import React, {useState, useEffect} from "react";
import {Modal_Component} from "../../index"
import { COLOR_PRIMARY } from "../../style/content/default";
import Select from "react-select";
import {AuthService} from "../../../service/api"
import {LoadingIcon,AlertSuccess,AlertError} from "../../../component"


export const Modal_profil = (props)=>{
  const {data} = props
  const [input, setInput] = useState({
    nama:data?.name,
    kota:{
      value:data?.ms_city?.ms_city_id,
      label:data?.ms_city?.ms_city_name_full
    },
    bio:data?.bio,
    check_berlangganan:false
  })

  const [options, setOptions] = useState({
    kota:[]
  })
  const [loading, setLoading] = useState(false)

console.log("ini input",data)

useEffect(()=>{
  if(props.show){
    setInput(state=>({
      ...state,
      nama:data?.name,
      kota:{
        value:data?.ms_city?.ms_city_id,
        label:data?.ms_city?.ms_city_name_full
      },
      bio:data?.bio,
      check_berlangganan:JSON.parse(data?.subscribed_status_name)
    }))
  }
},[props.show])


  return (
    <Modal_Component show={props.show} onHide={props.onHide} title="Profil" btnName={loading ? LoadingIcon : "Simpan"} btnSubmit onClick={loading?null :btnSimpan}>
      <div className="container">
        <div className="mb-3 mb-md-3">
          <label style={{color:COLOR_PRIMARY}}>
            Nama
          </label>
          <input type="text" className="form-control" name="nama" value={input.nama} onChange={onChangeValue} />
        </div>
        <div className="mb-3 mb-md-3">
          <label style={{color:COLOR_PRIMARY}}>
            Kota
          </label>
          <Select 
            options={options.kota} value={input.kota}
            onInputChange={(e)=>onChangeSelect(e)}
            onChange={(e)=>setInput(state=>({...state, kota:e}))}
          />
        </div>
        <div className="mb-3 mb-md-3">
          <label style={{color:COLOR_PRIMARY}}>
            Bio
          </label>
          <input type="text" className="form-control" name="bio" value={input.bio} onChange={onChangeValue} />
        </div>
        <div className="mb-3 mb-md-3">
          <label style={{color:COLOR_PRIMARY}}>
            Berlangganan Newsletters
          </label>
          <div className="d-flex">
            <input  className="form-check-input" type="checkbox"  id="flexCheckDefault" 
              checked={input.check_berlangganan} onChange={e=>setInput(state=>({...state, check_berlangganan:e.target.checked}))}
            />
            <label class="form-check-label" for="flexCheckDefault">
             &nbsp; Berlangganan Newsletter untuk info produk terbaru, acara, dan promo.
            </label>
          </div>
        </div>
      </div>
    </Modal_Component>
  )

  function btnSimpan(){
    setLoading(true)
    const body ={
      name:input.nama,
      bio: input.bio,
      ms_city_id:input.kota?.value,
      subscribed_status: input.check_berlangganan === true ? 1:0
    }


    AuthService.put_ms_city(body)
    .then(async res =>{
      console.log(res)
      if(res?.success){
        await AlertSuccess({title:"SUCCESS", text:res.success})
        await props.onHide()
        await setInput({
          nama:"",
          kota:{
            value:"",
            label:""
          },
          bio:"",
          check_berlangganan:false
        })
      }
      else{
        AlertError({title:"ERROR", text:res.error})
      }
      setLoading(false)
    })
  }

  function onChangeSelect(e){
    // console.log(e)

    setTimeout(()=>{
      AuthService.get_ms_city(e)
      .then(res =>{
        console.log(res)
        if(res?.success){
          setOptions(state=>({
            ...state,
            kota:res.data.map(item=>({
              value:item.ms_city_id,
              label:item.ms_city_name_full
            }))
          }))
        }
      })
    },1000)
  }

  function onChangeValue(e){
    setInput(state=>({
      ...state,
      [e.target.name] : e.target.value
    }))
  }
}