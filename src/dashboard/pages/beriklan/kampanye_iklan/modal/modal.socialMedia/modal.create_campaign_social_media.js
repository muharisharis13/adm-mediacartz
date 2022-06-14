import React, {useState, useEffect} from "react";
import {Modal} from "react-bootstrap"
import styled from "styled-components";
import {COLOR_PRIMARY, COLOR_SECONDARY,ButtonPrimary} from "../../../../../../component/style/content/default";
import Select from "react-select"
import { api_kampanye_iklan } from "../../../../../../service/api";
import { FormatCurrency } from "../../../../../../util";
import { AlertError, Pagination } from "../../../../../../component";
import moment from "moment";
import {Modal_konfirmasi_campaign_social_media} from "./index";
import DatePicker from "react-datepicker"



export const Modal_create_campaign_social_media = (props) =>{
  const [data, setData] = useState({
    options_tipe_postingan: [],
    options_kategori: [],
    arr_influencer:[]
  })
  const [arr_influencer, setArr_influencer] = useState({
    data:[],
    page:1,
    last_page:1
  })
  const [modal, setModal] = useState(false)

  //FOR INPUTAN
  const [input,setInput] = useState({
    nama_campaign:null, //sudah di define
    selected_tipe_postingan:"", //sudah di define
    min_follower:100, //sudah di define
    nama_influencer:"", //sudah di define
    selected_kategori:[], //sudah di define
    deskripsi:"", //sudah di define
    upload_media:{ //sudah di define
      file:"",
      caption:""
    },
    date_batalkan_otomatis:null //sudah di define

  });
  const [selected_influencer, setSelected_influencer] = useState([]) //sudah di define
  

  //FOR INPUTAN END=======


  useEffect(async ()=>{
    if(props.show && props.props.selected_channel){

      
      await api_kampanye_iklan.get_kol_master()
      .then(async res =>{
        console.log("ini dia", res)
        if(res?.success){
          await setData(state=>({...state, 
            options_kategori:res.data?.interest?.map(item =>({value:item.id, label:item.interest_name}))
          }))
          let channel = props.props?.selected_channel.name
          if(channel=== "Instagram Influencer"){
            await setData(state=>({...state,
              options_tipe_postingan:res.data?.platform?.find(find=>find.platform_name === "Instagram")?.child?.map(item=>({value:item.id, label:item.name}))
            }))
          }
          else if(channel === "Youtube Influencer"){
            await setData(state=>({...state,
              options_tipe_postingan:res.data?.platform?.find(find=>find.platform_name === "Youtube")?.child?.map(item=>({value:item.id, label:item.name}))
            }))
          }
          else if(channel === "Facebook Influencer"){
            await setData(state=>({...state,
              options_tipe_postingan:res.data?.platform?.find(find=>find.platform_name === "Facebook")?.child?.map(item=>({value:item.id, label:item.name}))
            }))
          }
          else if(channel === "Twitter Influencer"){
            await setData(state=>({...state,
              options_tipe_postingan:res.data?.platform?.find(find=>find.platform_name === "Twitter")?.child?.map(item=>({value:item.id, label:item.name}))
            }))
          }
        }
      })
    }
  },[props.show])




  return (
    <Modal show={props.show} onHide={props.onHide} fullscreen>
      <Modal.Body>

        {/* MODAL */}
          <Modal_konfirmasi_campaign_social_media show={modal} onHide={()=>setModal(false)} props={{input:input, selected_influencer:selected_influencer}} />
        {/* MODAL */}

        <Container className="container">
          <div className="wrapper-header">
            <div className="text-title">Detail Kampanye</div>
            <span>Lengkapi dan tentukan influencer untuk anda ajak kerjasama</span>
          </div>

          <div className="form">
            <div className="row">
              <div className="col-md-6 col-sm-6 col-lg-6">
                <div className="mb-3 mb-md-3">
                  <label>Nama Campaign</label>
                  <input required type="text" placeholder="Masukkan Judul Iklan" className="form-control" value={input.nama_campaign} onChange={e=>{setInput(state=>({...state, nama_campaign:e.target.value}))}} />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-4 col-md-4 col-sm-4">
                <div className="mb-3 mb-md-3">
                  <label>Tipe Postingan</label>
                  <Select placeholder="Pilih Tipe Postingan" options={data.options_tipe_postingan} value={input.selected_tipe_postingan} onChange={e=>setInput(state=>({...state, selected_tipe_postingan:e}))} />
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4">
                <div className="mb-3 mb-md-3">
                  <label htmlFor="">Min. Followers</label>
                  <input required type="text" className="form-control" placeholder="Min follower" value={input.min_follower} onChange={e=>setInput(state=>({...state, min_follower:e.target.value}))} />
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4">
                <div className="mb-3 mb-md-3">
                  <label htmlFor="">Nama Influencer</label>
                  <input required type="text" className="form-control" placeholder="Nama" value={input.nama_influencer} onChange={e=>setInput(state=>({...state, nama_influencer:e.target.value}))} />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-10 col-sm-10 col-lg-10">
                <label htmlFor="">Kategori</label>
                <div className="d-flex align-items-center">
                  <Select className=" flex-fill" placeholder="Select Kategori" isMulti options={data.options_kategori} value={input.selected_kategori} onChange={e=>setInput(state=>({...state, selected_kategori:e }))} />
                  <ButtonPrimary onClick={()=>btnCari()}>Cari</ButtonPrimary>
                </div>
              </div>
             
            </div>


            {/* daftar influencer */}

            <div className="wrapper-daftar-influencer mt-5">
              <div>
                <label className="title-influencer">Pilih Influencer</label>
                <div className="grid-influencer">
                  {
                    arr_influencer.data.map((item,idx)=>(
                      <div className="card-influencde" key={idx} onClick={()=>handleSelectInfluencer(item)}>

                        <img src={item.influencer_image} alt={item.influencer_image} />
                        <div className="nama-influencer">
                          {item.fullname}
                        </div>
                        <div className="nama-akun">
                          {item.username}
                        </div>
                        <div className="follower">
                          Followers: {FormatCurrency.input(item.followers)}
                        </div>
                        <div className="pricing">
                          Pricing: {FormatCurrency.currency(item.post_price)}
                        </div>

                      </div>
                    ))
                  }
                </div>
                <section >
                  <Pagination page={arr_influencer.page} totalPage={arr_influencer.last_page} handleOnChange={BtnPagination} />
                </section>
              </div>

              <div className="mt-5 section2">
                <div className="mb-3">
                  <label htmlFor="">Pilih jadwal Posting</label>
                 
                 
                  {
                    selected_influencer.map((item,idx)=>(
                      <div className="border rounded-2 card-influecer-selected mb-3" key={idx}>
                        <div className="img" style={{width:"150px"}}>
                          <img src={item.influencer_image} alt={item.influencer_image} width={100} height={100} style={{objectFit:"contain"}} />
                        </div>
                        <div className="nama_user" style={{flexDirection:"column",display:"flex", width:"300px"}}>
                          <strong>
                            {item.fullname}
                          </strong>
                          <span>
                            {FormatCurrency.input(item.followers)}
                          </span>
                          <label style={{padding:"0 !important", cursor:"pointer"}} onClick={()=>handleHapusSelectedInfluencer(item)}>
                            Hapus
                          </label>
                        </div>
                        <div className="wrap-date d-flex align-items-center justify-content-between" style={{width:"50%"}}>
                          <div>
                            <span>
                              Dapat Posting Tanggal
                            </span>
                            {/* <input required type="date" name="" id=""  value={item.from_date} className="form-control" onChange={(e)=>handlOnChangeDateSelectedInfluencer(item,e,"from_date")} /> */}
                            <DatePicker className="form-control" selected={item.from_date} selectsStart startDate={item.from_date} endDate={item.end_date} onChange={(e)=>handlOnChangeDateSelectedInfluencer(item,e,"from_date")} />
                          </div>
                          <div>
                            <span>
                              Sampai
                            </span>
                            {/* <input required type="date" name="" id="" value={item.end_date} className="form-control" onChange={(e)=>handlOnChangeDateSelectedInfluencer(item,e,"end_date")} /> */}
                            <DatePicker className="form-control" selected={item.end_date} selectsEnd startDate={item.from_date} endDate={item.end_date} minDate={item.from_date} onChange={(e)=>handlOnChangeDateSelectedInfluencer(item,e,"end_date")} />
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>

                <div className="mb-3">
                  <label htmlFor="">Deskripsi</label>
                  <textarea name="" placeholder="Panduan bagi influencer dalam melakukan campaign" id="" cols="30" rows="10" className="form-control" value={input.deskripsi} onChange={e=>setInput(state=>({...state, deskripsi:e.target.value}))}></textarea>
                </div>

                <div className="mb-3" style={{display:"flex", flexDirection:"column"}}>
                  <label htmlFor="">Upload Media</label> 
                  <input required type="file" name="" id="" className="form-control" accept="image/*, video/*" onChange={e=>handleOnChangeFile(e)} />

                  <ul className="mt-4">
                    {
                      input.upload_media?.file &&
                      <li>
                        <a target="__blank" href={input.upload_media?.file}>
                          {input.upload_media?.file}
                        </a>
                      </li>
                    }
                  </ul>
                  <textarea name="" id="" cols="10" rows="5" placeholder="Masukkan Caption yang sesuai untuk file yang akan di posting..." className="form-control" value={input.upload_media?.caption} onChange={e=>setInput(state=>({...state, upload_media:{file:input.upload_media.file,caption: e.target.value}}))}></textarea>
                </div>

                <div className="mb-3">
                  <label htmlFor="">Otomatis dibatalkan pada tanggal</label> <br />
                  <span><i>Campaign ini akan otomatis dibatalkan pada tanggal yang anda tentukan apabila influencer tidak ada yang menerima pesanan ini. Dana anda akan secara otomatis dikembalikan sepenuhnya.</i></span>

                  {/* <input required type="date" name="" id="" className="form-control" style={{width:"300px"}} value={input.date_batalkan_otomatis} onChange={e=>setInput(state=>({...state, date_batalkan_otomatis:e.target.value}))} /> */}
                  <DatePicker className="form-control" selected={input.date_batalkan_otomatis} onChange={e=>setInput(state=>({...state, date_batalkan_otomatis:e}))}  />
                </div>
              </div>

            </div>
          </div>


          <div className="wrapper-button d-flex align-items-center justify-content-between mt-5">
            <div className="left">
              <button className="btn border" onClick={props.onHide}>Kembali</button>
            </div>
            <div className="right">
              <ButtonPrimary onClick={BtnLanjut}>Lanjut</ButtonPrimary>
            </div>
          </div>
        </Container>
      </Modal.Body>
    </Modal>
  )

  function BtnLanjut(){
    
    console.log("inputan",{
      input,
      selected_influencer
    })
    if(input.nama_campaign && input.selected_tipe_postingan && input.date_batalkan_otomatis  && input.deskripsi && input.upload_media.file && selected_influencer.length >0 ){
      setModal(true)
    }
    else{
      AlertError({title:"Warning", text:"Silahkan lengkapi semua inputan"})
    }
  }

  function handleOnChangeFile(e){
    api_kampanye_iklan.post_storage_Server({file:e.target.files[0]})
    .then(res =>{
      if(res.status === true){
        setInput(state=>({...state, upload_media:{file:res.data.url}}))
      }
      console.log({post_storage_server:res})
    })
  }

  function handlOnChangeDateSelectedInfluencer(item2,e,type){
     
    switch (type) {
      case "from_date":
        setSelected_influencer(
          selected_influencer.map(item => 
            item.id === item2.id 
            ? {...item, from_date : e} 
            : item 
            )
        );
        let res = new Date(e)
        res.setDate(res.getDate() + 5)
        setInput(state=>({
          ...state,
          date_batalkan_otomatis:res
        }))
        break;
      case "end_date":
        setSelected_influencer(
          selected_influencer.map(item => 
            item.id === item2.id 
            ? {...item, end_date : e} 
            : item 
            )
        )
        break;
    
      default:
        break;
    }
    
  }

  function handleHapusSelectedInfluencer(item){
    let filter = selected_influencer.filter(filter => filter.id !== item.id)

    setSelected_influencer(filter)
  }

  function handleSelectInfluencer(item){
    if(selected_influencer.filter(filter => filter.id === item.id).length !==1){
      setSelected_influencer(state=>([...state, {post_price:item.post_price,username:item.username,fullname:item.fullname, followers:item.followers, influencer_image:item.influencer_image, id:item.id, from_date:new Date(), end_date: new Date()}]))
    }
  }

  async function btnCari(page){
    let body

      body={
       fullname: input.nama_influencer,
       interest: input.selected_kategori.map(item=>item.label),
       min_follower: input.min_follower,
       page: 1,
       platform_child_id: input.selected_tipe_postingan.value,
       rows: 10
     }
    
    await api_kampanye_iklan.post_kol_influencer(body)
    .then(async res=>{
      console.log({post_kol_influencer:res})
      if(res?.success){
        if(res.data.data.length > 0){
          await setArr_influencer({
            data:res.data.data,
            last_page:res.data.lastPage,
            page:res.data.page
          })
        }
        else{
          AlertError({title:"ERROR", text:"Influencer tidak ditemukan"})
        }
      }
      else{
        AlertError({title:"ERROR", text:res.error})
      }
    })
  }

   async function BtnPagination(e){

    if(input.selected_tipe_postingan.value){
        const body={
        fullname: input.nama_influencer,
        interest: input.selected_kategori.map(item=>item.label),
        min_follower: input.min_follower,
        page: e?.selected +1,
        platform_child_id: input.selected_tipe_postingan.value,
        rows: 10
      }
      console.log(body)
      
      await api_kampanye_iklan.post_kol_influencer(body)
      .then(res=>{
        console.log({post_kol_influencer:res})
        if(res?.success){
          setArr_influencer(state=>({...state,
            data:res.data?.data,
            last_page:res.data?.lastPage,
            page:res.data?.page
          }))
        }
        else{
          AlertError({title:"ERROR", text:res.error})
        }
      })

    }

  }

}


const Container = styled.div `

  .card-influecer-selected{
    display:flex;
    padding:10px;
    width:100%;
    
  }

  .wrapper-daftar-influencer{
    box-sizing:border-box;

    .grid-influencer{
      display: grid;
      grid-template-areas: "infcard infcard infcard infcard";
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
      grid-gap: 10px;

      .card-influencde{
        border:2px solid ${COLOR_SECONDARY};
        border-radius: 10px;
        text-align: center;
        padding: 10px;
        margin-bottom: 10px;
        cursor: pointer;
        img{
          height:200px;
          width:100%;
          object-fit:contain;
        }
      }
    }
  }

  .form{
    background-color: #fff;
    box-shadow: 0px 3px 6px rgb(0 0 0 / 16%);
    color: rgba(10, 10, 10, 0.5);
    max-width: 100%;
    position: relative;
    border-radius: 10px;
    padding:20px;

    label{
      color:${COLOR_SECONDARY}
    }
  }

  .wrapper-header{
    margin-bottom:20px;
    .text-title{
      color: ${COLOR_PRIMARY};
      font-size: 35px;
      line-height: 1.125;
    }
  }
`