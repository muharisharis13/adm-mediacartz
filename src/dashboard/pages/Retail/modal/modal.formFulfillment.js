import React, { useContext, useEffect, useState} from "react";
import * as Component from "../../../../component";
import * as Style from "../../../../component/style/content/default";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Select from "react-select";
import { Method } from "../../../../service";
import * as Services from "../../../../service";
import { Form } from 'react-bootstrap';
import moment from 'moment';
import Datepicker from "react-datepicker";

const ModalFormFulfillment = (props) => {
  const { selected_company } = useContext(Services.Context);
  const { show, onHide, onSubmit } = props;
  const [loading, setLoading] = useState(false);
  const [payment, setPayment] = useState([]);
  const [paymentSelected, setPaymentSelected] = useState("");
  const [code, setCode] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");

  const BtnSubmit = () => {
    saveProcess();
  }

  const saveProcess = async () => {
    setLoading(true);
    try {
      const data_post = {
        transaction_delivery_fulfilled_datetime: moment(date).format('YYYY-MM-DD HH:mm:ss'),
        transaction_delivery_note: note,
        ms_merchant_payment_id: paymentSelected.value,
        transaction_receipt_number: code
      }

      await Method.put(`transaction/${show.transaction_id}/fulfillment`, data_post)
      .then(async (res) => {
        if (res?.data?.success) {
          Component.AlertSuccess({ title: "Success", text: res?.data?.success });
          onSubmit();
        } else {
          Component.AlertError({ title: "Error", text: res?.data?.error });
        }
      })
    } catch (err) {
      console.log('err', err)
      Component.AlertError({ title: "Error", text: err });
    } finally {
      setLoading(false);
    }
  }

  const clearForm = () => {
    setPaymentSelected("");
    setCode("");
    setDate("");
    setNote("");
  }
  
  useEffect(() => {
    if(show) {
      if(show.ms_merchant_payment){
        setPaymentSelected({value: show.ms_merchant_payment.ms_merchant_payment_id, label: show.ms_merchant_payment.ms_merchant_payment_name})
      }
      setCode(show?.transaction_receipt_number);
      setDate(show.transaction_delivery_fulfilled_datetime?moment(show.transaction_delivery_fulfilled_datetime).toDate():"");
      setNote(show?.transaction_delivery_note);
    }else{
      clearForm();
    }
  }, [show])

  console.log('show', show)

  return (
    <Component.Modal_Component
      size="lg"
      title={'Fulfillment'}
      btnSubmit
      btnName={loading ? <Component.LoadingIcon /> : "Simpan"}
      onClick={loading ? null : BtnSubmit}
      onHide={onHide}
      show={show}
    >
      <div className="container">
        <div className="mb-3">
          <Style.Label color={Style.COLOR_SECONDARY}>Pembayaran</Style.Label>
          <Select
            placeholder="Pilih Pembayaran"
            options={payment}
            onChange={(e) => {
              setPaymentSelected(e);
            }}
            onInputChange={(e) => {
              setTimeout( async () => {
                await Method.get(`list/ms_merchant_payment?ms_merchant_payment_name=${e}&limit=*`)
                  .then(async (res) => {
                    if (res?.data?.success) {
                      setPayment(
                        res?.data?.data?.map((item) => ({
                          value: item.ms_merchant_payment_id,
                          label: item.ms_merchant_payment_name
                        }))
                      )
                    }
                  })
              }, 1000)
            }}
            value={paymentSelected}
          />
        </div>

        <div className="mb-3">
          <Style.Label color={Style.COLOR_SECONDARY}>Kode Pembayaran</Style.Label>
          <Form.Control 
            placeholder="Kode Pembayaran"
            value={code}
            onChange={(e)=>setCode(e.target.value)} 
          />
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <Style.Label color={Style.COLOR_SECONDARY}>Tanggal Request Pickup</Style.Label>
            <Form.Control
              value={show?moment(show.transaction_delivery_expected_datetime).format('MM/DD/YYYY HH:mm'):''}
              disabled
            />
          </div>
          <div className="col-md-6 mb-3">
            <Style.Label color={Style.COLOR_SECONDARY}>Tanggal Pickup</Style.Label>
            <Datepicker
              selected={date}
              className="form-control"
              onChange={(e) => setDate(e) }
              placeholderText="MM/DD/YYYY HH:mm"
              showTimeSelect={true}
              dateFormat="MM/dd/yyyy HH:mm"
              timeFormat="HH:mm"
            />
          </div>
        </div>

        <div className="mb-3">
          <Style.Label color={Style.COLOR_SECONDARY}>Catatan Pickup</Style.Label>
          <Form.Control 
            placeholder="Tambahkan Catatan"
            value={note}
            onChange={(e)=>setNote(e.target.value)}
            as="textarea"
            rows={5}
          />
        </div>

      </div>
    </Component.Modal_Component>
  );
};

export default ModalFormFulfillment;