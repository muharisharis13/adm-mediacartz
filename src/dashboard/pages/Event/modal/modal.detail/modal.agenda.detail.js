import React from 'react';
import * as Component from "../../../../../component";
import styled from "styled-components";
import * as Util from "../../../../../util"

const ModalAgendaDetail = (props:{show:boolean, onHide:Function, data:any}) => {
  const {show, onHide,data} = props

  return (
    <Component.Modal_Component title="Detail Agenda Event" show={show} onHide={onHide} size="xl" >
      <Contaier>
        <div className="data d-flex">
          <div className="title">
            Judul Agenda
          </div>
          <div className="data-content">
            {data?.event_agenda_title}
          </div>
        </div>
        <div className="data d-flex">
          <div className="title">
            Deskripsi
          </div>
          <div className="data-content">
            {data?.event_agenda_description}
          </div>
        </div>
        <div className="data d-flex">
          <div className="title">
            Nama Pembicara
          </div>
          <div className="data-content">
            {data?.event_agenda_speaker_name}
          </div>
        </div>
        <div className="data d-flex">
          <div className="title">
            Jabatan Pembicara
          </div>
          <div className="data-content">
            {data?.event_agenda_speaker_position}
          </div>
        </div>
        <div className="data d-flex">
          <div className="title">
            Tanggal Mulai
          </div>
          <div className="data-content">
            {Util.Moment(data?.event_agenda_start_datetime)}
          </div>
        </div>
        <div className="data d-flex">
          <div className="title">
            Tanggal Berakhir
          </div>
          <div className="data-content">
            {Util.Moment(data?.event_agenda_end_datetime)}
          </div>
        </div>
        <div className="data d-flex">
          <div className="title">
            Tanggal Dibuat
          </div>
          <div className="data-content">
            {Util.Moment(data?.event_agenda_created_datetime)}
          </div>
        </div>
        <div className="data d-flex">
          <div className="title">
            Dibuat Oleh
          </div>
          <div className="data-content">
            {data?.event_agenda_created_by ? data?.event_agenda_created_by.name : ""}
          </div>
        </div>
      </Contaier>
    </Component.Modal_Component>
  )
}

export default ModalAgendaDetail;

const Contaier = styled.div `
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
`