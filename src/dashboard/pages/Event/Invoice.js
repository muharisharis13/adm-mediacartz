import React, { useState, useEffect } from "react";
import * as Component from "../../../component";
import * as Style from "../../../component/style/content/default";
import * as Services from "../../../service";
import * as Util from "../../../util";
import * as Modal from "./modal";
import styled from "styled-components";

const header = [
  "No",
  "Tanggal Invoice",
  "Nomor Invoice",
  "Nama Event",
  "Jumlah Total",
  "Status",
  "Aksi",
];

const DataMore = [
  {
    name: "Lihat Detail",
  },
];

const api = Services.api.ApiEvent.Invoice;

export default function Invoice() {
  Util.useTitle("Event | Invoice");
  const [data, setData] = useState({
    data: [],
    page: 1,
    lastPage: 1,
  });
  const [modal, setModal] = useState({
    detail: false,
  });
  const [dataProps, setDataProps] = useState({});
  const [loading, setLoading] = useState(false);

  const getData = async (page) => {
    try {
      setLoading(true);
      await api.getInvoiceList(page).then((res) => {
        if (res.success) {
          setData((state) => ({
            ...state,
            data: res?.data,
            page: res?.page,
            lastPage: res?.last_page,
          }));
        }
      });
    } catch (error) {
      Component.AlertError({ title: "Erorr", text: error });
    } finally {
      setLoading(false);
    }
  };

  const getDetail = async (invoice_id) => {
    await api.getDetailInvoice(invoice_id).then((res) => {
      if (res?.success) {
        setDataProps((state) => ({
          ...state,
          data: res?.data,
        }));
        setModal((state) => ({ ...state, detail: true }));
      }
    });
  };

  useEffect(async () => {
    await getData(data?.page);
  }, []);

  const BtnPagination = async (e) => {
    await getData(e.selected + 1);
  };

  const BtnMore = (name, id) => {
    getDetail(id);
  };

  return (
    <Cotainer>
      {/* MODAL ============= */}
      <Modal.ModalInvoiceDetail
        show={modal.detail}
        onHide={() => {
          setModal((state) => ({ ...state, detail: false }));
          setDataProps({});
        }}
        dataProps={dataProps}
      />

      <div className="wrap-title">
        <Style.HeaderPrimary color={Style.COLOR_PRIMARY}>
          Daftar Invoice
        </Style.HeaderPrimary>
      </div>

      <div className="wrap-content">
        <div className="form">
          <Component.TableData header={header}>
            {loading ? (
              <Component.Loadingfunc />
            ) : data?.data.length > 0 ? (
              data?.data?.map((item: any, idx: number) => (
                <tr
                  key={idx}
                  // style={{ cursor: "pointer" }}
                  // onClick={() => BtnMore("Lihat Detail", item.invoice_id)}
                >
                  <td data-label="No">
                    {Util.Numeric({ idx, page: data?.page })}
                  </td>
                  <td data-label="Tanggal Invoice">
                    {Util.Moment(item.invoice_created_datetime)}
                  </td>
                  <td data-label="Nomor Invoice">{item.invoice_number}</td>
                  <td data-label="Nama Event">{item.event?.event_name}</td>
                  <td data-label="Jumlah Total">
                    {Util.FormatCurrency.currency(item.invoice_grand_total)}
                  </td>
                  <td data-label="Status">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: Util.displayStatus(
                          item.invoice_approve_status_name
                        ),
                      }}
                    />
                  </td>
                  <td data-labe="Aksi">
                    <Component.DropDown_More
                      title={
                        <button
                          className="button is-primary is-small"
                          aria-haspopup="true"
                          aria-controls="dropdown-menu"
                        >
                          <span className="icon is-small">•••</span>
                        </button>
                      }
                      data_more={DataMore}
                      id={item.invoice_id}
                      onClick={({ name, id }) => BtnMore(name, id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              "Data Tidak Ditemukan"
            )}
          </Component.TableData>

          {/* PAGINATION ============= */}
          <div className="wrap-pagination mt-2">
            <Component.Pagination
              page={data.page}
              totalPage={data?.lastPage}
              handleOnChange={BtnPagination}
            />
          </div>
        </div>
      </div>
    </Cotainer>
  );
}

const Cotainer = styled(Style.ContainerContent)`
  .wrap-content {
    .form {
      padding: 20px;
      background-color: #fff;
      box-shadow: 0px 3px 6px rgb(0 0 0 / 16%);
      color: rgba(10, 10, 10, 0.5);
      max-width: 100%;
      position: relative;
      border-radius: 10px;
    }
  }
`;
