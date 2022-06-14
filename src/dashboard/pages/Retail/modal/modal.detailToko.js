import React, { useState, useEffect } from "react";
import * as Component from "../../../../component";
import * as Services from "../../../../service";
import * as Util from "../../../../util";
import { Card } from "../../../../component/1.LANDINGPAGE";
import styled from "styled-components";
import { Tabs, Tab } from "react-bootstrap";
import ModalDetailTokoMenuDetail from "./modal.detailToko.menuDetail";
import * as Style from "../../../../component/style/content/default";
import {QRCodeSVG} from 'qrcode.react';
import * as Modal from "./index";

const api = Services.api.ApiRetail.toko;

const ModalDetailToko = (props: {
  show: boolean,
  onHide: Function,
  dataProps: any,
  onEdit: Function,
  onStatusChange: Function,
  onQrCode: Function
}) => {
  const { show, onHide, dataProps, onEdit, onStatusChange, onQrCode } = props;
  const { store, menu } = dataProps;
  const [key, setKey] = useState("home");
  const [boolMenuDetail, setBoolMenuDetail] = useState(false);
  const [dataPropsMenuDetail, setDataPropsMenuDetail] = useState({});
  const [menuFormModal, setMenuFormModal] = useState(null);
  const [menuData, setMenuData] = useState({});
  const [map, setMap] = useState({});

  useEffect(() => {
    if (show === true) {
      if (menu) {
        setKey(Object.keys(menu)[0]);
      }
      setDataPropsMenuDetail({});
      setBoolMenuDetail(false);
    }
  }, [show]);

  const GetMenuDetail = (menu_id) => {
    api.getMenuDetail(menu_id).then((res) => {
      if (res?.success) {
        setDataPropsMenuDetail(res?.data);
        setBoolMenuDetail(true);
      } else {
        Component.AlertError({ title: "Error", text: res?.error });
      }
    });
  };

  const BtnMenuDetail = async (menu_id) => {
    await Promise.all([GetMenuDetail(menu_id)]);
  };

  const getDataMenu = () => {
    api.getTokoDetalMenu(store?.store_id).then((res) => {
      console.log('menu', res)
      if (res?.success) {
        setMenuData(res?.data?.menu);
        setMenuFormModal(false)
      }
    })
  }

  console.log('dataProps', dataProps);

  useEffect(()=>{
    setMenuData(dataProps.menu)
    loadMap()
  }, [dataProps, show])

  useEffect(()=>{
    loadMap()
  }, [boolMenuDetail, menuFormModal])

  const loadMap = () => {
    if(dataProps.store){
      const coordinate = dataProps?.store?.store_coordinate?.split(",");
      const docMap = document.getElementById("mapDetail");
      if(docMap){
        const mapData = new window.google.maps.Map(docMap, {
          center: {
            lat: parseFloat(coordinate[0]),
            lng: parseFloat(coordinate[1]),
          },
          zoom: 13,
          zoomControl: false,
          gestureHandling: "none",
        })

        new window.google.maps.Marker({
          map: mapData,
          position: {lat: parseFloat(coordinate[0]), lng: parseFloat(coordinate[1]),}
        });
      }
    }
  }

  useEffect(()=>{
    if(menuData){
      setKey(Object.keys(menuData)[0])
    }
  }, [menuData])

  return (
    <Component.Modal_Component
      size="lg"
      title={"Detail Toko"}
      onHide={onHide}
      show={show}
    >
      {boolMenuDetail ? (
        <ModalDetailTokoMenuDetail
          onHide={() => setBoolMenuDetail(false)}
          show={boolMenuDetail}
          dataProps={dataPropsMenuDetail}
          onDelete={()=>{
            setBoolMenuDetail(false);
            getDataMenu();
          }}
        />
      ) : menuFormModal ? (
        <Modal.ModalFormMenu
          show={menuFormModal}
          onHide={() => setMenuFormModal(null)}
          onSubmit={()=>getDataMenu()}
          storeId={store?.store_id}
        />
      ):(
        <Container>
          <div className="wrap-information">

            <div className="d-flex">
              <Style.ButtonPrimary
                onClick={onEdit}
              >
                Edit
              </Style.ButtonPrimary>

              <Style.ButtonPrimary
                className="ms-2"
                onClick={onStatusChange}
              >
                {store?.store_active_status===1?'Inactivate':'Activate'}
              </Style.ButtonPrimary>
            </div>
            <div className="mb-5 mt-3 d-flex flex-row">
              <div className="image">
                <img src={store?.store_logo} alt={store?.store_name} />
              </div>
              <div className="ms-4">
                <QRCodeSVG value={store?.store_page} />
              </div>
            </div>

            <div className="mb-2 list-info d-flex flex-wrap">
              <div className="title">Nama Store</div>
              <div className="content">{store?.store_name}</div>
            </div>
            <div className="mb-2 list-info d-flex flex-wrap">
              <div className="title">Status</div>
              <div className="content d-flex gap-1">
                <div
                  dangerouslySetInnerHTML={{
                    __html: Util.displayStatus(store?.store_active_status_name),
                  }}
                />
              </div>
            </div>
            <div className="mb-2 list-info d-flex flex-wrap">
              <div className="title">Alamat Store</div>
              <div className="content d-flex flex-wrap">
                {`${store?.store_address} - ${store?.store_zip}`}
              </div>
            </div>
            <div
              id="mapDetail"
              className="mt-2 mb-2"
              style={{ width: "100%", height: "400px" }}
            />
            <div className="mb-2 list-info d-flex flex-wrap">
              <div className="title">Instagram</div>
              <div className="content">{store?.store_instagram}</div>
            </div>
            <div className="mb-2 list-info d-flex flex-wrap">
              <div className="title">Facebook</div>
              <div className="content">{store?.store_facebook}</div>
            </div>
            <div className="mb-2 list-info d-flex flex-wrap">
              <div className="title">Twitter</div>
              <div className="content">{store?.store_twitter}</div>
            </div>
            <div className="mb-2 list-info d-flex flex-wrap">
              <div className="title">Youtube</div>
              <div className="content">{store?.store_youtube}</div>
            </div>
            <div className="mb-2 list-info d-flex flex-wrap">
              <div className="title">Jam Buka</div>
              <div className="content">
              {
                store?.store_operation_time?(
                  <div>
                    <div className="d-flex flex-row align-ietms-center">
                      <label style={{width:60}}>Senin</label>
                      <label style={{flex:1}}>{store?.store_operation_time[0]?store?.store_operation_time[0]:'Tutup'}</label>
                    </div>
                    <div className="d-flex flex-row align-ietms-center">
                      <label style={{width:60}}>Selasa</label>
                      <label style={{flex:1}}>{store?.store_operation_time[1]?store?.store_operation_time[1]:'Tutup'}</label>
                    </div>
                    <div className="d-flex flex-row align-ietms-center">
                      <label style={{width:60}}>Rabu</label>
                      <label style={{flex:1}}>{store?.store_operation_time[2]?store?.store_operation_time[2]:'Tutup'}</label>
                    </div>
                    <div className="d-flex flex-row align-ietms-center">
                      <label style={{width:60}}>Kamis</label>
                      <label style={{flex:1}}>{store?.store_operation_time[3]?store?.store_operation_time[3]:'Tutup'}</label>
                    </div>
                    <div className="d-flex flex-row align-ietms-center">
                      <label style={{width:60}}>Jumat</label>
                      <label style={{flex:1}}>{store?.store_operation_time[4]?store?.store_operation_time[4]:'Tutup'}</label>
                    </div>
                    <div className="d-flex flex-row align-ietms-center">
                      <label style={{width:60}}>Sabtu</label>
                      <label style={{flex:1}}>{store?.store_operation_time[5]?store?.store_operation_time[5]:'Tutup'}</label>
                    </div>
                    <div className="d-flex flex-row align-ietms-center">
                      <label style={{width:60}}>Minggu</label>
                      <label style={{flex:1}}>{store?.store_operation_time[6]?store?.store_operation_time[6]:'Tutup'}</label>
                    </div>
                  </div>
                ):(
                  <label>Buka Terus</label>
                )
              }
              </div>
            </div>
          </div>
          <div className="list-info wrap-tab mt-5">
            <b>Photo</b>
            <div className="mt-3" style={{display:'block', overflowX:'auto',whiteSpace:'nowrap', paddingBottom: 10}}>
              <div className="d-flex flex-row">
                {
                  dataProps?.store?.store_image?.map((item, index)=>(
                    <a href={item} target="_blank" key={'photo-'+index.toString()}>
                      <img src={item} className="me-2" style={{width:'auto', height: 120}}/>
                    </a>
                  ))
                }
              </div>
            </div>
          </div>

          <div className="wrap-tab mt-5">
            <div className="d-flex flex-row align-items-center">
              <h5 className="me-4">Menu</h5>
              <Style.ButtonPrimary onClick={() => setMenuFormModal('add')}>
                Tambah Menu
              </Style.ButtonPrimary>
            </div>
            <Tabs
              id="controlled-tab-example"
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className="mb-3"
            >
              {menuData &&
                Object.keys(menuData)?.map((item: any, idx: number) => (
                  <StyledTab eventKey={item} title={item} key={idx}>
                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{ width: "100%" }}
                    >
                      <div
                        className="list-product d-grid gap-4"
                        style={{ gridTemplateColumns: "1fr 1fr 1fr" }}
                      >
                        {menuData[item]?.map((menu: any, idxMenu: number) => (
                          <Card.CardProduct
                            menu={menu}
                            key={idxMenu}
                            onClickDetail={() => BtnMenuDetail(menu.menu_id)}
                          />
                        ))}
                      </div>
                    </div>
                  </StyledTab>
                ))}
            </Tabs>
          </div>
        </Container>
      )}
    </Component.Modal_Component>
  );
};

export default ModalDetailToko;

const StyledTab = styled(Tab)``;

const Container = styled.div`
  .wrap-information {
    .image {
      width: 120px;
      height: 120px;
      overflow: hidden;
      border-radius: 9999px;
      img {
        width: 100%;
      }
    }

    .list-info {
      .title {
        font-weight: 700;
        min-width: 150px;
      }
      .content {
        width: 450px;
      }
    }
  }
`;
