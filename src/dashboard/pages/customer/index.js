import React, { useState, useEffect, useContext } from "react";
import {
  Form,
  TableData,
  DropDown_More,
  Pagination,
  Loadingfunc,
  AlertQuestion,
  AlertSuccess,
  AlertError,
} from "component";
import {
  ButtonPrimary,
  COLOR_PRIMARY,
  ContainerContent,
  HeaderPrimary,
  MARGIN_THRIRD,
  ButtonDanger,
} from "component/style/content/default";
import Select from "react-select";
import { ContainerButton } from "./style";
import { ApiCustomer } from "../../../service/api";
import { Context, decrypt } from "../../../service";
import { Numeric } from "../../../util";
import * as Modal from "./modal";
import Cookies from "js-cookie";

const data_more = [
  { name: "Lihat Detail" },
  { name: "Ubah" },
  { name: "Hapus" },
];

const api = ApiCustomer;

const optionsFilter = [
  { value: "msisdn", label: "MSISDN" },
  { value: "name", label: "Nama" },
  { value: "email", label: "Email" },
];
export const IdxCustomer = () => {
  const { data_user } = useContext(Context);
  const companyCookie = decrypt(Cookies.get("company"))?.company_id;
  const [data, setData] = useState({
    data: [],
    page: 1,
    last_page: 1,
  });
  const [loading, setLoading] = useState(false);
  const [selectCustomer, setSelectCustomer] = useState([]);
  const [modal, setModal] = useState({
    detail: false,
    create: false,
    edit: false,
    uploadCsv: false,
    downloadCsv: false,
    konversi: false,
  });
  const [params, setParams] = useState({
    id: null,
  });
  const [bool, setBool] = useState({
    duplikat: false,
  });

  const [selectedFilter, setSelectedFilter] = useState(null);

  const header = [
    <input
      className="checkbox"
      type="checkbox"
      onChange={(e) => onChangeCheckAll(e)}
    />,
    "No.",
    "Nama Customer",
    "MSISDN",
    "Email",
    "Jenis Kelamin",
    "Agama",
    "Pekerjaan",
    "Kota",
    "Perusahaan",
    "Aksi",
  ];
  const getData = async () => {
    setLoading(true);
    await api.getListCustomer(data?.page).then((res) => {
      setLoading(false);
      if (res?.success) {
        setData((state) => ({
          ...state,
          data: res?.data,
          page: res?.page,
          last_page: res?.last_page,
        }));
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const btnPagination = async (e) => {
    setLoading(true);
    await api.getListCustomer(e.selected + 1).then((res) => {
      setLoading(false);
      if (res?.success) {
        setData((state) => ({
          ...state,
          data: res?.data,
          page: res?.page,
          last_page: res?.last_page,
        }));
      }
    });
  };

  const onChangeCheck = (id, e) => {
    const checked = e.target.checked;

    if (checked) {
      setSelectCustomer((state) => [...state, id]);
    } else {
      setSelectCustomer(selectCustomer.filter((filter) => filter !== id));
    }
  };

  const onChangeCheckAll = (e) => {
    const checked = e.target.checked;

    if (checked) {
      setSelectCustomer([...data?.data?.map((item) => item.id)]);
    } else {
      setSelectCustomer([]);
    }
  };

  const btnMore = (propsMore) => {
    const { id, name, item } = propsMore;
    setParams((state) => ({ ...state, id: id }));
    switch (name) {
      case "Lihat Detail":
        return setModal((state) => ({ ...state, detail: true }));
      case "Create":
        return setModal((state) => ({ ...state, create: true }));
      case "Ubah":
        return setModal((state) => ({ ...state, edit: true }));
      case "Upload Csv":
        return setModal((state) => ({ ...state, uploadCsv: true }));
      case "Download CSV":
        return setModal((state) => ({ ...state, downloadCsv: true }));
      case "Konversi":
        return setModal((state) => ({ ...state, konversi: true }));
      case "Hapus":
        return BtnDeleteCustomer(item);

      default:
        break;
    }
  };

  const BtnDeleteCustomer = async (item) => {
    // item = { ...item, user_id: data_user?.id };

    // console.log(item);
    await AlertQuestion({
      title: "Questions!",
      text: `Do you want to delete ${item.name}?`,
    }).then(async (response) => {
      if (response.isConfirmed) {
        await api.deleteCustomer(item.id).then((res) => {
          if (res?.success) {
            AlertSuccess({ title: "SUCCESS", text: res?.success });
            getData();
          } else {
            AlertError({ title: "ERROR", text: res?.error });
          }
          console.log(res);
        });
      }
    });
  };

  const btnCariDuplikat = () => {
    setBool((state) => ({
      ...state,
      duplikat: !bool.duplikat,
    }));
  };

  const onChangeSelectFilter = async (e) => {
    setSelectedFilter(e);
    api.getDuplikat(e?.value).then((res) => {
      console.log(res);
    });
  };

  const btnDeleteMultiple = () => {
    console.log(data_user);
    if (selectCustomer?.length > 0) {
      const body = {
        user_id: data_user?.id,
        company_id: companyCookie,
        customer_id: selectCustomer,
      };

      AlertQuestion({
        title: "QUESTION",
        text: "Do you want to delete all selected customers?",
      }).then((result) => {
        if (result?.isConfirmed) {
          api.deleteMultipleCustomer(body).then(async (res) => {
            if (res?.success) {
              await Promise.all([
                AlertSuccess({ title: "SUCCESS", text: res?.success }),
                getData(),
              ]);
            }
          });
        }
      });
    }
  };

  return (
    <ContainerContent>
      <section>
        <HeaderPrimary color={COLOR_PRIMARY}>Daftar Customer</HeaderPrimary>
      </section>

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
            <ContainerButton className="col-lg-12 col-md-12 col-sm-12 d-flex">
              <ButtonPrimary
                margin="margin:2px 5px"
                onClick={() => btnMore({ id: null, name: "Create" })}
              >
                Buat Customer
              </ButtonPrimary>
              <ButtonPrimary
                margin="margin:2px 5px"
                onClick={() => btnMore({ id: null, name: "Upload Csv" })}
              >
                upload file CSV
              </ButtonPrimary>
              <ButtonPrimary
                margin="margin:2px 5px"
                onClick={() => btnMore({ id: null, name: "Download CSV" })}
              >
                Download file CSV
              </ButtonPrimary>
              <ButtonPrimary margin="margin:2px 5px" onClick={btnCariDuplikat}>
                Cari Duplikat
              </ButtonPrimary>
              <ButtonPrimary
                margin="margin:2px 5px"
                onClick={() => btnMore({ id: null, name: "Konversi" })}
              >
                Konversi
              </ButtonPrimary>
            </ContainerButton>
          </section>
          <section className="row align-items-end justify-content-between mb-3">
            {selectCustomer?.length > 0 && (
              <div className="col-lg-3 col-md-6 col-sm-12">
                <ButtonDanger onClick={btnDeleteMultiple}>
                  Hapus Customer Terpilih
                </ButtonDanger>
              </div>
            )}
            {bool?.duplikat && (
              <div className="col-lg-3 col-md-6 col-sm-12">
                <Select
                  options={optionsFilter}
                  placeholder="Filter"
                  value={selectedFilter}
                  onChange={onChangeSelectFilter}
                />
              </div>
            )}
          </section>

          <section className="d-flex">
            <TableData header={header}>
              {loading ? (
                <Loadingfunc />
              ) : (
                data?.data?.map((item, idx) => (
                  <tr key={idx}>
                    <td data-label="">
                      <input
                        className="checkbox"
                        type="checkbox"
                        checked={
                          selectCustomer?.find((find) => find === item.id)
                            ? true
                            : false
                        }
                        onChange={(e) => onChangeCheck(item.id, e)}
                      />
                    </td>
                    <td data-label="No.">
                      {Numeric({ idx, page: data?.page })}
                    </td>
                    <td data-label="Nama Customer">{item.name}</td>
                    <td data-label="MSISDN">{item.msisdn || "-"}</td>
                    <td data-label="Email">{item.email || "-"}</td>
                    <td data-label="Jenis Kelamin">{item.gender || "-"}</td>
                    <td data-label="Agama">{item.religion || "-"}</td>
                    <td data-label="Pekerjaan">{item.job || "-"}</td>
                    <td data-label="Kota">{item.city || "-"}</td>
                    <td data-label="Perusahaan">
                      {item.company?.company_name || "-"}
                    </td>
                    <td data-label="Aksi">
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
                        data_more={data_more}
                        id={item.id}
                        onClick={({ id, name }) => btnMore({ id, name, item })}
                      />
                    </td>
                  </tr>
                ))
              )}
            </TableData>
          </section>

          <section>
            <Pagination
              totalPage={data?.last_page}
              page={data?.page}
              handleOnChange={btnPagination}
            />
          </section>
        </Form>
      </section>

      {/* MODAL =======  */}
      <Modal.Edit
        show={modal.edit}
        onHide={() => setModal((state) => ({ ...state, edit: false }))}
        params={params}
        getData={getData}
      />

      <Modal.Detail
        show={modal.detail}
        onHide={() => setModal((state) => ({ ...state, detail: false }))}
        params={params}
      />

      <Modal.Create
        show={modal.create}
        onHide={() => setModal((state) => ({ ...state, create: false }))}
        getData={getData}
      />

      <Modal.UploadCsv
        show={modal.uploadCsv}
        onHide={() => setModal((state) => ({ ...state, uploadCsv: false }))}
      />

      <Modal.DownloadCsv
        show={modal.downloadCsv}
        onHide={() => setModal((state) => ({ ...state, downloadCsv: false }))}
      />

      <Modal.Konversi
        show={modal.konversi}
        onHide={() => setModal((state) => ({ ...state, konversi: false }))}
      />
    </ContainerContent>
  );
};
