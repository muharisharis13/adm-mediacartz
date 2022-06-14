import React from 'react'
import * as Component from "../../../../component"
import * as Style from "../../../../component/style/content/default"
import * as Services from "../../../../service"
import styled from "styled-components"
import {useForm} from "react-hook-form"


const ModalScanTiket = (props:{show:boolean,onHide:Function}) => {
  const {show,onHide} = props;
  const {
    register,
    handleSubmit,
    setValue
  }=useForm();


  const delay = (function () {
		let timer = 0;
		return function (callback, ms) {
			clearTimeout(timer);
			timer = setTimeout(callback, ms);
		};
	})();

  const onChangeSubmit = (e) =>{
      console.log(e)
    try{
      const body={
        ticket_booking_number:e.booking_tiket
      }

      delay(()=>{
        Services.api.ApiEvent.Event.putScanTiket(body)
        .then(async res =>{
          if(res.success){
            await Component.AlertSuccess({title:"Success", text:res.success})
            await setValue("booking_tiket","")
          }
          else{
            await Component.AlertError({title:"Error Response", text:res.error})
          }
        })
      },1000)
    }
    catch(err){
      Component.AlertError({title:"Error", text:err})
    }
  }

  return (
    <Component.Modal_Component size="xl" show={show} onHide={onHide} title="Scan Tiket">
      <Container className='container'>
        <Style.Label color={Style.COLOR_SECONDARY}>
          Nomor Booking Tiker
        </Style.Label>
        <input type="text" placeholder="Masukkan Nomor Booking Tiket" className="form-control"
          {...register("booking_tiket")} onChange={handleSubmit(onChangeSubmit)}
        />
      </Container>
    </Component.Modal_Component>
  )
}

export default ModalScanTiket;

const Container = styled.form `
  background-color: #fff;
  box-shadow: 0px 3px 6px rgb(0 0 0 / 16%);
  color: rgba(10, 10, 10, 0.9);
  max-width: 100%;
  position: relative;
  border-radius: 10px;
  padding:10px;
`