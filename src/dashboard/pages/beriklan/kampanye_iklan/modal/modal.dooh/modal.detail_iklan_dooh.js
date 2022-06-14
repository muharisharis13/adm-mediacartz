import React, {useState, useEffect} from 'react';
import PropTypes from "prop-types";
import { Loadingfunc, Modal_Component,Card } from '../../../../../../component';
import styled from "styled-components"
import { ButtonPrimary, COLOR_PRIMARY, COLOR_SECONDARY, Label } from '../../../../../../component/style/content/default';
import { FormatCurrency } from '../../../../../../util';
import {api_kampanye_iklan} from "../../../../../../service/api"
import {Times} from "@styled-icons/typicons";
import {Modal_konfirmasi_terakhir_dooh} from "./modal.konfirmasi_terakhir_dooh";
import DatePicker from "react-datepicker";
import moment from "moment"

export const Modal_detail_iklan_dooh = (props) => {
  const [data, setData] = useState({});
  const [input, setInput] = useState({
    nama_iklan:'',
    from_date: null ,
    upload_file:null,
    file_pendukung:null,
    qty:1,
    end_date:new Date()
  })
  const [array_file, setArray_file] = useState([]);
  const [file_konten, setFile_konten] = useState([])
  const [modal, setModal] = useState({
    konfirmasi_terakhir:false
  });
  const [parsing, setParsing] = useState({});
  const [loading, setLoading] = useState(false);
  const [loading_file, setLoading_file] = useState(false)


  useEffect(()=>{
    if(props.show){
      setData(props.data)
    }
  },[props.show])




  const onChangeValue = (e) =>{
    if(e.target.name === "upload_file"){
      setInput(state=>({...state, [e.target.name]: e.target.files[0]}))
    }
    else{
      setInput(state=>({...state, [e.target.name]: e.target.value}))
    }
  }

  const btnTambahFile = (e) =>{
    if(e.target.files.length >0){
      setLoading_file(true)
      
      for(var i = 0; i< e.target.files.length; i++){

        let name_files = e.target.files[i]

        api_kampanye_iklan.post_storage_Server({file:e.target.files[i]})
        .then( res =>{
          console.log("post_storage_Server",res)
          if(res.status === true){
             setArray_file(state=>[...state, 
              {
                campaing_files:{
                  url:res.data.url,
                  content_type:res.data.content_type
                },
                files:name_files
              }
            ])
             setInput(state=>({...state, file_pendukung:null}))
    
          }
          if(i === e.target.files.length ){
            setLoading_file(false)
          }
        })
      }

    }
  }


  function BtnTambahFileKonten(e){
    setLoading_file(true)
    api_kampanye_iklan.post_storage_Server({file:e.target.files[0]})
    .then(res =>{
      console.log("post_storage_Server",res)
      if(res.status === true){
        setFile_konten([
          {
            url:res.data.url,
            content_type:res.data.content_type
          }
        ])
      }
      setLoading_file(false)
    })
  }


  const btnDeleteFile = (lastModified) =>{
    let filter = array_file.filter(filter=> filter.files?.name !== lastModified)
    setArray_file(filter)
  }

  const handleOnChangeDate=(e)=>{
    setInput(state=>({...state, from_date:e}))

    let type_product = props.data?.user_product_setting?.schedule_type
    let get_publish_duration = props.data?.user_product_setting?.publish_duration
    let sum_date

    if(type_product === "Daily"){
       sum_date = moment(new Date(e), "DD-MM-YYYY").add(get_publish_duration * input.qty, "days") 
      }
      else if(type_product === "Monthly"){
      sum_date = moment(new Date(e), "DD-MM-YYYY").add(get_publish_duration * input.qty, "months") 
    }
    else if(type_product === "Annual"){
      sum_date = moment(new Date(e), "DD-MM-YYYY").add(get_publish_duration * input.qty, "years") 
      }

    setInput(state=>({...state,
     end_date:new Date(sum_date)
    }))
  }

  const btnKonfirmasi = () =>{
    setParsing(state=>({...state, data:data, input:input, array_file:array_file, content_file:file_konten}))
    setModal(state=>({...state, konfirmasi_terakhir:true}))
  }

 

  console.log({Modal_detail_iklan_dooh:props})

  return (
    <Modal_Component show={props.show} onHide={props.onHide} title="Detail Iklan DOOH" size="md" btnSubmit btnName="Komfirmasi Terakhir" onClick={btnKonfirmasi}>

        {/* MODAL ============ */}
          <Modal_konfirmasi_terakhir_dooh show={modal.konfirmasi_terakhir} onHide={()=>setModal(state=>({...state,konfirmasi_terakhir:false}))} data={parsing} />
        {/* MODAL ============ */}

      <div className="container mb-3 mb-md-3 justify-content-center d-flex">
        <Card.Card_dooh item={data} />
      </div>

      <Container className="container mb-3 mb-md-3">
        
        <div className="mb-3 mb-md-3">
          <div className="mb-3 mb-md-3">
            <Label color={COLOR_SECONDARY}>Nama Iklan</Label>
            <input type="text" placeholder='Masukkan Nama Iklan' className="form-control" name="nama_iklan" value={input.nama_iklan} onChange={onChangeValue} />
          </div>
          <div className="mb-3">
            <Label color={COLOR_SECONDARY}>Qty</Label>
            <input type="text" placeholder='Qty' className="form-control" value={input.qty} onChange={e=>setInput(state=>({...state, qty:e.target.value.replace(/[^0-9]/g, '')}))} />
          </div>
          {
            data.user_product_setting?.customer_need_schedule === "true" &&
              <div className="mb-3 mb-md-3">
                <div className="row">
                  <div className="col-sm-12">
                    <Label color={COLOR_SECONDARY}>Jadwal Mulai</Label>
                    {/* <input type="date" className="form-control" name="from_date" value={input.from_date} onChange={onChangeValue} /> */}
                    <DatePicker className="form-control" selected={input.from_date} onChange={e=>handleOnChangeDate(e)} dateFormat="yyyy-MMM-dd" minDate={new Date(moment(new Date(),"yyyy-MM-dd").add(2,"days"))} />
                  </div>
                </div>
              </div>
          }
          {
            input.from_date &&
            <div className="mb-3 mb-md-3">
              <div className="row">
                <div className="col-sm-12">
                  <Label color={COLOR_SECONDARY}>Jadwal Berakhir</Label>
                  <DatePicker disabled className="form-control" selected={input.end_date} dateFormat="yyyy-MMM-dd"  />
                </div>
              </div>
            </div>
          }

          {
            data.user_product_setting?.content_create_by === "publisher" ? null:
              <div className="mb-3 mb-md-3" style={{border:"thin dashed #ccc",padding:"10px", overflow:"hidden"}}>
                <div className="mb-3 mb md-3 d-flex justify-content-between align-items-center">
                    <ul>
                      {
                        file_konten.map(item=>(
                          <li>{`${item.url}`}</li>
                        ))
                      }
                    </ul>
                </div>
                  <div className="mb-3 mb-md-3">
                    <Label color={COLOR_SECONDARY}>Upload File Konten</Label>
                    
                    <br />
                    {
                      loading_file? "Uploading...":
                      <>
                        <input type="file" id="" className="form-control" name="upload_file" onChange={BtnTambahFileKonten} accept="image/*, video/*" />
                        <small>
                          <i>upload hanya sekali</i>
                        </small>
                      </>
                    }
                  </div>
              </div>
          }

          {
            data.user_product_setting?.customer_need_upload_file === "true" &&
              <div className="mb-3 mb-md-3" style={{border:"thin dashed #ccc", padding:"10px"}}>
                <div className="mb-3 mb-md-3">
                  <table style={{width:"100%"}}>
                    {
                      array_file?.map((item,idx)=>(
                        <tr key={idx}>
                          <td>{idx+1}</td>
                          <td>{item.files?.name}</td>
                          <td className="text-end">
                            <Times cursor="pointer" width={20} onClick={()=>btnDeleteFile(item.files?.name)} />
                          </td>
                        </tr>
                      ))
                    }
                  </table>
                </div>
                
                <div className="mb-3 mb-md-3">
                  <Label color={COLOR_SECONDARY}>Upload File Pendukung</Label>
                  <br />
                  <span>
                    <i>Sebagai bahan referensi kepada publisher</i>
                  </span>
                  <br />
                  {
                    loading_file? "Uploading...":
                    <input type="file" id="" className="form-control" name="upload_file" multiple onChange={btnTambahFile}  />
                  }
                </div>

                {/* <div className="mb-3 mb-md-3">
                  {
                    input.file_pendukung ?
                    loading_file ? <Loadingfunc /> :
                    <ButtonPrimary onClick={btnTambahFile}>Tambah File</ButtonPrimary>
                    :null
                  }
                </div> */}
              </div>
          }


          <div className="mb-3 mb-md-3">
            <Label color={COLOR_SECONDARY}>Catatan</Label>
            <textarea  cols="30" rows="10" className="form-control" placeholder="Masukkan Catatan" name="catatan" value={input.catatan} onChange={onChangeValue}></textarea>
          </div>
        </div>
      </Container>
    </Modal_Component>
  )
}

const Container = styled.div `
background:#fff;
padding:10px;
border-radius: 7px;
`


const DivBadge = styled.div `
position:absolute;
color: #fff;
background:${COLOR_PRIMARY};
top:10px;
left:10px;
padding:2px 10px;
border-radius:10px;
font-weight:500;
font-size:0.8rem
`

const ImgCard = styled.img `
width:100%;
border-radius: 7px 7px 0px 0px;
object-fit:cover;
`

const ContainerCard = styled.div `
display:block;
border-radius:7px;
background: #fff;
box-shadow: 0px 3px 6px rgb(0 0 0 / 16%);
`

Modal_detail_iklan_dooh.propTypes = {
  show : PropTypes.bool.isRequired,
  onHide : PropTypes.func.isRequired,
  data: PropTypes.object
}
