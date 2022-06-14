import React, {useEffect, useState, useContext} from 'react'
import {Modal} from "react-bootstrap"
import { COLOR_SECONDARY, HeaderPrimary, HeaderSecondary, HeaderThird } from '../../../../../../component/style/content/default';
import styled from "styled-components"
import { api_kampanye_iklan } from '../../../../../../service/api';
import { Context } from '../../../../../../service';
import {ChevronCircleLeft} from "@styled-icons/fa-solid"
import { Modal_view_dooh } from './modal.view_dooh';

export const Modal_create_campaign_dooh = ({show, onHide}) => {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState({
    view_dooh:false
  });
  const [props, setProps] = useState({});
  const {dispatch} = useContext(Context)


  const get_data = async ()=>{
    const body={
      "filter": [
          {
              "field": "inventory",
              "operator": "LIKE",
              "value": "DOOH"
          }
      ],
      "order": [
          {
              "field": "inventory_id",
              "sort": "ASC"
          }
      ]
    }
    await api_kampanye_iklan.get_publisher_inventory({body:body})
    .then(res =>{
      console.log({get_publisher_inventory:res})
      if(res?.success){
        setData(res.data[0])
      }
    })

  }

  useEffect(()=>{
    if(show){
      get_data();
    }
  },[show])


  const btnViewDooh = (id,variant)=>{
    setProps(state=>({...state, id:id}))
    dispatch({type:"SET_DOOH_VARIANT",variant_dooh:variant})
    setModal(state=>({...state, view_dooh:true}))
  }


  return (
    <Modal fullscreen show={show} onHide={onHide}>
      <Modal.Body>
        {/* MODAL ====== */}

        <Modal_view_dooh show={modal.view_dooh} onHide={()=>setModal(state=>({...state , view_dooh:false}))} id={props?.id} />

        {/* MODAL ====== */}
        <div className="container mb-3">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <HeaderPrimary color={COLOR_SECONDARY}>DOOH Signage</HeaderPrimary>
              <span>Anda dapat memasangkan iklan di DOOH signage sesuai dengan kebutuhan Anda</span>
            </div>
            <div>
              <button className="btn align-items-center justify-content-center d-flex border" style={{color:"#aaa"}} onClick={()=>onHide()}>
                <ChevronCircleLeft width={20} /> &nbsp;
                <strong>Kembali</strong>
              </button>
            </div>
          </div>
        </div>

        <div className="container mb-3 mb-md-3">
          <WrapperList>
            {
              data?.inventory_category?.map((item,idx)=>(
                <ContainerCard key={idx} onClick={()=>btnViewDooh(item.inventory_category_id,item.category)}>
                  <div>
                    <ImageCard src="https://images.unsplash.com/photo-1568628883353-7de22425179f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80" alt="img" />
                  </div>
                  <div className="d-flex align-items-center justify-content-center mt-2" style={{wordBreak:"break-word", padding:"0 15px"}}>
                    <HeaderThird style={{fontSize:"1rem",textAlign:"center"}} color={COLOR_SECONDARY}>
                      <p>
                        {item.category}
                      </p>
                    </HeaderThird>
                  </div>
                </ContainerCard>
              ))
            }
          </WrapperList>
        </div>


        <div className="container mb-3 mb-md-3">
          <ContainerContactUs>
            <HeaderContactUs>
              <div style={{lineHeight:"10px"}}>
                <strong>Contact Us</strong>
              </div>
            </HeaderContactUs>
            <ContentContactUs>
              <ContainerItem>
                <div style={{width:"150px"}}>
                  <strong>Phone / Whatsapp</strong>
                </div>
                <span style={{marginRight:"8px"}}>:</span>
                <div>
                  <p>+62812-1825-5224 (Nani)</p>
                </div>
              </ContainerItem>
              <ContainerItem>
                <div style={{width:"150px"}}>
                  <strong>Email Address</strong>
                </div>
                <span style={{marginRight:"8px"}}>:</span>
                <div>
                  <LinkEmail href="mailto:cs@mediacartz.com">cs@mediacartz.com</LinkEmail>
                </div>
              </ContainerItem>
              <ContainerItem className="mt-5 mt-md-5">
                <ButtonDownloadBrosur href="/dooh/Slide.pptx" target="_blank"> Download Brosur</ButtonDownloadBrosur>
              </ContainerItem>
            </ContentContactUs>
          </ContainerContactUs>
        </div>
      </Modal.Body>
    </Modal>
  )
}

const ButtonDownloadBrosur = styled.a `
text-decoration: none;
display:flex;
background:${COLOR_SECONDARY};
border:thin solid ${COLOR_SECONDARY};
color: #fff;
padding:7px 15px;
border-radius:5px;
transition:300ms;
font-weight:500;

&:hover{
  color:#000;
  background:transparent;
}
`

const LinkEmail = styled.a `
text-decoration:none;
color: ${COLOR_SECONDARY};

&:hover{
  color:${COLOR_SECONDARY};
}
`

const ContainerItem = styled.div `
display:flex;
`

const ContentContactUs = styled.div `
padding:16px;
`

const HeaderContactUs = styled.header `
color : ${COLOR_SECONDARY};
border-bottom: thin solid #ccc;
padding:16px;
`

const ContainerContactUs = styled.div `
background:#fff;
box-shadow: 0px 3px 6px rgb(0 0 0 / 16%);
`

const WrapperList = styled.div `
display:flex;
flex-wrap: wrap;
justify-content:baseline;
align-items:center;
`

const ImageCard = styled.img `
width:100%;
object-fit:cover;
border-radius:7px 7px 0px 0px;
`

const ContainerCard = styled.div `
border-radius:7px;
width:calc(80% / 4);
cursor:pointer;
transition: 250ms;
background:#fff;
margin:calc(10% / 4) calc(10% / 4);

box-shadow: 10px 10px 13px -9px rgba(0,0,0,0.48);
-webkit-box-shadow: 10px 10px 13px -9px rgba(0,0,0,0.48);
-moz-box-shadow: 10px 10px 13px -9px rgba(0,0,0,0.48);

&:hover{
  transform: scale(1.1);
}
`
