import React,{useEffect, useState} from 'react';
import {Modal} from "react-bootstrap";
import styled from "styled-components";
import {COLOR_PRIMARY,ButtonPrimary} from "../../../../../../component/style/content/default";
import {FormatCurrency} from "../../../../../../util"
import { Modal_create_tvc } from './modal.create_tvc';

export const Modal_set_jadwal = (props) => {
  const [data, setData] = useState(null); //pricebook:<object> , schedule:<array>
  const [list_date, setList_date] = useState([]);
  const [selected, setSelected] = useState({
    selected_date:{},
    selected_program:[]
  }) //selected_date , selected_program:<array />
  const [modal, setModal] = useState(false);
  const [parsing, setParsing] = useState({})


  useEffect(()=>{
    if(props.show){
      setData(props.props)
      setList_date([...new Set(props.props?.schedule.map(item=>item.date))])
    }
  },[props.show])

  // console.log(list_date,data)

  const onChangeProgram = (item)=>{

    if(selected.selected_program.find(find=>find.start_time === item.start_time)){
      
    }
    else{
      setSelected(state=>({...state, selected_program:[...selected.selected_program,item]}))
    }
  }

  const remveProgram=(item)=>{
    let filter = selected.selected_program.filter(filter => filter.start_time !== item.start_time)

    setSelected(state=>({...state, selected_program:filter}))
  }

  let totalharga =data !== null ? parseInt(data.pricebook?.publish_price) * parseInt(selected.selected_program?.length) :0;


  const btnLanjut = () =>{
    console.log(selected)

    setParsing(state=>({...state, selected_program:selected.selected_program, data:data, totalharga:totalharga }))


    setModal(true)
  }


  return (
    <Modal fullscreen show={props.show} onHide={props.onHide}>
      <Modal.Body>

        {/* MODAL ======= */}

          <Modal_create_tvc show={modal} onHide={()=>setModal(false)} props={parsing} />

        {/* MODAL ======= */}

        <Container className='container'>
            <div className="header">
              <h4 className="title">Jadwal yang tersedia</h4>
              <span className="sub-title">Pilih jadwal untuk iklan TVC anda</span>
            </div>

            <div className="content">

              <div className="row">
                <div className="col-lg-6">
                  <div className="list-date">
                    {
                      list_date.map((item,idx)=>(
                        <CardDate className="card-date" active={item === selected.selected_date? true:false} key={idx} onClick={()=>setSelected(state=>({...state,selected_date:item}))} >
                          {item}
                        </CardDate>
                      ))
                    }
                  </div>

                  <div className="list-date-desc">
                    {
                      data?.schedule?.filter(filter=> filter.date === selected.selected_date).map((item,idx)=>(
                        <div className="card-date-desc"  key={idx}>
                            <div className="left">
                              <h5 className="left-title">{item.program}</h5>
                              <div className="left-desc">{item.program_desc}</div>
                            </div>
                            <Right className="right" active={selected.selected_program.find(find=>find.start_time === item.start_time ? true:false)} onClick={()=>onChangeProgram(item)}>
                              <div className="right-date">{item.start_time} - {item.end_time}</div>
                            </Right>
                        </div>
                      ))
                    }
                  </div>
                </div>
                <div className="col-lg-6">
                  {
                    selected.selected_program?.length >0 &&
                      <div className="form-detail-harga">
                          <h4 className="title-detail-harga">Detail Harga</h4>

                            {
                              selected.selected_program?.map((item,idx)=>(
                                <div className="card-detail-harga" key={idx}>
                                  <div className="delete" onClick={()=>remveProgram(item)}>x</div>
                                  <div className="content-harga">
                                    {item.date}, {item.start_time} - {item.end_time} {item.program}
                                  </div>
                                </div>
                              ))
                            }

                          <div className="contsummay">
                            <div className="text-total">Total :</div>
                            <div className="text-total-all">{selected.selected_program?.length} x {FormatCurrency.input(data.pricebook?.publish_price)} = <strong>{FormatCurrency.currency(totalharga)}</strong></div>
                          </div>
                      </div>
                  }


                    <div className="cont-button">
                      <button className="btn border" onClick={()=>props.onHide()}>Kembali</button>
                      <ButtonPrimary onClick={()=>btnLanjut()}>Lanjut</ButtonPrimary>
                    </div>

                </div>
              </div>
             
            </div>
        </Container>
      </Modal.Body>
    </Modal>
  )
};


const CardDate = styled.div `

${({active})=>
  active && `
  background: #2dbded !important;
  color: #ffffff !important;
  box-shadow: 0px 0px 20px #2dbded !important;
  border:2px solid #2dbded !important;
  `
}
`

const Right = styled.div `

${({active})=>
  active ? `
    background: #2dbded !important;
    color: #ffffff !important;
    box-shadow: 0px 0px 20px #2dbded !important;
    border:2px solid #2dbded !important;
  `
  :null
}
`

const Container = styled.div `

  .content{
    margin-top:20px;
    .list-date{
      display: flex;
      overflow-x: scroll;
      flex-direction:row;
      white-space:nowrap;
      padding:10px;
      background-color: #fff;
      box-shadow: 0px 3px 6px rgb(0 0 0 / 16%);

      .card-date{
        border:2px solid #ccc;
        color: #ccc;
        padding:10px 5px;
        width:200px ;
        border-radius:8px;
        cursor:pointer;
        margin-right:10px;
        background:#fff;

        &:last-child{
          margin-right:0;
        };

        transition:300ms;

        &:hover{
          background: #2dbded;
          color: #ffffff;
          box-shadow: 0px 0px 20px #2dbded;
          border:2px solid #2dbded;
          
        }

      }
    }

    .list-date-desc{
      margin-top:20px;
      padding:10px;
      background-color: #fff;
      box-shadow: 0px 3px 6px rgb(0 0 0 / 16%);
      

      .card-date-desc{
        display:flex;
        justify-content: space-between;
        align-items:center;
        margin-bottom:20px;
        &:last-child{
          margin-bottom:0;
        }
        
        .left{
          display:flex;
          flex-direction: column;
          background:#6897d0;
          align-items:center;
          justify-content: center;
          width:70%;
          padding:10px;
          border-radius:8px;
        }

        .right{
          border:2px solid #ccc;
          display:flex;
          align-items:center;
          justify-content:center;
          cursor:pointer;
          padding:15px 10px;
          border-radius:8px;
          background:#fff;
          transition:300ms;

          &:hover{
            background: #2dbded;
            color: #ffffff;
            box-shadow: 0px 0px 20px #2dbded;
            border:2px solid #2dbded;
          }
        }
      } 

    }

    .cont-button{
      display:flex;
      justify-content:space-between;
      align-items:center;
      margin-top:10px;
    }


    .form-detail-harga{
      padding:10px;
      background-color: #fff;
      box-shadow: 0px 3px 6px rgb(0 0 0 / 16%);

      .contsummay{
        display:flex;
        justify-content:space-between;
        align-items:center;
      }

      .title-detail-harga{
        color:${COLOR_PRIMARY};
        font-weight:800;
        
      }

      .card-detail-harga{
        display:flex;
        align-items:center;
        margin-bottom:10px;
        &:last-child{
          margin-bottom:0;
        };

        .delete{
          display:flex;
          align-items:center;
          justify-content:center;
          margin-right:10px;
          padding:5px 10px;
          background:#ccc;
          cursor:pointer;
        }
        .content-harga{

        }
      }
    }
  }

  .header{

    .title{
      color:${COLOR_PRIMARY}
    }
  }
`
