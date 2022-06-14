import React, { useContext, useEffect, useState } from "react";
import * as Component from "../../../component";
import * as Style from "../../../component/style/content/default";
import * as Services from "../../../service";
import * as Modal from "./modal";
import { Method } from "../../../service";
import { Numeric, displayStatus, Moment } from "../../../util";
import Select from "react-select";

const header = [
  "No",
  "Produk",
  "Tipe",
  "Dari",
  "Ke",
  "Qty",
  "Untuk Tanggal",
  "Status",
  "Aksi",
];

const data_more = [
  { name: "Lihat Detail", status: 'all' },
  { name: "Ubah", status: '' },
  { name: "Approve", status: '' },
  { name: "Reject", status: '' }
];

const statusList = [
  { value: '', label: 'Semua Status' },
  { value: '0', label: 'Pending' },
  { value: '3', label: 'Approved' },
  { value: '4', label: 'Reject' }
]

export default function RequestStock() {
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
  const [statusSelected, setStatusSelected] = useState({ value: '', label: 'Semua Status' });
  const [modalDetail, setModalDetail] = useState(false);
  const [requestId, setRequestId] = useState(null);
  const [modalForm, setModalForm] = useState(null);
  const [detailData, setDetailData] = useState(null);

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

  const getData = async (pageData = 1) => {
    setLoading(true);

    await Method.get(
      `company/${selected_company.value}/stock?stock_approve_status=${statusSelected.value}&page=${pageData}`
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

  const getDetailData = async (stock_id) => {
    await Method.get(`stock/${stock_id}`)
    .then(async (res) => {
      console.log('res detail', res)
      if (res.data.success) {
        setDetailData(res.data.data);
        setTimeout(()=>{
          setModalForm('edit');
        }, 500)
      }else{
        Component.AlertError({ title: "Error", text: res.error });
      }
    })
    .catch((error) => {
      console.log(error.response);
      if (error.response) {
        Component.AlertError({ title: "Error", text: error.response.data.error });
			} else {
				Component.AlertError({ title: "Error", text: 'Terjadi Kesalahan' });
			}
    });
  }

  const btnMore = async (name, item) => {
    switch(name) {
      case "Lihat Detail":
        setRequestId(item.stock_id);
        setModalDetail(true);
        break;
      
      case "Ubah":
        getDetailData(item.stock_id);
        break;

      case "Approve":
        Component.AlertQuestion({
          title: "Warning",
          text: `Do you want to approve ${item.item.item_name}`,
        }).then((res) => {
          if (res.isConfirmed) {
            //action
            changeStatus(item.stock_id, 'approval')
          }
        });
        break;

      case "Reject":
        Component.AlertQuestion({
          title: "Warning",
          text: `Do you want to reject ${item.item.item_name}`,
        }).then((res) => {
          if (res.isConfirmed) {
            //action
            changeStatus(item.stock_id, 'reject')
          }
        });
        break;
      default:
        return name;
    }
  }

  const changeStatus = async (stock_id, status) => {
    setLoading(true);

    await Method.put(`stock/${stock_id}/${status}`, {})
    .then(async (res) => {
      if (res.data.success) {
        Component.AlertSuccess({ title: "Success", text: res.data.success });
        getData();
      }else{
        Component.AlertError({ title: "Error", text: res.data.error });
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
  }

  useEffect(() => {
    GetCompany();
  }, []);

  useEffect(() => {
    getData();
  }, [selected_company, statusSelected]);

  return (
    <Style.ContainerContent>
      <Modal.ModalSelectCompany
        show={modal.company}
        onHide={() => setModal((state) => ({ ...state, company: false }))}
      />

      <Modal.ModalFormRequest
        show={modalForm}
        onHide={() => setModalForm(null)}
        onSubmit={() => {
          getData();
          setModalForm(null);
        }}
        data={detailData}
      />

      <Modal.ModalDetailRequest
        show={modalDetail}
        onHide={() => setModalDetail(false)}
        id={requestId}
      />

      <section>
        <div className="d-flex">
          <Style.HeaderPrimary color={Style.COLOR_PRIMARY}>
            Request Stock
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
          onClick={()=> setModalForm('add')}
        >
          Tambah Request Stock
        </Style.ButtonPrimary>
      </section>

      <section>
        <Component.Form>
          <section>
            <div className="col-md-2 mb-2">
              <Style.Label color={Style.COLOR_SECONDARY}>Status</Style.Label>
              <Select
                placeholder="Semua Status"
                value={statusSelected}
                options={statusList}
                onChange={(e) => setStatusSelected(e)}
              />
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
                    <td data-label="Produk">{item.item.item_name}</td>
                    <td data-label="Tipe">{item.stock_type}</td>
                    <td data-label="Dari">{item.from_store?.store_name}</td>
                    <td data-label="Ke">{item.to_store?.store_name}</td>
                    <td data-label="Qty">{item.stock_quantity}</td>
                    <td data-label="Tanggal">{Moment(item.stock_date)}</td>
                    <td data-label="Status">
                      {
                        <div
                          dangerouslySetInnerHTML={{
                            __html: displayStatus(
                              item.stock_approve_status_name
                            ),
                          }}
                        />
                      }
                    </td>
                    <td data-label="Aksi">
                      <Component.DropDown_More
                        title={
                          <div className="dropdown-trigger">
                            <button
                              className="button is-primary is-small"
                              aria-haspopup="true"
                              aria-controls="dropdown-menu"
                            >
                              <span className="icon is-small">•••</span>
                            </button>
                          </div>
                        }
                        data_more={data_more.filter((filter) =>
                          item.stock_approve_status_name === "pending"
                            ? filter
                            : filter.status === "all"
                        )}
                        onClick={({ name, id }) => btnMore(name, item)}
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
};
