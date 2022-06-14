import React, { useEffect, useState } from "react";
import * as Component from "../../../component";
import * as Style from "../../../component/style/content/default";
import * as Services from "../../../service";
import * as Util from "../../../util";
import * as Modal from "./modal";
import styled from "styled-components";

const header = [
  "No",
  "Nama Microsite",
  "Total Diklik",
  "Total Diisi",
  "Status Persetujuan",
  "Aksi",
];

const DataMore = [
  {
    name: "Lihat Detail",
  },
  {
    name: "Ubah",
  },
  {
    name: "Lihat Feedback",
  },
];

const api = Services.api.ApiEvent.Microsite;

export default function Microsite() {
  const [data, setData] = useState({
    data: [],
    page: 1,
    lastPage: 1,
  });
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({
    create: false,
  });

  const getList = async (page) => {
    try {
      setLoading(true);
      await api.getMicrositeList(page).then((res) => {
        if (res?.success) {
          setData((state) => ({
            ...state,
            data: res?.data,
            page: res?.page,
            lastPage: res?.last_page,
          }));
        }
      });
    } catch (err) {
      Component.AlertError({ title: "Error", text: err });
    } finally {
      setLoading(false);
    }
  };

  useEffect(async () => {
    await getList(data?.page);
  }, []);

  const BtnPagination = (e) => {
    getList(e);
  };

  return (
    <Container>
      {/* MODAL ================ */}
      <Modal.ModalMicrositeCreate
        show={modal.create}
        onHide={() => setModal((state) => ({ ...state, create: false }))}
        dataProps={getList}
      />
      {/* MODAL ================ */}

      <div className="wrap-title">
        <Style.HeaderPrimary color={Style.COLOR_PRIMARY}>
          Daftar Microsite
        </Style.HeaderPrimary>
      </div>

      <div className="wrap-content">
        <div className="form">
          <div className="wrap-button">
            <Style.ButtonPrimary
              color={Style.COLOR_SECONDARY}
              onClick={() => setModal((state) => ({ ...state, create: true }))}
            >
              Create Microsite
            </Style.ButtonPrimary>
          </div>
          <div className="mt-2">
            <Component.TableData header={header}>
              {loading ? (
                <Component.Loadingfunc />
              ) : data?.data.length > 0 ? (
                data?.data?.map((item: any, idx: number) => (
                  <tr key={idx}>
                    <td data-label="No">
                      {Util.Numeric({ idx, page: data?.page })}
                    </td>
                    <td data-label="Nama Microsite">{item.microsite_name}</td>
                    <td data-label="Total Diklik">
                      {Util.FormatCurrency.input(item.microsite_total_clicked)}
                    </td>
                    <td data-label="Total Diisi">
                      {Util.FormatCurrency.input(
                        item.microsite_total_submitted
                      )}
                    </td>
                    <td data-label="Status Persetujuan">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: Util.displayStatus(
                            item.microsite_approve_status_name
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
                        onClick={() => console.log("muharis")}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                "Data Tidak Ditemukan"
              )}
            </Component.TableData>
          </div>
          <div className="mt-2">
            <Component.Pagination
              page={data?.page}
              totalPage={data?.lastPage}
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
