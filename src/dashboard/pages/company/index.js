import React, { useState, useEffect } from "react";
import {
  Form,
  Pagination,
  Loadingfunc,
  DropDown_More,
  TableData,
} from "../../../component";
import {
  ButtonPrimary,
  COLOR_PRIMARY,
  ContainerContent,
  HeaderPrimary,
  TagStatus,
  ContainerMore,
  ListMore,
  MARGIN_THRIRD,
} from "../../../component/style/content/default";
import { CompanyService } from "../../../service";
import {
  Modal_create,
  Modal_detail,
  Modal_cek_pricebook,
  Modal_cek_paket,
} from "./modal";
import { Modal_cek_bucket } from "./modal/modal.cek_bucket";
import { Modal_cek_saldo } from "./modal/modal.saldo";
import { Modal_tamba_perusahaan_induk } from "./modal/modal.tamba_perusahaan_induk";
import { Modal_api_key } from "./modal/modal.api_key";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { Numeric, displayStatus, useTitle } from "../../../util";

const header = [
  "No",
  "Nama Perusahaan",
  "Perusahaan Induk",
  "Kategori",
  "Status",
  "Verifikasi",
  "More",
];

const data_more = [
  { name: "Lihat Detail" },
  { name: "Ubah" },
  { name: "Cek Bucket" },
  { name: "Cek Saldo" },
  { name: "Cek Pricebook" },
  { name: "Cek Paket" },
  { name: "Tambah Perusahaan Induk" },
  { name: "Integrasi API" },
];

