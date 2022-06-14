import React from 'react';
import * as Util from "../../../../util";
import * as Modal from "./modal.detail/index";
import * as Services from "../../../../service";
import * as Component from "../../../../component";
import * as Style from "../../../../component/style/content/default";


const header = ["Tanggal Event", "Tipe Seat", "Nama Seat", "Jumlah Seat", "Tipe Harga", "Nominal Harga", "Donasi Min", "Pembelian Maks", "Status", "Aksi"]

const dataMore = [
  {name:"Nonaktifkan"},
  {name:"Aktifkan"},
]

const ModalSeatDetail = (props:{show:Boolean, onHide:Function,dataProps:any}) => {
  const {show, onHide,dataProps} = props
  const {detail,layoutBlob} = dataProps


  const BtnAksi = (seat_detail_id,seat_id,name)=>{
    console.log({seat_detail_id,seat_id,name})
    
    switch (name) {
      case "Nonaktifkan":
        Component.AlertQuestion({title:"Warning", text:"Do you want to inactivate this ?"})
        break;
      case "Aktifkan":
        Component.AlertQuestion({title:"Warning", text:"Do you want to activate this ?"})
        break;
    
      default:
        break;
    }
  }

  return (
    <Component.Modal_Component title="Detail Seat" show={show} onHide={onHide} fullscreen>
      <div className="wrap-image-seat">
        <img src={layoutBlob} alt="" style={{width:"100%"}} />
      </div>

      <div className="wrap-data-detail mt-5">
        <div className="field d-flex align-items-center" style={{background:"#fff", borderBottom:"thin solid #ccc", padding:"4px 4px"}}>
          <strong className="text-title" style={{minWidth:"40%",color:Style.COLOR_SECONDARY}}>
            Nama Event
          </strong>
          <div className="text-content">
            {detail?.event?.event_name}
          </div>
        </div>
        <div className="field d-flex align-items-center" style={{background:"#fff", borderBottom:"thin solid #ccc", padding:"4px 4px"}}>
          <strong className="text-title" style={{minWidth:"40%",color:Style.COLOR_SECONDARY}}>
            Jumlah Total Seat
          </strong>
          <div className="text-content">
            {detail?.seat_total_quantity}
          </div>
        </div>
        <div className="field d-flex align-items-center" style={{background:"#fff", borderBottom:"thin solid #ccc", padding:"4px 4px"}}>
          <strong className="text-title" style={{minWidth:"40%",color:Style.COLOR_SECONDARY}}>
            Tanggal Dibuat
          </strong>
          <div className="text-content">
            {Util.Moment(detail?.seat_created_datetime)}
          </div>
        </div>
        <div className="field d-flex align-items-center" style={{background:"#fff", borderBottom:"thin solid #ccc", padding:"4px 4px"}}>
          <strong className="text-title" style={{minWidth:"40%",color:Style.COLOR_SECONDARY}}>
            Dibuat Oleh
          </strong>
          <div className="text-content">
            {detail?.seat_created_by?.name ?? ""}
          </div>
        </div>
        <div className="field d-flex align-items-center" style={{background:"#fff", borderBottom:"thin solid #ccc", padding:"4px 4px"}}>
          <strong className="text-title" style={{minWidth:"40%",color:Style.COLOR_SECONDARY}}>
            Perusahaan
          </strong>
          <div className="text-content">
            {detail?.event?.company?.company_name ?? ""}
          </div>
        </div>
      </div>


      <div className="wrap-table-data-detail mt-5">
        <Style.HeaderPrimary color={Style.COLOR_SECONDARY}>
          Rincian Seat
        </Style.HeaderPrimary>

        <Component.TableData header={header}>
            {
              detail?.seat_detail?.map((item:any,idx:number)=>(
                <tr key={idx}>
                  <td data-label="Tanggal Event">
                    {Util.Moment(item?.seat_detail_datetime)}
                  </td>
                  <td data-label="Tipe Seat">
                    {item?.ms_seat?.ms_seat_name}
                  </td>
                  <td data-label="Nama Seat">
                    {item?.seat_detail_name}
                  </td>
                  <td data-label="Jumlah Seat">
                    {Util.FormatCurrency.input(item?.seat_detail_quantity ?? 0)}
                  </td>
                  <td data-label="Tipe Harga">
                    {item?.ms_price?.ms_price_name}
                  </td>
                  <td data-label="Nominal Harga">
                    {Util.FormatCurrency.input(item?.seat_detail_price ?? 0)}
                  </td>
                  <td data-label="Donasi Min">
                    {Util.FormatCurrency.input(item?.seat_detail_minimum_donation_amount ?? 0)}
                  </td>
                  <td  data-label="Pembelian Maks">
                    {Util.FormatCurrency.input(item?.seat_detail_maximum_purchased_quantity ?? 0)}
                  </td>
                  <td data-label="Status">
                    <div dangerouslySetInnerHTML={{__html:Util.displayStatus(item?.seat_detail_active_status_name)}} />
                  </td>
                  <td data-label="Aksi">
                    <Component.DropDown_More
                       title={
                        <button
                          className="button is-primary is-small"
                          aria-haspopup="true"
                          aria-controls="dropdown-menu">
                          <span>Aksi</span>
                          <span className="icon is-small">◿</span>
                        </button>
                       }
                       
                      data_more={dataMore.filter(filter => item?.seat_detail_active_status_name === "active" ?
                      filter.name !== "Aktifkan" :
                      filter.name !== "Nonaktifkan")}

                      onClick={({name,id})=>BtnAksi(item?.seat_detail_id, detail?.seat_id, name)}
                    />
                  </td>
                </tr>
              ))
            }
        </Component.TableData>
      </div>
    </Component.Modal_Component>
  )
}

export default ModalSeatDetail