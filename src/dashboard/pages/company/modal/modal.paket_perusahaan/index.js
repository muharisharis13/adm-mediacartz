import React, { useEffect, useState } from "react";
import { Modal, Table } from "react-bootstrap";
import { COLOR_PRIMARY,  HeaderSecondary, TagStatus } from '../../../../../component/style/content/default';
import styled from "styled-components";
import { TimesCircle } from "styled-icons/fa-regular"
import { CompanyService } from "../../../../../service";
import { FormatCurrency, Moment } from "../../../../../util"
import { DropDown_More } from "../../../../../component";
import { MoreCircle } from "@styled-icons/fluentui-system-regular"
import { Modal_detail } from "./modal.detail";




export const Modal_cek_paket = ({ onHide, show, company_id }) => {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState({
    detail: false
  })
  const [package_id, setPackage_id] = useState(null)

  const getData = async () => {
    await CompanyService.get_package_company({ company_id: company_id })
      .then(res => {
        console.log({ get_package_company: res })
        if (res.success) {
          setData(res.data)
        }
      })
  }


  const btnMore = ({ name, package_id }) => {
    setModal({ ...modal, detail: !modal.detail })
    setPackage_id(package_id)
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
              Paket Perusahaan
            </HeaderSecondary>
          </div>
          <button className="btn text-white" onClick={onHide}><TimesCircle style={{ width: "20px" }} /> </button>
        </div>
      </ModalHeader>
      <Modal.Body style={{ background: "#eaeaea" }}>
        <div className="container">


          {/* MODAL ==== */}


          <Modal_detail show={modal.detail} onHide={() => setModal({ ...modal, detail: false })} package_id={package_id} />

          <section>
            <div>
              <Table striped bordered hover className="bg-white">
                <thead className="text-center">
                  <tr>
                    <th>No</th>
                    <th>Nama Paket</th>
                    <th>Pemilik Perusahaan</th>
                    <th>Harga</th>
                    <th>Masa Berlaku</th>
                    <th>Jadwal Pembelian</th>
                    <th>Status</th>
                    <th>More</th>
                  </tr>
                </thead>

                <tbody>
                  {
                    data.map((item, idx) => (
                      <tr>
                        <td>{idx + 1}</td>
                        <td>{item.package_name}</td>
                        <td>{"MediaCartz"}</td>
                        <td>{FormatCurrency.currency(item.package_price)}</td>
                        <td>{`${item.package_valid_days} hari`}</td>
                        <td>{`${Moment(item.package_active_from_datetime)} - ${Moment(item.package_active_until_datetime)}`}</td>
                        <td>
                          <TagStatus>{item.package_active_status_name}</TagStatus>
                        </td>
                        <td>
                          <DropDown_More data_more={[{ name: "Lihat Detail" }]} title={<MoreCircle style={{ width: "25px", color: "#ccc", cursor: "pointer" }} />} onClick={() => btnMore({ package_id: item.package_id })} />
                        </td>

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
