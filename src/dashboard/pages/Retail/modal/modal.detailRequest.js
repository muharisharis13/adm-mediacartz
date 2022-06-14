import React, { useEffect, useState } from "react";
import * as Component from "../../../../component";
import styled from "styled-components";
import { COLOR_SECONDARY } from "../../../../component/style/content/default";
import { displayStatus, Moment } from "../../../../util";
import { Method } from "service";

const ModalRequest = ({ show, onHide, id }) => {
  const [data, setData] = useState({});

  const getData = async () => {
    await Method.get(`stock/${id}`)
    .then(async (res) => {
      if (res.data.success) {
        setData(res.data.data);
      }else{
        Component.AlertError({ title: "Error", text: res.data.error });
        onHide();
      }
    })
    .catch((error) => {
      if (error.response) {
        Component.AlertError({ title: "Error", text: error.response.data.error });
			} else {
				Component.AlertError({ title: "Error", text: 'Terjadi Kesalahan' });
			}
      onHide();
    });
  };

  useEffect(() => {
    if (show && id) {
      getData();
    }
  }, [show, id]);

  return (
    <Component.Modal_Component show={show} onHide={onHide} title="Detail Request Stock">
      <div className="container mt-3">
        <Row className="row bg-white">
          <div className="col-md-6 col-sm-6">
            <strong style={{ color: COLOR_SECONDARY }}>Produk</strong>
          </div>
          <div className="col-md-6 col-sm-6">{data?.item?.item_name}</div>
        </Row>
        <Row className="row bg-white">
          <div className="col-md-6 col-sm-6">
            <strong style={{ color: COLOR_SECONDARY }}>Tipe</strong>
          </div>
          <div className="col-md-6 col-sm-6">{data?.stock_type}</div>
        </Row>
        <Row className="row bg-white">
          <div className="col-md-6 col-sm-6">
            <strong style={{ color: COLOR_SECONDARY }}>Dari Toko</strong>
          </div>
          <div className="col-md-6 col-sm-6">{data?.from_store?.store_name}</div>
        </Row>
        <Row className="row bg-white">
          <div className="col-md-6 col-sm-6">
            <strong style={{ color: COLOR_SECONDARY }}>Ke Toko</strong>
          </div>
          <div className="col-md-6 col-sm-6">{data?.to_store?.store_name}</div>
        </Row>
        <Row className="row bg-white">
          <div className="col-md-6 col-sm-6">
            <strong style={{ color: COLOR_SECONDARY }}>Quantity</strong>
          </div>
          <div className="col-md-6 col-sm-6">{data?.stock_quantity}</div>
        </Row>
        <Row className="row bg-white">
          <div className="col-md-6 col-sm-6">
            <strong style={{ color: COLOR_SECONDARY }}>Untuk Tanggal</strong>
          </div>
          <div className="col-md-6 col-sm-6">{Moment(data?.stock_date)}</div>
        </Row>
        <Row className="row bg-white">
          <div className="col-md-6 col-sm-6">
            <strong style={{ color: COLOR_SECONDARY }}>Status</strong>
          </div>
          <div className="col-md-6 col-sm-6">
            <div className="content d-flex gap-1">
              <div
                dangerouslySetInnerHTML={{
                  __html: displayStatus(data?.stock_approve_status_name),
                }}
              />
            </div>
          </div>
        </Row>
        <Row className="row bg-white">
          <div className="col-md-6 col-sm-6">
            <strong style={{ color: COLOR_SECONDARY }}>Catatan</strong>
          </div>
          <div className="col-md-6 col-sm-6">{data?.stock_note?data?.stock_note:'-'}</div>
        </Row>
        <Row className="row bg-white">
          <div className="col-md-6 col-sm-6">
            <strong style={{ color: COLOR_SECONDARY }}>Dibuat Tanggal</strong>
          </div>
          <div className="col-md-6 col-sm-6">{Moment(data?.stock_created_datetime)}</div>
        </Row>
        <Row className="row bg-white">
          <div className="col-md-6 col-sm-6">
            <strong style={{ color: COLOR_SECONDARY }}>Dibuat Oleh</strong>
          </div>
          <div className="col-md-6 col-sm-6">{data?.stock_created_by?.name}</div>
        </Row>
        {
          data?.stock_updated_datetime &&
          <Row className="row bg-white">
            <div className="col-md-6 col-sm-6">
              <strong style={{ color: COLOR_SECONDARY }}>Diubah Tanggal</strong>
            </div>
            <div className="col-md-6 col-sm-6">{Moment(data?.stock_updated_datetime)}</div>
          </Row>
        }
        {
          data?.stock_updated_by &&
          <Row className="row bg-white">
            <div className="col-md-6 col-sm-6">
              <strong style={{ color: COLOR_SECONDARY }}>Diubah Oleh</strong>
            </div>
            <div className="col-md-6 col-sm-6">{data?.stock_updated_by?.name}</div>
          </Row>
        }
        <Row className="row bg-white">
          <div className="col-md-6 col-sm-6">
            <strong style={{ color: COLOR_SECONDARY }}>Link Ke Produksi</strong>
          </div>
          <div className="col-md-6 col-sm-6">{data?.production_id?'Ya':'Tidak'}</div>
        </Row>
      </div>
    </Component.Modal_Component>
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

export default ModalRequest;