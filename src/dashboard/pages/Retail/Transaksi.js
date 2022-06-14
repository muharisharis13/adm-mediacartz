import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import * as Component from "../../../component";
import * as Style from "../../../component/style/content/default";
import * as Services from "../../../service";
import * as Modal from "./modal";
import { Method } from "../../../service";
import { Numeric, displayStatus, FormatCurrency } from "../../../util";
import { Form } from "react-bootstrap";
import Datepicker from "react-datepicker";
import moment from "moment";

const header = [
  "No",
  "No. Transaksi",
  "Customer",
  "Phone",
  "Total",
  "Payment",
  "Status",
  "Fulfillment",
  "Tanggal",
  "Aksi",
];

const data_more = [
  { name: "Lihat Detail" }
];


export default function TransaksiRetail() {
  const { selected_company, dispatch } = useContext(Services.Context);
  const [modal, setModal] = useState({
    company: false,
  });
  const [store, setStore] = useState([]);
  const [storeSelected, setStoreSelected] = useState({
    value: "",
    label: "Semua Toko",
  });
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    data: [],
    page: 1,
    lastPage: 1,
  });
  const [transactionId, setTransactionId] = useState('');
  const [status, setStatus] = useState([]);
  const [statusSelected, setStatusSelected] = useState({ value: "", label: "Semua Status" });
  const [modalDetail, setModalDetail] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [transactionIdSelected, setTransactionIdSelected] = useState(null);

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

  const getStore = async () => {
    await Method.get(
      `company/${selected_company.value}/store?limit=*`
    )
      .then(async (res) => {
        if (res.data.success) {
          var array = [{ value: "", label: "Semua Toko" }];
          var arrayNew = array.concat(
            res.data.data.map((item) => ({
              value: item.store_id,
              label: item.store_name,
            }))
          );
          setStore(arrayNew);
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const getStatus = async () => {
    await Method.get(
      `list/approval_status`
    )
    .then(async (res) => {
      if (res.data.success) {
        var array = [{ value: "", label: "Semua Status" }];
        var arrayNew = array.concat(
          res.data.data.map((item) => ({
            value: item.status_id,
            label: item.status_name,
          }))
        );
        setStatus(arrayNew);
      }
    })
    .catch((err) => {
      console.log(err.response);
    });
  };

  const getData = async (pageData = 1) => {
    setLoading(true);

    var data_post = {
      transaction_approve_status_id: statusSelected.value,
      transaction_from_datetime: startDate!==''?moment(startDate).format('YYYY-MM-DD') + ' 00:00:00':'',
      transaction_until_datetime: endDate!==''?moment(endDate).format('YYYY-MM-DD') + ' 23:59:59':'',
      transaction_id: transactionId,
      store_id: storeSelected.value,
      company_id: selected_company.value
    };

    await Method.get(
      `transaction/seller?page=${pageData}`,
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

  const btnMore = async (name, item) => {
    switch(name) {
      case "Lihat Detail":
        setModalDetail(true);
        setTransactionIdSelected(item.transaction_id);
        break;
      
      default:
        return name;
    }
  }

  const filter = () => {
    getData();
  };

  const resetFilter = () => {
    setTransactionId("");
    setStoreSelected({ value: "", label: "Semua Toko" });
    setStatusSelected({ value: "", label: "Semua Status" });
    setStartDate("");
    setEndDate("");
  };

  useEffect(() => {
    if (
      transactionId === "" &&
      storeSelected.value === "" &&
      statusSelected.value === "" &&
      startDate === "" &&
      endDate === ""
    ) {
      getData();
    }
  }, [transactionId, storeSelected, statusSelected, startDate, endDate]);

  useEffect(() => {
    GetCompany();
    getStatus();
  }, []);

  useEffect(() => {
    getStore();
    getData();
  }, [selected_company]);

  return (
    <Style.ContainerContent>
      <Modal.ModalSelectCompany
        show={modal.company}
        onHide={() => setModal((state) => ({ ...state, company: false }))}
      />

      <Modal.ModalTransaksiDetail
        show={modalDetail}
        onHide={() => setModalDetail(false)}
        transaction_id={transactionIdSelected}
        onReload={() => getData()}
      />

      <section>
        <div className="d-flex">
          <Style.HeaderPrimary color={Style.COLOR_PRIMARY}>
            Transaksi
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

      <section>
        <Component.Form>

          <section>
            <div className="row">
              <div className="col-md-2 mb-2">
                <Style.Label color={Style.COLOR_SECONDARY}>Toko</Style.Label>
                <Select
                  placeholder="Semua Toko"
                  value={storeSelected}
                  options={store}
                  onChange={(e) => setStoreSelected(e)}
                />
              </div>

              <div className="col-md-2 mb-2">
                <Style.Label color={Style.COLOR_SECONDARY}>No. Transaksi</Style.Label>
                <Form.Control
                  placeholder="No. Transaksi"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                />
              </div>

              <div className="col-md-2 mb-2">
                <Style.Label color={Style.COLOR_SECONDARY}>Status</Style.Label>
                <Select
                  placeholder="Semua Status"
                  value={statusSelected}
                  options={status}
                  onChange={(e) => setStatusSelected(e)}
                />
              </div>

              <div className="col-md-2">
                <Style.Label color={Style.COLOR_SECONDARY}>Tanggal Mulai</Style.Label>
                <Datepicker
                  selected={startDate}
                  className="form-control"
                  onChange={(e) => setStartDate(e) }
                  placeholderText="MM/DD/YYY"
                />
              </div>

              <div className="col-md-2">
                <Style.Label color={Style.COLOR_SECONDARY}>Tanggal Berakhir</Style.Label>
                <Datepicker
                  selected={endDate}
                  className="form-control"
                  onChange={(e) => setEndDate(e) }
                  placeholderText="MM/DD/YYY"
                />
              </div>

              <div className="col-md-2 pt-4 pb-4 d-flex flex-row">
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
                    <td data-label="No. Transaksi">{item.transaction_id}</td>
                    <td data-label="Customer">{item.customer_name}</td>
                    <td data-label="Phone">{item.customer_msisdn}</td>
                    <td data-label="Total">{FormatCurrency.currency(item.transaction_total_amount)}</td>
                    <td data-label="Payment">{item?.ms_payment?.ms_payment_name}</td>
                    <td data-label="Status">
                      {
                        <div
                          dangerouslySetInnerHTML={{
                            __html: displayStatus(
                              item.transaction_approve_status_name
                            ),
                          }}
                        />
                      }
                    </td>
                    <td data-label="Fulfillment">{item.transaction_delivery_fulfilled_datetime?'✔':'✘'}</td>
                    <td data-label="Tanggal">{moment(item.transaction_created_datetime).format('DD-MMM-YYYY HH:mm:ss')}</td>
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
                        data_more={data_more}
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
