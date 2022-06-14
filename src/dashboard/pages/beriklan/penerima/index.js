import { Verified } from "@styled-icons/material-sharp";
import { Unverified } from "@styled-icons/octicons";
import React, { useState, useEffect } from "react";
import {
  Form,
  Pagination,
  AlertQuestion,
  AlertSuccess,
  TableData,
} from "../../../../component";
import {
  ButtonPrimary,
  COLOR_PRIMARY,
  ContainerContent,
  HeaderPrimary,
  Table,
  Th,
  Thead,
  TagStatus,
  Tbody,
  Tr,
  Td,
} from "../../../../component/style/content/default";
import {
  Dropdown,
  DropdownContent,
  TextDropdownContent,
  TitleDropdonw,
} from "../style";
import { CaretDownFill } from "@styled-icons/bootstrap";
import { api_penerima } from "../../../../service/api";
import { Loadingfunc, DropDown_More } from "../../../../component";
import {
  Numeric,
  FormatCurrency,
  displayStatus,
  useTitle,
} from "../../../../util";
import {
  Modal_detail,
  Modal_tipe_broadcast,
  Modal_tipe_broadcast_edit,
  Modal_tipe_target,
} from "./modal";

const header = [
  "No",
  "Label Penerima",
  "Tipe Channel",
  "Tipe Inventory",
  "Perusahaan",
  "Total Penerima",
  "Verifikasi",
  "Status Aktif",
  "More",
];

const data_more = [
  { name: "Lihat Detail" },
  { name: "Ubah" },
  { name: "Nonaktifkan" },
  { name: "Aktifkan" },
  { name: "Download File" },
];

