import React, { useEffect, useState } from "react";
import * as Component from "../../../component";
import * as Style from "../../../component/style/content/default";
import * as Services from "../../../service";
import * as Util from "../../../util";
import * as Modal from "./modal";
import styled from "styled-components";
import { useForm } from "react-hook-form";

const header = [
  "No",
  "Nama Organizer",
  "Email",
  "Kota",
  "Status Aktif",
  "Status Verifikasi",
  "Aksi",
];

const data_more = [
  { name: "Lihat Detail" },
  { name: "Ubah" },
  { name: "Upload Dokumen" },
];

const Organizer = () => {
  Util.useTitle("Event | Organizer");
  const { getValues, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    data: [],
    page: 1,
    lastPage: 1,
  });
  const [modal, setModal] = useState({
    create: false,
    detail: false,
    uploadDokumen: false,
  });
  const [dataDetail, setDataDetail] = useState({});
  const api = Services.api.ApiEvent.Organizer;

  const getList = async () => {
    setLoading(true);
    await api.getOrganizer(data?.page).then((res) => {
      if (res?.success) {
        console.log("data", res);
        setData((state) => ({
          ...state,
          data: res?.data,
          page: res?.page,
          lastPage: res?.last_page,
        }));
      } else {
        Component.AlertError({ title: "Error", text: res.error });
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    if (modal.create === false || modal.uploadDokumen === false) {
      setDataDetail({});
    }
  }, [modal.create]);

  const btnMore = async (name, id) => {
    console.log({ data: data.data });
    const findData = data?.data?.find((find) => find.organizer_id === id);

    switch (name) {
      case "Upload Dokumen":
        await Promise.all([
          setDataDetail((state) => ({
            ...state,
            organizer_id: id,
            organizer_npwp: findData?.organizer_npwp,
            uploaded_datetime: findData?.organizer_uploaded_datetime,
          })),
          api.getNpwpFile(id).then((res) => {
            if (res) {
              setDataDetail((state) => ({
                ...state,
                npwp_file_blob: URL.createObjectURL(res),
              }));
            }
          }),
          setModal((state) => ({ ...state, uploadDokumen: true })),
        ]);
        break;
      case "Ubah":
        await Promise.all([
          api.getDetailOrganizer(id).then(async (res) => {
            if (res?.success) {
              await setDataDetail((state) => ({
                ...state,
                detail: res?.data,
              }));
              await setModal((state) => ({ ...state, create: true }));
            }
          }),
          api.getLogoBlob(id).then((res) => {
            if (res) {
              setDataDetail((state) => ({
                ...state,
                imageUrl: URL.createObjectURL(res),
              }));
            }
          }),
        ]);
        break;
      case "Lihat Detail":
        await Promise.all([
          api.getDetailOrganizer(id).then((res) => {
            if (res.success) {
              setDataDetail((state) => ({
                ...state,
                detail: res.data,
                arr_detail: [
                  {
                    name: "Nama Organizer",
                    value: res?.data?.organizer_name,
                  },
                  {
                    name: "Email",
                    value: res?.data?.organizer_email,
                  },
                  {
                    name: "Alamat",
                    value: res?.data?.organizer_address,
                  },
                  {
                    name: "Kode Pos",
                    value: res?.data?.organizer_zip,
                  },
                  {
                    name: "Telepon (1)",
                    value: res?.data?.organizer_phone1
                      ? res?.data?.organizer_phone1
                      : "-",
                  },
                  {
                    name: "Telepon (2)",
                    value: res?.data?.organizer_phone2
                      ? res?.data?.organizer_phone2
                      : "-",
                  },
                  {
                    name: "Website",
                    value: (
                      <a href={res?.data?.organizer_website} target="__blank">
                        {res?.data?.organizer_website
                          ? res?.data?.organizer_website
                          : "-"}
                      </a>
                    ),
                  },
                  {
                    name: "Whatsapp (1)",
                    value: res?.data?.organizer_whatsapp1
                      ? res?.data?.organizer_whatsapp1
                      : "-",
                  },
                  {
                    name: "Whatsapp (2)",
                    value: res?.data?.organizer_whatsapp2
                      ? res?.data?.organizer_whatsapp2
                      : "-",
                  },
                  {
                    name: "Twitter",
                    value: res?.data?.oragnizer_twitter_link ? (
                      <a
                        href={res?.data?.oragnizer_twitter_link}
                        target="__blank"
                      >
                        {res?.data?.oragnizer_twitter_link
                          ? res?.data?.oragnizer_twitter_link
                          : "-"}
                      </a>
                    ) : res?.data?.organizer_twitter_name ? (
                      res?.data?.organizer_twitter_name
                    ) : (
                      "-"
                    ),
                  },
                  {
                    name: "Facebook",
                    value: res?.data?.organizer_facebook_link ? (
                      <a
                        href={res?.data?.organizer_facebook_link}
                        target="__blank"
                      >
                        {res?.data?.organizer_facebook_link
                          ? res?.data?.organizer_facebook_link
                          : "-"}
                      </a>
                    ) : res?.data?.organizer_facebook_name ? (
                      res?.data?.organizer_facebook_name
                    ) : (
                      "-"
                    ),
                  },
                  {
                    name: "Instagram",
                    value: res?.data?.organizer_instagram_link ? (
                      <a
                        href={res?.data?.organizer_instagram_link}
                        target="__blank"
                      >
                        {res?.data?.organizer_instagram_link
                          ? res?.data?.organizer_instagram_link
                          : "-"}
                      </a>
                    ) : res?.data?.organizer_instagram_name ? (
                      res?.data?.organizer_instagram_name
                    ) : (
                      "-"
                    ),
                  },
                  {
                    name: "Youtube",
                    value: res?.data?.organizer_youtube_link ? (
                      <a
                        href={res?.data?.organizer_youtube_link}
                        target="__blank"
                      >
                        {res?.data?.organizer_youtube_link
                          ? res?.data?.organizer_youtube_link
                          : "-"}
                      </a>
                    ) : res?.data?.organizer_youtube_link ? (
                      res?.data?.organizer_youtube_link
                    ) : (
                      "-"
                    ),
                  },
                  {
                    name: "Status",
                    value: (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: Util.displayStatus(
                            res?.data?.organizer_active_status_name
                          ),
                        }}
                      />
                    ),
                  },
                  {
                    name: "Tanggal Dibuat",
                    value: Util.Moment(res?.data?.organizer_created_datetime),
                  },
                  {
                    name: "Dibuat Oleh",
                    value: res?.data?.organizer_created_by
                      ? res?.data?.organizer_created_by?.name
                      : "",
                  },
                  {
                    name: "Tanggal Diubah",
                    value:
                      res?.data?.organizer_updated_datetime &&
                      Util.Moment(res?.data?.organizer_updated_datetime),
                  },
                  {
                    name: "Diubah Oleh",
                    value: res?.data?.organizer_updated_by
                      ? res?.data?.organizer_updated_by?.name
                      : "",
                  },
                  {
                    name: "Pemilik Perusahaan",
                    value: res?.data?.company
                      ? res?.data?.company?.company_name
                      : "-",
                  },
                ],
              }));
            }
          }),
          api.getLogoBlob(id).then((res) => {
            if (res) {
              setDataDetail((state) => ({
                ...state,
                imageUrl: URL.createObjectURL(res),
              }));
            }
          }),
          setModal((state) => ({ ...state, detail: true })),
        ]);

        break;

      default:
        break;
    }
  };

  return (
    <Container>
      <Style.HeaderPrimary color={Style.COLOR_PRIMARY}>
        Daftar Organizer
      </Style.HeaderPrimary>

      <section className="form-table-data">
        <Component.Form>
          <div className="wrap-button mb-3">
            <Style.ButtonPrimary
              onClick={() => setModal((state) => ({ ...state, create: true }))}
            >
              Create Organizer
            </Style.ButtonPrimary>
          </div>

          <div className="wrap-table-data">
            <Component.TableData header={header}>
              {loading ? (
                <Component.Loadingfunc />
              ) : data.data?.length > 0 ? (
                data.data?.map((item: any, idx: number) => (
                  <tr
                    key={idx}
                    // style={{ cursor: "pointer" }}
                    // onClick={() => btnMore("Lihat Detail", item.organizer_id)}
                  >
                    <td data-label={"No"}>
                      {Util.Numeric({ idx, page: data.page })}
                    </td>
                    <td data-label={"Nama Organizer"}>{item.organizer_name}</td>
                    <td data-label={"Email"}>{item.organizer_email}</td>
                    <td data-label={"Kota"}>
                      {item.ms_city_id ? item.ms_city?.ms_city_name : "-"}
                    </td>
                    <td data-label={"Status Aktif"}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: Util.displayStatus(
                            item.organizer_active_status_name
                          ),
                        }}
                      />
                    </td>
                    <td data-label={"Status Verifikasi"}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: Util.displayStatus(
                            item.organizer_verified_status_name
                          ),
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
                        data_more={data_more}
                        id={item.organizer_id}
                        onClick={({ name, id }) => btnMore(name, id)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                "Data Tidak Ditemukan"
              )}
            </Component.TableData>
          </div>

          <div>
            <Component.Pagination page={data.page} totalPage={data.lastPage} />
          </div>
        </Component.Form>
      </section>

      {/* MODAL============== */}
      <Modal.ModalOrganizerCreate
        show={modal.create}
        onHide={() => setModal((state) => ({ ...state, create: false }))}
        data_props={{
          getList,
          dataDetail,
        }}
      />
      <Modal.ModalOrganizerDetail
        show={modal.detail}
        onHide={() => setModal((state) => ({ ...state, detail: false }))}
        data_props={{
          dataDetail,
        }}
      />
      <Modal.ModalUpladDocument
        show={modal.uploadDokumen}
        onHide={() => setModal((state) => ({ ...state, uploadDokumen: false }))}
        data_props={{
          organizer_id: dataDetail?.organizer_id,
          organizer_npwp: dataDetail?.organizer_npwp,
          uploaded_datetime: dataDetail?.uploaded_datetime,
          npwp_file_blob: dataDetail?.npwp_file_blob,
          getList,
        }}
      />
    </Container>
  );
};

export default Organizer;

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
