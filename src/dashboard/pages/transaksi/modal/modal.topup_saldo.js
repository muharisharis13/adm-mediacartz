import React, { useEffect, useState, useContext } from "react";
import {
  AlertConfirm,
  Modal_Component,
  AlertError,
  AlertSuccess,
} from "../../../../component";
import { api_transaksi } from "../../../../service/api";
import {
  Label,
  COLOR_SECONDARY,
} from "../../../../component/style/content/default";
import Select from "react-select";
import { FormatCurrency } from "../../../../util";
import { Context } from "../../../../service";

export const Modal_topup_saldo = ({ show, onHide, getData1 }) => {
  const { data_user } = useContext(Context);
  const [opt, setOpt] = useState({
    perusahaan: [],
    metode_pembayaran: [],
  });

  const [selected, setSelected] = useState({
    perusahaan: "",
    metode_pembayaran: "",
  });
  const [nominal, setNominal] = useState(0);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    await api_transaksi.get_company_active_verified({}).then(async (res) => {
      console.log({ get_company_active_verified: res });
      if (res.success) {
        await setOpt((state) => ({
          ...state,
          perusahaan: res.data.map((item) => ({
            value: item.company_id,
            label: item.company_name,
          })),
        }));
      }
    });

    await api_transaksi.get_payment({}).then(async (res) => {
      console.log({ get_payment: res });
      if (res.success) {
        await setOpt((state) => ({
          ...state,
          metode_pembayaran: res.data.map((item) => ({
            value: {
              bank_name: item.ms_payment_bank_name,
              recipient_name: item.ms_payment_bank_recipient_name,
              recipient_number: item.ms_payment_bank_recipient_number,
              desc: item.ms_payment_description,
              payment_id: item.ms_payment_id,
            },
            label: item.ms_payment_name,
          })),
        }));
      }
    });
  };

  useEffect(() => {
    if (show) {
      getData();
    }
  }, [show]);

  const btnTopup = async () => {
    await AlertConfirm({
      title: "Konfirmasi",
      text: `Saya Setuju melakukan topup sebesar ${FormatCurrency.currency(
        nominal
      )} + Ppn 11%`,
    }).then(async (res) => {
      if (res.value === 0) {
        AlertError({
          title: "WARNING",
          text: "Anda Harus Menyetujui Syarat & Ketentuan untuk melanjutkan",
        });
      } else if (res.value === 1) {
        if (res.isConfirmed) {
          let body = {
            buyer_company_id: selected.perusahaan.value,
            ms_payment_id: selected.metode_pembayaran.value.payment_id,
            transaction_amount: nominal,
            user_id: data_user.id,
          };
          setLoading(true);
          await api_transaksi
            .post_transaction_balance({ body })
            .then(async (res) => {
              console.log("ini dia berhasil", res);
              if (res.success) {
                if (!res.token) {
                  await AlertSuccess({
                    title: "SUCCESS",
                    showConfirmButton: true,
                    html: `<div>
                    <div>Silahkan melakukan Pembayaran sebesar</div>
                    <h4>${FormatCurrency.currency(
                      res.data.transaction_total_amount
                    )}</h4>
                    <div>(Sudah dengan Ppn 11%)</div>
                    <br />
                    <br />
                    <br />
        
                    <div>${res.data.ms_payment.ms_payment_bank_name}</div>
                    <br />
                    <div>No Rekening : ${
                      res.data.ms_payment.ms_payment_bank_recipient_number
                    }</div>
                    <br />
                    <div>A/N : ${
                      res.data.ms_payment.ms_payment_bank_recipient_name
                    }</div>
                    <br />
                    <br />
                    <br />
                    <div>
                    Silahkan sertakan bukti pembayaran dalam bentuk file foto (jpg/png) di menu Transaksi dan pilih Upload Bukti Pembayaran
                      Atau jika anda mengalami kendala, anda dapat mengirim email ke <a href="mailto:cs@mediacartz.com">cs@mediacartz.com</a>
                    </div>
                    </div>`,
                  });
                  await onHide();
                  await setSelected((state) => ({
                    ...state,
                    metode_pembayaran: "",
                    perusahaan: "",
                  }));
                  await setNominal(0);
                  if (getData1) {
                    await getData1();
                  }
                } else if (res.token) {
                  console.log({ token: res });
                  await window.snap.pay(res.token, {
                    onSuccess: (res) => {},
                    onPending: (res) => {},
                    onError: () => {},
                  });
                  await onHide();
                  await setSelected((state) => ({
                    ...state,
                    metode_pembayaran: "",
                    perusahaan: "",
                  }));
                  await setNominal(0);
                }
              } else {
                AlertError({ title: "ERROR", text: res.error });
              }
              setLoading(false);
            });
        }
      }
    });
  };

  return (
    <Modal_Component
      onHide={onHide}
      show={show}
      title="Topup Saldo"
      btnSubmit={loading ? false : true}
      btnName="Topup Saldo"
      onClick={btnTopup}
    >
      <div className="container">
        <div className="mb-3 mb-md-3">
          <Label color={COLOR_SECONDARY}>Perusahaan Pembeli</Label>
          <Select
            placeholder="Pilih Perusahaan"
            options={opt.perusahaan}
            value={selected.perusahaan}
            onChange={(e) =>
              setSelected((state) => ({ ...state, perusahaan: e }))
            }
            isDisabled={loading ? true : false}
          />
        </div>
        <div className="mb-3 mb-md-3">
          <div className="mb-2 mb-md-2">
            <Label color={COLOR_SECONDARY}>Metode Pembayaran</Label>
            <Select
              placeholder="Pilih Metode Pembayaran"
              options={opt.metode_pembayaran}
              value={selected.metode_pembayaran}
              onChange={(e) =>
                setSelected((state) => ({ ...state, metode_pembayaran: e }))
              }
              isDisabled={loading ? true : false}
            />
          </div>
          {selected.metode_pembayaran !== "" && (
            <div
              className="rounded-1"
              style={{
                border: `1px solid ${COLOR_SECONDARY}`,
                padding: "5px 5px",
              }}
            >
              <div className="container">
                <div>{selected.metode_pembayaran.value.desc}</div>
                {selected.metode_pembayaran.value.bank_name && (
                  <div>
                    Bank Name : {selected.metode_pembayaran.value.bank_name}
                  </div>
                )}
                {selected.metode_pembayaran.value.recipient_number && (
                  <div>
                    Account Number :{" "}
                    {selected.metode_pembayaran.value.recipient_number}
                  </div>
                )}
                {selected.metode_pembayaran.value.recipient_name && (
                  <div>
                    Account Name :{" "}
                    {selected.metode_pembayaran.value.recipient_name}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="mb-3 mb-md-3">
          <Label color={COLOR_SECONDARY}>Nominal Topup</Label>
          <input
            type="text"
            className="form-control"
            placeholder="Masukkan nominal topup"
            value={FormatCurrency.input(nominal)}
            onChange={(e) => setNominal(e.target.value.replace(/[^0-9]+/g, ""))}
            disabled={loading ? true : false}
          />
        </div>
      </div>
    </Modal_Component>
  );
};
