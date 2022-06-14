import React, {useEffect} from "react";
import * as Component from "../../../../component"
import * as Style from "../../../../component/style/content/default";
import * as Services from "../../../../service"
import * as Util from "../../../../util";
import styled from "styled-components"
import {useForm} from "react-hook-form"

const header = ["No", "Nomor Transaksi", "Tipe Transaksi", "Metode Pembayaran", "Tanggal", "Nama Seat", "Jumlah Total", "Total Tiket", "Status"]

export default function ModalDaftarTransaksi(props:{show:boolean,onHide:Function,data_props:any}){
  const {show, onHide,data_props} = props;
  const {
    setValue,
    getValues
  } = useForm({
    defaultValues:{
      data:[],
      page:1,
      lastPage:1,
      summary:[]
    }
  });
  const {data,page,lastPage,summary} = getValues();
  const {event_id,organizer_id} = data_props;
  const api = Services.api.ApiEvent.Event;

  useEffect(async ()=>{
    if(show === true){
      await Promise.all[
        api.getTransaction({page:page,organizer_id:organizer_id,event_id:event_id})
        .then(res =>{
          console.log(res)
          if(res?.success){
            setValue("data",res.data)
            setValue("page",res.page)
            setValue("lastPage",res.last_page)
          }
          else{
            Component.AlertError({title:"Error", text:res.error})
          }
        }),
        api.getSummary({organizer_id:organizer_id, event_id:event_id})
        .then(res =>{
          console.log(res)

          if(res?.success){
            setValue("summary",res?.data)
          }
        })
      ]
    }
  },[show])




  return(
    <Component.Modal_Component title="Daftar Transaksi" show={show} onHide={onHide} size="xl">
      <Container className="container">
        
        <div className="wrap-transaksi-info mb-3">
          <Style.HeaderSecondary color={Style.COLOR_SECONDARY}>Ringkasan Transaksi</Style.HeaderSecondary>
            {
              summary && summary.length > 0 &&
              summary.map((item:any,idx:number)=>(
                <div className="wrap-info mb-4  rounded-2 p-4  text-center" style={{border: `2px solid ${Style.COLOR_SECONDARY}`}} key={idx}>
                  <div dangerouslySetInnerHTML={{__html:Util.displayStatus(item?.transaction_approve_status_name)}} />
                  <div>
                    Total Harga Kursi: {Util.FormatCurrency.input(item?.transaction_total_seat)}
                  </div>
                  <div>
                    Total Harga Transaksi: {Util.FormatCurrency.input(item?.transaction_total_count)}
                  </div>
                  <div>
                    Jumlah Total: {Util.FormatCurrency.currency(item?.transaction_total_amount)}
                  </div>
                </div>
              ))
            }

        </div>

        <div className="wrap-table">
          <Component.TableData header={header}>
            {
              data?.length > 0 ?
              data?.map((item:any,idx:number)=>(
                <tr key={idx}>
                  <td data-label="No">
                    {Util.Numeric({idx,page})}
                  </td>
                  <td data-label="Nomor Transaksi">
                    {item.transaction_number}
                  </td>
                  <td data-label="Tipe Transaksi">
                    {item.ms_transaction?.ms_transaction_name}
                  </td>
                  <td data-label="Metode Pembayaran">
                    {item.ms_payment?.ms_payment_name}
                  </td>
                  <td data-label="Tanggal">
                    {Util.Moment(item.transaction_created_datetime)}
                  </td>
                  <td data-label="Nama Seat">
                    {item.seat_detail?.seat_detail_name}
                  </td>
                  <td data-label="Jumlah Total">
                    {Util.FormatCurrency.currency(item.transaction_total_amount)}
                  </td>
                  <td data-label="Total Tiket">
                    {Util.FormatCurrency.input(item.ticket.length > 0? item.ticket.length : 0)}
                  </td>
                  <td data-label="Status">
                    <div dangerouslySetInnerHTML={{__html:Util.displayStatus(item.transaction_approve_status_name)}} />
                  </td>
                </tr>
              ))
              :"Data Tidka Ditemukan"
            }
          </Component.TableData>
        </div>
      </Container>
    </Component.Modal_Component>
  )
}


const Container = styled.form `
  background-color: #fff;
  box-shadow: 0px 3px 6px rgb(0 0 0 / 16%);
  color: rgba(10, 10, 10, 0.9);
  max-width: 100%;
  position: relative;
  border-radius: 10px;
  padding:10px;
`