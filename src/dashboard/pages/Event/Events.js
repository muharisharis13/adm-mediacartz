import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import {
  ButtonPrimary,
  COLOR_PRIMARY,
  ContainerContent,
  HeaderPrimary,
} from "../../../component/style/content/default";
import {
  Form,
  TableData,
  Pagination,
  Loadingfunc,
  DropDown_More,
  AlertError,
  AlertSuccess,
  AlertQuestion,
} from "../../../component";
import { api, Context } from "../../../service";
import { Numeric, Moment, displayStatus, useTitle } from "../../../util";
import * as ModalComponent from "./modal";
import { Link, Redirect } from "react-router-dom";

const header = [
  "No",
  "Nama Event",
  "Kategori event",
  "Kategori Venue",
  "Jadwal Event",
  "Status Persetujuan",
  "Status Event",
  "Aksi",
];

const data_more = [
  { name: "Lihat Detail" },
  { name: "Penjualan Tiket" },
  { name: "Ubah" },
  { name: "Minta Invoice" },
  { name: "Daftar Transaksi" },
  { name: "Nonaktifkan" },
  { name: "Aktifkan" },
];

const Events = () => {
  useTitle("Event | Events");
  const { data_user, dispatch } = useContext(Context);
  const [data, setData] = useState({
    data: [],
    page: 1,
    lastPage: 1,
  });
  const [loading, setLoading] = useState(false);
  const [data_modal, setData_modal] = useState({
    detail: {
      data: null,
      image: null,
      agenda: null,
    },
  });
  const [modal, setModal] = useState({
    detail: false,
    scanTiket: false,
    penjualanTiket: false,
    mintaInvoice: false,
    daftarTransaksi: false,
  });
  const [redirect, setRedirect] = useState(false);
  const [data_single, setData_single] = useState(null);

  const getData = async () => {
    setLoading(true);
    await api.ApiEvent.Event.getListEvent({ page: 1 }).then((res) => {
      console.log(res);
      if (res?.success) {
        setData((state) => ({
          ...state,
          data: res.data,
          page: res.page,
          lastPage: res.last_page,
        }));
        setLoading(false);
      } else {
        console.error("error : ", res);
      }
    });
  };

  useEffect(async () => {
    await getData();
  }, []);

  const btnPagination = async (e) => {
    setLoading(true);
    await api.ApiEvent.Event.getListEvent({ page: e.selected + 1 }).then(
      (res) => {
        console.log(res);
        if (res?.success) {
          setData((state) => ({
            ...state,
            data: res.data,
            page: res.page,
            lastPage: res.last_page,
          }));
          setLoading(false);
        } else {
          console.error("error : ", res);
        }
      }
    );
  };

  const btnMore = async (name, id) => {
    // console.log({name,id})
    // console.log("ini org",data?.data?.find(find =>find.event_id === id))
    setData_single(data?.data?.find((find) => find.event_id === id));
    const row = data?.data?.find((find) => find.event_id === id);
    switch (name) {
      case "Lihat Detail":
        const data = await api.ApiEvent.Event.getDetailEvent(id);

        const image = await api.ApiEvent.Event.getImageBlob(id);

        const agenda = await api.ApiEvent.Event.getAgenda(id);
        console.log("ini data", data);
        await setData_modal((state) => ({
          ...state,
          detail: {
            data: data?.success ? data.data : null,
            image: URL.createObjectURL(image),
            agenda: agenda?.success ? agenda.data : null,
          },
        }));
        await setModal((state) => ({
          ...state,
          detail: true,
        }));
        break;

      case "Ubah":
        await api.ApiEvent.Event.getDetailEvent(id).then(async (res) => {
          if (res.success) {
            await dispatch({ type: "SET_DATA_EVENT", data: res.data });
            await setRedirect(true);
          }
        });
        break;

      case "Penjualan Tiket":
        setModal((state) => ({ ...state, penjualanTiket: true }));
        break;
      case "Minta Invoice":
        setModal((state) => ({ ...state, mintaInvoice: true }));
        await api.ApiEvent.Event.getDetailEvent(id).then(async (res) => {
          if (res.success) {
            setData_single((state) => ({ ...state, detail: res.data }));
          }
        });
        break;

      case "Daftar Transaksi":
        setModal((state) => ({ ...state, daftarTransaksi: true }));
        break;

      case "Aktifkan":
        await AlertQuestion({
          title: "Warning",
          text: `Do you want to activate ${row.event_name}`,
        }).then((res) => {
          if (res.isConfirmed) {
            api.ApiEvent.Event.putActiveEvent(id).then(async (res) => {
              if (res?.success) {
                await getData();
                await AlertSuccess({ title: "Success", text: res.success });
              }
            });
          }
        });
        break;

      case "Nonaktifkan":
        await AlertQuestion({
          title: "Warning",
          text: `Do you want to inactivate ${row.event_name}`,
        }).then((res) => {
          if (res.isConfirmed) {
            api.ApiEvent.Event.putInActiveEvent(id).then(async (res) => {
              if (res?.success) {
                await getData();
                await AlertSuccess({ title: "Success", text: res.success });
              }
            });
          }
        });
        break;
      default:
        return name;
    }
  };

  return (
    <Container>
      <HeaderPrimary color={COLOR_PRIMARY}>Daftar Event</HeaderPrimary>
      {redirect && <Redirect to="/dashboard/event/create" />}

      <section className="form-table-data">
        <Form>
          <section className="wrap-button">
            <Link to="/dashboard/event/create">
              <ButtonPrimary>Create Event</ButtonPrimary>
            </Link>
            <ButtonPrimary
              onClick={() =>
                setModal((state) => ({ ...state, scanTiket: true }))
              }
            >
              Scan Tiket
            </ButtonPrimary>
          </section>
          <section className="wrap-table-data">
            <TableData header={header}>
              {loading ? (
                <Loadingfunc />
              ) : (
                data?.data?.map((item: any, idx: any) => (
                  <tr
                    key={idx}
                    // style={{ cursor: "pointer" }}
                    // onClick={() => btnMore("Lihat Detail", item.event_id)}
                  >
                    <td data-label="No">{Numeric({ page: data.page, idx })}</td>
                    <td data-label="Nama Event">
                      {item.event_name ? item.event_name : ""}
                    </td>
                    <td data-label="Kategori event">
                      {item.category_event
                        ? item.category_event.category_event_name
                        : ""}
                    </td>
                    <td data-label="Kategori Venue">
                      {item.category_venue
                        ? item.category_venue.category_venue_name
                        : ""}
                    </td>
                    <td data-label="Jadwal Event">
                      <small>
                        {Moment(item.event_start_dateime)} ~
                        <br />
                        {Moment(item.event_end_datetime)}
                      </small>
                      <br />
                      {item.event_expired_status_name === "expired" && (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: displayStatus(
                              item.event_expired_status_name
                            ),
                          }}
                        />
                      )}
                    </td>
                    <td data-label="Status Persetujuan">
                      {
                        <div
                          dangerouslySetInnerHTML={{
                            __html: displayStatus(
                              item.event_approve_status_name
                            ),
                          }}
                        />
                      }
                    </td>
                    <td data-label="Status Event">
                      {
                        <div
                          dangerouslySetInnerHTML={{
                            __html: displayStatus(
                              item.event_active_status_name
                            ),
                          }}
                        />
                      }
                    </td>
                    <td data-label="Aksi">
                      <DropDown_More
                        title={
                          <div class="dropdown-trigger">
                            <button
                              class="button is-primary is-small"
                              aria-haspopup="true"
                              aria-controls="dropdown-menu"
                            >
                              <span class="icon is-small">•••</span>
                            </button>
                          </div>
                        }
                        data_more={data_more.filter((filter) =>
                          item.event_active_status_name === "active"
                            ? filter.name !== "Aktifkan"
                            : filter.name !== "Nonaktifkan"
                        )}
                        id={item.event_id}
                        onClick={({ name, id }) => btnMore(name, id)}
                      />
                    </td>
                  </tr>
                ))
              )}
            </TableData>
          </section>
          <section className="wrap-pagination">
            <Pagination
              page={data.page}
              totalPage={data.lastPage}
              handleOnChange={btnPagination}
            />
          </section>
        </Form>
      </section>

      {/* MODAL COMPONENT ===== */}

      <ModalComponent.ModalDetail
        show={modal.detail}
        onHide={() => setModal((state) => ({ ...state, detail: false }))}
        data={data_modal.detail}
        btnMoreEvent={btnMore}
      />
      <ModalComponent.ModalScanTiket
        show={modal.scanTiket}
        onHide={() => setModal((state) => ({ ...state, scanTiket: false }))}
      />

      <ModalComponent.ModalPenjualanTiket
        show={modal.penjualanTiket}
        onHide={() =>
          setModal((state) => ({ ...state, penjualanTiket: false }))
        }
        data_props={{
          event_id: data_single?.event_id,
          event_name: data_single?.event_name,
          organizer_id: data_single?.organizer_id,
        }}
      />
      <ModalComponent.ModalMintaInvoice
        show={modal.mintaInvoice}
        onHide={() => setModal((state) => ({ ...state, mintaInvoice: false }))}
        data_props={{
          event_id: data_single?.event_id,
          organizer_id: data_single?.organizer_id,
          detail: data_single,
          getData: getData,
        }}
      />
      <ModalComponent.ModalDaftarTransaksi
        show={modal.daftarTransaksi}
        onHide={() =>
          setModal((state) => ({ ...state, daftarTransaksi: false }))
        }
        data_props={{
          event_id: data_single?.event_id,
          organizer_id: data_single?.organizer_id,
        }}
      />

      {/* MODAL COMPONENT ===== */}
    </Container>
  );
};

export default Events;

const Container = styled(ContainerContent)`
  .form-table-data {
    .wrap-table-data {
      margin-top: 20px;
    }
    .wrap-button {
      display: flex;
      grid-gap: 1rem;
      grid-template-columns: repeat(1fr);
      flex-wrap: wrap;
    }
  }
`;
