import React,{useEffect,useState} from 'react';
import * as Component from "../../../../component";
import styled from "styled-components"

const ModalOrganizerDetail = (props:{show:boolean,onHide:Function,data_props:any}) => {
  const {show,onHide,data_props} = props
  
  useEffect(()=>{
    if(show){
    }
  },[show])


  console.log({data_props})
  return (
    <Component.Modal_Component show={show} onHide={onHide} title="Detail Organizer" size="xl">
      <Container>
        <div className="wrap-image text-center">
          <img src={data_props?.dataDetail?.imageUrl} alt="" />
        </div>

        <div className="wrap-data mt-5">
          {
            data_props?.dataDetail?.arr_detail?.map((item:any,idx:number)=>(
              <div className="data d-flex" key={idx}>
                <div className="title">
                  {item.name}
                </div>
                <div className="data-content">
                  {item.value}
                </div>
              </div>
            ))
          }
        </div>
      </Container>
    </Component.Modal_Component>
  )
}

export default ModalOrganizerDetail;

const Container = styled.div `

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
    width: 100%;
    height:400px;
    object-fit:contain;
  }
}

`