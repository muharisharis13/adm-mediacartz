import { MoreCircle } from "@styled-icons/fluentui-system-regular";
import React, { useState, useEffect, useContext } from "react";
import {
  AlertError,
  Form,
  Pagination,
  DropDown_More,
} from "../../../component";
import {
  ButtonPrimary,
  COLOR_PRIMARY,
  ContainerContent,
  ContainerMore,
  HeaderPrimary,
  ListMore,
  MARGIN_THRIRD,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "../../../component/style/content/default";
import { TableData } from "../../../component/table/mobile_v";
import { ContainerTable_Mobile } from "./style";
import { api, Context } from "../../../service";
import { Numeric, displayStatus, useTitle } from "../../../util";
import { Verified } from "@styled-icons/material-sharp";
import { TimesCircle } from "@styled-icons/fa-regular";
import * as Modal from "./modal";

const header = [
  "No",
  "Nama User",
  "Email",
  "KTP",
  "NPWP",
  "Terhubung ke",
  "Status Aktif",
  "Verifikasi",
  "More",
];

const body = ["muharis", "m"];

const data_more = [
  { name: "Lihat Detail" },
  { name: "Hubungkan Perusahaan" },
  { name: "Putuskan dari perusahaan" },
  { name: "Upload Dokumen" },
];

export const IdxAccount = () => {
  useTitle("Akun");
  const [isOpenMore, setIsOpenMore] = useState({
    id: null,
    status: false,
  });
  const [data, setData] = useState({
    data: [],
    last_page: 1,
    page: 1,
  });
  const [modal, setModal] = useState({
    create: false,
  });

  const [parsing, setParsing] = useState({});
  const { data_user } = useContext(Context);

  useEffect(() => {
    getData();
  }, []);

  return (
    <ContainerContent>
      {/* MODAL ======= */}

      <Modal.Modal_create
        show={modal.create}
        onHide={() => setModal((state) => ({ ...state, create: false }))}
        getData={getData}
      />

      <Modal.Modal_details
        show={modal.detail}
        onHide={() => setModal((state) => ({ ...state, detail: false }))}
        props={parsing}
      />

      <Modal.Modal_hubungkan
        show={modal.hubungkan}
        onHide={() => setModal((state) => ({ ...state, hubungkan: false }))}
        props={parsing}
        getData={getData}
      />

      <Modal.Modal_putuskan
        show={modal.putuskan}
        onHide={() => setModal((state) => ({ ...state, putuskan: false }))}
        props={parsing}
        getData={getData}
      />

      <Modal.Modal_upload_dokumen
        show={modal.upload}
        onHide={() => setModal((state) => ({ ...state, upload: false }))}
        props={parsing}
        getData={getData}
      />
      {/* MODAL ======= */}

      <HeaderPrimary color={COLOR_PRIMARY}>Daftar Akun</HeaderPrimary>

      {/* ======CONTENT====== */}
      <section>
        <Form>
          <section style={{ display: "flex", marginBottom: MARGIN_THRIRD }}>
            <ButtonPrimary
              onClick={() => setModal((state) => ({ ...state, create: true }))}
            >
              Create Account
            </ButtonPrimary>
          </section>

          <section>
            <TableData header={header}>
              {data.data.map((item, idx) => (
                <Tr
                  key={idx}
                  // style={{ cursor: "pointer" }}
                  // onClick={() =>
                  //   Dropdown("Lihat Detail", item.id, data.data?.[idx])
                  // }
                >
                  <Td data-label="No">
                    {Numeric({ idx: idx, page: data.page })}
                  </Td>
                  <Td data-label="Nama User">{item.name}</Td>
                  <Td data-label="Email">{item.email}</Td>
                  <Td data-label="KTP">{item.ktp_file ? "✔" : "✘"}</Td>
                  <Td data-label="NPWP">{item.npwp_file ? "✔" : "✘"}</Td>
                  <Td data-label="Terhubung Ke">
                    {`${item.link?.length} Perusahaan`}
                  </Td>
                  <Td data-label="Status Aktif">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: displayStatus(item.active_user_status_name),
                      }}
                    />
                  </Td>
                  <Td data-label="Verifikasi">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: displayStatus(item.verified_status_name),
                      }}
                    />
                  </Td>
                  <Td data-label="More">
                    <DropDown_More
                      title={
                        <button
                          class="button is-primary is-small"
                          aria-haspopup="true"
                          aria-controls="dropdown-menu"
                        >
                          <span class="icon is-small">•••</span>
                        </button>
                      }
                      id={item.id}
                      data_more={data_more
                        .filter((filter) =>
                          item.link?.length > 0
                            ? filter
                            : filter.name !== "Putuskan dari perusahaan"
                        )
                        .filter((filter) =>
                          data_user.id === item.id
                            ? filter
                            : filter.name !== "Upload Dokumen"
                        )}
                      onClick={({ name, id }) =>
                        Dropdown(name, id, data.data?.[idx])
                      }
                    />
                  </Td>
                </Tr>
              ))}
            </TableData>
          </section>

          <section>
            <Pagination
              totalPage={data.last_page}
              page={data.page}
              handleOnChange={handlePagination}
            />
          </section>
        </Form>
      </section>
    </ContainerContent>
  );

  function Dropdown(name, id, user_detail) {
    setParsing((state) => ({ ...state, id: id, user_detail }));
    switch (name) {
      case "Lihat Detail":
        setModal((state) => ({ ...state, detail: true }));
        break;
      case "Hubungkan Perusahaan":
        setModal((state) => ({ ...state, hubungkan: true }));
        break;
      case "Putuskan dari perusahaan":
        setModal((state) => ({ ...state, putuskan: true }));
        break;
      case "Upload Dokumen":
        setModal((state) => ({ ...state, upload: true }));
        break;

      default:
        break;
    }
  }

  function getData() {
    api.api_account.get_user({}).then(async (res) => {
      console.log({ get_user: res });
      if (res?.success) {
        setData((state) => ({
          ...state,
          data: res.data,
          last_page: res.last_page,
          page: res.page,
        }));
      } else {
        await AlertError({ title: "ERROR", text: "Terjadi Kesalahan" });
        await window.location.reload();
      }
    });
  }

  function handlePagination(e) {
    api.api_account.get_user({ page: e.selected + 1 }).then((res) => {
      console.log(res);
      if (res?.success) {
        setData((state) => ({
          ...state,
          data: res.data,
          last_page: res.last_page,
          page: res.page,
        }));
      }
    });
  }
};
