import React, {useState, useEffect} from 'react'
import * as Component from "../../../../component";
import {ButtonPrimary} from "../../../../component/style/content/default"
import styled from "styled-components";
import * as Util from "../../../../util";
import * as Modal from "./modal.detail/index";
import * as Services from "../../../../service"


const header = ["#", "Judul Agenda","Nama Jabatan" , "Jabatan Pembicara", "Jadwal Agenda", "Aksi"];

const header_rincian = ["Tanggal Event", "Tipe Seat", "Nama Seat", "Jumlah Seat", "Tipe Harga", "Nominal Harga", "Donasi Min.", "Pembelian Maks", "Status", "Aksi"]

const data_more =[
  {name:"Lihat Detail"},
  {name:"Ubah"},
  {name:"Hapus"},
]

const data_aksi = [
  {name:"Nonaktifkan"},
  {name:"Aktifkan"}
]

const ModalDetail = (props:{show:boolean, onHide:Function,data:any,btnMoreEvent:Function}) => {
  const {show,onHide,data,btnMoreEvent} = props;
  const [modal,setModal] = useState({
    agenda_detail:false,
    agenda_create:false,
    seat_ubah:false
  })
  const [data_modal, setData_modal] = useState({
    agenda_detail:null,
  })
  const [dataAgenda, setDataAgenda] = useState([])


  const getDataAgenda =()=>{
    Services.api.ApiEvent.Event.getAgenda(data?.data?.event_id)
    .then(res =>{
      if(res?.success){
        setDataAgenda(res.data)
      }
    })

  }

  useEffect(()=>{
    if(modal.agenda_create === false || show === true){
      getDataAgenda()
    }
  },[modal.agenda_create,show])

 


  const btnMore = (name,id) =>{
    switch (name) {
      case "Lihat Detail":
        Services.api.ApiEvent.Event.getAgendaDetail(id)
        .then(async res =>{
          console.log(res)
          if(res?.success){
            await setData_modal(state=>({
              ...state,
              agenda_detail:res.data
            }))
            await setModal(state=>({
              ...state,
              agenda_detail:true
            }))
          }
        })
        break;
      case "Ubah":
        Services.api.ApiEvent.Event.getAgendaDetail(id)
        .then(async res =>{
          console.log(res)
          if(res?.success){
           await setData_modal(state=>({
              ...state,
              agenda_detail:res.data
            }))
            await setModal(state=>({
              ...state,
              agenda_create:true
            }))
          }
        })
        break;
        case "Hapus":
           Component.AlertQuestion({text:`Apaka anda yakin ingin menghapus ${dataAgenda.find(find=>find.event_agenda_id === id)?.event_agenda_title}`, title:"Warning"})
           .then(response =>{
             console.log(response)
             if(response.isConfirmed){
               Services.api.ApiEvent.Event.deleteAgenda(id)
               .then(res =>{
                 console.log(res)
                 if(res?.success){
                  getDataAgenda()
                 }
               })
             }
           })

        break;
    
      default:
        break;
    }
  }

  const btnUploadImageFile =async (e) =>{ 
    try {
      const formData = new FormData();
      for(let iterator of e.target.files){
         formData.append("event_image[]", iterator)
      }
      formData.append("event_id", data?.data?.event_id)
  
      const response = await Services.api.ApiEvent.Event.postPhoto(formData)
  
      if(response?.success){
        await Component.AlertSuccess({title:"SUCCESS", text:response?.success})
        await btnMoreEvent("Lihat Detail",data?.data?.event_id)
      }
      else{
        await Component.AlertError({title:"ERROR", text:response?.error})
      }
      
    } catch (err) {
      Component.AlertError({title:"ERROR", text:err.response})
    }

  }

  const btnDeleteImageFile =(event_id,gallery_id) =>{
    return Component.AlertQuestion({title:"Warning", text:"Apakah anda yakin ingin menghapus ini?"})
    .then(async response =>{
      if(response?.isConfirmed){
        await Services.api.ApiEvent.Event.deletePhotoGallery(event_id,gallery_id)
        .then(async res =>{
          console.log(res)
          if(res?.success){
            await btnMoreEvent("Lihat Detail",data?.data?.event_id)
          }
        })
      }
    })
  }

  const btnMoreSeat=(name,id) =>{
    switch (name) {
      case "Nonaktifkan":
        Component.AlertQuestion({title:"Warning", text:"Do you wan to inactive this?"})
        .then(async response =>{
          if(response.isConfirmed){
            await Promise.all([
              Services.api.ApiEvent.Event.putInactiveSeat(id)
              .then(res =>{
                // console.log(res)
                if(res.success){
                  btnMoreEvent("Lihat Detail",data?.data?.event_id)
                }
              })
            ])
          }
        })
        break;
      case "Aktifkan":
        Component.AlertQuestion({title:"Warning", text:"Do you wan to active this?"})
        .then(async response =>{
          if(response.isConfirmed){
            await Promise.all([
              Services.api.ApiEvent.Event.putActiveSeat(id)
              .then(res =>{
                // console.log(res)
                if(res.success){
                  btnMoreEvent("Lihat Detail",data?.data?.event_id)
                }
              })
            ])
          }
        })
        break;
    
      default:
        break;
    }
  }

  console.log("ini data",data.data)

  return (
    <Component.Modal_Component show={show} onHide={onHide} title="Detail Event" size="xl">
      {/* MODAL======== */}
        <Modal.ModalAgendaDetail 
          show={modal.agenda_detail} 
          onHide={()=>setModal(state=>({...state, agenda_detail:false}))}
          data={data_modal.agenda_detail} 
        />
        <Modal.ModalAgendaCreate 
          show={modal.agenda_create} 
          onHide={()=>{setModal(state=>({...state, agenda_create:false}));setData_modal(state=>({...state, agenda_detail:null}))}} 
          id={data?.data?.event_id} 
          data_modal={data_modal.agenda_detail}
        />

        <Modal.ModalSeatUbah 
          onHide={()=>setModal(state=>({...state, seat_ubah:false}))}
          show={modal.seat_ubah}
          data={data?.data}
          btnMoreEvent={btnMoreEvent}
        />
      {/* MODAL======== */}

      <Container className="container">
        <div className="wrap-image mb-5">
          {
            data?.image &&
            <img src={data?.image} alt={data?.image} />
          }
        </div>
        <div className="wrap-data">
          <div className="data d-flex">
            <div className="title">
              Nama Event
            </div>
            <div className="data-content">
              {data?.data?.event_name}
            </div>
          </div>
          <div className="data d-flex">
            <div className="title">
              Deskripsi
            </div>
            <div className="data-content">
              <div dangerouslySetInnerHTML={{__html:data?.data?.event_description}} />
            </div>
          </div>
          <div className="data d-flex">
            <div className="title">
              URL Event
            </div>
            <div className="data-content">
              
              <a
								href={data?.data?.event_url}
								class="is-link"
								target="_blank">
								{data?.data?.event_url}
							</a>
            </div>
          </div>
          <div className="data d-flex">
            <div className="title">
              kategori Event
            </div>
            <div className="data-content">
              {data?.data?.category_event ? data?.data?.category_event?.category_event_name : ''}
            </div>
          </div>
          <div className="data d-flex">
            <div className="title">
              kategori Ruangan
            </div>
            <div className="data-content">
              {data?.data?.category_venue ? data?.data?.category_venue?.category_venue_name : ''}
            </div>
          </div>
          <div className="data d-flex">
            <div className="title">
              Lokasi
            </div>
            <div className="data-content">
              {data?.data?.event_location}
            </div>
          </div>
          <div className="data d-flex">
            <div className="title">
              Lokasi Detail
            </div>
            <div className="data-content">
              {data?.data?.event_location_detail ? data?.data?.event_location_detail : ""}
            </div>
          </div>
          <div className="data d-flex">
            <div className="title">
              Kota
            </div>
            <div className="data-content">
              {data?.data?.ms_city?.ms_city_name}
            </div>
          </div>
          <div className="data d-flex">
            <div className="title">
              Jadwal Event
            </div>
            <div className="data-content">
              {Util.Moment(data?.data?.event_start_datetime)}
               &nbsp; s/d &nbsp;
              {Util.Moment(data?.data?.event_end_datetime)}
            </div>
          </div>
          {
            data?.data?.event_ticket_sale_start_datetime &&
            <div className="data d-flex">
              <div className="title">
                Jadwal Penjualan Tiket
              </div>
              <div className="data-content">
                {Util.Moment(data?.data?.event_ticket_sale_start_datetime)}
                &nbsp; s/d &nbsp;
                {Util.Moment(data?.data?.event_ticket_sale_end_datetime)}
              </div>
            </div>
          }
          <div className="data d-flex">
            <div className="title">
              Tanggal Dibuat
            </div>
            <div className="data-content">
              {Util.Moment(data?.data?.event_created_datetime)}
            </div>
          </div>
          <div className="data d-flex">
            <div className="title">
              Dibuat Oleh
            </div>
            <div className="data-content">
              {data?.data?.event_created_by ? data?.data?.event_created_by?.name : ''}
            </div>
          </div>
          <div className="data d-flex">
            <div className="title">
              Perusahaan
            </div>
            <div className="data-content">
              {data?.data?.company ? data?.data?.company?.company_name : ''}
            </div>
          </div>
          <div className="data d-flex">
            <div className="title">
              Pengelola
            </div>
            <div className="data-content">
              {data?.data?.organizer ? data?.data?.organizer?.organizer_name : ''}
            </div>
          </div>
          <div className="data d-flex">
            <div className="title">
              Status Persetujuan
            </div>
            <div className="data-content">
              <div dangerouslySetInnerHTML={{__html:Util.displayStatus(data?.data?.event_approve_status_name)}} />
            </div>
          </div>
          <div className="data d-flex">
            <div className="title">
              Tipe Akses
            </div>
            <div className="data-content">
              {data?.data?.event_access_type}
            </div>
          </div>
          {
            data?.data?.event_access_phrase &&
            <div className="data d-flex">
              <div className="title">
                Kode Akses (Untuk Private Event)
              </div>
              <div className="data-content">
                {data?.data?.event_access_phrase}
              </div>
            </div>
          }
            <div className="data d-flex">
              <div className="title">
                Persentase Biaya
              </div>
              <div className="data-content">
                {data?.data?.event_access_percentage}
              </div>
            </div>
            {
              data?.data?.microsite_id &&
              <div className="data d-flex">
                <div className="title">
                  Microsite
                </div>
                <div className="data-content">
                  {data?.data?.microsite?.microsite_name}
                </div>
              </div>
            }
              <div className="data d-flex">
                <div className="title">
                  Platform Eksternal Event
                </div>
                <div className="data-content">
                  {data?.data?.event_external_platform || ''}
                </div>
              </div>
              <div className="data d-flex">
                <div className="title">
                  URL Eksternal Event
                </div>
                <div className="data-content">
                  {data?.data?.event_external_url || ''}
                </div>
              </div>
              <div className="data d-flex">
                <div className="title">
                  Event Tage
                </div>
                <div className="data-content d-flex" style={{gridGap:"10px"}}>
                  {
                    data?.data?.tag && data?.data?.tag?.length > 0 &&
                    data?.data?.tag?.map((item:any)=>(
                      <div dangerouslySetInnerHTML={{__html:Util.displayStatus(item.tag_name)}} />
                    ))
                  }
                </div>
              </div>
        </div>

        <div className="wrap-agenda">
          <div className="title">
            Agenda Event
          </div>
          <ButtonPrimary onClick={()=>setModal(state=>({...state, agenda_create:true}))}>
            Buat Agenda
          </ButtonPrimary>

          <div className="container-table mt-5">
            <Component.TableData header={header}>
              {
                dataAgenda.length > 0 ?
                dataAgenda.map((item:any,idx:any)=>(
                  <tr key={idx}>
                    <td>
                      {idx+1}
                    </td>
                    <td>
                      {item.event_agenda_title}
                    </td>
                    <td>
                      {item.event_agenda_speaker_name ? item.event_agenda_speaker_name : "-"}
                    </td>
                    <td>
                      {item.event_agenda_speaker_position ? item.event_agenda_speaker_position : "-"}
                    </td>
                    <td>
                      {Util.Moment(item.event_agenda_start_datetime)} ~
                      <br />
                      {Util.Moment(item.event_agenda_end_datetime)} 
                    </td>
                    <td>
                      <Component.DropDown_More 
                        title={
                          <div class="dropdown-trigger"><button class="button is-primary is-small" aria-haspopup="true" aria-controls="dropdown-menu"><span class="icon is-small">•••</span></button></div>
                        }
                        data_more={data_more}
                        id={item.event_agenda_id}
                        onClick={({name,id})=>btnMore(name,id)}
                      />
                    </td>
                  </tr>
                ))
                :
                "Tidak Ada Agenda"
              }

            </Component.TableData>
          </div>
        </div>

        <div className="wrap-foto">
          <div className="title">
            Foto Galeri
          </div>

          <div className="input">
            <input
              class="file-input"
              type="file"
              accept="image/*" 
              multiple
              name="upload-image"
              id="upload-image"
              onChange={btnUploadImageFile}
              />
            <label htmlFor='upload-image' class="file-cta">
              <span class="file-icon">📎</span>
              <span class="file-label">
                Pilih file untuk diupload ke galeri
              </span>
            </label>
            <br />
            <br />
            <p>*Kapasitas maksimal ukuran file 300Kb</p>
          </div>

          <div className="foto">
            {
              data?.data?.gallery?.length > 0 &&
              
                data?.data?.gallery?.map((item:any,idx:any)=>(
                  <div key={idx}>
                    <img src={item.gallery_image_url} alt={item.gallery_caption} />
                    <span onClick={()=>btnDeleteImageFile(item.gallery_source_id,item.gallery_id)}>
                      Hapus
                    </span>
                  </div>
                ))
              
            }
          </div>
        </div>

        <div className="wrap-rincian-seat">
          <div className="title" style={{marginBottom:"20px", marginTop:"20px"}}>
              Rincian Seat
          </div>
          <ButtonPrimary onClick={()=>setModal(state=>({...state, seat_ubah:true}))} >
            Ubah Seat
          </ButtonPrimary>

          <div className="table-data mt-4">
            <Component.TableData header={header_rincian}>
                {
                  data?.data?.seat?.seat_detail?.length > 0 ?
                  data?.data?.seat?.seat_detail?.map((item:any,idx:any)=>(
                    <tr key={idx}>
                      <td>
                        {Util.Moment(item.seat_detail_datetime)}
                      </td>
                      <td>
                        {item.ms_seat.ms_seat_name}
                      </td>
                      <td>
                        {item.seat_detail_name}
                      </td>
                      <td>
                        {Util.FormatCurrency.currency(item.seat_detail_quantity)}
                      </td>
                      <td>
                        {item.ms_price.ms_price_name}
                      </td>
                      <td>
                        {Util.FormatCurrency.currency(item.seat_detail_price)}
                      </td>
                      <td>
                        {Util.FormatCurrency.currency(item.seat_detail_minimum_donation_amount)}
                      </td>
                      <td>
                        {Util.FormatCurrency.input(item.seat_detail_maximum_purchased_quantity)}
                      </td>
                      <td>
                        <div dangerouslySetInnerHTML={{__html:Util.displayStatus(item.seat_detail_active_status_name)}} />
                      </td>
                      <td>
                        <Component.DropDown_More 
                          title={
                            <div class="dropdown-trigger"><button class="button is-primary is-small" aria-haspopup="true" aria-controls="dropdown-menu"><span class="icon is-small">•••</span></button></div>
                          }
                          data_more={data_aksi.filter(filter=>(
                            item.seat_detail_active_status_name === "active" ?
                            filter.name !== "Aktifkan" :
                            filter.name !== "Nonaktifkan"
                          ))}
                          id={item.seat_detail_id}
                          onClick={({name,id})=>btnMoreSeat(name,id)}
                        />
                      </td>
                      
                    </tr>
                  ))
                  :
                  "Tidak Ada Agenda"
                }

            </Component.TableData>
          </div>
        </div>


      </Container>
    </Component.Modal_Component>
  )
}

