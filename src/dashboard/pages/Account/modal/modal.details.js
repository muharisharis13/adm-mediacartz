import React, {useEffect, useState} from 'react';
import {Modal_Component} from "../../../../component"
import styled from "styled-components";
import {COLOR_SECONDARY} from "../../../../component/style/content/default";
import * as api from "../../../../service/api";
import {Moment} from "../../../../util"

export const Modal_details = (props) => {
    const [data ,setData] = useState([])


  useEffect(()=>{
    if(props.show){
      getData()
    }
  },[props.show])

  return (
    <Modal_Component show={props.show} onHide={props.onHide} title="Detail User">
      <Container className="container">
        {
          data?.map((item,idx)=>(
            <div className="container-row" key={idx}>
              <div className="title">{`${item.title}`}</div>
              {
                item.content?.type === "ul" ?
                  <div className="content">{item.content}</div>
                :
                  <div className="content">{`${item.content}`}</div>
              }
            </div>
          ))
        }
      </Container>
    </Modal_Component>
  )


  async function getData(){
   await api.api_account.get_detail_user(props.props?.id)
    .then(res =>{
      console.log(res)
      if(res?.success){
        setData([
          {
            title : "Nama User",
            content: res.data?.name
          },
          {
            title : "Email",
            content: res.data?.email
          },
          {
            title : "Bio",
            content: res.data?.bio
          },
          {
            title : "Kota",
            content: res.data?.ms_city?.ms_city_name_full
          },
          {
            title : "Tanggal Upload Dokumen",
            content: Moment(res.data?.uploaded_datetime)
          },
          {
            title : "Tanggal Dibuat",
            content: Moment(res.data?.created_datetime)
          },
          {
            title : "Dibuat Oleh",
            content:res.data?.created_by?.name
          },
          {
            title : "Tanggal Diubah",
            content: Moment(res.data?.rupdated_datetime)
          },
          {
            title : "Diubah Oleh",
            content: res.data?.updated_by?.name
          },
          {
            title : "Login Terakhir pada",
            content: Moment(res.data?.last_login_datetime)
          },
          {
            title : "Status",
            content: res.data?.active_user_status_name
          },
          {
            title : "Status Verified",
            content: res.data?.verified_status_name
          },
          {
            title : "Perusahaan yang Terhubung",
            content: <ul>
              {
                res.data?.link?.map((item,idx)=>(
                  <li key={idx}>{`${item.company?.company_name} as ${item.ms_user.ms_user_name}`}</li>
                ))
              }
            </ul>
          },
        ])
      }
    })
  }
};

const Container = styled.div `


  .container-row{
    display:flex;
    align-items: center;
    background-color: #fff;
    padding:7px;
    border-bottom:thin solid #eaeaea;

    .title{
      width:100%;
      font-weight:700;
      color:${COLOR_SECONDARY}
    }
    .content{
      width:100%;
    }
  }
`
