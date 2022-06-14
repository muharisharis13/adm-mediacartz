import React, {useEffect, useState} from 'react'
import { Modal_Component } from '../../../../../../component'
import PropTypes from "prop-types";
import {Card} from "./component/card"
import {Accordion} from "./component/accordion"
import { Card_campaign } from './component/card_campaign';
import {api_insight} from "../../../../../../service/api";
import styled from "styled-components";
import {COLOR_SECONDARY} from "../../../../../../component/style/content/default";
import {Moment,FormatCurrency} from "../../../../../../util";
import {Verified} from "@styled-icons/material";
import { DonutBar } from '../../../../../../component/chart';
import {Table} from "react-bootstrap"

export const Modal_detail = ({show, onHide, props}) => {
  const [data, setData] = useState({});
  const [active_card, setActive_card] = useState("campaign")


  useEffect(()=>{
    if(show === true && props.id){
      api_insight.get_insight_detail({insight_id:props.id})
      .then(res =>{
        console.log({get_insight_detail:res});
        if(res?.success){
          setData(res.data)
        }
      })
    }
  },[show])


  function getTransactionSaldo(){
    let nominal = 0
    let report = data.campaign_report;
    for(let i = 0 ; i < report?.length ;  i++  ){
      let fee = report[i].campaign_fee;

      for(let j = 0 ; j < fee?.length; j++){
        nominal += fee[j].balance_history_debit?fee[j].balance_history_debit :0;
        nominal -= fee[j].balance_history_credit?fee[j].balance_history_credit :0;
      }
    }

    return nominal
  }
  function getTransactionBucket(){
    let nominal = 0
    let report = data.campaign_report;
    for(let i = 0 ; i < report?.length ;  i++  ){
      let fee = report[i].campaign_fee;

      for(let j = 0 ; j < fee?.length; j++){
        nominal += fee[j].bucket_history_debit?fee[j].bucket_history_debit :0;
        nominal -= fee[j].bucket_history_credit?fee[j].bucket_history_credit :0;
      }
    }

    return nominal
  }


  function getCampaignRecipient(){
    let campaign = 0

    let report = data.campaign_report;
    for(let i = 0; i <report?.length ; i++){
      campaign += report[i].campaign_total_recipient
    } 

    return campaign
  }

  function getEventTiketSell(){
    let ticket = 0;

    let report = data.event_report;
    for(let i=0; i < report?.length ; i ++){
      let arr_tiket_sales = report[i].ticket_sales

      for(let j=0; j < arr_tiket_sales?.length ; j ++){
        ticket += arr_tiket_sales[j].transaction_total_seat
      }
    }

    return ticket
  }

  function getEventTiketPeserta(){
    let ticket = 0;

    let report = data.event_report;
    for(let i=0; i < report?.length ; i ++){
      ticket += report[i].ticket_total_used
    }

    return ticket
  }


  function getMicrosite(){
    let microsite =0;

    let report = data.microsite_report;
    for(let i=0; i < report?.length ; i++){
      microsite += report[i].total_clicked
    }
    return microsite
  }

  function getMicrositeSubmit(){
    let microsite =0;

    let report = data.microsite_report;
    for(let i=0; i < report?.length ; i++){
      microsite += report[i].total_submitted
    }
    return microsite
  }



  return (
    <Modal_Component show={show} onHide={onHide}  title="Detail Insight" size="xl">
      <div className="container mb-3 mb-md-3">
        <div className="d-flex justify-content-between" style={{overflow:"hidden"}}>
          <div style={{width:"100%"}}>
            <Card saldo={getTransactionSaldo()} bucket={getTransactionBucket()} />
          </div>
          <div  style={{width:"100%"}} onClick={()=>setActive_card("campaign")}>
            <Card_campaign multi={false} title="CAMPAIGN" value1={{
              text:data.campaign_report && data?.campaign_report[0]?.product?.ms_channel?.ms_channel_name,
              number:getCampaignRecipient()
            }} 
            active={active_card === "campaign" ? true:false}
            />
          </div>
          <div  style={{width:"100%"}} onClick={()=>setActive_card("event")}>
            <Card_campaign multi title="EVENT" value1={{
              text:"Tiket Terjual",
              number:getEventTiketSell()
            }}
            value2={{
              text:"Peserta",
              number:getEventTiketPeserta()
            }}
              active={active_card === "event" ? true:false}
              />
          </div>
          <div  style={{width:"100%"}} onClick={()=>setActive_card("microsite")}>
            <Card_campaign multi title="MICROSITE"
              value1={{
                text:"Terklik",
                number:getMicrosite()
              }}
              value2={{
                text:"Terkirim",
                number:getMicrositeSubmit()
              }}
              active={active_card === "microsite" ? true:false}
            />
          </div>
        </div>
      </div>

      <div className="container mb-3 mb-md-3">
        <DivRow className="row">
          <div className="col-lg-6 col-md-6 col-sm-6"> 
            <DivTitle>Nama Insight</DivTitle>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6">
            {data?.programme_name}
          </div>
        </DivRow>
        <DivRow className="row">
          <div className="col-lg-6 col-md-6 col-sm-6"> 
            <DivTitle>Monitoring</DivTitle>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6">
            <div>
              {
                `Campaign #id : ${data.programme_monitor&&JSON.parse(data.programme_monitor).campaign_id}`
              }
            </div>
            <div>
              {
                `Event #id : ${data.programme_monitor&& JSON.parse(data.programme_monitor).event_id}`
              }
            </div>
          </div>
        </DivRow>
        <DivRow className="row">
          <div className="col-lg-6 col-md-6 col-sm-6"> 
            <DivTitle>Dibuat Tanggal</DivTitle>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6">
            {Moment(data?.programme_created_datetime)}
          </div>
        </DivRow>
        <DivRow className="row">
          <div className="col-lg-6 col-md-6 col-sm-6"> 
            <DivTitle>Dibuat Oleh</DivTitle>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6">
            {data?.programme_created_by?.name} &nbsp;
            {
              data?.programme_created_by?.verified_status_name === "verified" ? <Verified width={20} color='#35bd15' /> : null
            }
          </div>
        </DivRow>
        <DivRow className="row">
          <div className="col-lg-6 col-md-6 col-sm-6"> 
            <DivTitle>Perusahaan</DivTitle>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6">
            {data?.company?.company_name}
          </div>
        </DivRow>
      </div>
      
      {
       active_card === "campaign" && data?.campaign_report?.map((item,idx)=>(
          <div className="container mb-3 mb-md-3" key={idx}>
          <Accordion header={`${item.campaign_name} ID: #${item.campaign_id}`}>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="mb-3 mb-md-3">
                    <DivRow className="row">
                      <div className="col-md-6">
                        <DivTitle>ID Kampanye</DivTitle>
                      </div>
                      <div className="col-md-6">{item.campaign_id}</div>
                    </DivRow>
                    <DivRow className="row">
                      <div className="col-md-6">
                        <DivTitle>Nama Kampanye</DivTitle>
                      </div>
                      <div className="col-md-6">{item.campaign_name}</div>
                    </DivRow>
                    <DivRow className="row">
                      <div className="col-md-6">
                        <DivTitle>Nama Produk</DivTitle>
                      </div>
                      <div className="col-md-6">{item.product?.product_name}</div>
                    </DivRow>
                    <DivRow className="row">
                      <div className="col-md-6">
                        <DivTitle>Status Kampanye</DivTitle>
                      </div>
                      <div className="col-md-6">{item.campaign_status_name}</div>
                    </DivRow>
                    <DivRow className="row">
                      <div className="col-md-6">
                        <DivTitle>Total Penerima</DivTitle>
                      </div>
                      <div className="col-md-6">{item.campaign_total_recipient}</div>
                    </DivRow>
                    <DivRow className="row">
                      <div className="col-md-6">
                        <DivTitle>Total Batch</DivTitle>
                      </div>
                      <div className="col-md-6">{item.campaign_total_wave}</div>
                    </DivRow>
                    <DivRow className="row">
                      <div className="col-md-6">
                        <DivTitle>Tanggal Batch</DivTitle>
                      </div>
                      <div className="col-md-6">
                        {`${Moment(item.wave[0]?.campaign_date_from_datetime)} ~ ${Moment(item.wave[0]?.campaign_date_until_datetime)}`}
                      </div>
                    </DivRow>
                    <DivRow className="row">
                      <div className="col-md-6">
                        <DivTitle>Status Batch</DivTitle>
                      </div>
                      <div className="col-md-6">{item.wave[0]?.campaign_date_status_name}</div>
                    </DivRow>
                    <DivRow className="row">
                      <div className="col-md-6">
                        <DivTitle>Total Penerima</DivTitle>
                      </div>
                      <div className="col-md-6">{item.wave[0]?.campaign_date_total_recipient}</div>
                    </DivRow>
                    <DivRow className="row">
                      <div className="col-md-6">
                        <DivTitle>Total Terproses</DivTitle>
                      </div>
                      <div className="col-md-6">{item.wave[0]?.campaign_date_total_delivered}</div>
                    </DivRow>
                    <DivRow className="row">
                      <div className="col-md-6">
                        <DivTitle>Total Refund</DivTitle>
                      </div>
                      <div className="col-md-6">{item.wave[0]?.campaign_date_total_refund}</div>
                    </DivRow>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div style={{width:"300px"}}>
                    <DonutBar title="Ringkasan Kampanye Iklan" color={item.wave[0]?.report?.map(item=>item.color)} data_single={item.wave[0]?.report?.map(item=>item.value)} labels={item.wave[0]?.report?.map(item=>item.label)} />
                  </div>
                </div>
              </div>
          </Accordion>
          </div>
        ))
      }

      {
        active_card === "event" && data?.event_report?.map((item,idx)=>(
          <div className="container mb-3 mb-md-3" key={idx}>
          <Accordion header={`${item.event_name} ID : #${item.event_id}`}>
              <div className="row">
                <div className="col-lg-16 col-md-6 col-sm-6">
                  <div className="mb-3 mb-md-3">
                    <DivRow className="row">
                      <div className="col-md-6">
                        <DivTitle>Nama Event</DivTitle>
                      </div>
                      <div className="col-md-6">{item.event_name}</div>
                    </DivRow>
                    <DivRow className="row">
                      <div className="col-md-6">
                        <DivTitle>Tanggal Event</DivTitle>
                      </div>
                      <div className="col-md-6">{`${Moment(item.event_start_datetime)} ~ ${Moment(item.event_end_datetime)}`}</div>
                    </DivRow>
                    <DivRow className="row">
                      <div className="col-md-6">
                        <DivTitle>Total Click</DivTitle>
                      </div>
                      <div className="col-md-6">{item.event_total_clicked}</div>
                    </DivRow>
                    <DivRow className="row">
                      <div className="col-md-6">
                        <DivTitle>Total Like</DivTitle>
                      </div>
                      <div className="col-md-6">{item.event_total_liked}</div>
                    </DivRow>
                    <DivRow className="row">
                      <div className="col-md-6">
                        <DivTitle>External URL</DivTitle>
                      </div>
                      <div className="col-md-6">{item.event_external_url}</div>
                    </DivRow>
                    <DivRow className="row">
                      <div className="col-md-6">
                        <DivTitle>External URL Click</DivTitle>
                      </div>
                      <div className="col-md-6">{item.event_external_url_total_clicked}</div>
                    </DivRow>
                    <DivRow className="row">
                      <div className="col-md-6">
                        <DivTitle>Total Ticket Terscan</DivTitle>
                      </div>
                      <div className="col-md-6">
                        {item.ticket_total_used}
                      </div>
                    </DivRow>
                  </div>
                  <div>
                    <div>
                      <label>Shortened Links</label>
                    </div>
                    <div>
                      <DivRow className="row">
                        <div className="col-md-6">
                          <DivTitle>Original URL</DivTitle>
                        </div>
                        <div className="col-md-6" style={{wordWrap:"break-word"}}>{item.event_external_platform}</div>
                      </DivRow>
                      <DivRow className="row">
                        <div className="col-md-6">
                          <DivTitle>Shortened URL</DivTitle>
                        </div>
                        <div className="col-md-6">{`${item.event_external_url}`}</div>
                      </DivRow>
                      <DivRow className="row">
                        <div className="col-md-6">
                          <DivTitle>Shortened Total Click</DivTitle>
                        </div>
                        <div className="col-md-6">{`${item.event_external_url_total_clicked}`}</div>
                      </DivRow>
                    </div>
                  </div>
                </div>
                <div className="col-lg-16 col-md-6 col-sm-6">
                  {
                    item?.report?.length > 0 && 
                    <div style={{width:"300px"}} className="mb-3 mb-md-3">
                      <DonutBar title="Ringkasan Transaksi" color={item.report.map(item=>item.color)} data_single={item.report.map(item=>item.value)} labels={item.report.map(item=>item.label)} />
                    </div>
                  }

                  {
                    item?.ticket_sales?.length > 0 &&
                      <div>
                        <Table responsive striped hover bordered>
                          <thead>
                            <tr>
                              <th>Status</th>
                              <th>Total Seat</th>
                              <th>Total Transaction</th>
                              <th>Total Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              item.ticket_sales?.map((item2, idx2)=>(
                              <tr key={idx2}>
                                <td>{item2.transaction_approve_status_name}</td>
                                <td>{item2.transaction_total_seat}</td>
                                <td>{item2.transaction_total_count}</td>
                                <td>{FormatCurrency.currency(item2.transaction_total_amount)}</td>
                              </tr>
                              ))
                            }
                          </tbody>
                        </Table>
                      </div>
                  }
                </div>
              </div>
          </Accordion>
          </div>
        ))
      }

      {
        active_card === "microsite" && data?.microsite_report?.map((item,idx)=>(
          <div className="container mb-3 mb-md-3" key={idx}>
          <Accordion header={`${item.microsite_name} ID : #${item.microsite_id}`}>
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <div className="mb-3 mb-md-3">
                    <DivRow className="row">
                      <div className="col-md-6">
                        <DivTitle>Nama Microsite</DivTitle>
                      </div>
                      <div className="col-md-6">{item.microsite_name}</div>
                    </DivRow>
                    <DivRow className="row">
                      <div className="col-md-6">
                        <DivTitle>Slug</DivTitle>
                      </div>
                      <div className="col-md-6">{item.microsite_slug}</div>
                    </DivRow>
                    <DivRow className="row">
                      <div className="col-md-6">
                        <DivTitle>Full URL</DivTitle>
                      </div>
                      <div className="col-md-6">{item.microsite_full_url}</div>
                    </DivRow>
                    <DivRow className="row">
                      <div className="col-md-6">
                        <DivTitle>Total Klik</DivTitle>
                      </div>
                      <div className="col-md-6">{item.total_clicked}</div>
                    </DivRow>
                    <DivRow className="row">
                      <div className="col-md-6">
                        <DivTitle>Total Terkirim</DivTitle>
                      </div>
                      <div className="col-md-6">{item.total_submitted}</div>
                    </DivRow>
                  </div>
                </div>
              </div>
          </Accordion>
          </div>
        ))
      }


    </Modal_Component>
  )
}



const DivRow = styled.div `
background-color: #fff;
border-bottom: 1px solid #ccc;
padding:2.5px 0px;

&:last-child{
  border-bottom:none;
}
`

const DivTitle = styled.strong `
color : ${COLOR_SECONDARY};

`

Modal_detail.defaultProps = {
  show:true
}

Modal_detail.propType ={
  show : PropTypes.bool,
  onHide: PropTypes.func,
  props : PropTypes.object
}