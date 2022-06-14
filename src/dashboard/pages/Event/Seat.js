import React, { useState, useEffect } from "react";
import * as Component from "../../../component";
import * as Style from "../../../component/style/content/default";
import * as Services from "../../../service";
import * as Util from "../../../util";
import * as Modal from "./modal";
import * as ModalDetail from "./modal/modal.detail/index";
import styled from "styled-components";

const header = [
  "No",
  "Nama Event",
  "Jadwal Event",
  "Seat Layout",
  "Jumlah Seat",
  "Aksi",
];

const data_more = [
  {
    name: "Lihat Detail",
  },
  {
    name: "Ubah",
  },
];

const Seat = () => {
  Util.useTitle("Event | Seat");
  const [data, setData] = useState({
    data: [],
    page: 1,
    lastPage: 1,
  });
  const [modal, setModal] = useState({
    create: false,
    detail: false,
  });
  const [dataProps, setDataProps] = useState({});
  const api = Services.api.ApiEvent.Seat;

  async function getList() {
    await api.getSeat(data?.page).then((res) => {
      if (res?.success) {
        setData((state) => ({
          ...state,
          data: res.data,
          page: res.page,
          lastPage: res.last_page,
        }));
      }
    });
  }

  function getSeatDetail(seat_id, name) {
    api.getSeatDetail(seat_id).then(async (res) => {
      console.log("ini seat", res);
      if (res?.success) {
        await setDataProps((state) => ({
          ...state,
          detail: res?.data,
        }));
        if (name === "Ubah") {
          await setModal((state) => ({ ...state, create: true }));
        }
      }
    });
  }

  function getLayoutBlob(seat_id) {
    api.getLayoutBlob(seat_id).then((res) => {
      if (res) {
        setDataProps((state) => ({
          ...state,
          layoutBlob: URL.createObjectURL(res),
        }));
      }
    });
  }

  useEffect(() => {
    if (modal.create === false) {
      setDataProps({});
    }
  }, [modal.create]);

  useEffect(() => {
    getList();
  }, []);

  const BtnMore = async (name, id) => {
    setDataProps({});
    switch (name) {
      case "Lihat Detail":
        await Promise.all([
          getSeatDetail(id),
          getLayoutBlob(id),
          setModal((state) => ({ ...state, detail: true })),
        ]);
        break;
      case "Ubah":
        await Promise.all([getSeatDetail(id, "Ubah"), getLayoutBlob(id)]);
        break;

      default:
        break;
    }
  };

  return (
    <Container>
      <Style.HeaderPrimary color={Style.COLOR_PRIMARY}>
        Daftar Seat
      </Style.HeaderPrimary>

      <section className="form-table-data">
        <Component.Form>
          <div className="wrap-button mb-3">
            <Style.ButtonPrimary
              onClick={() => setModal((state) => ({ ...state, create: true }))}
            >
              Create Seat
            </Style.ButtonPrimary>
          </div>

          <div className="wrap-table-data">
            <Component.TableData header={header}>
              {data?.data?.map((item: any, idx: number) => (
                <tr
                  key={idx}
                  // style={{ cursor: "pointer" }}
                  // onClick={() => BtnMore("Lihat Detail", item.seat_id)}
                >
                  <td data-label="No">
                    {Util.Numeric({ idx, page: data?.page })}
                  </td>
                  <td data-label="Nama Event">{item?.event?.event_name}</td>
                  <td data-label="Nama Event">
                    {`${Util.Moment(
                      item?.event?.event_start_datetime
                    )} ~ ${Util.Moment(item?.event?.event_end_datetime)}`}
                    <br />
                    <div
                      dangerouslySetInnerHTML={{
                        __html: Util.displayStatus(
                          item?.event?.event_expired_status_name
                        ),
                      }}
                    />
                  </td>
                  <td>{item.seat_layout_image ? "✔" : ""}</td>
                  <td>
                    {Util.FormatCurrency.input(item?.seat_total_quantity) || ""}
                  </td>
                  <td>
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
                      id={item.seat_id}
                      data_more={data_more}
                      onClick={({ name, id }) => BtnMore(name, id)}
                    />
                  </td>
                </tr>
              ))}
            </Component.TableData>
          </div>

          <div>
            <Component.Pagination page={data.page} totalPage={data.lastPage} />
          </div>
        </Component.Form>
      </section>

      {/* MODAL ================ */}
      <ModalDetail.ModalSeatUbah
        show={modal.create}
        onHide={() => setModal((state) => ({ ...state, create: false }))}
        data={dataProps?.detail}
        btnMoreEvent={BtnMore}
      />
      <Modal.ModalSeatDetail
        show={modal.detail}
        onHide={() => setModal((state) => ({ ...state, detail: false }))}
        dataProps={dataProps}
      />
      {/* MODAL ================ */}
    </Container>
  );
};

export default Seat;

const Container = styled(Style.ContainerContent)`
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
