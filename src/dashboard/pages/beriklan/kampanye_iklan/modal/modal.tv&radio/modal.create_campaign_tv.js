import React, {useState, useEffect, useContext} from 'react'
import {Modal} from "react-bootstrap";
import { AlertError, Form } from '../../../../../../component';
import {HeaderPrimary,COLOR_PRIMARY, Label, COLOR_SECONDARY, ButtonPrimary} from "../../../../../../component/style/content/default";
import Select from "react-select"
import {api_kampanye_iklan} from "../../../../../../service/api";
import {Context} from "../../../../../../service";
import styled from "styled-components";
import moment from "moment"
import { Modal_set_jadwal } from './modal.set_jadwal';
import DatePicker from "react-datepicker"

export const Modal_create_campaign_tv = ({show, onHide}) => {
  const [input, setInput] = useState({
    nama_iklan:"",
    selected_cat_spot:"",
    selected_cat_price:"",
    from_date:null,
    end_date:null,
  })
  const [selected_program_tv, setSelected_program_tv] = useState([])
  const [options, setOptions] = useState({
    spot:[],
    price:[]
  })
  const [data_program_tv, setData_program_tv] = useState([]);
  const [modal, setModal] = useState(false);
  const [loading , setLoading] = useState(false);
  const [parsing, setParsing] = useState({});
  const {dispatch} = useContext(Context)

  useEffect(()=>{
    if(show === true){
      api_kampanye_iklan.get_category_spot_harga()
      .then(res =>{
        console.log({get_category_spot_harga:res})
        if(res?.success){
          setOptions(state=>({...state,
            spot: res.data.displayCategories.map(item =>({value:item.id, label:item.name})),
            price: res.data.priceCategories.map(item =>({value:item.id, label:item.name}))
          }))
        }
      })
    }
  },[show])

  useEffect(()=>{
    if(input.from_date && input.end_date && input.selected_cat_price){
      const body ={
        start_date: moment(input.from_date).format("YYYY-MM-DD"),
        end_date : moment(input.end_date).format("YYYY-MM-DD"),
        price_category_id: input.selected_cat_price.value,
      }
      api_kampanye_iklan.post_tvc_program({body})
      .then(res =>{
        if(res?.success){
          setData_program_tv(res.data.programs)
        }
        console.log({post_tvc_program:res})
      })
    }
  },[input])


  const onChangeValue = (e) =>{
    
    setInput(state=>({...state, [e.target.name]:e.target.value}))
  }

  const onChangeSelectProgram = (type,item,idx)=>{
    switch (type) {
      case "tambah":
        setSelected_program_tv(state=>([...state,item]))
        break;
      case "kurang":
        let kurang = selected_program_tv.filter(filter=> filter.program !== item.program)
        setSelected_program_tv(kurang)
        break;
    
      default:
        break;
    }
  }

  const btnLanjut=()=>{
    setLoading(true)
    const body ={
      display_category_id: input.selected_cat_spot?.value,
      end_date: input.end_date,
      price_category_id: input.selected_cat_price?.value,
      program_id: data_program_tv.map(item => item.program_id),
      start_date: input.from_date,
    }
    console.log({body})
    api_kampanye_iklan.post_tvc_schedule(body)
    .then(res =>{
      console.log({post_tvc_schedule:res})
      if(res?.success){
        setParsing(res.data)
        setModal(true)
        dispatch({type:"SET_DATA_INPUT_TVC", data_input_tvc:input})
      }
      else{
        AlertError({title:"ERROR", text:res.error})
      }
    })

    setLoading(false)
  }

  return (
    <Modal fullscreen show={show} onHide={onHide}>
      <Modal.Body>

        {/* MODAL ====== */}
        
        <Modal_set_jadwal show={modal} onHide={()=>setModal(false)} props={parsing} />
        {/* MODAL ====== */}



        <div className="container mb-3 mb-md-3">
            <HeaderPrimary color={COLOR_PRIMARY}>Detail Iklan TVC</HeaderPrimary>
            <p>Anda dapat membuat iklan TVC sesuai dengan kebutuhan anda!</p>
        </div>

        <div className="container mb-3 mb-md-3">
          <Form>
            <div className="mb-3 mb-md-3">
              <Label color={COLOR_SECONDARY}>Nama Iklan</Label>
              <input type="text" placeholder="Masukkan Judul iklan"  className="form-control" name="nama_iklan" onChange={onChangeValue} value={input.nama_iklan} />
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3 mb-md-3">
                  <Label color={COLOR_SECONDARY}>Kategori Spot</Label>
                  <Select placeholder="Kategori Spot" options={options.spot} value={input.selected_cat_spot} onChange={e=>setInput(state=>({...state, selected_cat_spot:e}))} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3 mb-md-3">
                  <Label color={COLOR_SECONDARY}>Kategori Harga</Label>
                  <Select placeholder="Kategori Harga" options={options.price} value={input.selected_cat_price} onChange={e=>setInput(state=>({...state, selected_cat_price:e}))} />
                </div>
              </div>
            </div>

            <div className="row mb-3 mb-md-3">
              <div className="col-md-6">
                <div className="mb-3 mb-md-3">
                  <Label color={COLOR_SECONDARY}>Jadwal mulai</Label>
                  {/* <input type="date" className="form-control" placeholder="From Date"  name="from_date" onChange={onChangeValue} value={input.from_date} /> */}
                  <DatePicker className="form-control" selected={input.from_date} selectsStart onChange={e=>setInput(state=>({...state, from_date:e}))} startDate={input.from_date} endDate={input.end_date} dateFormat="yyyy-MMM-dd" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3 mb-md-3">
                  <Label color={COLOR_SECONDARY}>Jadwal berakhir</Label>
                  {/* <input type="date" className="form-control" placeholder="End Date"  name="end_date" onChange={onChangeValue} value={input.end_date} /> */}
                  <DatePicker className="form-control" selected={input.end_date} startDate={input.from_date} endDate={input.end_date} selectsEnd onChange={e=>setInput(state=>({...state,end_date:e}))} minDate={input.from_date} dateFormat="yyyy-MMM-dd" />
                </div>
              </div>
            </div>

            <div className="mb-3 mb-md-3">
              <Label color={COLOR_SECONDARY}>Program TV</Label>

              <div className="d-flex" style={{flexWrap:"wrap"}}>
                {
                  data_program_tv?.map((item,idx)=>(
                    <Containercard className="border d-flex" active={  selected_program_tv.find(find => find.program === item.program)? true: false} key={idx} onClick={()=>onChangeSelectProgram(selected_program_tv.find(find=> find.program === item.program) ? "kurang":"tambah",item,idx)}>
                      <div style={{textAlign:"center"}}>{item.program}</div>
                    </Containercard>
                  ))
                }
              </div>
            </div>
            
          </Form>
        </div>

        <div className="container mb-3 mb-md-3">
          <div className="d-flex justify-content-between align-items-center">
            <button className="border btn" onClick={onHide}>Kembali</button>
            {
              !loading ?
                input.nama_iklan && input.selected_cat_price && input.selected_cat_spot && input.from_date && input.end_date&&  selected_program_tv.length >0 &&
                <ButtonPrimary onClick={btnLanjut}>Lanjut</ButtonPrimary>
              :null
            }
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

const Containercard = styled.div `
border-radius:10px;
align-items:center;
justify-content:center;
width:150px;
height:150px;
flex-direction: column;
color:${({active})=> active ? "#fff": "#ccc"};
cursor:pointer;
margin:10px 10px;
padding:0px 10px;
background:${({active})=>active ? COLOR_SECONDARY:"transparent"};

`
