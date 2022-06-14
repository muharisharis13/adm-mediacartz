import React, { useEffect, useState } from "react";
import { Modal, Table } from "react-bootstrap";
import { COLOR_PRIMARY, HeaderSecondary } from '../../../../component/style/content/default';
import styled from "styled-components";
import { TimesCircle } from "styled-icons/fa-regular"
import { Pagination } from "../../../../component";
import { CompanyService } from "../../../../service";
import { Moment } from "../../../../util"




export const Modal_cek_bucket = ({ onHide, show, company_id, company_name }) => {
  const [bucket_active, setBucket_active] = useState([])
  const [riwayat_bucket, setRiwayat_bucket] = useState([]);
  const [riwayat_page, setPage_riwayat] = useState({
    page: 0,
    last_page: 0,
    per_page: 0
  })


  const getData = async () => {
    await CompanyService.get_bucket_company({ company_id: company_id })
      .then(res => {
        if (res.success) {
          setBucket_active(res.data)
        }
      })

    await CompanyService.get_bucket_company_w_pagination({ company_id: company_id })
      .then(res => {
        console.log({ res })
        if (res.success) {
          setRiwayat_bucket(res.data);
          setPage_riwayat({ ...riwayat_page, page: res.page, last_page: res.last_page, per_page: res.per_page })
        }
      })
  }

  const btnPagination = async (e) => {
    let page = e.selected + 1


    await CompanyService.get_bucket_company_w_pagination({ company_id: company_id, page: page })
      .then(res => {
        console.log({ res })
        if (res.success) {
          setRiwayat_bucket(res.data);
          setPage_riwayat({ ...riwayat_page, page: res.page, last_page: res.last_page, per_page: res.per_page })
        }
      })
  }

  useEffect(() => {
    if(show){
      getData()
    }
  }, [show])

  return (
    <Modal onHide={onHide} show={show} size="xl">
      <ModalHeader>
        <div className="d-flex justify-content-between align-items-center" style={{ width: "100%", color: "#fff" }}>
          <div>
            <HeaderSecondary>
              Bucket {company_name}
            </HeaderSecondary>
          </div>
          <button className="btn text-white" onClick={onHide}><TimesCircle style={{ width: "20px" }} /> </button>
        </div>
      </ModalHeader>
      <Modal.Body style={{ background: "#eaeaea" }}>
        <div className="container">
          <section className="mb-5">
            <div>Bucket Aktif Saat Ini</div>
            <div>
              <Table striped bordered hover>
                <thead className="text-center">
                  <tr>
                    <th>No</th>
                    <th>Nama Bucket</th>
                    <th>Produk</th>
                    <th>Impresi Tersedia</th>
                    <th>Berlaku Hingga</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {
                    bucket_active.map((item, idx) => (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>{item.bucket_name}</td>
                        <td>{item.product && item.product.product_name}</td>
                        <td>{item.bucket_impression}</td>
                        <td>{Moment(item.bucket_valid_until_datetime)}</td>
                      </tr>

                    ))
                  }

                </tbody>
              </Table>
            </div>
          </section>


          <section>
            <div>Riwayat Bucket</div>
            <div>
              <Table striped bordered hover>
                <thead className="text-center">
                  <tr>
                    <th>No</th>
                    <th>Tanggal</th>
                    <th>Nama Bucket</th>
                    <th>Produk</th>
                    <th>Debit</th>
                    <th>Credit</th>
                    <th>Saldo</th>
                    <th>Refrensi</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {
                    riwayat_bucket.map((item, idx) => (
                      <tr>
                        <td>{(riwayat_page.page * 15 - 15) + idx + 1}</td>
                        <td>{Moment(item.bucket_history_datetime)}</td>
                        <td>{item.bucket && item.bucket.bucket_name}</td>
                        <td>{item.bucket && item.bucket.product.product_name}</td>
                        <td>{item.bucket_history_debit ? item.bucket_history_debit : "-"}</td>
                        <td>{item.bucket_history_credit ? item.bucket_history_credit : "-"}</td>
                        <td>{item.bucket_history_balance ? item.bucket_history_balance : "-"}</td>
                        <td>{item.ms_reference && `${item.ms_reference.ms_reference_name}#${item.reference_source_id}`}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
            </div>
            <div>
              <Pagination totalPage={riwayat_page.last_page} handleOnChange={(e) => btnPagination(e)} />
            </div>
          </section>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={onHide} className="btn bg-light border border-light mx-2">Tutup</button>
      </Modal.Footer>
    </Modal>
  )
}



const ModalHeader = styled(Modal.Header)`
background:${COLOR_PRIMARY};
`