export const IdxPenerima = () => {
  useTitle("Beriklan | Penerima");
  const [isOpenMore, setIsOpenMore] = useState({ status: false, idx: "" });

  const [data, setData] = useState([]);
  const [page, setPage] = useState({
    page: 1,
    last_page: null,
  });
  const [loading, setLoading] = useState(false);

  const [modal, setModal] = useState({
    tipe_broadcast: false,
    tipe_broadcast_edit: false,
    tipe_target: false,
    detail: false,
  });

  const [recipient_id, setRecipient_id] = useState(null);
  const [type_inventory, setTypeInventory] = useState("");

  const getData = async () => {
    setLoading(true);
    await api_penerima.get_penerima({ page: page.page }).then((res) => {
      console.log({ get_penerima: res });
      if (res?.success) {
        setData(res.data);
        setPage({
          page: res.page,
          last_page: res.last_page,
        });
      }
      setLoading(false);
    });
  };

  const btnPagination = async (e) => {
    console.log(e);
    setLoading(true);
    await api_penerima.get_penerima({ page: e.selected + 1 }).then((res) => {
      console.log({ get_penerima: res });
      if (res?.success) {
        setData(res.data);
        setPage({
          page: res.page,
          last_page: res.last_page,
        });
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (modal.tipe_target === false) {
      setRecipient_id(null);
    }
  }, [modal.tipe_target]);

  const btnBuatBaru = ({ name }) => {
    switch (name) {
      case "Email & SMS Tipe Broadcast":
        setModal({ ...modal, tipe_broadcast: true });
        break;
      case "SMS/MMS Tipe LBA dan Targeted":
        setModal({ ...modal, tipe_target: true });
        break;

      default:
        break;
    }
  };

  const btnMore = async ({ name, sender_id, type_inventory, idx }) => {
    setRecipient_id(sender_id);
    switch (name) {
      case "Lihat Detail":
        setModal({ ...modal, detail: true });
        break;
      case "Ubah":
        if (type_inventory === "BROADCAST") {
          setModal({ ...modal, tipe_broadcast_edit: true });
        } else {
          setModal({ ...modal, tipe_target: true });
        }
        break;
      case "Nonaktifkan":
        AlertQuestion({
          title: "Nonaktifkan",
          text: `Do you want to non-akfif ${data[idx].company.company_name} ?`,
        }).then(async (result) => {
          console.log({ result });
          if (result.isConfirmed) {
            await api_penerima
              .put_inactive({ recipient_id: sender_id })
              .then(async (res) => {
                console.log({ put_inactive: res });
                if (res?.success) {
                  await AlertSuccess({ title: "SUCCESS", text: res.success });
                  await getData();
                }
              });
          }
        });
        break;
      case "Aktifkan":
        AlertQuestion({
          title: "Aktifkan",
          text: `Do you want to akfif ${data[idx].company.company_name} ?`,
        }).then(async (result) => {
          console.log({ result });
          if (result.isConfirmed) {
            await api_penerima
              .put_active({ recipient_id: sender_id })
              .then(async (res) => {
                console.log({ put_inactive: res });
                if (res?.success) {
                  await AlertSuccess({ title: "SUCCESS", text: res.success });
                  await getData();
                }
              });
          }
        });
        break;
      case "Download File":
        await api_penerima
          .get_download_file({ recipient_id: sender_id })
          .then((res) => {
            console.log({ get_download_file: res });
            if (res.type) {
              const link = document.createElement("a");
              link.href = window.URL.createObjectURL(res);
              link.setAttribute("download", `recipient_#${sender_id}.csv`);
              document.body.appendChild(link);
              link.click();
            }
          });
        break;

      default:
        break;
    }
  };

  return (
    <ContainerContent>
      <HeaderPrimary color={COLOR_PRIMARY}>Daftar Penerima</HeaderPrimary>

      {/* MODAL====================== */}
      <Modal_tipe_broadcast
        show={modal.tipe_broadcast}
        onHide={() => setModal({ ...modal, tipe_broadcast: false })}
        getData1={getData}
        recipient_id={recipient_id}
      />

      <Modal_tipe_broadcast_edit
        show={modal.tipe_broadcast_edit}
        onHide={() => setModal({ ...modal, tipe_broadcast_edit: false })}
        getData1={getData}
        recipient_id={recipient_id}
      />

      <Modal_tipe_target
        show={modal.tipe_target}
        onHide={() => setModal({ ...modal, tipe_target: false })}
        getData1={getData}
        props={{
          recipient_id,
          data: data.find((find) => find.recipient_id === recipient_id),
        }}
      />

      <Modal_detail
        show={modal.detail}
        onHide={() => setModal({ ...modal, detail: false })}
        recipient_id={recipient_id}
      />
      {/* MODAL====================== */}

      <section>
        <Form>
          <section className="d-flex mb-3">
            <Dropdown>
              <TitleDropdonw>
                Buat Baru <CaretDownFill style={{ width: "15px" }} />{" "}
              </TitleDropdonw>
              {/* content */}
              <DropdownContent>
                <TextDropdownContent
                  onClick={() =>
                    btnBuatBaru({ name: "Email & SMS Tipe Broadcast" })
                  }
                >
                  Email & SMS Tipe Broadcast
                </TextDropdownContent>
                <TextDropdownContent
                  onClick={() =>
                    btnBuatBaru({ name: "SMS/MMS Tipe LBA dan Targeted" })
                  }
                >
                  SMS/MMS Tipe LBA dan Targeted
                </TextDropdownContent>
              </DropdownContent>
            </Dropdown>
          </section>

          <section className="mb-3 mb-md-3">
            <TableData header={header}>
              {loading ? (
                <Loadingfunc />
              ) : (
                data.map((item, idx) => (
                  <Tr
                    key={idx}
                    // style={{ cursor: "pointer" }}
                    // onClick={() =>
                    //   btnMore({
                    //     name: "Lihat Detail",
                    //     sender_id: item.recipient_id,
                    //     idx: idx,
                    //     type_inventory: item.ms_channel?.ms_channel_name,
                    //   })
                    // }
                  >
                    <Td data-label="No">{Numeric({ idx, page: page.page })}</Td>
                    <Td data-label="Label Penerima">{item.recipient_label}</Td>
                    <Td data-label="Tipe Channel">
                      {item.ms_inventory &&
                        item.ms_inventory.ms_inventory_identifier}
                    </Td>
                    <Td data-label="Tipe Inventory">
                      {item.ms_channel && item.ms_channel.ms_channel_name}
                    </Td>
                    <Td data-label="Perusahaan">
                      {item.company && item.company.company_name}
                    </Td>
                    <Td data-label="Total Penerima">
                      {FormatCurrency.input(item.recipient_total_recipient)}
                    </Td>
                    <Td data-label="Verifikasi">
                      {item.recipient_last_upload ? (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: displayStatus(
                              item.recipient_last_upload
                                ?.recipient_upload_verified_status_name
                            ),
                          }}
                        />
                      ) : (
                        "-"
                      )}
                      {/* <Unverified style={{ width: "25px", color: "#ccc" }} /> */}
                    </Td>
                    <Td data-label="Status Aktif">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: displayStatus(
                            item.recipient_active_status_name
                          ),
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
                        id={item.recipient_id}
                        data_more={data_more
                          .filter((fil) =>
                            item.recipient_active_status_name === "active"
                              ? fil.name !== "Aktifkan"
                              : item.recipient_active_status_name ===
                                  "inactive" && fil.name !== "Nonaktifkan"
                          )
                          .filter((fil2) =>
                            item.ms_channel.ms_channel_name === "LBA"
                              ? fil2.name !== "Download File"
                              : fil2
                          )}
                        onClick={({ name, id }) =>
                          btnMore({
                            name: name,
                            sender_id: id,
                            idx: idx,
                            type_inventory: item.ms_channel?.ms_channel_name,
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
