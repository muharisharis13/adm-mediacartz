import React, {useEffect, useState} from 'react'
import PropTypes from "prop-types"
import { Modal_Component,AlertError } from '../../../../../component';
import { COLOR_HOVER_DANGER } from '../../../../../component/style/content/default';
import {Table} from "react-bootstrap";
import {api_kampanye_iklan} from "../../../../../service/api"
import {Moment,FormatCurrency} from "../../../../../util"
import styled from "styled-components";

export const Modal_laporan = (props) => {
  const {data_props} = props
  const {campaign_id} = data_props
  const [data, setData] = useState({})

  const  get_data = async ()=>{
     await api_kampanye_iklan.get_campaign_report(campaign_id)
     .then(res =>{
       console.log({get_camapaign_report:res})
       if(res?.success){
         setData(res.data)
       }
     })
  }

  useEffect(()=>{
    if(props.show){
      get_data()
    }
  },[props.show])

  return (
    <Modal_Component size="xl" title="Laporan Iklan" show={props.show} onHide={props.onHide}>
      
      <Table hover bordered responsive striped>
        <thead>
          <tr>
            <th>Tanggal Mulai</th>
            <th>Tanggal Berakhir</th>
            <th>Total Penerima</th>
            <th>Total Refund</th>
            <th>Total Diproses</th>
            <th>Terkirim</th>
            {
              data.product?.ms_invenroty?.ms_inventory_identifier === "EMAIL" &&
              <>
                <th>Error</th>
                <th>Status Batch</th>
                <th>Submitted</th>
                <th>Opened</th>
                <th>Clicked</th>
                <th>Unsubs</th>
                <th>Bounced</th>
                <th>Complaints</th>
                <th>Suppressed</th>
              </>
            }
            <th>Error</th>
            <th>Status Batch</th>
            {
              data.product?.ms_channel?.ms_channel_name === "BROADCAST" &&
              <>
                <th>Laporan Proses</th>
                <th>Laporan Sukses</th>
                <th>Laporan Pengembalian</th>
              </>
            }
          </tr>
        </thead>
        <tbody>
          {
            data.wave?.map((item,idx)=>(
              <tr key={idx}>
                <td>{Moment(item.campaign_date_from_datetime)}</td>
                <td>{Moment(item.campaign_date_until_datetime)}</td>
                <td>
                  {item.campaign_date_total_recipient ? item.campaign_date_total_recipient : 0}
                </td>
                <td>
                  {item.campaign_date_total_refund ? item.campaign_date_total_refund : 0}
                </td>
                <td>
                  {item.campaign_date_hit_success ? item.campaign_date_hit_success : 0}
                </td>
                <td>
                  {item.campaign_date_total_delivered ? item.campaign_date_total_delivered : 0}
                </td>
                {
                  data.product?.ms_invenroty?.ms_inventory_identifier === "EMAIL" &&
                  <>
                    <td>
                      {item.campaign_date_total_submitted ? item.campaign_date_total_submitted : 0}
                    </td>
                    <td>
                      {item.campaign_date_total_opened ? item.campaign_date_total_opened : 0}
                    </td>
                    <td>
                      {item.campaign_date_total_clicked ? item.campaign_date_total_clicked : 0}
                    </td>
                    <td>
                      {item.campaign_date_total_unsubscribed ? item.campaign_date_total_unsubscribed : 0}
                    </td>
                    <td>
                      {item.campaign_date_total_bounced ? item.campaign_date_total_bounced : 0}
                    </td>
                    <td>
                      {item.campaign_date_total_complaints ? item.campaign_date_total_complaints : 0}
                    </td>
                    <td>
                      {item.campaign_date_total_suppressed ? item.campaign_date_total_suppressed : 0}
                    </td>
                  </>
                }
                <td>
                  {item.campaign_date_total_error ? item.campaign_date_total_error : 0}
                </td>
                <td>
                  <TagStatus status={item.campaign_date_status_name}>
                    {item.campaign_date_status_name}
                  </TagStatus>
                </td>
                {
                  data.product?.ms_channel?.ms_channel_name === "BROADCAST" &&
                  <>
                    <td>
                      <a
                        href={null}
                        onClick={() => downloadReport(item.campaign_id, `CAMPAIGNID_${item.campaign_id}_${item.campaign_date_id}_COMPLETED.csv`)}
                        >
                        Download File Complete
                      </a>
                    </td>
                    <td>
                      <a
                        href={null}
                        onClick={() => downloadReport(item.campaign_id, `CAMPAIGNID_${item.campaign_id}_${item.campaign_date_id}_RETURN.csv`)}
                        >
                        Download File Return 
                      </a>
                    </td>
                    <td>
                      <a
                        href={null}
                        onClick={() => downloadReport(item.campaign_id, `CAMPAIGNID_${item.campaign_id}_${item.campaign_date_id}_REFUND.csv`)}
                        >
                        Download File Refund
                      </a>
                    </td>
                  </>
                }
              </tr>
            ))
          }
        </tbody>
      </Table>

      <div className="mt-5">
        {
          data.shortened?.length > 0 &&
          <div>
            <div className="mb-5">
              <h1>Ringkasan Url</h1>
            </div>

            <div className="table-data">
              <Table hover bordered responsive striped>
                <thead>
                  <tr>
                    <th>Tanggal Buat</th>
                    <th>Original URL</th>
                    <th>Ringkasan URL</th>
                    <th>Total diklik</th>
                    <th>Download Laporan</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data.shortened?.map((item,idx)=>(
                      <tr key={idx}>
                        <td>
                          {Moment(item.shortened_detail_created_datetime)}
                        </td>
                        <td>{item.shortened?.shortened_original_link}</td>
                        <td>{item.shortened?.shortened_full_url}</td>
                        <td>
                          {FormatCurrency.input(item.shortened.shortened_total_clicked)}
                        </td>
                        <td>
                          <a
                            href={null}
                            onClick={() => downloadShortenedReport(item.shortened?.shortened_id)}
                            >
                            Download File
                          </a>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
            </div>
          </div>
        }
      </div>
    </Modal_Component>
  )

  async function downloadShortenedReport(shortened_id) {
    const result = await api_kampanye_iklan.get_file_shorted;

    //validasi gagal
    if (
      result.type === "application/json" &&
      Object.entries(result).length === 0
    ) {
      AlertError({title:"ERROR", text:"File Not Found"})
    } else {
      //download file
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(result);
      link.setAttribute("download", `${shortened_id}-shortened-report.csv`);
      document.body.appendChild(link);
      link.click();
    }
  }


  async function downloadReport(campaign_id, filename) {
    const result = await api_kampanye_iklan.get_file_campign(campaign_id,filename)

    //validasi gagal
    if (
      result.type === "application/json" &&
      Object.entries(result).length === 0
    ) {
      AlertError({title:"ERROR", text:"File Not Found"})
    } else {
      //download file
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(result);
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
    }
  }
}



const TagStatus = styled.div `
display:flex;
align-items:center;
justify-content: center;
color:#fff;
padding:2px 0px;
border-radius:5px;
background: ${({status})=>status ==="completed"||status ==="approved"? "green":status === "rejected"?COLOR_HOVER_DANGER:status ==="draft" || status ==="pending" || status === "progressing" || status  ==="verifying"? "gray":null};
`

Modal_laporan.propTypes ={
  show : PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  data : PropTypes.object
}
