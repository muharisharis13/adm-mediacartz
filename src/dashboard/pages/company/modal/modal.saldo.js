import React, { useEffect, useState } from "react";
import { Modal, Table } from "react-bootstrap";
import { COLOR_PRIMARY, HeaderPrimary, HeaderSecondary } from '../../../../component/style/content/default';
import styled from "styled-components";
import { TimesCircle } from "styled-icons/fa-regular"
import { Pagination } from "../../../../component";
import { CompanyService } from "../../../../service";
import { FormatCurrency, Moment } from "../../../../util"




export const Modal_cek_saldo = ({ onHide, show, company_id, company_name }) => {
  const [balance, setBalance] = useState(0);
  const [data, setData] = useState([])
  const [page, setPage] = useState({
    page: 0,
    last_page: 0
  })


  const getData = async () => {

    const balance = await CompanyService.get_balance_company({ company_id })
      .then(res => {
        console.log({ get_balance_company: res })
        if (res.success) {
          setBalance(res.data)
        }
      })

    const hist_balance = await CompanyService.get_balance_company_w_pagination({ company_id: company_id })
      .then(res => {
        console.log({ get_balance_company_w_pagination: res })
        if (res.success) {
          setData(res.data)
          setPage({ ...page, page: res.page, last_page: res.last_page })
        }
      })

    return { balance, hist_balance }
  }

  const btnPagination = async (e) => {
    let selected_page = e.selected + 1

    await CompanyService.get_balance_company_w_pagination({ company_id: company_id, page: selected_page })
      .then(res => {
        console.log({ get_balance_company_w_pagination: res })
        if (res.success) {
          setData(res.data)
          setPage({ ...page, page: res.page, last_page: res.last_page })
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

          <section className="mb-5 mb-md-5">
            <div style={{ color: COLOR_PRIMARY }}>Saldo Saat Ini : </div>
            <HeaderPrimary color={COLOR_PRIMARY}>{FormatCurrency.currency(balance)}</HeaderPrimary>
          </section>

          <section>
            <div>Riwayat Saldo</div>
            <div>
              <Table striped bordered hover>
                <thead className="text-center">
                  <tr>
                    <th>No</th>
                    <th>Tanggal</th>
                    <th>Deskripsi</th>
                    <th>Debit</th>
                    <th>Credit</th>
                    <th>Saldo</th>
                    <th>Referensi</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data.map((item, idx) => (
                      <tr>
                        <td>{((page.page * 15) - 15) + idx + 1}</td>
                        <td>{Moment(item.balance_history_datetime)}</td>
                        <td>{item.balance_history_description}</td>
                        <td>{item.balance_history_debit && FormatCurrency.currency(item.balance_history_debit)}</td>
                        <td>{item.balance_history_credit && FormatCurrency.currency(item.balance_history_credit)}</td>
                        <td>{item.balance_history_balance && FormatCurrency.currency(item.balance_history_balance)}</td>
                        <td>{`${item.ms_reference && item.ms_reference.ms_reference_name}#${item.reference_source_id}`}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
            </div>
            <div>
              <Pagination totalPage={page.last_page} handleOnChange={btnPagination} />
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