export default ModalDetail;

const Container = styled.div `

.wrap-rincian-seat{
  .title{
    color: #3e396b;
    font-size: 35px;
    line-height: 1.125;
    margin-bottom:50px;
  }
}

.wrap-foto{

  .foto{
    display:flex;
    flex-wrap: wrap;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap:20px;
    div{
      display:flex;
      flex-direction: column;
      img{
        width:200px;
        height:200px;
        object-fit:contain;
      }
      span{
        cursor:pointer;
        color:#2dbded;
      }
    }
  }
  .input{
    input{
      /* height: 100%; */
      left: 0;
      opacity: 0;
      outline: none;
      position: absolute;
      top: 0;
      width: 100%;
    }
    .file-cta, .file-name{
      padding:10px;
      border-color: #dbdbdb;
      border-radius: 4px;
      font-size: 1em;
      padding-left: 1em;
      padding-right: 1em;
      white-space: nowrap;
      background-color: #f5f5f5;
    color: #4a4a4a;
    }
  }
  .title{
    color: #3e396b;
    font-size: 35px;
    line-height: 1.125;
    margin-bottom:50px;
  }
}

.wrap-agenda{
  .title{
    color: #3e396b;
    font-size: 35px;
    line-height: 1.125;
    margin-bottom:10px;
  }
}

.wrap-data{
  background-color:#fff;
  margin-bottom:20px;
  .data{
    padding:5px 10px;
    border-bottom:thin solid #ddd;
    &:last-child{
      border-bottom:thin solid #ddd;
    }
  }
  .title{
    width:10vw;
    color:#2dbded;
    font-weight:bold;
  }
  .data-content{
    color:#737373;
    flex-wrap: wrap;
    word-wrap: break-word;
  }
}

.wrap-image{
  img{
    width:100%;
    height:500px;
    object-fit:cover;
  }
}
`