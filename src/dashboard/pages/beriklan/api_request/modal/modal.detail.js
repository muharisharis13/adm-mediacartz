import React, {useEffect, useState} from 'react'
import { Modal_Component } from '../../../../../component';
import styled from "styled-components";
import {COLOR_SECONDARY} from "../../../../../component/style/content/default"
import {api_request} from "../../../../../service/api";
import {FormatCurrency} from "../../../../../util"

export const Modal_detail = ({show, onHide,props}) => {
    const {id} = props;
    const [data, setData] = useState({})

    console.log("ini id", id)

    useEffect(()=>{
      if(id && show === true){
        api_request.get_api_request_detail(id)
        .then(res =>{
          console.log({get_api_request_detail:res})
          if(res?.success){
            setData(res.data)
          }
        })
      }
    },[show])
  return (
    <Modal_Component show={show} onHide={onHide} title="API REQUEST">
      <div>
        <div className="container">
          <Row className="row bg-white">
              <div className="col-md-6 col-sm-6">
                  <strong style={{ color: COLOR_SECONDARY }}>Nomor Transaksi</strong>
              </div>
              <div className="col-md-6 col-sm-6">
                  {data?.api_transaction_number}
              </div>
          </Row>
          <Row className="row bg-white">
              <div className="col-md-6 col-sm-6">
                  <strong style={{ color: COLOR_SECONDARY }}>Produk</strong>
              </div>
              <div className="col-md-6 col-sm-6">
                  {`${data?.api_media} ${data?.api_channel}`}
              </div>
          </Row>
          <Row className="row bg-white">
              <div className="col-md-6 col-sm-6">
                  <strong style={{ color: COLOR_SECONDARY }}>Sender ID</strong>
              </div>
              <div className="col-md-6 col-sm-6">
                  {data?.api_sender_name}
              </div>
          </Row>
          <Row className="row bg-white">
              <div className="col-md-6 col-sm-6">
                  <strong style={{ color: COLOR_SECONDARY }}>Nama Penerima</strong>
              </div>
              <div className="col-md-6 col-sm-6">
                  {data?.api_recipient_name}
              </div>
          </Row>
          <Row className="row bg-white">
              <div className="col-md-6 col-sm-6">
                  <strong style={{ color: COLOR_SECONDARY }}>Kontak Penerima</strong>
              </div>
              <div className="col-md-6 col-sm-6">
                  {data?.api_recipient_address}
              </div>
          </Row>
          <Row className="row bg-white">
              <div className="col-md-6 col-sm-6">
                  <strong style={{ color: COLOR_SECONDARY }}>Lampiran</strong>
              </div>
              <div className="col-md-6 col-sm-6">
                  {data?.api_attachment_generated_name}
              </div>
          </Row>
          <Row className="row bg-white">
              <div className="col-md-6 col-sm-6">
                  <strong style={{ color: COLOR_SECONDARY }}>Subjek</strong>
              </div>
              <div className="col-md-6 col-sm-6">
                  {data?.api_subject}
              </div>
          </Row>
          <Row className="row bg-white">
              <div className="col-md-6 col-sm-6">
                  <strong style={{ color: COLOR_SECONDARY }}>Pesan</strong>
              </div>
              <div className="col-md-6 col-sm-6">
                  {data?.api_message}
              </div>
          </Row>
          <Row className="row bg-white">
              <div className="col-md-6 col-sm-6">
                  <strong style={{ color: COLOR_SECONDARY }}>Saldo Terpakai</strong>
              </div>
              <div className="col-md-6 col-sm-6">
                  {FormatCurrency.currency(data?.api_price)}
              </div>
          </Row>
          <Row className="row bg-white">
              <div className="col-md-6 col-sm-6">
                  <strong style={{ color: COLOR_SECONDARY }}>Impressi Terpakai</strong>
              </div>
              <div className="col-md-6 col-sm-6">
                  {data?.api_impression_usage}
              </div>
          </Row>
          <Row className="row bg-white">
              <div className="col-md-6 col-sm-6">
                  <strong style={{ color: COLOR_SECONDARY }}>Status</strong>
              </div>
              <div className="col-md-6 col-sm-6">
                  {data?.api_status_name}
              </div>
          </Row>
          <Row className="row bg-white">
              <div className="col-md-6 col-sm-6">
                  <strong style={{ color: COLOR_SECONDARY }}>Tanggal Dibuat</strong>
              </div>
              <div className="col-md-6 col-sm-6">
                  {data?.api_created_datetime}
              </div>
          </Row>
          <Row className="row bg-white">
              <div className="col-md-6 col-sm-6">
                  <strong style={{ color: COLOR_SECONDARY }}>Dibuat Oleh</strong>
              </div>
              <div className="col-md-6 col-sm-6">
                  {data?.api_created_by}
              </div>
          </Row>
          <Row className="row bg-white">
              <div className="col-md-6 col-sm-6">
                  <strong style={{ color: COLOR_SECONDARY }}>Perusahaan</strong>
              </div>
              <div className="col-md-6 col-sm-6">
                  {data?.company?.company_name}
              </div>
          </Row>
          <Row className="row bg-white">
              <div className="col-md-6 col-sm-6">
                  <strong style={{ color: COLOR_SECONDARY }}>IP Client</strong>
              </div>
              <div className="col-md-6 col-sm-6">
                  {data?.api_ip}
              </div>
          </Row>
          <Row className="row bg-white">
              <div className="col-md-6 col-sm-6">
                  <strong style={{ color: COLOR_SECONDARY }}>Keterangan</strong>
              </div>
              <div className="col-md-6 col-sm-6">
                  {data?.api_note}
              </div>
          </Row>
          <Row className="row bg-white">
              <div className="col-md-6 col-sm-6">
                  <strong style={{ color: COLOR_SECONDARY }}>Response API</strong>
              </div>
              <div className="col-md-6 col-sm-6" style={{wordBreak:"break-word"}}>
                  {data?.api_response}
              </div>
          </Row>
        </div>
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