export const IdxCompany = () => {
  useTitle("Perusahaan");
  const [isOpenMore, setIsOpenMore] = useState({
    id: null,
    status: false,
  });
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState({
    page: 0,
    per_page: 0,
    last_page: 0,
    total: 0,
  });
  const [modal, setModal] = useState({
    create: false,
    detail: false,
    bucket: false,
    saldo: false,
    pricebook: false,
    paket: false,
    perusahaan_induk: false,
    api_key: false,
  });
  const [company_id, setCompany_id] = useState(null);
  const [company_name, setCompany_name] = useState("");
  const [type_modal, setType_modal] = useState("");
  const [company_active_status, setCompany_active_status] = useState(null);
  const [company_verified_status_name, setCompany_verified_status_name] =
    useState(null);

  const getData = async () => {
    setLoading(true);
    await CompanyService.get_company({ sort_by: "DESC", page: 1 }).then(
      async (res) => {
        console.log("res nya", res);
        if (res?.data?.success) {
          setData(res.data.data);
          setPage({
            ...page,
            page: res.data.page,
            last_page: res.data.last_page,
            per_page: res.data.per_page,
            total: res.data.total,
          });
        } else {
          // await AlertError({title:"ERROR", text:res})
          // await window.location.reload()
        }
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    getData();
  }, []);

  const btnHandleChangePage = async (e) => {
    setLoading(true);
    const get_company = await CompanyService.get_company({
      sort_by: "DESC",
      page: e.selected + 1,
    });
    if (get_company?.success) {
      setData(get_company.data);
      setPage({
        ...page,
        page: get_company.page,
        last_page: get_company.last_page,
        per_page: get_company.per_page,
        total: get_company.total,
      });
    }
    setLoading(false);
  };

  const BtnMore = ({
    name,
    company_id,
    company_name,
    company_active_status,
    company_verified_status_name,
  }) => {
    if (name === "Lihat Detail") {
      setModal({ ...modal, detail: !modal.detail });
      setCompany_id(company_id);
    } else if (name === "Ubah") {
      setModal({ ...modal, create: !modal.create });
      setCompany_id(company_id);
      setType_modal(name);
    } else if (name === "Cek Bucket") {
      setModal({ ...modal, bucket: !modal.bucket });
      setCompany_id(company_id);
      setCompany_name(company_name);
    } else if (name === "Cek Saldo") {
      setModal({ ...modal, saldo: !modal.saldo });
      setCompany_id(company_id);
      setCompany_name(company_name);
    } else if (name === "Cek Pricebook") {
      setModal({ ...modal, pricebook: !modal.pricebook });
      setCompany_id(company_id);
      setCompany_name(company_name);
    } else if (name === "Cek Paket") {
      setModal({ ...modal, paket: !modal.paket });
      setCompany_id(company_id);
    } else if (name === "Tambah Perusahaan Induk") {
      setModal({ ...modal, perusahaan_induk: !modal.perusahaan_induk });
      setCompany_id(company_id);
      setCompany_name(company_name);
      setCompany_verified_status_name(company_verified_status_name);
      setCompany_active_status(company_active_status);
    } else if (name === "Integrasi API") {
      setModal({ ...modal, api_key: !modal.api_key });
      setCompany_id(company_id);
    }
  };

  console.log({ data });

  return (
    <ContainerContent>
      {/* header */}
      <HeaderPrimary color={COLOR_PRIMARY}>Daftar Perusahaan</HeaderPrimary>
      {/* end header ==== */}

      {/* Modal======= */}
      <Modal_create
        show={modal.create}
        onHide={() => setModal({ ...modal, create: false })}
        company_id={company_id}
        type_modal={type_modal}
        getData={getData}
      />

      <Modal_detail
        show={modal.detail}
        onHide={() => setModal({ ...modal, detail: false })}
        company_id={company_id}
      />

      <Modal_cek_bucket
        show={modal.bucket}
        onHide={() => setModal({ ...modal, bucket: false })}
        company_id={company_id}
        company_name={company_name}
      />

      <Modal_cek_saldo
        show={modal.saldo}
        onHide={() => setModal({ ...modal, saldo: false })}
        company_id={company_id}
        company_name={company_name}
      />

      <Modal_cek_pricebook
        show={modal.pricebook}
        onHide={() => setModal({ ...modal, pricebook: false })}
        company_id={company_id}
        company_name={company_name}
      />

      <Modal_cek_paket
        show={modal.paket}
        onHide={() => setModal({ ...modal, paket: false })}
        company_id={company_id}
      />

      <Modal_tamba_perusahaan_induk
        show={modal.perusahaan_induk}
        onHide={() => {
          setModal({ ...modal, perusahaan_induk: false });
        }}
        title={`Atur ${company_name}`}
        company_verified_status_name={company_verified_status_name}
        company_active_status={company_active_status}
        getData1={getData}
      />

      <Modal_api_key
        show={modal.api_key}
        onHide={() => setModal({ ...modal, api_key: false })}
        company_id={company_id}
      />

      {/*end Modal======= */}

      {/* content */}
      <section>
        <Form>
          <section style={{ display: "flex", marginBottom: MARGIN_THRIRD }}>
            <ButtonPrimary
              onClick={() => {
                setModal({ ...modal, create: true });
                setType_modal("Buat");
              }}
            >
              Create Company
            </ButtonPrimary>
          </section>

          <section className="mb-4">
            <TableData header={header}>
              {loading ? (
                <Loadingfunc />
              ) : (
                data.map((item, idx) => (
                  <tr
                    key={idx}
                    // style={{ cursor: "pointer" }}
                    // onClick={() =>
                    //   BtnMore({
                    //     name: "Lihat Detail",
                    //     company_id: item.company_id,
                    //     company_name: item.company_name,
                    //   })
                    // }
                  >
                    <td data-label="No">{Numeric({ idx, page: page.page })}</td>
                    <td data-label="Nama Perusahaan">{item.company_name}</td>
                    <td data-label="Perusahaan Induk">
                      {item.company_parent_company
                        ? item.company_parent_company.company_name
                        : "-"}
                    </td>
                    <td data-label="Kategori">
                      {item.category_company
                        ? item.category_company.category_company_name
                        : "-"}
                    </td>
                    <td data-label="Status">
                      {/* <TagStatus>{item.company_active_status_name}</TagStatus> */}
                      <div
                        dangerouslySetInnerHTML={{
                          __html: displayStatus(
                            item.company_active_status_name
                          ),
                        }}
                      />
                    </td>
                    <td data-label="Verifikasi">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: displayStatus(
                            item.company_verified_status_name
                          ),
                        }}
                      />
                    </td>
                    <td data-label="More">
                      <DropDown_More
                        title={
                          <button
                            class="button is-primary is-small"
                            aria-haspopup="true"
                            aria-controls="dropdown-menu"
                            onMouseEnter={() =>
                              setIsOpenMore({ id: idx, status: true })
                            }
                            onMouseLeave={() =>
                              setIsOpenMore({ id: null, status: false })
                            }
                          >
                            <span class="icon is-small">•••</span>
                          </button>
                        }
                        data_more={data_more}
                        id={item.company_id}
                        onClick={({ id, name }) =>
                          BtnMore({
                            name: name,
                            company_id: id,
                            company_name: item.company_name,
                          })
                        }
                      />
                    </td>
                  </tr>
                ))
              )}
            </TableData>
          </section>

          <section className="justify-content-end align-items-end d-flex">
            {page.last_page === 0 || page.last_page === 1 ? null : (
              <Pagination
                page={page.page}
                totalPage={page.last_page}
                handleOnChange={(e) => btnHandleChangePage(e)}
              />
            )}
          </section>
        </Form>
      </section>
    </ContainerContent>
  );
};
