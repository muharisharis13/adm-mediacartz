import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import * as Components from "../../../component";
import * as Style from "../../../component/style/content/default";
import * as Services from "../../../service";
import * as Util from "../../../util";
import styled from "styled-components";
import * as Modal from "./modal";
import { Context, Method } from "../../../service";
import {
  Whatsapp,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
} from "@styled-icons/boxicons-logos";
import { Email } from "@styled-icons/material-outlined";

const api = Services.api.ApiRetail.toko;
export default function Toko() {
  const { selected_company, dispatch } = useContext(Services.Context);
  const [data, setData] = useState({
    data: [],
    page: 1,
    lastPage: 1,
  });
  const [modal, setModal] = useState({
    company: false,
    detail: false,
    create: false
  });
  const [dataProps, setDataProps] = useState({});

  const GetList = async (page) => {
    if (selected_company?.value) {
      await api.getListToko(selected_company?.value, page).then((res) => {
        if (res?.success) {
          setData((state) => ({
            ...state,
            data: res?.data,
            page: res?.page,
            lastPage: res?.last_page,
          }));
        }
      });
    }
  };

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

  useEffect(() => {
    GetCompany();
  }, []);

  useEffect(() => {
    if (selected_company.value) {
      GetList(data?.page);
    }
  }, [selected_company.value]);

  const BtnPagination = async (e) => {
    await GetList(e.selected + 1);
  };

  const BtnDetail = async (store_id) => {
    await Promise.all([
      api.getTokoDetalMenu(store_id).then((res) => {
        if (res?.success) {
          setDataProps(res?.data);
        }
      }),
      setModal((state) => ({ ...state, detail: true })),
    ]);
  };

  console.log({ dataProps });

  const changeStatus = async () => {
    var status = '';
    if(dataProps.store.store_active_status === 1){
      status = 'inactivate';
    }else{
      status = 'activate';
    }

    await api.putTokoStatus(dataProps.store.store_id, status).then((res) => {
      if (res?.success) {
        BtnDetail(dataProps.store.store_id);
      }else{
        Components.AlertError({ title: "Error", text: res?.error });
      }
    }).catch((err)=>{
      console.log(err.response);
    })
  }

  const editStore = () => {
    setModal((state) => ({ ...state, create: true, detail: false }))
  }

  return (
    <Style.ContainerContent>
      {/* MODAL =========== */}
      <Modal.ModalSelectCompany
        show={modal.company}
        onHide={() => setModal((state) => ({ ...state, company: false }))}
      />

      <Modal.ModalDetailToko
        show={modal.detail}
        onHide={() => setModal((state) => ({ ...state, detail: false }))}
        dataProps={dataProps}
        onEdit={() => editStore()}
        onStatusChange={() => changeStatus()}
      />

      <Modal.ModalTambahToko
        show={modal.create}
        data={dataProps.store?dataProps.store:null}
        onHide={() => setModal((state) => ({ ...state, create: false, detail: dataProps.store?true:false }))}
        onSubmit={()=>GetList()}
        onEdit={()=>BtnDetail(dataProps.store.store_id)}
      />

      <div className="d-flex">
        <Style.HeaderPrimary color={Style.COLOR_PRIMARY}>
          Daftar Toko
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

      <div className="mt-lg-5">
        <div className="wrap-select d-flex align-items-center gap-2">
          <Style.ButtonPrimary
            onClick={() => {
              setDataProps({})
              setTimeout(()=>{
                setModal((state) => ({ ...state, create: true }))
              }, 500)
            }}
          >
            Tambah Toko
          </Style.ButtonPrimary>
        </div>

        <div className="d-flex align-items-center justify-content-center">
          {
            data?.data.length > 0 ?(
              <div
                className="wrap-list-toko d-grid mt-5 gap-4"
                style={{ gridTemplateColumns: "repeat( 5, 1fr )" }}
              >
                {
                  data?.data.map((item: any, idx: number) => (
                    <Card className="card" key={idx}>
                      <div className="wrap-image">
                        <img src={item.store_logo} alt={item.store_name} />
                      </div>
                      <div className="wrap-title mb-2 mt-2">
                        <strong>{item.store_name}</strong>
                      </div>
                      <div className="wrap-city">
                        <small>
                          <div>{item.store_address}</div>
                        </small>
                      </div>
                      <div className="wrap-contact d-flex flex-column gap-1 mt-4 mb-4">
                        {item?.store_phone && (
                          <div className="d-flex align-items-center gap-1">
                            <Whatsapp width={20} height={20} color="gray" />
                            <div>{item.store_phone}</div>
                          </div>
                        )}
                        {item?.store_email && (
                          <div className="d-flex align-items-center gap-1">
                            <Email width={20} height={20} color="gray" />
                            <div>{item.store_email}</div>
                          </div>
                        )}
                        {item?.store_instagram && (
                          <div className="d-flex align-items-center gap-1">
                            <Instagram width={20} height={20} color="gray" />
                            <div>{item.store_instagram}</div>
                          </div>
                        )}
                        {item?.store_facebook && (
                          <div className="d-flex align-items-center gap-1">
                            <Facebook width={20} height={20} color="gray" />
                            <div>{item.store_facebook}</div>
                          </div>
                        )}
                        {item?.store_twitter && (
                          <div className="d-flex align-items-center gap-1">
                            <Twitter width={20} height={20} color="gray" />
                            <div>{item.store_twitter}</div>
                          </div>
                        )}
                        {item?.store_youtube && (
                          <div className="d-flex align-items-center gap-1">
                            <Youtube width={20} height={20} color="gray" />
                            <div>{item.store_youtube}</div>
                          </div>
                        )}
                      </div>
  
                      <div className="wrap-button">
                        <a href="#" onClick={() => BtnDetail(item.store_id)}>
                          View Detail
                        </a>
                      </div>
                    </Card>
                  ))
                }
              </div>
            ):(
              <div className="text-center mt-5">Data Tidak Ditemukan</div>
            )
          }
        </div>

        <div className="wrap-pagination mt-5">
          {data?.data?.length > 0 && (
            <Components.Pagination
              totalPage={data?.lastPage}
              page={data?.page}
              handleOnChange={BtnPagination}
            />
          )}
        </div>
      </div>
    </Style.ContainerContent>
  );
}

const Card = styled.div`
  .wrap-button {
    a {
      font-size: 10pt;
      text-decoration: underline;
      &:hover {
        color: ${Style.COLOR_SECONDARY};
      }
    }
  }
  .wrap-contact {
    font-size: 10pt;
    color: gray;
  }
  .wrap-city {
    min-height: 50px;
    div {
      font-size: 8pt;
      color: #737373;
    }
  }
  .wrap-title {
    strong {
      font-weight: 600;
    }
  }
  .wrap-image {
    width: 110px;
    height: 110px;
    object-fit: cover;
    border-radius: 9999px;
    border: thin solid #ccc;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
  background-color: #fff;
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 200px;
  width: 100%;
  padding: 20px 20px 10px;
  box-shadow: 2px 2px 5px 0px rgb(0 0 0 / 34%);
  transition: 250ms;
  flex: 1 1 auto;

  &:hover {
    transform: translateY(-5%);
  }
`;
