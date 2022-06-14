import React, {useEffect, useState} from "react";
import {Modal_Component} from "../../../../../component";
import styled from "styled-components";
import { COLOR_SECONDARY } from "../../../../../component/style/content/default";
import { api_sender_id } from "../../../../../service/api";
import {Moment} from "../../../../../util"





export const Modal_detail = ({show, onHide, sender_id}) => {
    const [data, setData] = useState({})

    const getData = async () =>{
        await api_sender_id.get_sender_detail({sender_id})
        .then(res =>{
            console.log({get_sender_detail:res})
            if(res?.success){
                setData(res.data)
            }
        })
    }

    useEffect(()=>{
        if(show){
            getData()
        }
    },[show])

    return(
        <Modal_Component show={show} onHide={onHide} title="Detail Sender ID">
            <div className="container">
                <Row className="row bg-white">
                    <div className="col-md-6 col-sm-6">
                        <strong style={{ color: COLOR_SECONDARY }}>Sender ID</strong>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        {data.sender_name}
                    </div>
                </Row>
                <Row className="row bg-white">
                    <div className="col-md-6 col-sm-6">
                        <strong style={{ color: COLOR_SECONDARY }}>Tipe</strong>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        {`${data.ms_inventory && data.ms_inventory.ms_inventory_identifier} ${data.ms_channel && data.ms_channel.ms_channel_name}`}
                    </div>
                </Row>
                <Row className="row bg-white">
                    <div className="col-md-6 col-sm-6">
                        <strong style={{ color: COLOR_SECONDARY }}>Status Persetujuan</strong>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        {data.sender_approve_status_name}
                    </div>
                </Row>
                <Row className="row bg-white">
                    <div className="col-md-6 col-sm-6">
                        <strong style={{ color: COLOR_SECONDARY }}>Tanggal Dibuat</strong>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        {Moment(data.sender_created_datetime)}
                    </div>
                </Row>
                <Row className="row bg-white">
                    <div className="col-md-6 col-sm-6">
                        <strong style={{ color: COLOR_SECONDARY }}>Dibuat Oleh</strong>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        {data.sender_created_by && data.sender_created_by.name}
                    </div>
                </Row>
                <Row className="row bg-white">
                    <div className="col-md-6 col-sm-6">
                        <strong style={{ color: COLOR_SECONDARY }}>Tanggal Diubah</strong>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        {data.sender_updated_datetime && Moment(data.sender_updated_datetime)}
                    </div>
                </Row>
                <Row className="row bg-white">
                    <div className="col-md-6 col-sm-6">
                        <strong style={{ color: COLOR_SECONDARY }}>Diubah Oleh</strong>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        {data.sender_updated_by && data.sender_updated_by.name}
                    </div>
                </Row>
                <Row className="row bg-white">
                    <div className="col-md-6 col-sm-6">
                        <strong style={{ color: COLOR_SECONDARY }}>Perusahaan</strong>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        {data.company && data.company.company_name}
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