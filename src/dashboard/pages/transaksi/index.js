import React, { useState, useEffect } from "react";
import {
  Form,
  Pagination,
  Loadingfunc,
  TableData,
  AlertError,
  DropDown_More,
} from "../../../component";
import {
  ButtonPrimary,
  COLOR_PRIMARY,
  ContainerContent,
  HeaderPrimary,
  MARGIN_THRIRD,
  Td,
  Tr,
} from "../../../component/style/content/default";
import { api_transaksi } from "../../../service/api";
import {
  FormatCurrency,
  Moment,
  Numeric,
  displayStatus,
  useTitle,
} from "../../../util";
import {
  Modal_topup_saldo,
  Modal_transaksi_detail,
  Modal_beli_paket,
} from "./modal";
import { Modal_upload_bukti_bayar } from "./modal/modal.upload_bukti_bayar";

const header = [
  "No",
  "Nomor Transaksi",
  "Tanggal",
  "Deskripsi",
  "Total",
  "Pembayaran",
  "Status",
  "More",
];
const data_more = [{ name: "Lihat Detail" }, { name: "Upload Bukti Bayar" }];

export const IdxTransaksi = () => {
  useTitle("Transaksi");
  const [data, setData] = useState([]);
  const [page, setPage] = useState({
    page: 1,
    last_page: 1,
  });
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({
    detail: false,
    topup: false,
    paket: false,
    upload: false,
  });
  const [transaction_id, setTransaction_id] = useState(null);

  const getData = async () => {
    setLoading(true);
    await api_transaksi.get_transaksi({}).then(async (res) => {
      console.log({ get_transaksi: res });
      if (res?.success) {
        setPage((state) => ({
          ...state,
          page: res.page,
          last_page: res.last_page,
        }));
        setData(res.data);
      } else {
        await AlertError({ title: "ERROR", text: "Terjadi Kesalahan" });
        await window.location.reload();
      }
      setLoading(false);
    });
  };

  const btnPagination = async (e) => {
    setLoading(true);
    await api_transaksi.get_transaksi({ page: e.selected + 1 }).then((res) => {
      console.log({ get_transaksi: res });
      if (res?.success) {
        setPage((state) => ({
          ...state,
          page: res.page,
          last_page: res.last_page,
        }));
        setData(res.data);
      }
      setLoading(false);
    });
  };

  const btnMore = ({ id, name }) => {
    setTransaction_id(id);
    console.log({ id, name });

    switch (name) {
      case "Lihat Detail":
        setModal({ ...modal, detail: true });
        break;
      case "Upload Bukti Bayar":
        setModal({ ...modal, upload: true });
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ContainerContent>
      <section>
        <HeaderPrimary color={COLOR_PRIMARY}>Daftar Transaksi</HeaderPrimary>
      </section>

      {/* MODAL ================ */}
      <Modal_transaksi_detail
        show={modal.detail}
        onHide={() => setModal({ ...modal, detail: false })}
        transaction_id={transaction_id}
      />

      <Modal_topup_saldo
        show={modal.topup}
        onHide={() => setModal({ ...modal, topup: false })}
        getData1={getData}
      />

      <Modal_beli_paket
        show={modal.paket}
        onHide={() => setModal({ ...modal, paket: false })}
        getData1={getData}
      />

      <Modal_upload_bukti_bayar
        show={modal.upload}
        onHide={() => setModal({ ...modal, upload: false })}
        transaction_id={transaction_id}
        getData={getData}
      />

      {/* MODAL ================ */}

      <section>
        <Form>
          <section
            className="row"
            style={{
              display: "flex",
              marginBottom: MARGIN_THRIRD,
              justifyContent: "space-between",
            }}
          >
            <div className="col-md-12 col-md-12 col-sm-12 d-flex">
              <ButtonPrimary
                margin="margin:2px 5px"
                onClick={() => setModal({ ...modal, paket: true })}
              >
                Beli Paket
              </ButtonPrimary>
              <ButtonPrimary
                margin="margin:2px 5px"
                onClick={() => setModal({ ...modal, topup: true })}
              >
                Top up Saldo
              </ButtonPrimary>
            </div>
          </section>
          <section className="mb-5 mb-md-5">
            <TableData header={header}>
              {loading ? (
                <Loadingfunc />
              ) : (
                data.map((item, idx) => (
                  <Tr
                    key={idx}
                    // style={{
                    //   cursor: `pointer`,
                    // }}
                    // onClick={() =>
                    //   btnMore({
                    //     id: item.transaction_id,
                    //     name: "Lihat Detail",
                    //   })
                    // }
                  >
                    <Td data-label="No">
                      {Numeric({ idx: idx, page: page.page })}
                    </Td>
                    <Td data-label="Nomor Transaksi">
                      {item.transaction_number}
                    </Td>
                    <Td data-label="Tanggal">
                      {Moment(item.transaction_created_datetime)}
                    </Td>
                    <Td data-label="Deskripsi">
                      {item.ms_transaction &&
                        item.ms_transaction.ms_transaction_name}
                    </Td>
                    <Td data-label="Total">
                      {FormatCurrency.currency(item.transaction_total_amount)}
                    </Td>
                    <Td data-label="Pembayaran">
                      {item.ms_payment && item.ms_payment.ms_payment_name}
                    </Td>
                    <Td data-label="Status">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: displayStatus(
                            item.transaction_approve_status_name
                          ),
                        }}
                      />
                    </Td>
                    <Td data-label="More">
                      <DropDown_More
                        title={
                          <button
                            className="button is-primary is-small"
                            aria-haspopup="true"
                            aria-controls="dropdown-menu"
                          >
                            <span className="icon is-small">•••</span>
                          </button>
                        }
                        id={item.transaction_id}
                        data_more={data_more.filter((filter) =>
                          item.transaction_approve_status_name === "pending"
                            ? filter.name
                            : filter.name === "Lihat Detail"
                        )}
                        onClick={({ id, name }) =>
                          btnMore({
                            id: id,
                            name: name,
                          })
                        }
                      />
                    </Td>
                  </Tr>
                ))
              )}
            </TableData>
          </section>

          <section>
            <Pagination
              totalPage={page.last_page}
              page={page.page}
              handleOnChange={btnPagination}
            />
          </section>
        </Form>
      </section>
    </ContainerContent>
  );
};
