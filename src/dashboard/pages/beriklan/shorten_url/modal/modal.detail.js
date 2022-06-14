import React, {useState, useEffect} from 'react';
import { Modal_Component } from '../../../../../component';
import styled from "styled-components";
import { COLOR_SECONDARY } from '../../../../../component/style/content/default';
import { api_shorten_url } from '../../../../../service/api';
import { Moment } from '../../../../../util';

export const Moodal_detail = ({show,onHide,props}) => {
  const [data, setData] = useState({})

  useEffect(()=>{
    if(show===true){
      api_shorten_url.get_shorten_url_detail(props?.shortened_parameter)
      .then(res =>{
        console.log({get_shorten_url_detail:res})
        if(res?.success){
          setData(res.data)
        }
      })
    }
  },[show])
  return (
    <Modal_Component title="Detail Shortened URL" show={show} onHide={onHide}>
      <div className="container">
          <Row className="row bg-white">
              <div className="col-md-6 col-sm-6">
                  <strong style={{ color: COLOR_SECONDARY }}>Original Link</strong>
              </div>
              <div className="col-md-6 col-sm-6" style={{wordBreak:"break-word"}}>
                  <a href={data?.shortened_original_link} target="__blank">
                  {data?.shortened_original_link}
                  </a>
              </div>
          </Row>
          <Row className="row bg-white">
              <div className="col-md-6 col-sm-6">
                  <strong style={{ color: COLOR_SECONDARY }}>Shortened URL</strong>
              </div>
              <div className="col-md-6 col-sm-6" style={{wordBreak:"break-word"}}>
                  <a href={data?.shortened_full_url} target="__blank">
                  {data?.shortened_full_url}
                  </a>
              </div>
          </Row>
          <Row className="row bg-white">
              <div className="col-md-6 col-sm-6">
                  <strong style={{ color: COLOR_SECONDARY }}>Total Click</strong>
              </div>
              <div className="col-md-6 col-sm-6" style={{wordBreak:"break-word"}}>
                  {data?.shortened_total_clicked}
              </div>
          </Row>
          <Row className="row bg-white">
              <div className="col-md-6 col-sm-6">
                  <strong style={{ color: COLOR_SECONDARY }}>Parameter</strong>
              </div>
              <div className="col-md-6 col-sm-6" style={{wordBreak:"break-word"}}>
                  {data?.shortened_parameter}
              </div>
          </Row>
          <Row className="row bg-white">
              <div className="col-md-6 col-sm-6">
                  <strong style={{ color: COLOR_SECONDARY }}>Tanggal Dibuat</strong>
              </div>
              <div className="col-md-6 col-sm-6" style={{wordBreak:"break-word"}}>
                  {Moment(data?.shortened_created_datetime)}
              </div>
          </Row>
          <Row className="row bg-white">
              <div className="col-md-6 col-sm-6">
                  <strong style={{ color: COLOR_SECONDARY }}>Dibuat Oleh</strong>
              </div>
              <div className="col-md-6 col-sm-6" style={{wordBreak:"break-word"}}>
                  {
                    data?.shortened_created_by?.name
                  }
              </div>
          </Row>
      </div>
    </Modal_Component>
  )
}



const Row = styled.div`
border:1px solid transparent;
border-bottom-color:#ccc;
padding:5px 5px;



&:last-child{
  border-bottom-color: transparent;
}
`