import React, { useEffect, useState, useContext } from "react";
import { AlertConfirm, Modal_Component, AlertError, AlertSuccess } from "../../../../component";
import { api_transaksi } from "../../../../service/api";
import { Label, COLOR_SECONDARY } from "../../../../component/style/content/default"
import Select from "react-select";
import { FormatCurrency } from "../../../../util"
import { Context } from "../../../../service";


export const Modal_beli_paket = ({ show, onHide, getData1 }) => {
  const { data_user } = useContext(Context)
  const [opt, setOpt] = useState({
    perusahaan: [],
    metode_pembayaran: [],
    paket: []
  })

  const [selected, setSelected] = useState({
    perusahaan: "",
    metode_pembayaran: "",
    paket: ""
  })
  const [paket, setPaket] = useState("");
  const [loading, setLoading] = useState(false)


  const getData = async () => {
    await api_transaksi.get_company_active_verified({})
      .then(async res => {
        console.log({ get_company_active_verified: res })
        if (res?.success) {
          await setOpt(state => ({ ...state, perusahaan: res.data.map(item => ({ value: item.company_id, label: `${item.company_name} (${item.category_company.category_company_name})` })) }))
        }
      })

    await api_transaksi.get_payment({ params: false })
      .then(async res => {
        console.log({ get_payment: res })
        if (res?.success) {
          await setOpt(state => ({ ...state, metode_pembayaran: res.data.map(item => ({ value: { bank_name: item.ms_payment_bank_name, recipient_name: item.ms_payment_bank_recipient_name, recipient_number: item.ms_payment_bank_recipient_number, desc: item.ms_payment_description, payment_id: item.ms_payment_id, }, label: item.ms_payment_name })) }))
        }
      })

  }


  useEffect(() => {
    if(show){
      getData()
    }
  }, [show])

  const get_package = async () => {
    await api_transaksi.get_package_company({ company_id: selected.perusahaan.value })
      .then(res => {
        console.log({ get_package_company: res })
        if (res?.success) {
          setOpt(state => ({ ...state, paket: res.data.map(item => ({ value: { qty_impression: item.package_detail[0].package_detail_impression_quantity, product_name: item.package_detail[0].product.product_name, valid: item.package_valid_days, price: item.package_price, package_id: item.package_id }, label: `${item.package_name} : ${FormatCurrency.currency(item.package_price)}` })) }))
        }
      })

  }

  useEffect(() => {
    get_package()
  }, [selected.perusahaan.value])


  console.log({ data_user })


  const btnTopup = async () => {
    await AlertConfirm({ title: "Konfirmasi", text: `Saya Setuju melakukan pembelian ${selected.paket.value.product_name} sebesar ${FormatCurrency.currency(selected.paket.value.price)}` })
      .then(async res => {
        console.log({ ini_result: res })

        if (res.value === 0) {
          AlertError({ title: "WARNING", text: "Anda Harus Menyetujui Syarat & Ketentuan untuk melanjutkan" })
        }
        else if (res.value === 1) {

          if (res.isConfirmed) {
            let body = {
              buyer_company_id: selected.perusahaan.value,
              ms_payment_id: selected.metode_pembayaran.value.payment_id,
              package_id: selected.paket.value.package_id,
              user_id: data_user.id
            }
            setLoading(true)
            await api_transaksi.post_transaction_package({ body })
              .then(async res => {
                console.log("ini diaa resss", res)
                if (res.success) {

                  if (!res.token) {
                    if (res.data.ms_payment.ms_payment_identifier === "TRANSFER") {
                      await AlertSuccess({
                        title: "SUCCESS", showConfirmButton: true, html: `<div>
                      <div>Silahkan melakukan Pembayaran sebesar</div>
                      <h4>${FormatCurrency.currency(res.data.transaction_amount)}</h4>
                      <br />
                      <br />
                      <br />
  
                      <div>${res.data.ms_payment.ms_payment_bank_name}</div>
                      <br />
                      <div>No Rekening : ${res.data.ms_payment.ms_payment_bank_recipient_number}</div>
                      <br />
                      <div>A/N : ${res.data.ms_payment.ms_payment_bank_recipient_name}</div>
                      <br />
                      <br />
                      <br />
                      <div>
                      Silahkan sertakan bukti pembayaran dalam bentuk file foto (jpg/png) di menu Transaksi dan pilih Upload Bukti Pembayaran
                        Atau jika anda mengalami kendala, anda dapat mengirim email ke <a href="mailto:cs@mediacartz.com">cs@mediacartz.com</a>
                      </div>
                    </div>` });

                    }
                    else if (res.data.ms_payment.ms_payment_identifier === "BALANCE") {
                      await AlertSuccess({ title: "SUCCESS", text: res.success })
                    }
                    await onHide();
                    await setSelected(state => ({ ...state, metode_pembayaran: "", perusahaan: "" }))
                    await setPaket(0)
                    if(getData1){
                      await getData1();
                    }

                  }
                  else if (res.token) {
                    console.log({ token: res })
                    await window.snap.pay(res.token, {
                      onSuccess: (res) => { },
                      onPending: (res) => { },
                      onError: () => { },
                    })
                    await onHide();
                    await setSelected(state => ({ ...state, metode_pembayaran: "", perusahaan: "" }))
                    await setPaket(0)
                  }

                }
                else {
                  AlertError({ title: "ERROR", text: res.error })
                }
                setLoading(false)
              })

          }

        }
      })
  }

  console.log({ selected: selected.paket.value })

  return (
    <Modal_Component onHide={onHide} show={show} title="Beli Paket" btnSubmit={loading ? false : true} btnName="Beli Paket" onClick={btnTopup}>
      <div className="container">

        <div className="mb-3 mb-md-3">
          <Label 
            color={COLOR_SECONDARY}
          >
            Perusahaan Pembeli
          </Label>
          <Select 
            placeholder="Pilih Perusahaan" 
            options={opt.perusahaan} 
            value={selected.perusahaan} 
            onChange={(e) => setSelected(state => ({ ...state, perusahaan: e }))} 
            isDisabled={loading ? true : false} 
          />
        </div>
        <div className="mb-3 mb-md-3">
          <div className="mb-2 mb-md-2">
            <Label 
              color={COLOR_SECONDARY}
            >
              Metode Pembayaran
            </Label>
            <Select 
              placeholder="Pilih Metode Pembayaran" 
              options={opt.metode_pembayaran} 
              value={selected.metode_pembayaran} 
              onChange={(e) => setSelected(state => ({ ...state, metode_pembayaran: e }))} 
              isDisabled={loading ? true : false} 
            />
          </div>
          {
            selected.metode_pembayaran !== "" &&
            <div className="rounded-1" style={{ border: `1px solid ${COLOR_SECONDARY}`, padding: "5px 5px" }}>
              <div className="container">
                <div>{selected.metode_pembayaran.value.desc}</div>
                {
                  selected.metode_pembayaran.value.bank_name &&
                  <div>
                    Bank Name : {selected.metode_pembayaran.value.bank_name}
                  </div>
                }
                {
                  selected.metode_pembayaran.value.recipient_number &&
                  <div>
                    Account Number : {selected.metode_pembayaran.value.recipient_number}
                  </div>
                }
                {
                  selected.metode_pembayaran.value.recipient_name &&
                  <div>
                    Account Name : {selected.metode_pembayaran.value.recipient_name}
                  </div>
                }

              </div>
            </div>
          }
        </div>
        {
          selected.perusahaan.value &&
          <div className="mb-3 mb-md-3">
            <div className="mb-2 mb-md-2">
              <Label color={COLOR_SECONDARY}>Paket</Label>
              <Select placeholder="Pilih Paket" options={opt.paket} value={selected.paket} onChange={(e) => setSelected(state => ({ ...state, paket: e }))} isDisabled={loading ? true : false} />
            </div>
            {
              selected.paket !== "" &&
              <div className="rounded-1" style={{ border: `1px solid ${COLOR_SECONDARY}` }}>
                <div className="container">

                  <ul style={{ paddingTop: "10px" }}>
                    <li>{selected.paket.value.product_name} : {selected.paket.value.qty_impression} Impressi</li>
                    <li>Valid Selama {selected.paket.value.valid} hari</li>
                  </ul>
                </div>
              </div>
            }
          </div>
        }
      </div>
    </Modal_Component>
  )
}