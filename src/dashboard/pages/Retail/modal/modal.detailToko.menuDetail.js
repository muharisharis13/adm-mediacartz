import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as Component from "../../../../component";
import * as Services from "../../../../service";
import * as Style from "../../../../component/style/content/default";
import * as Util from "../../../../util";
import { CloseCircle } from "@styled-icons/remix-fill";
import { useForm } from "react-hook-form";
import * as Modal from "./index";
import moment from "moment";

const api = Services.api.ApiRetail.toko;
const data_more = [
  { name: "Ubah" },
  { name: "Hapus" }
];

const header = [
  "No",
  "Tanggal",
  "Tipe",
  "In",
  "Out"
];

const itemsPerPage = 10;

const ModalDetailTokoMenuDetail = (props: {
  onHide: Function,
  show: boolean,
  dataProps: any,
  onDelete: Function
}) => {
  const { onHide, show, dataProps, onDelete } = props;
  const [menuFormModal, setMenuFormModal] = useState(null);
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);
  const [platformFormModal, setPlatformFormModal] = useState(null);
  const [platformSelected, setPlatformSelected] = useState(null);

  // state add merchant
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    control,
  } = useForm();

  useEffect(() => {
    setData(dataProps)
  }, [dataProps])

  const arrForm = [
    {
      title: "Nama Produk",
      text: data?.item?.item_name,
    },
    {
      title: "Stock",
      text: (
        <div className="badge-angka">{data?.menu_current_quantity}</div>
      ),
    },
    {
      title: "Harga",
      text: Util.FormatCurrency.currency(data?.menu_regular_price),
    },
    {
      title: "Harga setelah discount",
      text: Util.FormatCurrency.currency(data?.menu_discount_price),
    },
    {
      title: "Deskripsi",
      text: (
        <div
          dangerouslySetInnerHTML={{
            __html: data?.item?.item_description,
          }}
        />
      ),
    },
    {
      title: "Harga bisa di potong voucher",
      text:
        data?.menu_absolute_price_status_name === "true" ? "Tidak" : "Ya",
    },
  ];

  const btnMore = async (name) => {
    switch(name){
      case "Ubah":
        setMenuFormModal('edit')
        break

      case "Hapus":
        await Component.AlertQuestion({
          title: "Warning",
          text: `Do you want to delete ${data?.item?.item_name}`,
        }).then((res) => {
          if (res.isConfirmed) {
            //action
            deleteMenu()
          }
        });
        break
    }
  }

  const btnMorePlatform = async (name, merchant) => {
    switch(name){
      case "Ubah":
        setPlatformFormModal('edit');
        setPlatformSelected(merchant);
        break

      case "Hapus":
        await Component.AlertQuestion({
          title: "Warning",
          text: `Do you want to delete platform ${merchant.ms_merchant_payment.ms_merchant_payment_name}`,
        }).then((res) => {
          if (res.isConfirmed) {
            //action
            deletePlatform(merchant.menu_platform_id)
          }
        });
        break
    }
  }

  const deleteMenu = async () => {
    await Services.Method.delete(`menu/${data?.menu_id}`)
    .then(async (res) => {
      if (res.data.success) {
        Component.AlertSuccess({ title: "Success", text: res.success });
        onDelete();
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

  const deletePlatform = async (platform_id) => {
    await Services.Method.delete(`menu/${data?.menu_id}/menu_platform/${platform_id}`)
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
      if (error.response) {
        Component.AlertError({ title: "Error", text: error.response.data.error });
			} else {
				Component.AlertError({ title: "Error", text: 'Terjadi Kesalahan' });
			}
    });
  }

  const getData = async () => {
    api.getMenuDetail(dataProps.menu_id).then((res) => {
      if (res?.success) {
        setData(res?.data);
      }
    })
  }

  const renderHistoryList = () => {
    var item = data.menu_history;
    if(item){
      var content = [];
      for(var i=(page-1)*itemsPerPage; i<((page-1)*itemsPerPage)+itemsPerPage; i++){
        if(item[i]){
          content.push(
            <tr
              key={i}
            >
              <td data-label="No">{i+1}</td>
              <td data-label="Tanggal">{moment(item[i]?.menu_history_datetime).format('DD/MM/YYYY HH:mm:ss')}</td>
              <td data-label="Tipe">{item[i]?.ms_reference?.ms_reference_name}</td>
              <td data-label="In">{item[i]?.menu_history_credit}</td>
              <td data-label="Out">{item[i]?.menu_history_debit}</td>
            </tr>
          )
        }
      }

      return content
    }else{
      return null
    }
  }

  return (
    <Component.Modal_Component
      size="lg"
      title={"Detail Menu"}
      onHide={onHide}
      show={show}
    >
      {
        menuFormModal ? (
          <Modal.ModalFormMenu
            show={menuFormModal}
            onHide={() => setMenuFormModal(null)}
            onSubmit={()=> {
              getData();
              setMenuFormModal(false)
            }}
            storeId={data?.store_id}
            data={data}
          />
        ): platformFormModal?(
          <Modal.ModalFormPlatform
            show={platformFormModal}
            onHide={() => setPlatformFormModal(null)}
            onSubmit={()=> {
              getData();
              setPlatformFormModal(false)
            }}
            data={platformSelected}
            menuId={data?.menu_id}
          />
        ):(
          <Container>
            <div className="wrap-header d-flex flex-row mb-2">
              <div className="flex-grow-1">
                <buttton className="btn border" onClick={onHide}>
                  Kembali
                </buttton>
              </div>
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
                id={dataProps.menu_id}
                onClick={({ name, id }) => btnMore(name)}
              />
            </div>

            <div className="wrap-banner">
              <Component.Carousel.CarouselBanner
                ArrImage={data?.item?.item_image}
              />
            </div>

            <div className="wrap-header mt-3">
              <h5 className=" mb-2">Informasi Produk</h5>
              {arrForm?.map((item: any, idx: number) => (
                <div key={idx} className="wrap-content">
                  <div className="title">{item.title}</div>
                  <div className="subTitle">{item.text}</div>
                </div>
              ))}
            </div>

            <div className="wrap-platform mt-3 ">
              <div className="d-flex gap-4 align-items-center mb-3">
                <h5>Harga Platform</h5>
                <Style.ButtonPrimary onClick={() => setPlatformFormModal('add')}>
                  Tambah Platform
                </Style.ButtonPrimary>
              </div>

              <div
                className="list-platform d-grid align-items-center gap-2"
                style={{ gridTemplateRows: "1fr" }}
              >
                {
                  data?.menu_platform?.length === 0 ? (
                    <div>Platform Tidak Ditemukan</div>
                  ):data?.menu_platform?.map((item: any, idx: number) => (
                    <div key={idx} className="card-platform">
                      <div className="header">
                        <div className="title">
                          {item?.ms_merchant_payment?.ms_merchant_payment_name}
                        </div>
                        <div className="remove">
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
                          id={item.menu_platform_id}
                          onClick={({ name, id }) => btnMorePlatform(name, item)}
                        />
                        </div>
                      </div>
                      <div className="content">
                        <div className="title">Harga</div>
                        <div className="dot">:</div>
                        <div className="text">
                          {Util.FormatCurrency.currency(
                            item?.menu_platform_regular_price
                          )}
                        </div>
                      </div>
                      {item?.menu_platform_discount_price && (
                        <div className="content">
                          <div className="title">Diskon</div>
                          <div className="dot">:</div>
                          <div className="text">
                            {Util.FormatCurrency.currency(
                              item?.menu_platform_discount_price
                            )}
                          </div>
                        </div>
                      )}
                      {item?.menu_platform_link && (
                        <div className="content">
                          <div className="title">Link</div>
                          <div className="dot">:</div>
                          <div className="text">
                            <a href={item?.menu_platform_link} target="_blank">
                              {item?.menu_platform_link}
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                }
              </div>
            </div>

            <div className="wrap-header mt-3">
              <h5 className="mb-2">History</h5>
              <div style={{backgroundColor:'#fff'}}>
                <Component.TableData header={header}>
                  {
                    data?.menu_history?.length === 0 ? (
                      <tr>
                        <td colSpan={header.length} className="text-center">
                          <div>Data Tidak Ditemukan</div>
                        </td>
                      </tr>
                    ) : renderHistoryList()
                  }
                </Component.TableData>
                {
                  data?.menu_history?.length > 0 &&
                  <div className="pb-2 pt-2">
                    <Component.Pagination
                      page={page}
                      totalPage={Math.ceil(data?.menu_history?.length/itemsPerPage)}
                      handleOnChange={(e) => setPage(e.selected+1)}
                    />
                  </div>
                }
              </div>
            </div>
          </Container>
        )
      }
    </Component.Modal_Component>
  ) 
}

export default ModalDetailTokoMenuDetail;

const Container = styled.div`
  a {
    color: blue;
    &:hover {
      text-decoration: underline;
    }
  }
  .card-platform {
    border-radius: 0.5rem;
    padding: 10px;
    background-color: #fff;
    min-width: 200px;
    width: 100%;

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title {
        font-weight: 700;
      }
    }

    .content {
      display: flex;
      align-items: baseline;
      width: 400px;
      .title {
        font-weight: 500;
        color: darkgray;
        width: 40%;
      }
      .dot {
        width: 5%;
      }
      .text {
        width: 55%;
      }
    }
  }
  .badge-angka {
    background-color: green;
    color: #fff;
    /* width: 80px; */
    bottom: 2px;
    border-radius: 1rem;
    font-weight: 500;
    font-size: 13px;
    padding: 2px 7px;
    min-width: 50px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .wrap-content {
    .title {
      font-weight: 700;
      width: 40%;
    }
    .subTitle {
      width: 60%;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    }
    display: flex;
    align-items: center;
    padding: 5px;
    background-color: #fff;
    border-bottom: thin solid #ccc;
  }
`;
