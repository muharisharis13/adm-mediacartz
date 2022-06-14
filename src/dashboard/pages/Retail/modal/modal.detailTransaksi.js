import React, { useEffect, useState } from "react";
import * as Component from "../../../../component";
import styled from "styled-components";
import { COLOR_SECONDARY, ButtonPrimary, ButtonDanger } from "../../../../component/style/content/default";
import { api_transaksi } from "../../../../service/api";
import { Verified } from "@styled-icons/material-sharp";
import { TimesCircle } from "@styled-icons/fa-regular";
import { FormatCurrency, Moment } from "../../../../util";
import Alert from "sweetalert2";
import { Method } from "service";
import ModalFormFulfillment from "./modal.formFulfillment";

const header = [
  "No",
  "Item",
  "Harga",
  "Qty",
  "Subtotal"
];

const itemsPerPage = 10;

const ModalTransaksiDetail = ({ show, onHide, transaction_id, onReload }) => {
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);
  const [modalFulfillment, setModalFulfillment] = useState(null);

  const getData = async () => {
    await Promise.all([
      api_transaksi.get_transaksi_detail({ transaction_id }).then((res) => {
        console.log({ get_transaksi_detail: res });
        if (res.success) {
          setData(res.data);
        }
      })
    ]);
  };

  useEffect(() => {
    if (show) {
      getData();
    }
  }, [show]);

  const renderItem = () => {
    var item = data.transaction_detail;
    if(item){
      var content = [];
      for(var i=(page-1)*itemsPerPage; i<((page-1)*itemsPerPage)+itemsPerPage; i++){
        if(item[i]){
          content.push(
            <tr
              key={i}
            >
              <td data-label="No">{i+1}</td>
              <td data-label="Item">{item[i]?.transaction_detail_item_name}</td>
              <td data-label="Harga">{FormatCurrency.currency(item[i]?.transaction_detail_item_price)}</td>
              <td data-label="Qty">{item[i]?.transaction_detail_item_quantity}</td>
              <td data-label="Subtotal">{FormatCurrency.currency(item[i]?.transaction_detail_item_price*item[i]?.transaction_detail_item_quantity)}</td>
            </tr>
          )
        }
      }

      return content
    }else{
      return null
    }
  }

  const confirmPayment = async (type) => {
    await Alert.fire({
      title: type==='approval'?'Konfirmasi Pembayaran':'Reject Pembayaran',
      input: 'textarea',
      inputAttributes: {
        placeholder: "Masukan note"
      },
      showCancelButton: true,
      confirmButtonText: type==='approval'?'Konfirmasi':'Reject',
      showLoaderOnConfirm: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      preConfirm: (text) => {
        return Method
          .put(`transaction/${data.transaction_id}/${type}`, {transaction_status_note: text})
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            Alert.showValidationMessage(`Request failed`)
          });
      },
      allowOutsideClick: () => !Alert.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        if(result.value.success){
          Component.AlertSuccess({ title: "Success", text: result.value.success });
          getData();
          onReload();
        }else{
          Component.AlertError({ title: "Success", text: result.value.error });
        }
      }
    })
  }

  return (
    <Component.Modal_Component show={show} onHide={onHide} title="Detail Transaksi">
      {
        modalFulfillment ? (
          <ModalFormFulfillment
            show={modalFulfillment}
            onHide={()=>setModalFulfillment(null)}
            onSubmit={()=>{
              getData();
              setModalFulfillment(null);
              onReload();
            }}
          />
        ):(
          <div>
            {
              data.transaction_approve_status_name==="pending" &&
              <div className="d-flex flex-row">
                <ButtonPrimary onClick={()=>confirmPayment('approval')}>
                  Konfirmasi Pembayaran
                </ButtonPrimary>
                <ButtonDanger className="ms-2" onClick={()=>confirmPayment('reject')}>
                  Reject Pembayaran
                </ButtonDanger>
              </div>
            }

            {
              data.transaction_approve_status_name==="approved" &&
              <ButtonPrimary 
                onClick={()=> setModalFulfillment(data)}
              >
                Fulfillment
              </ButtonPrimary>
            }

            <div className="container mt-3">
              <Row className="row bg-white">
                <div className="col-md-6 col-sm-6">
                  <strong style={{ color: COLOR_SECONDARY }}>Nomor Transaksi</strong>
                </div>
                <div className="col-md-6 col-sm-6">{data.transaction_id}</div>
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
              {
                data?.ms_payment?.ms_payment_bank_recipient_number &&
                <Row className="row bg-white">
                  <div className="col-md-6 col-sm-6">
                    <strong style={{ color: COLOR_SECONDARY }}>Nomor Rekening</strong>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    {data.ms_payment.ms_payment_bank_recipient_number}
                  </div>
                </Row>
              }
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
              {
                data.transaction_updated_datetime &&
                <Row className="row bg-white">
                  <div className="col-md-6 col-sm-6">
                    <strong style={{ color: COLOR_SECONDARY }}>Tanggal Diubah</strong>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    {data.transaction_updated_datetime &&
                      Moment(data.transaction_updated_datetime)}
                  </div>
                </Row>
              }
              {
                data.transaction_updated_by &&
                <Row className="row bg-white">
                  <div className="col-md-6 col-sm-6">
                    <strong style={{ color: COLOR_SECONDARY }}>Diubah Oleh</strong>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    {data.transaction_updated_by && data.transaction_updated_by.name}
                  </div>
                </Row>
              }
            </div>

            <div className="container mt-4">
              <Row className="row bg-white">
                <div className="col-md-6 col-sm-6">
                  <strong style={{ color: COLOR_SECONDARY }}>Nama Customer</strong>
                </div>
                <div className="col-md-6 col-sm-6">{data.customer_name}</div>
              </Row>
              <Row className="row bg-white">
                <div className="col-md-6 col-sm-6">
                  <strong style={{ color: COLOR_SECONDARY }}>Phone Customer</strong>
                </div>
                <div className="col-md-6 col-sm-6">{data.customer_msisdn}</div>
              </Row>
              <Row className="row bg-white">
                <div className="col-md-6 col-sm-6">
                  <strong style={{ color: COLOR_SECONDARY }}>Delivery</strong>
                </div>
                <div className="col-md-6 col-sm-6">{data.ms_delivery?.ms_delivery_name}</div>
              </Row>
              <Row className="row bg-white">
                <div className="col-md-6 col-sm-6">
                  <strong style={{ color: COLOR_SECONDARY }}>Tanggal Request Delivery</strong>
                </div>
                <div className="col-md-6 col-sm-6">{Moment(data.transaction_delivery_expected_datetime)}</div>
              </Row>
            </div>

            {
              data.ms_merchant_payment &&
              <div className="container mt-4">
                <Row className="row bg-white">
                  <div className="col-md-6 col-sm-6">
                    <strong style={{ color: COLOR_SECONDARY }}>Merchant</strong>
                  </div>
                  <div className="col-md-6 col-sm-6">{data.ms_merchant_payment.ms_merchant_payment_name}</div>
                </Row>
                {
                  data.transaction_receipt_number &&
                  <Row className="row bg-white">
                    <div className="col-md-6 col-sm-6">
                      <strong style={{ color: COLOR_SECONDARY }}>Kode Pembayaran</strong>
                    </div>
                    <div className="col-md-6 col-sm-6">{data.transaction_receipt_number}</div>
                  </Row>
                }
                {
                  data.transaction_delivery_fulfilled_datetime &&
                  <Row className="row bg-white">
                    <div className="col-md-6 col-sm-6">
                      <strong style={{ color: COLOR_SECONDARY }}>Tanggal Fulfill Delivery</strong>
                    </div>
                    <div className="col-md-6 col-sm-6">{Moment(data.transaction_delivery_fulfilled_datetime)}</div>
                  </Row>
                }
                {
                  data.transaction_delivery_note &&
                  <Row className="row bg-white">
                    <div className="col-md-6 col-sm-6">
                      <strong style={{ color: COLOR_SECONDARY }}>Note</strong>
                    </div>
                    <div className="col-md-6 col-sm-6">{data.transaction_delivery_note}</div>
                  </Row>
                }
              </div>        
            }
            <div className="mt-4">
              <h5 className="mb-2">Item</h5>
              <div style={{backgroundColor:'#fff'}}>
                <Component.TableData header={header}>
                { renderItem() }
                </Component.TableData>
                {
                  data?.transaction_detail?.length > 0 &&
                  <div className="pb-2 pt-2">
                    <Component.Pagination
                      page={page}
                      totalPage={Math.ceil(data?.transaction_detail?.length/itemsPerPage)}
                      handleOnChange={(e) => setPage(e.selected+1)}
                    />
                  </div>
                }
              </div>
            </div>
          </div>
        )
      }
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

export default ModalTransaksiDetail;