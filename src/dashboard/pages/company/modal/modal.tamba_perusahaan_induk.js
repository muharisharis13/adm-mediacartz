import React, { useEffect, useState } from 'react'
import { AlertError, AlertSuccess, Modal_Component } from '../../../../component'
import { CompanyService } from '../../../../service';
import Select from "react-select";
import { COLOR_SECONDARY } from "../../../../component/style/content/default"

export const Modal_tamba_perusahaan_induk = ({ show, onHide, title, company_active_status, company_verified_status_name, getData1 }) => {
  const [optionsCompany, setOptionsCompany] = useState([]);
  const [slctdCompany, setSlctdCompany] = useState("");
  const [loading, setLoading] = useState(false)

  const getData = async () => {
    await CompanyService.get_company_active_verified({ company_active_status, company_verified_status_name })
      .then(res => {
        console.log({ get_company_active_verified: res })
        if (res.success) {
          setOptionsCompany(res.data.map(item => ({ value: item.company_id, label: `${item.company_name} (${item.category_company.category_company_name})` })))
        }
      })
  }

  useEffect(() => {
    if(show){
      getData()
    }
  }, [show]);


  const onChangeSelect = (e) => {
    console.log(e);

    setSlctdCompany(e)
  }

  const btnSimpan = async () => {
    setLoading(true)
    await CompanyService.put_company_parent({ company_id: slctdCompany.value })
      .then(async res => {
        console.log({ put_company_parent: res })
        if (res.success) {
          await AlertSuccess({ title: "SUCCESS", text: res.success });
          await onHide();
          await getData1();


        }
        else {
          await AlertError({ title: "ERROR", text: res.error })
        }
        setLoading(false)
      })
  }


  return (
    <Modal_Component show={show} onHide={onHide} size="lg" title={title} btnSubmit={loading ? false : true} btnName="Simpan" onClick={btnSimpan}>
      <div className="container">
        <section className="mb-3 mb-md-3">
          <strong style={{ color: COLOR_SECONDARY }}>Perusahaan Induk</strong>
        </section>

        <section>
          <Select options={optionsCompany} value={slctdCompany} onChange={onChangeSelect} placeholder="Perusahaan Induk ..." isDisabled={loading ? true : false} />
        </section>
      </div>
    </Modal_Component>
  )
}
