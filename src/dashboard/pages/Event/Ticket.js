import React, { useEffect, useState } from "react";
import * as Component from "../../../component";
import * as Style from "../../../component/style/content/default";
import * as Services from "../../../service";
import * as Util from "../../../util";
import * as Modal from "./modal";
import styled from "styled-components";

const header = [
  "No",
  "Tanggal Tiket",
  "Kode Booking",
  "Jenis Tiket",
  "Nomor Seat",
  "Harga",
  "Event",
  "Status",
  "Aksi",
];

const dataMore = [
  {
    name: "Lihat Detail",
  },
];

const api = Services.api.ApiEvent.Ticket;

export default function Ticket() {
  Util.useTitle("Event | Tiket");
  const [data, setData] = useState({
    data: [],
    page: 1,
    lastPage: 1,
  });
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({
    detail: false,
  });
  const [dataProps, setDataProps] = useState({});

  const getList = async (page) => {
    try {
      setLoading(true);
      await api.getTicketList(page).then((res) => {
        if (res?.success) {
          setData((state) => ({
            ...state,
            data: res?.data,
            page: res?.page,
            lastPage: res?.last_page,
          }));
        }
      });
    } catch (error) {
      Component.AlertError({ title: "Error", text: error });
    } finally {
      setLoading(false);
    }
  };

  const getDetail = async (ticket_id) => {
    try {
      await api.getDetailTicket(ticket_id).then(async (res) => {
        if (res?.success) {
          await Promise.all([
            setDataProps((state) => ({
              ...state,
              data: res?.data,
            })),
            setModal((state) => ({ ...state, detail: true })),
          ]);
        }
      });
    } catch (error) {
      Component.AlertError({ title: "Error", text: error });
    }
  };

  useEffect(async () => {
    await getList(data.page);
  }, []);

  const BtnPagination = async (e) => {
    await Promise.all([getList(e.selected + 1)]);
  };

  const BtnMore = async (name, id) => {
    await Promise.all([getDetail(id)]);
  };

  return (
    <Container>
      {/* MODAL ==================== */}
      <Modal.ModalTicketDetail
        show={modal.detail}
        onHide={() => {
          setModal((state) => ({ ...state, detail: false }));
          setDataProps({});
        }}
        dataProps={dataProps}
      />
      {/* MODAL ==================== */}

      <div className="wrap-title">
        <Style.HeaderPrimary color={Style.COLOR_PRIMARY}>
          Daftar Tiket
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
                  // onClick={() => BtnMore("Lihat Detail", item.ticket_id)}
                >
                  <td data-label="No">
                    {Util.Numeric({ idx, page: data?.page })}
                  </td>
                  <td data-label="Tanggal tiket">
                    {Util.Moment(item.ticket_datetime)}
                  </td>
                  <td data-label="Kode Booking">
                    {item.ticket_booking_number}
                  </td>
                  <td data-label="Jenis Tiket">{item.ticket_name}</td>
                  <td data-label="Nomor Seat">
                    {item.ticket_seat_numer || "-"}
                  </td>
                  <td data-label="Harga">
                    {Util.FormatCurrency.currency(item.ticket_price)}
                  </td>
                  <td data-label="Event">{item.event?.event_name}</td>
                  <td data-label="Status">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: Util.displayStatus(item.ticket_status_name),
                      }}
                    />
                  </td>
                  <td data-label="Aksi">
                    <Component.DropDown_More
                      title={
                        <button
                          class="button is-primary is-small"
                          aria-haspopup="true"
                          aria-controls="dropdown-menu"
                        >
                          <span class="icon is-small">•••</span>
                        </button>
                      }
                      data_more={dataMore}
                      id={item.ticket_id}
                      onClick={({ name, id }) => BtnMore(name, id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              "Data Tidak Ditemukan"
            )}
          </Component.TableData>

          {/* pagination */}

          <div className="wrap-pagination mt-2">
            <Component.Pagination
              page={data.page}
              totalPage={data.lastPage}
              handleOnChange={BtnPagination}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled(Style.ContainerContent)`
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
