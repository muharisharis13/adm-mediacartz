import React, {  useState, useEffect } from 'react'
import { Modal } from "react-bootstrap";
import styled from "styled-components";
import { TimesCircle } from "styled-icons/fa-regular"
import { COLOR_PRIMARY, HeaderSecondary, COLOR_SECONDARY, TagStatus } from '../../../../component/style/content/default';
import { CompanyService } from '../../../../service';
import { FormatCurrency } from '../../../../util';
import { Verified } from "@styled-icons/material-sharp"
import { Unverified } from "@styled-icons/octicons"



export const Modal_detail = ({ onHide, show, company_id }) => {
  const [data, setData] = useState("");
  const [balance, setBalance] = useState(0);
  const [bucket, setBucket] = useState([]);
  const [link, setLink] = useState([])




  useEffect(() => {

    async function fetch() {
      await CompanyService.get_company_detail({ company_id: company_id })
        .then(detail => {
          // console.log(detail.data)
          if (detail?.data?.success) {
            setData(detail.data.data)
          }
        })

      await CompanyService.get_balance_company({ company_id: company_id })
        .then(balance => {
          if (balance.success) {

            setBalance(balance.data)

          }
          else {


          }
        })

      await CompanyService.get_bucket_company({ company_id: company_id })
        .then(bucket => {
          if (bucket.success) {

            setBucket(bucket.data)
          }
          else {

          }
        })


      await CompanyService.get_link_company({ company_id: company_id })
        .then(link => {

          if (link.success) {
            setLink(link.data)
          }
        })

    }
    fetch()

  }, [company_id])



  console.log({ bucket })



  return (
    <Modal onHide={onHide} show={show} size="lg">
      <ModalHeader>
        <div className="d-flex justify-content-between align-items-center" style={{ width: "100%", color: "#fff" }}>
          <div>
            <HeaderSecondary>Perusahaan Detail</HeaderSecondary>
          </div>
          <button className="btn text-white" onClick={onHide}><TimesCircle style={{ width: "20px" }} /> </button>
        </div>
      </ModalHeader>
      {/* BODY============== */}
      <Modal.Body style={{ background: "#eaeaea" }}>
        {/* ROW CONTENT ============ */}
        <div className="container">
          <Row className="row bg-white">
            <div className="col-md-6 col-sm-6">
              <strong style={{ color: COLOR_SECONDARY }}>Nama Perusahaan</strong>
            </div>
            <div className="col-md-6 col-sm-6">
              {data.company_name}
            </div>
          </Row>
          <Row className="row bg-white">
            <div className="col-md-6 col-sm-6">
              <strong style={{ color: COLOR_SECONDARY }}>Email</strong>
            </div>
            <div className="col-md-6 col-sm-6">
              {data.company_email}
            </div>
          </Row>
          <Row className="row bg-white">
            <div className="col-md-6 col-sm-6">
              <strong style={{ color: COLOR_SECONDARY }}>Saldo</strong>
            </div>
            <div className="col-md-6 col-sm-6">
              {
                FormatCurrency.currency(balance)
              }
            </div>
          </Row>
          <Row className="row bg-white">
            <div className="col-md-6 col-sm-6">
              <strong style={{ color: COLOR_SECONDARY }}>Bucket</strong>
            </div>
            <div className="col-md-6 col-sm-6">
              <ul>
                {bucket.length > 0 ? bucket.map((item, idx) => (
                  <li key={idx}>{`${item.bucket_name} : ${item.bucket_impression} Impressi`}</li>
                )) : "-"}

              </ul>
            </div>
          </Row>
          <Row className="row bg-white">
            <div className="col-md-6 col-sm-6">
              <strong style={{ color: COLOR_SECONDARY }}>Alamat</strong>
            </div>
            <div className="col-md-6 col-sm-6">
              {data.company_address}
            </div>
          </Row>
          <Row className="row bg-white">
            <div className="col-md-6 col-sm-6">
              <strong style={{ color: COLOR_SECONDARY }}>Telepon</strong>
            </div>
            <div className="col-md-6 col-sm-6">
              {data.company_phone}
            </div>
          </Row>
          <Row className="row bg-white">
            <div className="col-md-6 col-sm-6">
              <strong style={{ color: COLOR_SECONDARY }}>Contact Person</strong>
            </div>
            <div className="col-md-6 col-sm-6">
              {data.company_contact_person}
            </div>
          </Row>
          <Row className="row bg-white">
            <div className="col-md-6 col-sm-6">
              <strong style={{ color: COLOR_SECONDARY }}>Contact Phone</strong>
            </div>
            <div className="col-md-6 col-sm-6">
              {data.company_contact_phone}
            </div>
          </Row>
          <Row className="row bg-white">
            <div className="col-md-6 col-sm-6">
              <strong style={{ color: COLOR_SECONDARY }}>Kota</strong>
            </div>
            <div className="col-md-6 col-sm-6">
              {data.ms_city ? data.ms_city.ms_city_name_full : "-"}
            </div>
          </Row>
          <Row className="row bg-white">
            <div className="col-md-6 col-sm-6">
              <strong style={{ color: COLOR_SECONDARY }}>Kode Pos</strong>
            </div>
            <div className="col-md-6 col-sm-6">
              {data.company_zip}
            </div>
          </Row>
          <Row className="row bg-white">
            <div className="col-md-6 col-sm-6">
              <strong style={{ color: COLOR_SECONDARY }}>Status Perusahaan</strong>
            </div>
            <div className="col-md-6 col-sm-6">
              <TagStatus>{data.company_active_status_name}</TagStatus>
            </div>
          </Row>
          <Row className="row bg-white">
            <div className="col-md-6 col-sm-6">
              <strong style={{ color: COLOR_SECONDARY }}>Tanggal Dibuat</strong>
            </div>
            <div className="col-md-6 col-sm-6">
              {data.company_created_datetime}
            </div>
          </Row>
          <Row className="row bg-white">
            <div className="col-md-6 col-sm-6">
              <strong style={{ color: COLOR_SECONDARY }}>Dibuat Oleh</strong>
            </div>
            <div className="col-md-6 col-sm-6">
              {data.company_created_by ? data.company_created_by.name : "-"}
            </div>
          </Row>
          <Row className="row bg-white">
            <div className="col-md-6 col-sm-6">
              <strong style={{ color: COLOR_SECONDARY }}>Tanggal Diperbarui</strong>
            </div>
            <div className="col-md-6 col-sm-6">
              -
            </div>
          </Row>
          <Row className="row bg-white">
            <div className="col-md-6 col-sm-6">
              <strong style={{ color: COLOR_SECONDARY }}>Diperbarui Oleh</strong>
            </div>
            <div className="col-md-6 col-sm-6">
              {data.company_created_by ? data.company_created_by.name : "-"}
            </div>
          </Row>
          <Row className="row bg-white">
            <div className="col-md-6 col-sm-6">
              <strong style={{ color: COLOR_SECONDARY }}>Status Verifikasi</strong>
            </div>
            <div className="col-md-6 col-sm-6">
              {
                data.company_verified_status_name === "verified" ?
                  <Verified style={{ width: "25px", color: "#04D010" }} /> :
                  <Unverified style={{ width: "25px", color: "#ccc" }} />
              }
            </div>
          </Row>
          <Row className="row bg-white">
            <div className="col-md-6 col-sm-6">
              <strong style={{ color: COLOR_SECONDARY }}>Diverifikasi Oleh</strong>
            </div>
            <div className="col-md-6 col-sm-6">
              {data.company_verified_by ? data.company_verified_by.name : "-"}
            </div>
          </Row>
          <Row className="row bg-white">
            <div className="col-md-6 col-sm-6">
              <strong style={{ color: COLOR_SECONDARY }}>Kategori Perusahaan</strong>
            </div>
            <div className="col-md-6 col-sm-6">
              {data.category_company ? data.category_company.category_company_name : "-"}
            </div>
          </Row>
          <Row className="row bg-white">
            <div className="col-md-6 col-sm-6">
              <strong style={{ color: COLOR_SECONDARY }}>Cabang Perusahaan</strong>
            </div>
            <div className="col-md-6 col-sm-6">
              <ul>
                {
                  data.company_children_company ? data.company_children_company.length > 0 && 
                  data.company_children_company.map((item,idx) =>(
                    <li key={idx}>{`${item.company_name} (${item.company_verified_status_name})`}</li>
                  ))
                  : "-"
                }
              </ul>
            </div>
          </Row>
          <Row className="row bg-white">
            <div className="col-md-6 col-sm-6">
              <strong style={{ color: COLOR_SECONDARY }}>Pengguna Perusahaan</strong>
            </div>
            <div className="col-md-6 col-sm-6">
              <ul>
                {
                  link.length > 0 ? link.map((item, idx) => (
                    <li key={idx}>{item.user && `${item.user.name}(${item.user.active_user_status_name}) As `} <strong>{item.ms_user && item.ms_user.ms_user_name}</strong></li>
                  ))
                    : "-"
                }
              </ul>
            </div>
          </Row>
        </div>
        {/* ROW CONTENT =================== */}
      </Modal.Body>
      {/* BODY============== */}
      <Modal.Footer>
        <button onClick={onHide} className="btn bg-light border border-light mx-2">Tutup</button>
      </Modal.Footer>
    </Modal>
  )
}


const ModalHeader = styled(Modal.Header)`
background:${COLOR_PRIMARY};
`


const Row = styled.div`
border:1px solid transparent;
border-bottom-color:#ccc;
padding:5px 5px;



&:last-child{
  border-bottom-color: transparent;
}
`

