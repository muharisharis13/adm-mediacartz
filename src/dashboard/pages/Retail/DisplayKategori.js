import React, { useContext, useEffect, useState } from "react";
import * as Components from "../../../component";
import * as Style from "../../../component/style/content/default";
import * as Services from "../../../service";
import * as Modal from "./modal";
import { Method } from "../../../service";
import { Numeric, displayStatus } from "../../../util";

const header = [
  "No",
  "Nama",
  "Status",
  "Aksi"
];

const data_more = [
  { name: "Ubah" },
  { name: "Nonaktifkan" },
  { name: "Aktifkan" }
];

export default function DisplayKategori() {
  const { selected_company, dispatch } = useContext(Services.Context);
  const [modal, setModal] = useState({
    company: false,
  });
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    data: [],
    page: 1,
    lastPage: 1,
  });
  const [form, setForm] = useState(null);
  
  const GetCompany = async () => {
    await Method.get(`company`)
      .then(async (res) => {
        if (res?.data?.success) {
          if (!selected_company.value) {
            dispatch({
              type: "SELECTED_COMPANY",
              selected_company: {
                value: res?.data?.data[0]?.company_id,
                label: res?.data?.data[0]?.company_name,
              },
            });
          }
        } else {
          Components.AlertError({ title: "Error", text: res?.data?.error });
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };


  const getData = async (pageData = 1) => {
    setLoading(true);

    await Method.get(
      `company/${selected_company.value}/category_display?page=${pageData}`
    )
    .then(async (res) => {
      if (res.data.success) {
        setData((state) => ({
          ...state,
          data: res.data.data,
          page: res.data.page,
          lastPage: res.data.last_page,
        }));
      }
      setLoading(false);
    })
    .catch((error) => {
      console.log(error.response);
      setLoading(false);
      if (error.response) {
        Components.AlertError({ title: "Error", text: error.response.data.error });
			} else {
				Components.AlertError({ title: "Error", text: 'Terjadi Kesalahan' });
			}
    });
  };

  const btnPagination = (e) => {
    getData(e.selected + 1)
  }

  const btnMore = async (name, item) => {
    switch(name) {
      case "Ubah":
        setForm(item);
        break;

      case "Aktifkan":
        await Components.AlertQuestion({
          title: "Warning",
          text: `Do you want to activate ${item.category_display_name}`,
        }).then((res) => {
          if (res.isConfirmed) {
            //action
            changeStatus(item.category_display_id, 'activate')
          }
        });
        break;

      case "Nonaktifkan":
        await Components.AlertQuestion({
          title: "Warning",
          text: `Do you want to inactivate ${item.category_display_name}`,
        }).then((res) => {
          if (res.isConfirmed) {
            //action
            changeStatus(item.category_display_id, 'inactivate')
          }
        });
        break;

      default:
        return name;
    }
  }

  const changeStatus = async (category_display_id, status) => {
    await Method.put(`category_display/${category_display_id}/${status}`)
    .then(async (res) => {
      if (res.data.success) {
        Components.AlertSuccess({ title: "Success", text: res.data.success });
        getData();
      }else{
        Components.AlertError({ title: "Error", text: res.data.error });
      }
    })
    .catch((error) => {
      console.log(error.response);
      setLoading(false);
      if (error.response) {
        Components.AlertError({ title: "Error", text: error.response.data.error });
			} else {
				Components.AlertError({ title: "Error", text: 'Terjadi Kesalahan' });
			}
    });
  }

  useEffect(() => {
    GetCompany();
  }, []);

  useEffect(() => {
    getData();
  }, [selected_company]);

  return (
    <Style.ContainerContent>
      {/* MODAL =========== */}
      <Modal.ModalSelectCompany
        show={modal.company}
        onHide={() => setModal((state) => ({ ...state, company: false }))}
      />

      <Modal.ModalFormDisplayKategori
        show={form}
        onHide={() => setForm(null)}
        onSubmit={() => {
          getData();
          setForm(null);
        }}
      />

      <div className="d-flex">
        <Style.HeaderPrimary color={Style.COLOR_PRIMARY}>
          Display Kategori
        </Style.HeaderPrimary>
        <div className="wrap-select align-items-center ms-5">
          <button
            className="btn border"
            onClick={() => setModal((state) => ({ ...state, company: true }))}
          >
            {selected_company ? selected_company.label : "Select Company"}{" "}
            <i className="demo-icon icon-chevron-down"></i>
          </button>
        </div>
      </div>

      <section className="form-table-data">
        <div className="mb-2">
          <Style.ButtonPrimary 
            onClick={()=> setForm('add')}
          >
            Tambah Kategori
          </Style.ButtonPrimary>
        </div>
        <Components.Form>
          <section className="mb-5 mb-md-5">
            <Components.TableData header={header}>
              {loading ? (
                <tr>
                  <td colSpan={header.length}>
                    <Components.Loadingfunc />
                  </td>
                </tr>
              ) : data.data.length === 0 ? (
                <tr>
                  <td colSpan={header.length} className="text-center">
                    <div>Data Tidak Ditemukan</div>
                  </td>
                </tr>
              ) : (
                data.data.map((item, index) => (
                  <tr
                    key={index}
                  >
                    <td data-label="No">{Numeric({ page: data.page, idx: index })}</td>
                    <td data-label="Nama">{item.category_display_name}</td>
                    <td data-label="Status">
                      {
                        <div
                          dangerouslySetInnerHTML={{
                            __html: displayStatus(
                              item.category_display_active_status_name
                            ),
                          }}
                        />
                      }
                    </td>
                    <td data-label="Aksi">
                      <Components.DropDown_More
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
                          item.category_display_active_status_name === "active"
                            ? filter.name !== "Aktifkan"
                            : filter.name !== "Nonaktifkan"
                        )}
                        id={item.category_display_id}
                        onClick={({ name, id }) => btnMore(name, item)}
                      />
                    </td>
                  </tr>
                ))
              )}
            </Components.TableData>
          </section>

          {
            data.data.length > 0 &&
            <section>
              <Components.Pagination
                page={data.page}
                totalPage={data.lastPage}
                handleOnChange={(e) => btnPagination(e)}
              />
            </section>
          }
        </Components.Form>
      </section>
    </Style.ContainerContent>
  );
}
