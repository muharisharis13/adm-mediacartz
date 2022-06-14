import React, { useEffect, useState } from "react";
import { Modal, Table } from "react-bootstrap";
import { COLOR_PRIMARY, COLOR_SECONDARY, HeaderSecondary, TagStatus } from '../../../../../component/style/content/default';
import styled from "styled-components";
import { TimesCircle } from "styled-icons/fa-regular"
import { CompanyService } from "../../../../../service";
import { FormatCurrency, Moment } from "../../../../../util"




export const Modal_detail = ({ onHide, show, package_id }) => {
  const [data, setData] = useState({})

  const getData = async () => {
    await CompanyService.get_package_detail_company({ package_id: package_id })
      .then(res => {
        console.log({ get_package_detail_company: res })
        if (res.success) {
          setData(res.data)
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
              Detail Paket
            </HeaderSecondary>
          </div>
          <button className="btn text-white" onClick={onHide}><TimesCircle style={{ width: "20px" }} /> </button>
        </div>
      </ModalHeader>
      <Modal.Body style={{ background: "#eaeaea" }}>
        <div className="container">

          <section className="mb-5 mb-md-5">
            <Row className="row bg-white">
              <div className="col-md-6 col-sm-6">
                <strong style={{ color: COLOR_SECONDARY }}>Nama Paket</strong>
              </div>
              <div className="col-md-6 col-sm-6">
                {data.package_name}
              </div>
            </Row>
            <Row className="row bg-white">
              <div className="col-md-6 col-sm-6">
                <strong style={{ color: COLOR_SECONDARY }}>Harga Paket</strong>
              </div>
              <div className="col-md-6 col-sm-6">
                {FormatCurrency.currency(data.package_price)}
              </div>
            </Row>
            <Row className="row bg-white">

              <div className="col-md-6 col-sm-6">
                <strong style={{ color: COLOR_SECONDARY }}>Masa Aktif</strong>
              </div>
              <div className="col-md-6 col-sm-6">
                {`${data.package_valid_days} Hari`}
              </div>
            </Row>
            <Row className="row bg-white">

              <div className="col-md-6 col-sm-6">
                <strong style={{ color: COLOR_SECONDARY }}>Status</strong>
              </div>
              <div className="col-md-6 col-sm-6">
                <TagStatus>
                  {data.package_active_status_name}
                </TagStatus>
              </div>
            </Row>
            <Row className="row bg-white">

              <div className="col-md-6 col-sm-6">
                <strong style={{ color: COLOR_SECONDARY }}>Tanggal Mulai Aktif</strong>
              </div>
              <div className="col-md-6 col-sm-6">
                {Moment(data.package_active_from_datetime)}
              </div>
            </Row>
            <Row className="row bg-white">

              <div className="col-md-6 col-sm-6">
                <strong style={{ color: COLOR_SECONDARY }}>Tanggal Berakhir</strong>
              </div>
              <div className="col-md-6 col-sm-6">
                {Moment(data.package_active_until_datetime)}
              </div>
            </Row>
            <Row className="row bg-white">

              <div className="col-md-6 col-sm-6">
                <strong style={{ color: COLOR_SECONDARY }}>Tanggal Dibuat</strong>
              </div>
              <div className="col-md-6 col-sm-6">
                {Moment(data.package_created_datetime)}
              </div>
            </Row>
            <Row className="row bg-white">

              <div className="col-md-6 col-sm-6">
                <strong style={{ color: COLOR_SECONDARY }}>Dibuat Oleh</strong>
              </div>
              <div className="col-md-6 col-sm-6">
                {data.package_created_by && data.package_created_by.name}
              </div>
            </Row>
            <Row className="row bg-white">

              <div className="col-md-6 col-sm-6">
                <strong style={{ color: COLOR_SECONDARY }}>Tanggal Diubah</strong>
              </div>
              <div className="col-md-6 col-sm-6">
                {Moment(data.package_updated_datetime)}
              </div>
            </Row>
            <Row className="row bg-white">

              <div className="col-md-6 col-sm-6">
                <strong style={{ color: COLOR_SECONDARY }}>Diubah Oleh</strong>
              </div>
              <div className="col-md-6 col-sm-6">
                {data.package_updated_by && data.package_updated_by.name}
              </div>
            </Row>
            <Row className="row bg-white">

              <div className="col-md-6 col-sm-6">
                <strong style={{ color: COLOR_SECONDARY }}>Perusahaan</strong>
              </div>
              <div className="col-md-6 col-sm-6">
                {`MediaCartz`}
              </div>
            </Row>
          </section>

          <section>
            <div>
              <Table striped bordered hover>
                <thead className="text-center">
                  <tr>
                    <th>Nama Produk</th>
                    <th>Impresi</th>
                    <th>Harga Per Impresi</th>
                    <th>Harga</th>
                    <th>Diskon</th>
                    <th>Total Harga</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {
                    data.package_detail && data.package_detail.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.product && item.product.product_name}</td>
                        <td>{item.package_detail_impression_quantity}</td>
                        <td>{FormatCurrency.currency(item.package_detail_impression_price)}</td>
                        <td>{FormatCurrency.currency(item.package_detail_price)}</td>
                        <td>{FormatCurrency.currency(item.package_detail_discount)}</td>
                        <td>{FormatCurrency.currency(item.package_detail_total_price)}</td>
                        <td></td>
                      </tr>
                    ))
                  }
                </tbody>


              </Table>
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

const Row = styled.div`
border:1px solid transparent;
border-bottom-color:#ccc;
padding:5px 5px;



&:last-child{
  border-bottom-color: transparent;
}
`