import React, { useState, useEffect } from "react";
import {
  Form,
  AlertQuestion,
  AlertSuccess,
  TableData,
  AlertError,
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
  COLOR_DANGER,
} from "../../../../component/style/content/default";
import { api_sender_id } from "../../../../service/api";
import {
  Modal_detail,
  Modal_edit_sender,
  Modal_tambah_sender,
  Modal_upload_dokumen,
} from "./modal";
import { Pagination, DropDown_More } from "../../../../component";
import { Numeric, displayStatus, useTitle } from "../../../../util";

const header = [
  "No",
  "Tipe",
  "Sender ID",
  "Surat Penunjukkan",
  "Form Pengumpulan Data",
  "Perusahaan",
  "Status Persetujuan",
  "More",
];

const data_more = [
  { name: "Lihat Detail" },
  { name: "Ubah" },
  { name: "Upload Dokumen" },
  { name: "Kirim Ulang Verifikasi" },
];

export const IdxSenderId = () => {
  useTitle("Beriklan | Sender ID");
  const [modal, setModal] = useState({
    tambah: false,
    detail: false,
    ubah: false,
    upload_dokumen: false,
  });
  const [data, setData] = useState([]);
  const [page, setPage] = useState({
    page: 1,
    last_page: 1,
  });
  const [sender_id, setSender_id] = useState(null);

  const getData = async () => {
    await api_sender_id.get_sender({ page: 1 }).then(async (res) => {
      console.log({ get_sender_company: res });
      if (res?.success) {
        setData(res.data);
        setPage({ ...page, page: res.page, last_page: res.last_page });
      } else {
        await AlertError({ title: "ERROR", text: "Terjadi kesalahan" });
        await window.location.reload();
      }
    });
  };

  const BtnPagination = async (e) => {
    await api_sender_id.get_sender({ page: e.selected + 1 }).then((res) => {
      console.log({ get_sender_company: res });
      if (res?.success) {
        setData(res.data);
        setPage({ ...page, page: res.page, last_page: res.last_page });
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const btnMore = ({ name, idx, sender_id }) => {
    console.log({ name, idx, sender_id });

    setSender_id(sender_id);

    switch (name) {
      case "Kirim Ulang Verifikasi":
        AlertQuestion({ text: "Resend Verification Email ?" }).then(
          async (result) => {
            console.log({ result });
            if (result.isConfirmed) {
              await api_sender_id
                .put_resend_verfikasi({ sender_id })
                .then(async (res) => {
                  console.log({ put_resend_verfikasi: res });
                  await AlertSuccess({ title: "SUCCESS", text: res.success });
                  await getData();
                });
            }
          }
        );
        break;

      case "Lihat Detail":
        setModal({ ...modal, detail: true });
        break;
      case "Ubah":
        setModal({ ...modal, ubah: true });
        break;
      case "Upload Dokumen":
        setModal({ ...modal, upload_dokumen: true });
        break;
    }
  };

  return (
    <ContainerContent>
      <HeaderPrimary color={COLOR_PRIMARY}>Daftar Sender ID</HeaderPrimary>

      {/* MODAL ==================== */}

      <Modal_tambah_sender
        show={modal.tambah}
        onHide={() => setModal({ ...modal, tambah: false })}
        getData1={getData}
      />

      <Modal_detail
        show={modal.detail}
        onHide={() => setModal({ ...modal, detail: false })}
        sender_id={sender_id}
      />

      <Modal_edit_sender
        getData1={getData}
        show={modal.ubah}
        onHide={() => setModal({ ...modal, ubah: false })}
        sender_id={sender_id}
      />

      <Modal_upload_dokumen
        show={modal.upload_dokumen}
        onHide={() => setModal({ ...modal, upload_dokumen: false })}
        sender_id={sender_id}
        getData1={getData}
      />
      {/* MODAL ==================== */}

      <section>
        <Form>
          <section className="d-flex mb-3">
            <ButtonPrimary onClick={() => setModal({ ...modal, tambah: true })}>
              Create Sender ID
            </ButtonPrimary>
          </section>

          <section className="mb-3 mb-md-3">
            <TableData header={header}>
              {data.map((item, idx) => (
                <Tr
                  key={idx}
                  // style={{ cursor: "pointer" }}
                  // onClick={() =>
                  //   btnMore({
                  //     name: "Lihat Detail",
                  //     sender_id: item.sender_id,
                  //     idx: idx,
                  //   })
                  // }
                >
                  <Td data-label="No">
                    {Numeric({ page: page.page, idx: idx })}
                  </Td>
                  <Td data-label="Tipe">
                    {item.ms_inventory &&
                      item.ms_inventory.ms_inventory_identifier}{" "}
                    {item.ms_channel && item.ms_channel.ms_channel_name}
                  </Td>
                  <Td data-label="Sender ID">{item.sender_name}</Td>
                  <Td data-label="Surat Penunjukkan">
                    {(item.ms_inventory.ms_inventory_identifier === "SMS" ||
                      item.ms_inventory.ms_inventory_identifier === "MMS") &&
                    item.sender_approve_status_name !== "approved"
                      ? item.sender_data_form_file
                        ? "✔"
                        : "menunggu"
                      : "N/A"}
                  </Td>
                  <Td data-label="Form Pengumpulan Data">
                    {(item.ms_inventory?.ms_inventory_identifier === "SMS" ||
                      item.ms_inventory?.ms_inventory_identifier === "MMS") &&
                    item.sender_approve_status_name !== "approved"
                      ? item.sender_data_form_file
                        ? "✔"
                        : "menunggu"
                      : "N/A"}
                  </Td>
                  <Td data-label="Perusahaan">
                    {item.company && item.company?.company_name}
                  </Td>
                  <Td data-label="Status Persetujuan">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: displayStatus(item.sender_approve_status_name),
                      }}
                    />
                  </Td>
                  <Td data-label="More">
                    {item.demo_sender_status === false ? (
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
                        id={item.sender_id}
                        data_more={data_more.filter((fil) =>
                          item.sender_approve_status_name === "pending" &&
                          item.ms_inventory_id == 1
                            ? fil.name !== "Upload Dokumen"
                            : item.ms_inventory.ms_inventory_identifier !==
                                "EMAIL" &&
                              item.ms_channel.ms_channel_name === "BROADCAST"
                            ? fil.name !== "Kirim Ulang Verifikasi"
                            : fil.name !== "Kirim Ulang Verifikasi" &&
                              fil.name !== "Upload Dokumen"
                        )}
                        onClick={({ name, id }) =>
                          btnMore({ name: name, sender_id: id, idx: idx })
                        }
                      />
                    ) : (
                      "Demo Access"
                    )}
                  </Td>
                </Tr>
              ))}
            </TableData>
          </section>

          <section>
            <Pagination
              totalPage={page.last_page}
              page={page.page}
              handleOnChange={BtnPagination}
            />
          </section>
        </Form>
      </section>
    </ContainerContent>
  );
};
