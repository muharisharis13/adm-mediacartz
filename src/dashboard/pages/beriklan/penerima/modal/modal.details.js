import React, { useEffect, useState } from "react";
import { Modal_Component } from "../../../../../component";
import {
  Label,
  COLOR_SECONDARY,
} from "../../../../../component/style/content/default";
import styled from "styled-components";
import { api_penerima } from "../../../../../service/api";
import { Moment, FormatCurrency } from "../../../../../util";

export const Modal_detail = ({ show, onHide, recipient_id }) => {
  const [data, setData] = useState({});

  const getData = async () => {
    await api_penerima.get_penerima_detail({ recipient_id }).then((res) => {
      console.log({ get_penerima_detail: res });
      if (res?.success) {
        setData(res.data);
      }
    });
  };

  useEffect(() => {
    if (show) {
      getData();
    }
  }, [show]);

  return (
    <Modal_Component show={show} onHide={onHide} title="Detail Penerima">
      <div className="container">
        <Row className="row bg-white">
          <div className="col-lg-6 col-md-6 col-sm-6">
            <Label color={COLOR_SECONDARY}>
              <strong> Label Penerima</strong>
            </Label>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6">
            {data.recipient_label}
          </div>
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
              <strong> Tipe Inventori</strong>
            </Label>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6">
            {data.ms_channel && data.ms_channel.ms_channel_name}
          </div>
        </Row>
        <Row className="row bg-white">
          <div className="col-lg-6 col-md-6 col-sm-6">
            <Label color={COLOR_SECONDARY}>
              <strong> Total Penerima</strong>
            </Label>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6">
            {data.recipient_total_recipient}
          </div>
        </Row>
        {data?.ms_channel?.ms_channel_name === "LBA" ||
        data?.ms_channel?.ms_channel_name === "TARGETED" ? (
          <>
            <Row className="row bg-white">
              <div className="col-lg-6 col-md-6 col-sm-6">
                <Label color={COLOR_SECONDARY}>
                  <strong>Profilling Brand Operator</strong>
                </Label>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
                {data.recipient_profiling_operator}
              </div>
            </Row>
            <Row className="row bg-white">
              <div className="col-lg-6 col-md-6 col-sm-6">
                <Label color={COLOR_SECONDARY}>
                  <strong>Profilling Produk Operator</strong>
                </Label>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
                {data.recipient_profiling_product || "Semua Produk"}
              </div>
            </Row>
            <Row className="row bg-white">
              <div className="col-lg-6 col-md-6 col-sm-6">
                <Label color={COLOR_SECONDARY}>
                  <strong>Lokasi Profiling</strong>
                </Label>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
                {data.recipient_profiling_location || "Semua Lokasi"}
              </div>
            </Row>
            <Row className="row bg-white">
              <div className="col-lg-6 col-md-6 col-sm-6">
                <Label color={COLOR_SECONDARY}>
                  <strong>Tipe Lokasi Profiling</strong>
                </Label>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
                {data.recipient_profiling_location_type || "Semua Tipe Lokasi"}
              </div>
            </Row>
            <Row className="row bg-white">
              <div className="col-lg-6 col-md-6 col-sm-6">
                <Label color={COLOR_SECONDARY}>
                  <strong>Radius Profiling</strong>
                </Label>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
                {data?.recipient_profiling_min_radius
                  ? `${data?.recipient_profiling_min_radius} - ${data?.recipient_profiling_max_radius}`
                  : "-"}
              </div>
            </Row>
            <Row className="row bg-white">
              <div className="col-lg-6 col-md-6 col-sm-6">
                <Label color={COLOR_SECONDARY}>
                  <strong>Kota</strong>
                </Label>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
                {data.recipient_profiling_city || "Semua Kota"}
              </div>
            </Row>
            <Row className="row bg-white">
              <div className="col-lg-6 col-md-6 col-sm-6">
                <Label color={COLOR_SECONDARY}>
                  <strong>Kecamatan</strong>
                </Label>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
                {JSON.parse(data?.recipient_profiling_district_json) &&
                JSON.parse(data?.recipient_profiling_district_json)?.length > 0
                  ? JSON.parse(data?.recipient_profiling_district_json)
                      ?.map((r) => r?.label)
                      ?.join(", ")
                  : "Semua Kecamatan"}
              </div>
            </Row>
            <Row className="row bg-white">
              <div className="col-lg-6 col-md-6 col-sm-6">
                <Label color={COLOR_SECONDARY}>
                  <strong>Kelurahan</strong>
                </Label>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
                {JSON.parse(data?.recipient_profiling_village_json) &&
                JSON.parse(data?.recipient_profiling_village_json)?.length > 0
                  ? JSON.parse(data?.recipient_profiling_village_json)
                      ?.map((r) => r?.label)
                      ?.join(", ")
                  : "Semua Kelurahan"}
              </div>
            </Row>
            <Row className="row bg-white">
              <div className="col-lg-6 col-md-6 col-sm-6">
                <Label color={COLOR_SECONDARY}>
                  <strong>Jenis Kelamin</strong>
                </Label>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
                {data?.recipient_profiling_gender || "Semua Gender"}
              </div>
            </Row>
            <Row className="row bg-white">
              <div className="col-lg-6 col-md-6 col-sm-6">
                <Label color={COLOR_SECONDARY}>
                  <strong>Usia</strong>
                </Label>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
                {data?.recipient_profiling_from_age
                  ? data?.recipient_profiling_from_age +
                    " - " +
                    data?.recipient_profiling_until_age
                  : "-"}
              </div>
            </Row>
            <Row className="row bg-white">
              <div className="col-lg-6 col-md-6 col-sm-6">
                <Label color={COLOR_SECONDARY}>
                  <strong>Sistem Operasi</strong>
                </Label>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
                {data?.recipient_profiling_os || "Semua Operator"}
              </div>
            </Row>
            <Row className="row bg-white">
              <div className="col-lg-6 col-md-6 col-sm-6">
                <Label color={COLOR_SECONDARY}>
                  <strong>Agama</strong>
                </Label>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
                {data?.recipient_profiling_religion || "Semua Agama"}
              </div>
            </Row>
            <Row className="row bg-white">
              <div className="col-lg-6 col-md-6 col-sm-6">
                <Label color={COLOR_SECONDARY}>
                  <strong>Profiling ARPU</strong>
                </Label>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
                {data?.recipient_profiling_from_arpu
                  ? `${FormatCurrency.input(
                      data?.recipient_profiling_from_arpu
                    )} Sampai ${FormatCurrency.input(
                      data?.recipient_profiling_until_arpu
                    )}`
                  : "-"}
              </div>
            </Row>
            <Row className="row bg-white">
              <div className="col-lg-6 col-md-6 col-sm-6">
                <Label color={COLOR_SECONDARY}>
                  <strong>MSISDN Client Penerima</strong>
                </Label>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
                {data?.recipient_profiling_uat_client || "-"}
              </div>
            </Row>
            <Row className="row bg-white">
              <div className="col-lg-6 col-md-6 col-sm-6">
                <Label color={COLOR_SECONDARY}>
                  <strong>MSISDN Pembuat Iklan</strong>
                </Label>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
                {data?.recipient_profiling_uat_internal || "-"}
              </div>
            </Row>
          </>
        ) : null}
        <Row className="row bg-white">
          <div className="col-lg-6 col-md-6 col-sm-6">
            <Label color={COLOR_SECONDARY}>
              <strong> Tanggal Dibuat</strong>
            </Label>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6">
            {Moment(data.recipient_created_datetime)}
          </div>
        </Row>
        <Row className="row bg-white">
          <div className="col-lg-6 col-md-6 col-sm-6">
            <Label color={COLOR_SECONDARY}>
              <strong> Dibuat Oleh</strong>
            </Label>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6">
            {data.recipient_created_by && data.recipient_created_by.name}
          </div>
        </Row>
        <Row className="row bg-white">
          <div className="col-lg-6 col-md-6 col-sm-6">
            <Label color={COLOR_SECONDARY}>
              <strong> Tanggal Diubah</strong>
            </Label>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6">
            {data.recipient_updated_datetime
              ? Moment(data.recipient_updated_datetime)
              : "-"}
          </div>
        </Row>
        <Row className="row bg-white">
          <div className="col-lg-6 col-md-6 col-sm-6">
            <Label color={COLOR_SECONDARY}>
              <strong> Diubah Oleh</strong>
            </Label>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6">
            {data.recipient_updated_by && data.recipient_updated_by.name}
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
