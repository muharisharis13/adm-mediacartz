import React, { useEffect, useState } from "react";
import { Modal_Component } from "../../../../component";
import styled from "styled-components";
import { COLOR_SECONDARY } from "../../../../component/style/content/default";
import { api_transaksi } from "../../../../service/api";
import { Verified } from "@styled-icons/material-sharp";
import { TimesCircle } from "@styled-icons/fa-regular";
import { FormatCurrency, Moment } from "../../../../util";
import { Unverified } from "@styled-icons/octicons";

export const Modal_transaksi_detail = ({ show, onHide, transaction_id }) => {
  const [data, setData] = useState([]);
  const [image, setImage] = useState("");

  const getData = async () => {
    await Promise.all([
      api_transaksi.get_transaksi_detail({ transaction_id }).then((res) => {
        console.log({ get_transaksi_detail: res });
        if (res.success) {
          setData(res.data);
        }
      }),
      api_transaksi.get_transaction_image({ transaction_id }).then((res) => {
        if (res.type === "image/jpeg" || res.type === "image/png") {
          let convert_blob = URL.createObjectURL(res);
          setImage(convert_blob);
        }
      }),
    ]);
  };

  useEffect(() => {
    if (show) {
      getData();
    }
  }, [show]);

  return (
    <Modal_Component show={show} onHide={onHide} title="Detail Transaksi">
      <div className="mb-5 d-flex align-items-center justify-content-center">
        {image !== "" && <Img src={image} alt="aaa" />}
      </div>
      <div className="container">
        <Row className="row bg-white">
          <div className="col-md-6 col-sm-6">
            <strong style={{ color: COLOR_SECONDARY }}>Nomor Transaksi</strong>
          </div>
          <div className="col-md-6 col-sm-6">{data.transaction_number}</div>
        </Row>
        <Row className="row bg-white">
          <div className="col-md-6 col-sm-6">
            <strong style={{ color: COLOR_SECONDARY }}>
              Status Persetujuan
            </strong>
          </div>
          <div className="col-md-6 col-sm-6">
            {data.transaction_approve_status_name === "approved" ? (
              <Verified style={{ width: "25px", color: "#04D010" }} />
            ) : data.transaction_approve_status_name === "rejected" ? (
              <TimesCircle style={{ width: "25px", color: "red" }} />
            ) : (
              "Pending"
            )}
          </div>
        </Row>
        <Row className="row bg-white">
          <div className="col-md-6 col-sm-6">
            <strong style={{ color: COLOR_SECONDARY }}>Tipe Transaksi</strong>
          </div>
          <div className="col-md-6 col-sm-6">
            {data.ms_transaction && data.ms_transaction.ms_transaction_name}
          </div>
        </Row>
        <Row className="row bg-white">
          <div className="col-md-6 col-sm-6">
            <strong style={{ color: COLOR_SECONDARY }}>Jumlah Transaksi</strong>
          </div>
          <div className="col-md-6 col-sm-6">
            {FormatCurrency.currency(data.transaction_amount)}
          </div>
        </Row>
        <Row className="row bg-white">
          <div className="col-md-6 col-sm-6">
            <strong style={{ color: COLOR_SECONDARY }}>Pajak</strong>
          </div>
          <div className="col-md-6 col-sm-6">
            {FormatCurrency.currency(data.transaction_tax)}
          </div>
        </Row>
        <Row className="row bg-white">
          <div className="col-md-6 col-sm-6">
            <strong style={{ color: COLOR_SECONDARY }}>Diskon</strong>
          </div>
          <div className="col-md-6 col-sm-6">
            {FormatCurrency.currency(data.transaction_discount)}
          </div>
        </Row>
        <Row className="row bg-white">
          <div className="col-md-6 col-sm-6">
            <strong style={{ color: COLOR_SECONDARY }}>
              Biaya Administrasi
            </strong>
          </div>
          <div className="col-md-6 col-sm-6">
            {FormatCurrency.currency(data.transaction_administration_fee)}
          </div>
        </Row>
        <Row className="row bg-white">
          <div className="col-md-6 col-sm-6">
            <strong style={{ color: COLOR_SECONDARY }}>
              Jumlah Total Transaksi
            </strong>
          </div>
          <div className="col-md-6 col-sm-6">
            {FormatCurrency.currency(data.transaction_total_amount)}
          </div>
        </Row>
        <Row className="row bg-white">
          <div className="col-md-6 col-sm-6">
            <strong style={{ color: COLOR_SECONDARY }}>
              Metode Pembayaran
            </strong>
          </div>
          <div className="col-md-6 col-sm-6">
            {data.ms_payment && data.ms_payment.ms_payment_name}
          </div>
        </Row>
        <Row className="row bg-white">
          <div className="col-md-6 col-sm-6">
            <strong style={{ color: COLOR_SECONDARY }}>Nomor Rekening</strong>
          </div>
          <div className="col-md-6 col-sm-6">
            {data.ms_payment &&
              data.ms_payment.ms_payment_bank_recipient_number}
          </div>
        </Row>
        <Row className="row bg-white">
          <div className="col-md-6 col-sm-6">
            <strong style={{ color: COLOR_SECONDARY }}>Tanggal Dibuat</strong>
          </div>
          <div className="col-md-6 col-sm-6">
            {Moment(data.transaction_created_datetime)}
          </div>
        </Row>
        <Row className="row bg-white">
          <div className="col-md-6 col-sm-6">
            <strong style={{ color: COLOR_SECONDARY }}>Dibuat Oleh</strong>
          </div>
          <div className="col-md-6 col-sm-6">
            {data.transaction_created_by && data.transaction_created_by.name}
          </div>
        </Row>
        <Row className="row bg-white">
          <div className="col-md-6 col-sm-6">
            <strong style={{ color: COLOR_SECONDARY }}>Tanggal Diubah</strong>
          </div>
          <div className="col-md-6 col-sm-6">
            {data.transaction_updated_datetime &&
              Moment(data.transaction_updated_datetime)}
          </div>
        </Row>
        <Row className="row bg-white">
          <div className="col-md-6 col-sm-6">
            <strong style={{ color: COLOR_SECONDARY }}>Diubah Oleh</strong>
          </div>
          <div className="col-md-6 col-sm-6">
            {data.transaction_updated_by && data.transaction_updated_by.name}
          </div>
        </Row>
        <Row className="row bg-white">
          <div className="col-md-6 col-sm-6">
            <strong style={{ color: COLOR_SECONDARY }}>
              Perusahaan Pembeli
            </strong>
          </div>
          <div className="col-md-6 col-sm-6">
            {data.buyer_company && data.buyer_company.company_name}
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

const Img = styled.img`
  object-fit: cover;
  max-width: 100%;
  width: 100%;
  height: 300px;
`;
