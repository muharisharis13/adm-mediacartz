import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import * as Component from "../../../component";
import * as Style from "../../../component/style/content/default";
import * as Services from "../../../service";
import * as Modal from "./modal";
import { Method } from "../../../service";
import { Numeric, displayStatus } from "../../../util";
import { Form } from "react-bootstrap";

const statusList = [
  { value: "", label: "Semua" },
  { value: 1, label: "Active" },
  { value: 0, label: "Inactive" },
];

const header = [
  "No",
  "Gambar",
  "Nama Produk",
  "SKU",
  "Kategori",
  "Status",
  "Aksi",
];

const data_more = [
  { name: "Lihat Detail" },
  { name: "Ubah" },
  { name: "Nonaktifkan" },
  { name: "Aktifkan" },
];

export default function MasterProduct() {
  const { selected_company, dispatch } = useContext(Services.Context);
  const [modal, setModal] = useState({
    company: false,
  });
  const [category, setCategory] = useState([]);
  const [categorySelected, setCategorySelected] = useState({
    value: "",
    label: "Semua Kategori",
  });
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    data: [],
    page: 1,
    lastPage: 1,
  });
  const [search, setSearch] = useState('');
  const [statusSelected, setStatusSelected] = useState({value: '', label: 'Semua'});
  const [modalDetail, setModalDetail] = useState(false);
  const [dataDetail, setDataDetail] = useState({});
  const [modalForm, setModalForm] = useState(false);
  const [modalFormType, setModalFormType] = useState(null);
  const [categoryDisplayName, setCategoryDisplayName] = useState('');
  
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
          Component.AlertError({ title: "Error", text: res?.data?.error });
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const GetCategory = async () => {
    await Method.get(
      `company/${selected_company.value}/category_display?category_display_active_status_name=active&limit=*`
    )
      .then(async (res) => {
        if (res.data.success) {
          var array = [{ value: "", label: "Semua Kategori" }];
          var arrayNew = array.concat(
            res.data.data.map((item) => ({
              value: item.category_display_id,
              label: item.category_display_name,
            }))
          );
          setCategory(arrayNew);
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const getData = async (pageData = 1) => {
    setLoading(true);

    var data_post = {
      item_name: search,
      item_active_status: statusSelected.value,
      category_display_id: categorySelected.value,
    };

    await Method.get(
      `company/${selected_company.value}/item?page=${pageData}`,
      { params: data_post }
    )
    .then(async (res) => {
      console.log('item', res);
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
        Component.AlertError({ title: "Error", text: error.response.data.error });
			} else {
				Component.AlertError({ title: "Error", text: 'Terjadi Kesalahan' });
			}
    });
  };

  const btnPagination = (e) => {
    getData(e.selected + 1)
  }

  const btnMore = async (name, id, category_display_name) => {
    console.log('btnMore', name, id)
    const row = data?.data?.find((find) => find.item_id === id);
    
    switch(name) {
      case "Lihat Detail":
        getDetailData(row.item_id, 'detail');
        break;
      
      case "Ubah":
        setCategoryDisplayName(category_display_name);
        getDetailData(row.item_id, 'form');
        break;

      case "Aktifkan":
        await Component.AlertQuestion({
          title: "Warning",
          text: `Do you want to activate ${row.item_name}`,
        }).then((res) => {
          if (res.isConfirmed) {
            //action
            changeStatus(row.item_id, 'activate')
          }
        });
        break;

      case "Nonaktifkan":
        await Component.AlertQuestion({
          title: "Warning",
          text: `Do you want to inactivate ${row.item_name}`,
        }).then((res) => {
          if (res.isConfirmed) {
            //action
            changeStatus(row.item_id, 'inactivate')
          }
        });
        break;
      default:
        return name;
    }
  }

  const getDetailData = async (item_id, type) => {
    await Method.get(`item/${item_id}`)
    .then(async (res) => {
      console.log('res detail', res)
      if (res.data.success) {
        setDataDetail(res.data.data);
        setTimeout(() => {
          if(type==='detail'){
            setModalDetail(true);
          }else{
            setModalForm(true);
            setModalFormType('edit');
          }
        }, 500);
      }else{
        Component.AlertError({ title: "Error", text: res.error });
      }
    })
    .catch((error) => {
      console.log(error.response);
      setLoading(false);
      if (error.response) {
        Component.AlertError({ title: "Error", text: error.response.data.error });
			} else {
				Component.AlertError({ title: "Error", text: 'Terjadi Kesalahan' });
			}
    });
  }

  const changeStatus = async (item_id, status) => {
    await Method.put(`item/${item_id}/${status}`)
    .then(async (res) => {
      if (res.data.success) {
        Component.AlertSuccess({ title: "Success", text: res.success });
        getData();
      }else{
        Component.AlertError({ title: "Error", text: res.error });
      }
    })
    .catch((error) => {
      console.log(error.response);
      setLoading(false);
      if (error.response) {
        Component.AlertError({ title: "Error", text: error.response.data.error });
			} else {
				Component.AlertError({ title: "Error", text: 'Terjadi Kesalahan' });
			}
    });
  }

  const filter = () => {
    getData();
  };

  const resetFilter = () => {
    setSearch("");
    setCategorySelected({ value: "", label: "Semua Kategori" });
    setStatusSelected({ value: "", label: "Semua" });
  };

  useEffect(() => {
    if (
      search === "" &&
      categorySelected.value === "" &&
      statusSelected.value === ""
    ) {
      getData();
    }
  }, [search, categorySelected, statusSelected]);

  useEffect(() => {
    GetCompany();
  }, []);

  useEffect(() => {
    GetCategory();
    getData();
  }, [selected_company]);

  return (
    <Style.ContainerContent>
      {/* MODAL =========== */}
      <Modal.ModalSelectCompany
        show={modal.company}
        onHide={() => setModal((state) => ({ ...state, company: false }))}
      />

      <Modal.ModalDetailProduk
        show={modalDetail}
        onHide={() => setModalDetail(false)}
        data={dataDetail}
      />

      <Modal.ModalFormProduk
        show={modalForm}
        type={modalFormType}
        onHide={() => setModalForm(false)}
        onSubmit={() => {
          getData();
          setModalForm(false);
        }}
        data={dataDetail}
        categoryDisplayName={categoryDisplayName}
      />

      <section>
        <div className="d-flex">
          <Style.HeaderPrimary color={Style.COLOR_PRIMARY}>
            Master Produk
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
      </section>

      <section className="mb-2">
        <Style.ButtonPrimary 
          onClick={()=> {
            setModalForm(true);
            setModalFormType('add');
          }}
        >
          Tambah Produk
        </Style.ButtonPrimary>
      </section>

      <section>
        <Component.Form>
          <section>
            <div className="row">
              <div className="col-md-3 mb-2">
                <Style.Label color={Style.COLOR_SECONDARY}>Keyword</Style.Label>
                <Form.Control
                  placeholder="Cari produk..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="col-md-3 mb-2">
                <Style.Label color={Style.COLOR_SECONDARY}>Kategori</Style.Label>
                <Select
                  placeholder="Semua Kategori"
                  value={categorySelected}
                  options={category}
                  onChange={(e) => setCategorySelected(e)}
                />
              </div>

              <div className="col-md-3 mb-2">
                <Style.Label color={Style.COLOR_SECONDARY}>Status</Style.Label>
                <Select
                  placeholder="Semua Status"
                  value={statusSelected}
                  options={statusList}
                  onChange={(e) => setStatusSelected(e)}
                />
              </div>

              <div className="col-md-3 pt-4 pb-4 d-flex flex-row">
                <Style.ButtonPrimary onClick={() => filter()}>
                  Cari
                </Style.ButtonPrimary>
                <button
                  className="btn bg-light border border-gray ms-1"
                  onClick={() => resetFilter()}
                >
                  Reset
                </button>
              </div>
            </div>
          </section>

          <section className="mb-5 mb-md-5">
            <Component.TableData header={header}>
              {loading ? (
                <tr>
                  <td colSpan={header.length}>
                    <Component.Loadingfunc />
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
                    <td data-label="Gambar"><img src={item.item_image[0]} style={{width:80, height:80, resizeMode:'contain'}}/></td>
                    <td data-label="Nama Produk">{item.item_name}</td>
                    <td data-label="SKU">{item.item_sku}</td>
                    <td data-label="Kategori">{item.category_display.category_display_name}</td>
                    <td data-label="Status">
                      {
                        <div
                          dangerouslySetInnerHTML={{
                            __html: displayStatus(
                              item.item_active_status_name
                            ),
                          }}
                        />
                      }
                    </td>
                    <td data-label="Aksi">
                      <Component.DropDown_More
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
                          item.item_active_status_name === "active"
                            ? filter.name !== "Aktifkan"
                            : filter.name !== "Nonaktifkan"
                        )}
                        id={item.item_id}
                        onClick={({ name, id }) => btnMore(name, id, item.category_display.category_display_name)}
                      />
                    </td>
                  </tr>
                ))
              )}
            </Component.TableData>
          </section>

          {
            data.data.length > 0 &&
            <section>
              <Component.Pagination
                page={data.page}
                totalPage={data.lastPage}
                handleOnChange={(e) => btnPagination(e)}
              />
            </section>
          }
        </Component.Form>
      </section>
    </Style.ContainerContent>
  );
}
