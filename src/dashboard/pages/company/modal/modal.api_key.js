import React, { useEffect, useState } from "react";
import { AlertError, AlertSuccess, Modal_Component } from '../../../../component'
import { Label, COLOR_SECONDARY, ButtonPrimary } from "../../../../component/style/content/default";
import { CompanyService } from "../../../../service";
import { IconCopy, IconDelete } from "../style";


export const Modal_api_key = ({ show, onHide, company_id }) => {
  const [data, setData] = useState({})
  const [company_ip, setCompany_ip] = useState([])
  const [loading, setLoading] = useState(false)


  const btnCopyclip = async (data) => {
    await navigator.clipboard.writeText(data);
    await AlertSuccess({ title: "SUCCESS", text: data })
  }


  const getData = async () => {
    await CompanyService.get_company_client_key({ company_id: company_id })
      .then(res => {
        console.log({ get_company_client_key: res })
        if (res.success) {
          setData({ client_key: res.data.client_key, server_key: res.data.server_key })
          if (res.data.company_ip !== null) {
            setCompany_ip(res.data.company_ip.map(item => ({ ip: item })))
          }
        }
      })
  }


  const btnTambahWhiteIp = () => {
    let data = ""
    setCompany_ip([...company_ip, { ip: data }])
  }

  const btnDeleteWhiteIp = (idx) => {
    const new_data = company_ip.filter((person, idx2) => idx2 !== idx);

    setCompany_ip(new_data);
  }

  const onChangeWhiteIp = ({ e, idx }) => {

    let data = [...company_ip];
    let index = data.findIndex((res, idx2) => idx2 === idx);

    data[index].ip = e.target.value;


    setCompany_ip(data)


  }


  const btngenrateKey = async () => {
    await CompanyService.get_company_client_key_new({ company_id: company_id })
      .then(async res => {
        console.log({ get_company_client_key_new: res })
        if (res.success) {
          setData({ ...data, client_key: res.data.client_key })
          AlertSuccess({ title: "SUCCESS", text: res.success })
        }
        else {
          AlertError({ title: "ERROR", text: res.error })
        }
      })
  }

  const btnSimpan = async () => {
    setLoading(true)
    await CompanyService.put_company_ip({ company_id, body: company_ip })
      .then(async res => {
        console.log({ put_company_ip: res })
        if (res.success) {
          await AlertSuccess({ title: "SUCCESS", text: res.success })
          await onHide()
        }
        else {
          await AlertError({ title: "ERROR", text: res.error })
        }
        setLoading(false)
      })
  }

  useEffect(() => {
    if(show){
      getData()
    }
  }, [show])


  return (
    <Modal_Component show={show} onHide={onHide} size="lg" title="API Key" btnSubmit={loading ? false : true} btnName="Simpan" onClick={btnSimpan}>
      <div className="container">

        <section className="mb-3 mb-md-3">
          <div>
            Jika anda ingin membuat permintaan API, Anda memerlukan kunci kredensial dibawah ini. Silahkan <a href="https://core.mediacartz.com/document/api-documentation.pdf" target="_blank">unduh dokumentasi API</a> untuk implementasi lebih lanjut.
          </div>
        </section>

        <section className="mb-3 mb-md-3">
          <div className="mb-3 mb-md-3">
            <Label color={COLOR_SECONDARY}>Server Key</Label>
            <input type="text" value={data.server_key} className="form-control" disabled />
          </div>
          <div className="mb-3 mb-md-3">
            <Label color={COLOR_SECONDARY}>Client Key</Label>
            <div className="d-flex" style={{ position: "relative" }}>
              <input type="text" id="client_id" value={data.client_key} className="form-control" disabled />
              <IconCopy onClick={() => btnCopyclip(data.client_key)} />
            </div>
          </div>
        </section>

        <section>
          <div className="mb-3 mb-md-3">
            <Label color={COLOR_SECONDARY}>Whitelist IP Address</Label>
            {
              company_ip.length > 0 && company_ip.map((item, idx) => (
                <div className="d-flex mb-3 mb-md-3" style={{ position: "relative" }} key={idx}>
                  <input type="text" value={item.ip} className="form-control" onChange={(e) => onChangeWhiteIp({ e: e, idx: idx })} placeholder="Masukkan IP Address" />
                  <IconDelete onClick={() => btnDeleteWhiteIp(idx)} />
                </div>

              ))
            }
          </div>
          <div className="mb-3 mb-md-3 d-flex">
            <ButtonPrimary onClick={btnTambahWhiteIp}>Tambah IP Address</ButtonPrimary>
            <button className="btn btn-light mx-2 border-dark" onClick={btngenrateKey}>Regenerate Key</button>
          </div>
        </section>
      </div>
    </Modal_Component>
  )
}