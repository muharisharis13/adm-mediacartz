import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import * as Components from "../../../component";
import * as Style from "../../../component/style/content/default";
import * as Services from "../../../service";
import * as Util from "../../../util";
import styled from "styled-components";
import * as Modal from "./modal";
import { Context, Method } from "../../../service";
import DatePicker from "react-datepicker";
import CardRetailStatistic from '../../../component/RetailTheme/CardRetailStatistic'
import moment from 'moment'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Statistic() {
  const { selected_company, dispatch } = useContext(Services.Context);
  const [modal, setModal] = useState({
    company: false
  });
  const [search, setSearch] = useState({
    from_date: null,
    end_date: null,
  });
  const [store, setStore] = useState([]);
  const [storeSelected, setStoreSelected] = useState({value: '', label: 'Semua Toko'});
  const [salesType, setSalesType] = useState([]);
  const [salesTypeSelected, setSalesTypeSelected] = useState({value: '', label: 'Semua Sales Type'});
  const [paymentMethod, setPaymentMethod] = useState([]);
  const [paymentMethodSelected, setPaymentMethodSelected] = useState({value: '', label: 'Semua Payment Method'});
  const [activeCard, setActiveCard] = useState(0)
  const [transaction, setTransaction] = useState(null);
  const [transactionLoading, setTransactionLoading] = useState(false);
  const [transactionItem, setTransactionItem] = useState(null);
  const [transactionItemLoading, setTransactionItemLoading] = useState(false);
  const [transactionCustomer, setTransactionCustomer] = useState(null);
  const [transactionCustomerLoading, setTransactionCustomerLoading] = useState(false);
  
  const GetCompany = async () => {
    await Method.get(`company`)
      .then(async (res) => {
        console.log(res.data);
        if (res?.data?.success) {
          if(!selected_company.value){
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

  const GetStore = async () => {
    await Method.get(`company/${selected_company.value}/store?limit=*`)
      .then(async (res) => {
        console.log('store', res.data);
        if (res.data.success) {
          var array = [{value: '', label: 'Semua Toko'}]
          var arrayNew = array.concat(
            res.data.data.map((item) => ({
              value: item.store_id,
              label: item.store_name
            }))
          )
          setStore(arrayNew)
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const GetPaymentMethod = async () => {
    await Method.get(`list/ms_merchant_payment`)
      .then(async (res) => {
        console.log('sales type', res.data);
        if (res.data.success) {
          var array = [{value: '', label: 'Semua Payment Method'}]
          var arrayNew = array.concat(
            res.data.data.map((item) => ({
              value: item.ms_merchant_payment_id,
              label: item.ms_merchant_payment_name
            }))
          )
          setPaymentMethod(arrayNew)
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const GetSalesType = async () => {
    await Method.get(`list/ms_payment?eligible_for_topup_balance=true&order_by=ms_payment_id&sort_by=asc`)
      .then(async (res) => {
        console.log('sales type', res.data);
        if (res.data.success) {
          const salesTypeNew = res.data.data.filter(x=>x.ms_payment_identifier==="MIDTRANS" || x.ms_payment_identifier==="MERCHANT_PAYMENT");
          var array = [{value: '', label: 'Semua Sales Type'}]
          var arrayNew = array.concat(
            salesTypeNew.map((item) => ({
              value: item.ms_payment_id,
              label: item.ms_payment_name,
              ms_payment_identifier: item.ms_payment_identifier
            }))
          )
          setSalesType(arrayNew)
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    GetCompany();
    GetSalesType();
    GetPaymentMethod();
  }, []);

  useEffect(()=>{
    setSearch((state) => ({
      ...state,
      from_date: null
    }))
    setSearch((state) => ({
      ...state,
      end_date: null
    }))
    setStoreSelected({value: '', label: 'Semua Toko'});
    setSalesTypeSelected({value: '', label: 'Semua Sales Type'})
    setPaymentMethodSelected({value: '', label: 'Semua Payment Method'});
    setTransaction(null)
    setTransactionItem(null)
    setTransactionCustomer(null)
    setActiveCard(0);

    GetStore();
  }, [selected_company])

  const loadTransaction = async () => {
    setTransactionLoading(true);

    const data_post = {
      filter_from_datetime: search.from_date?moment(search.from_date).format('YYYY-MM-DD') + " 00:00:00":null,
      filter_until_datetime: search.end_date?moment(search.end_date).format('YYYY-MM-DD') + " 23:59:59":null,
      transaction_approve_status: [3],
      store_id: !storeSelected?[]:storeSelected.value===''?[]:[storeSelected.value],
      seller_company_id: [selected_company.value],
      ms_payment_id: !salesTypeSelected?[]:salesTypeSelected.value===''?[]:[salesTypeSelected.value],
      ms_merchant_payment_id: !paymentMethodSelected?[]:paymentMethodSelected.value===''?[]:[paymentMethodSelected.value]
    }

    await Method.post(`report/transaction` ,data_post)
    .then(async (res) => {
      console.log('transaksi', res.data);
      if (res.data.success) {
        setTransaction(res.data.data);
      } else {
        Components.AlertError({ title: "Error", text: res?.data?.error });
      }
      setTransactionLoading(false);
    })
    .catch((err) => {
      console.log(err.response);
      setTransactionLoading(false);
    });
  }

  const loadTransactionItem = async () => {
    setTransactionItemLoading(true);

    const data_post = {
      filter_from_datetime: search.from_date?moment(search.from_date).format('YYYY-MM-DD') + " 00:00:00":null,
      filter_until_datetime: search.end_date?moment(search.end_date).format('YYYY-MM-DD') + " 23:59:59":null,
      transaction_approve_status: [3],
      store_id: !storeSelected?[]:storeSelected.value===''?[]:[storeSelected.value],
      seller_company_id: [selected_company.value],
      ms_payment_id: !salesTypeSelected?[]:salesTypeSelected.value===''?[]:[salesTypeSelected.value],
      ms_merchant_payment_id: !paymentMethodSelected?[]:paymentMethodSelected.value===''?[]:[paymentMethodSelected.value],
      item_id: []
    }

    await Method.post(`report/item` ,data_post)
    .then(async (res) => {
      console.log('transaksi item', res.data);
      if (res.data.success) {
        setTransactionItem(res.data.data);
      } else {
        Components.AlertError({ title: "Error", text: res?.data?.error });
      }
      setTransactionItemLoading(false);
    })
    .catch((err) => {
      console.log(err.response);
      setTransactionItemLoading(false);
    });

  }

  const loadTransactionCustomer = async () => {
    setTransactionCustomerLoading(true);

    const data_post = {
      filter_from_datetime: search.from_date?moment(search.from_date).format('YYYY-MM-DD') + " 00:00:00":null,
      filter_until_datetime: search.end_date?moment(search.end_date).format('YYYY-MM-DD') + " 23:59:59":null,
      transaction_approve_status: [3],
      store_id: !storeSelected?[]:storeSelected.value===''?[]:[storeSelected.value],
      seller_company_id: [selected_company.value],
      ms_payment_id: !salesTypeSelected?[]:salesTypeSelected.value===''?[]:[salesTypeSelected.value],
      ms_merchant_payment_id: !paymentMethodSelected?[]:paymentMethodSelected.value===''?[]:[paymentMethodSelected.value],
      customer_name: '',
      customer_city: ''
    }

    await Method.post(`report/customer` ,data_post)
    .then(async (res) => {
      console.log('transaksi item', res.data);
      if (res.data.success) {
        setTransactionCustomer(res.data.data);
      } else {
        Components.AlertError({ title: "Error", text: res?.data?.error });
      }
      setTransactionCustomerLoading(false);
    })
    .catch((err) => {
      console.log(err.response);
      setTransactionCustomerLoading(false);
    });

  }
  
  const generateData = () => {
    loadTransaction();
    loadTransactionCustomer();
    loadTransactionItem();
    setActiveCard(0);
  }

  return (
    <Style.ContainerContent>
      {/* MODAL =========== */}
      <Modal.ModalSelectCompany
        show={modal.company}
        onHide={() => setModal((state) => ({ ...state, company: false }))}
      />
      
      <div className="d-flex">
        <Style.HeaderPrimary color={Style.COLOR_PRIMARY}>
          Statistic Report
        </Style.HeaderPrimary>
        <div className="wrap-select align-items-center ms-5">
          <button
            className="btn border"
            onClick={() => setModal((state) => ({ ...state, company: true }))}
          >
            {selected_company?selected_company.label:'Select Company'} <i className="demo-icon icon-chevron-down"></i>
          </button>
        </div>
      </div>

      {
        selected_company &&
        <div>
          <div className="mt-lg-5">
            <div className="d-flex flex-wrap align-items-center">
              <div className="row">
                <div className="col-md-3 mb-2">
                  <Style.Label color={Style.COLOR_SECONDARY}>Jadwal Mulai</Style.Label>
                  <DatePicker
                    className="form-control"
                    name="from_date"
                    selected={search.from_date}
                    onChange={(e) =>
                      setSearch((state) => ({
                        ...state,
                        from_date: e,
                      }))
                    }
                    selectsStart
                    startDate={search.from_date}
                    endDate={search.end_date}
                    dateFormat="dd MMMM yyyy"
                  />
                </div>
                <div className="col-md-3 mb-2">
                  <Style.Label color={Style.COLOR_SECONDARY}>
                    Jadwal Berakhir
                  </Style.Label>
                  <DatePicker
                    className="form-control"
                    name="end_date"
                    selected={search.end_date}
                    onChange={(e) =>
                      setSearch((state) => ({ ...state, end_date: e }))
                    }
                    selectsEnd
                    startDate={search.end_date}
                    endDate={search.end_date}
                    minDate={search.from_date}
                    dateFormat="dd MMMM yyyy"
                  />
                </div>
                <div className="col-md-3 mb-2">
                  <Style.Label color={Style.COLOR_SECONDARY}>Toko</Style.Label>
                  <Select
                    placeholder="Semua Toko"
                    value={storeSelected}
                    options={store}
                    onChange={(e) => setStoreSelected(e)}
                  />
                </div>
                <div className="col-md-3 mb-2">
                  <Style.Label color={Style.COLOR_SECONDARY}>Sales Type</Style.Label>
                  <Select
                    placeholder="Semua Sales Type"
                    value={salesTypeSelected}
                    options={salesType}
                    onChange={(e) => setSalesTypeSelected(e)}
                  />
                </div>
                {
                  salesTypeSelected.ms_payment_identifier==="MERCHANT_PAYMENT" && 
                  <div className="col-md-3 mb-2">
                    <Style.Label color={Style.COLOR_SECONDARY}>Payment Method</Style.Label>
                    <Select
                      placeholder="Pilih Payment Method"
                      value={paymentMethodSelected}
                      options={paymentMethod}
                      onChange={(e) => setPaymentMethodSelected(e)}
                    />
                  </div>
                }
                <div className="col-md-3 mb-2 pt-4">
                  <Style.ButtonPrimary onClick={()=>generateData()}>
                    Generate Statistic
                  </Style.ButtonPrimary>
                </div>
              </div>
            </div>
          </div>
          
          { 
            !transactionLoading && !transactionItemLoading && !transactionCustomerLoading ? 
            <div>
              { transaction && transactionItem && transactionCustomer && renderContent() }
            </div>
            : renderLoading() 
          }

        </div>
      }
      
    </Style.ContainerContent>
  );

  function renderLoading() {
    return(
      <div style={{position:'fixed', top:0, bottom:0, right:0, left:0, backgroundColor:'#00000069'}} className="d-flex flex-column justify-content-center align-items-center">
        <div className="spinner-border text-white" style={{width:100, height:100}} role="status">
        </div>
        <div className="text-white mt-4">Memuat Data</div>
      </div>
    )
  }

  function renderContent() {
    return(
      <div className="mt-lg-5">
        <div className="row">
          <div className="col-md-4 mb-2">
            <div  style={{width:"100%"}} onClick={()=>setActiveCard(0)}>
              <CardRetailStatistic
                title="Transaksi"
                active={activeCard===0}
              >
                <div className="p-3">
                  <div className="row">
                    <div className="col-sm-4">
                      <div className="text-center">Transaksi</div>
                      <h5 className="text-center">{separate(transaction.main_sales.transaction_quantity)}</h5>
                    </div>
                    <div className="col-sm-4">
                      <div className="text-center">Produk</div>
                      <h5 className="text-center">{separate(transaction.main_sales.item_quantity)}</h5>
                    </div>
                    <div className="col-sm-4">
                      <div className="text-center">Total Hari</div>
                      <h5 className="text-center">{separate(transaction.main_sales.total_days)}</h5>
                    </div>
                  </div>
                  <div className="row pt-2">
                    <div className="col-sm-6">
                      <div className="text-center">Transaksi Rata-rata per hari</div>
                      <h5 className="text-center">{transaction.main_sales.average_transaction_quantity_each_day}</h5>
                    </div>
                    <div className="col-sm-6">
                      <div className="text-center">Produk Terjual Rata-rata per hari</div>
                      <h5 className="text-center">{transaction.main_sales.average_item_quantity_each_day}</h5>
                    </div>
                  </div>
                  <div className="row pt-2">
                    <div className="col-sm-6">
                      <div className="text-center">Nominal (IDR)</div>
                      <h5 className="text-center">{separate(transaction.main_sales.transaction_amount)}</h5>
                    </div>
                    <div className="col-sm-6">
                      <div className="text-center">Nominal Rata-rata per hari (IDR)</div>
                      <h5 className="text-center">{separate(transaction.main_sales.average_transaction_amount_each_day)}</h5>
                    </div>
                  </div>
                </div>
              </CardRetailStatistic>
            </div>
          </div>
          <div className="col-md-4 mb-2">
            <div  style={{width:"100%"}} onClick={()=>setActiveCard(1)}>
              <CardRetailStatistic
                title="Produk"
                active={activeCard===1}
              >
                <div className="p-3">
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="text-center">Total Terjual</div>
                      <h5 className="text-center">{separate(transactionItem.main_sales.total_sold)}</h5>
                    </div>
                  </div>
                  <div className="row pt-2">
                    <div className="col-sm-12">
                      <div className="text-center">Total Hari</div>
                      <h5 className="text-center">{separate(transactionItem.main_sales.total_days)}</h5>
                    </div>
                  </div>
                  <div className="row pt-2">
                    <div className="col-sm-12">
                      <div className="text-center">Transaksi Rata-rata per hari</div>
                      <h5 className="text-center">{separate(transactionItem.main_sales.average_item_sold_each_day)}</h5>
                    </div>
                  </div>
                </div>
              </CardRetailStatistic>
            </div>
          </div>
          <div className="col-md-4 mb-2">
            <div  style={{width:"100%"}} onClick={()=>setActiveCard(2)}>
              <CardRetailStatistic
                title="Pelanggan"
                active={activeCard===2}
              >
                <div className="p-3">
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="text-center">Pelanggan</div>
                      <h5 className="text-center">{separate(transactionCustomer.main_sales.total_transaction)}</h5>
                    </div>
                  </div>
                  <div className="row pt-2">
                    <div className="col-sm-12">
                      <div className="text-center">Produk</div>
                      <h5 className="text-center">{separate(transactionCustomer.main_sales.item_quantity)}</h5>
                    </div>
                  </div>
                  <div className="row pt-2">
                    <div className="col-sm-12">
                      <div className="text-center">Nominal (IDR)</div>
                      <h5 className="text-center">{separate(transactionCustomer.main_sales.transaction_amount)}</h5>
                    </div>
                  </div>
                </div>
              </CardRetailStatistic>
            </div>
          </div>
        </div>

        {activeCard===0?renderTransactionContent():activeCard===1?renderTransactionItemContent():renderTransactionCustomerContent()}
      </div>
    )
  }

  function separate(number){
    return number===''||number===null||number===undefined?0:number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }

  function renderTransactionContent() {
    return(
      <div className="mt-5">
        <h3 className="text-center">Statistic Transaksi</h3>
        <div className="row mt-3">
          <div class="col-md-6 mb-2">
            <Containter className="container">
              <Bar 
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                    title: {
                      display: true,
                      text: 'Transaksi VS Produk',
                    },
                  },
                }}
                data={
                  {
                    labels: transaction.daily_sales.map(x=>x.interval_datetime),
                    datasets: [
                      {
                        label: 'Transaksi',
                        data: transaction.daily_sales.map(x=>x.transaction_quantity),
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                      },
                      {
                        label: 'Produk',
                        data: transaction.daily_sales.map(x=>x.item_quantity),
                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                      },
                    ],
                  }
                } 
              />
            </Containter>
          </div>
          <div class="col-md-6 mb-2">
            <Containter className="container">
              <Bar 
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                    title: {
                      display: true,
                      text: 'Nilai Transaksi',
                    },
                  },
                }} 
                data={
                  {
                    labels: transaction.daily_sales.map(x=>x.interval_datetime),
                    datasets: [
                      {
                        label: 'Nilai',
                        data: transaction.daily_sales.map(x=>x.transaction_amount),
                        backgroundColor: '#78ff78',
                      },
                    ],
                  }
                } 
              />
            </Containter>
          </div>
          <div class="col-md-6 mb-2">
            <Containter className="container">
              <Bar 
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                    title: {
                      display: true,
                      text: 'Perjam Transaksi VS Produk',
                    },
                  },
                }} 
                data={
                  {
                    labels: transaction.hourly_sales.map(x=>x.interval_datetime),
                    datasets: [
                      {
                        label: 'Transaksi',
                        data: transaction.hourly_sales.map(x=>x.transaction_quantity),
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                      },
                      {
                        label: 'Produk',
                        data: transaction.hourly_sales.map(x=>x.item_quantity),
                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                      }
                    ],
                  }
                } 
              />
            </Containter>
          </div>
          <div class="col-md-6 mb-2">
            <Containter className="container">
              <Bar 
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                    title: {
                      display: true,
                      text: 'Perjam Nilai Transaksi',
                    },
                  },
                }} 
                data={
                  {
                    labels: transaction.hourly_sales.map(x=>x.interval_datetime),
                    datasets: [
                      {
                        label: 'Nilai',
                        data: transaction.hourly_sales.map(x=>x.transaction_amount),
                        backgroundColor: '#78ff78',
                      },
                    ],
                  }
                } 
              />
            </Containter>
          </div>
        </div>
      </div>
    )
  }

  function renderTransactionItemContent() {
    return(
      <div className="mt-5">
        <h3 className="text-center">Statistic Produk</h3>
        <div className="row mt-3">
          <div class="col-md-6 mb-2">
            <Containter className="container">
              <Bar 
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                    title: {
                      display: true,
                      text: 'Produk Terjual',
                    },
                  },
                }}
                data={
                  {
                    labels: transactionItem.top_item.map(x=>x.item_name),
                    datasets: [
                      {
                        label: 'Produk',
                        data: transactionItem.top_item.map(x=>x.item_sold),
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                      }
                    ],
                  }
                } 
              />
            </Containter>
          </div>
          <div className="col-md-6 mb-2">
            <Containter className="container" style={{maxHeight:400, overflow:'auto', display: 'inline-block'}}>
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">No Transaksi</th>
                    <th scope="col">Waktu</th>
                    <th scope="col">Produk</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    transactionItem.detail_sales.map((item, index)=>(
                      <tr key={"item-"+index}>
                        <th scope="row">{index+1}</th>
                        <td>{item.transaction_id}</td>
                        <td>{moment(item.transaction_created_datetimes).format('DD MMM yyyy HH:mm:ss')}</td>
                        <td>{item.item_name}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </Containter>
          </div>
        </div>
      </div>
    )
  }

  function renderTransactionCustomerContent() {
    return(
      <div className="mt-5">
        <h3 className="text-center">Statistic Pelanggan</h3>
        <div className="row mt-3">
          <div class="col-md-6 mb-2">
            <Containter className="container">
              <Bar 
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                    title: {
                      display: true,
                      text: 'Produk Terjual',
                    },
                  },
                }}
                data={
                  {
                    labels: transactionCustomer.detail_sales.map(x=>x.customer_name),
                    datasets: [
                      {
                        label: 'Produk',
                        data: transactionCustomer.detail_sales.map(x=>x.item_quantity),
                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                      }
                    ],
                  }
                } 
              />
            </Containter>
            <Containter className="container mt-2">
              <Bar 
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                    title: {
                      display: true,
                      text: 'Nominal Transaksi',
                    },
                  },
                }}
                data={
                  {
                    labels: transactionCustomer.detail_sales.map(x=>x.customer_name),
                    datasets: [
                      {
                        label: 'Nominal',
                        data: transactionCustomer.detail_sales.map(x=>x.transaction_amount),
                        backgroundColor: '#78ff78',
                      }
                    ],
                  }
                } 
              />
            </Containter>
          </div>
          <div className="col-md-6 mb-2">
            <Containter className="container" style={{maxHeight:700, overflow:'auto', display: 'inline-block'}}>
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Pelanggan</th>
                    <th scope="col">Jumlah Transaksi</th>
                    <th scope="col">Jumlah Produk</th>
                    <th scope="col">Nominal</th>
                    <th scope="col">Rata-rata Produk</th>
                    <th scope="col">Rata-rata Nominal</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    transactionCustomer.summary_per_customer.map((item, index)=>(
                      <tr key={"cs-"+index}>
                        <th scope="row">{index+1}</th>
                        <td>{item.customer_name}</td>
                        <td>{separate(item.transaction_quantity)}</td>
                        <td>{separate(item.item_quantity)}</td>
                        <td>{separate(item.transaction_amount)}</td>
                        <td>{item.average_item_quantity_per_transaction}</td>
                        <td>{separate(item.average_transaction_amount_per_transaction)}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </Containter>
          </div>
        </div>
      </div>
    )
  }
}

const Containter = styled.div `
background:${({active})=>active ? `linear-gradient(to right, #64b3c1, #7c71d5)`:`#fff`};
border-radius: 6px;
box-shadow: 0px 3px 6px rgb(0 0 0 / 16%) !important;
display:flex;
flex-direction:column;
justify-content: center;
align-items:center;
padding:0;
width:100%;
color: #fff;
`