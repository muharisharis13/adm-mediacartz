import React, { useEffect, useState } from "react";
import { Modal_Component } from "../../../../../component";
import styled from "styled-components";
import {
  Label,
  COLOR_SECONDARY,
} from "../../../../../component/style/content/default";
import { api_template } from "../../../../../service/api";
import { Moment } from "../../../../../util";

export const Modal_detail = ({ show, onHide, template_id }) => {
  const [data, setData] = useState({});
  const [img_media, setImg_media] = useState("");

  const get_data = async () => {
    await api_template
      .get_template_detail({ template_id: template_id })
      .then((res) => {
        console.log({ get_template_detail: res });
        if (res?.success) {
          setData(res.data);
        }
      });

    await api_template.get_media({ template_id: template_id }).then((res) => {
      console.log({ media: res });
      if (res.type !== "application/json") {
        setImg_media(URL.createObjectURL(res));
      } else {
        setImg_media("");
      }
    });
  };

  useEffect(() => {
    if (show) {
      get_data();
    }
  }, [show]);

  return (
    <Modal_Component show={show} onHide={onHide} title="Detail Template">
      <div className="container">
        <Row className="row bg-white">
          <div className="col-lg-6 col-md-6 col-sm-6">
            <Label color={COLOR_SECONDARY}>
              <strong> Nama Template</strong>
            </Label>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6">{data.template_name}</div>
        </Row>
        <Row className="row bg-white">
          <div className="col-lg-6 col-md-6 col-sm-6">
            <Label color={COLOR_SECONDARY}>
              <strong> Tipe Channel</strong>
            </Label>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6">
            {data.ms_inventory && data.ms_inventory.ms_inventory_identifier}
          </div>
        </Row>
        <Row className="row bg-white">
          <div className="col-lg-6 col-md-6 col-sm-6">
            <Label color={COLOR_SECONDARY}>
              <strong> Status Persetujuan</strong>
            </Label>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6">
            {data.template_approve_status_name}
          </div>
        </Row>
        <Row className="row bg-white">
          <div className="col-lg-6 col-md-6 col-sm-6">
            <Label color={COLOR_SECONDARY}>
              <strong> Tanggal Dibuat</strong>
            </Label>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6">
            {Moment(data.template_created_datetime)}
          </div>
        </Row>
        <Row className="row bg-white">
          <div className="col-lg-6 col-md-6 col-sm-6">
            <Label color={COLOR_SECONDARY}>
              <strong> Dibuat Oleh</strong>
            </Label>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6">
            {data.template_created_by && data.template_created_by.name}
          </div>
        </Row>
        <Row className="row bg-white">
          <div className="col-lg-6 col-md-6 col-sm-6">
            <Label color={COLOR_SECONDARY}>
              <strong> Tanggal Diubah</strong>
            </Label>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6">
            {data.template_updated_datetime &&
              Moment(data.template_updated_datetime)}
          </div>
        </Row>
        <Row className="row bg-white">
          <div className="col-lg-6 col-md-6 col-sm-6">
            <Label color={COLOR_SECONDARY}>
              <strong> Diubah Oleh</strong>
            </Label>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6">
            {data.template_updated_by && data.template_updated_by.name}
          </div>
        </Row>
        <Row className="row bg-white">
          <div className="col-lg-6 col-md-6 col-sm-6">
            <Label color={COLOR_SECONDARY}>
              <strong> Perusahaan</strong>
            </Label>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6">
            {data.company && data.company.company_name}
          </div>
        </Row>
        <Row className="row bg-white">
          <div className="col-lg-6 col-md-6 col-sm-6">
            <Label color={COLOR_SECONDARY}>
              <strong> Attachment</strong>
            </Label>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6">
            {data.template_media_file}
          </div>
        </Row>
      </div>
      <div className="container">
        {img_media !== "" && (
          <div className="mb-4 mb-md-4">
            <strong>Media Template</strong>
            <div>
              <img src={img_media} alt="img_media" width={300} />
            </div>
          </div>
        )}
        <div className="mb-4 mb-md-4">
          <strong>Konten Template</strong>
          <div>
            <div dangerouslySetInnerHTML={{ __html: data.template_content }} />
          </div>
        </div>
      </div>
    </Modal_Component>
  );
};

const Row = styled.div`
  border: 1px solid transparent;
  border-bottom-color: #ccc;
  padding: 5px 5px;

  &:last-child {
    border-bottom-color: transparent;
  }
`;
