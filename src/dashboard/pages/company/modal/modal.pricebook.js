import React, { useEffect, useState } from "react";
import { Modal, Table } from "react-bootstrap";
import {
  COLOR_PRIMARY,
  COLOR_SECONDARY,
  HeaderSecondary,
  TagStatus,
} from "../../../../component/style/content/default";
import styled from "styled-components";
import { TimesCircle } from "styled-icons/fa-regular";
import { CompanyService } from "../../../../service";
import { FormatCurrency, Moment, displayStatus } from "../../../../util";

export const Modal_cek_pricebook = ({
  onHide,
  show,
  company_id,
  company_name,
}) => {
  const [data, setData] = useState({});
  const [pricebook_detail, setPricebook_detail] = useState([]);

  const getData = async () => {
    await CompanyService.get_pricebook_company({ company_id: company_id }).then(
      (res) => {
        console.log({ get_pricebook_company: res });

        if (res.success) {
          setData(res.data);
          setPricebook_detail(res.data.pricebook_detail);
        }
      }
    );
  };

  useEffect(() => {
    if (show) {
      getData();
    }
  }, [show]);

  return (
    <Modal onHide={onHide} show={show} size="lg">
      <ModalHeader>
        <div
          className="d-flex justify-content-between align-items-center"
          style={{ width: "100%", color: "#fff" }}
        >
          <div>
            <HeaderSecondary>Info Pricebook {company_name}</HeaderSecondary>
          </div>
          <button className="btn text-white" onClick={onHide}>
            <TimesCircle style={{ width: "20px" }} />{" "}
          </button>
        </div>
      </ModalHeader>
      <Modal.Body style={{ background: "#eaeaea" }}>
        <div className="container">
          <section className="mb-5 mb-md-5">
            <Row className="row bg-white">
              <div className="col-md-6 col-sm-6">
                <strong style={{ color: COLOR_SECONDARY }}>
                  Nama Pricebook
                </strong>
              </div>
              <div className="col-md-6 col-sm-6">{data.pricebook_name}</div>
            </Row>
            <Row className="row bg-white">
              <div className="col-md-6 col-sm-6">
                <strong style={{ color: COLOR_SECONDARY }}>
                  Tanggal Efektif
                </strong>
              </div>
              <div className="col-md-6 col-sm-6">
                {Moment(data.pricebook_effective_datetime)}
              </div>
            </Row>
            <Row className="row bg-white">
              <div className="col-md-6 col-sm-6">
                <strong style={{ color: COLOR_SECONDARY }}>
                  Tanggal Dibuat
                </strong>
              </div>
              <div className="col-md-6 col-sm-6">
                {Moment(data.pricebook_created_datetime)}
              </div>
            </Row>
            <Row className="row bg-white">
              <div className="col-md-6 col-sm-6">
                <strong style={{ color: COLOR_SECONDARY }}>
                  Tanggal Diubah
                </strong>
              </div>
              <div className="col-md-6 col-sm-6">
                {Moment(data.pricebook_updated_datetime)}
              </div>
            </Row>
            <Row className="row bg-white">
              <div className="col-md-6 col-sm-6">
                <strong style={{ color: COLOR_SECONDARY }}>Perusahaan</strong>
              </div>
              <div className="col-md-6 col-sm-6">{"MediaCartz"}</div>
            </Row>
          </section>

          {/* ROW 2 ================== */}

          <section>
            <div>PRICEBOOK</div>
            <div>
              <Table striped bordered hover>
                <thead className="text-center">
                  <tr>
                    <th>No</th>
                    <th>Nama Produk</th>
                    <th>Harga Dasar</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {pricebook_detail.map((item, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{item.product && item.product.product_name}</td>
                      <td>
                        {FormatCurrency.currency(
                          item.pricebook_detail_base_price
                        )}
                      </td>
                      <td>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: displayStatus(
                              item.pricebook_detail_active_status_name
                            ),
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </section>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          onClick={onHide}
          className="btn bg-light border border-light mx-2"
        >
          Tutup
        </button>
      </Modal.Footer>
    </Modal>
  );
};

const ModalHeader = styled(Modal.Header)`
  background: ${COLOR_PRIMARY};
`;

const Row = styled.div`
  border: 1px solid transparent;
  border-bottom-color: #ccc;
  padding: 5px 5px;

  &:last-child {
    border-bottom-color: transparent;
  }
`;
