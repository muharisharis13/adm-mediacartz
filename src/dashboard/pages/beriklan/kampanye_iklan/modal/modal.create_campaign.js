import React, { useEffect, useState, useContext } from "react";
import { Modal } from "react-bootstrap";
import { Form } from "../../../../../component";
import {
  HeaderPrimary,
  COLOR_PRIMARY,
  COLOR_SECONDARY,
  ButtonPrimary,
} from "../../../../../component/style/content/default";
import styled from "styled-components";
import Select from "react-select";
import { ChevronCircleLeft, Plus } from "@styled-icons/fa-solid";
import { api_kampanye_iklan } from "../../../../../service/api";
import { Modal_create_campaign_email } from "./modal.create_campaign_email";
import { Modal_create_campaign_dooh } from "./modal.dooh/modal.create_campaign_dooh";
import { Modal_create_campaign_tv } from "./modal.tv&radio/modal.create_campaign_tv";
import * as ModalSocialMedia from "./modal.socialMedia";
import { Context } from "../../../../../service";

// modal company
import * as ModalCompany from "../../../company/modal";

const media = ["Messaging", "Digital Signage", "TV & Radio", "Social Media"];

const inventory = [
  "BROADCAST",
  "LBA",
  "TARGETED",
  "SIGNAGE",
  "SPOT",
  "INFLUENCER",
];

const channel = [
  "EMAIL",
  "SMS",
  "MMS",
  "USSD",
  "DOOH",
  "TV",
  "RADIO",
  "YOUTUBE",
  "INSTAGRAM",
  "FACEBOOK",
  "TWITTER",
];

export const Modal_create_campaign = ({ show, onHide, props }) => {
  const [media1, setMedia] = useState([]);
  const [selected_media, setSelected_media] = useState({ name: "", id: null });
  const [inventory1, setInventory] = useState([]);
  const [selected_inv, setSelected_inv] = useState({ name: "", id: null });
  const [channel1, setChannel] = useState([]);
  const [selected_channel, setSelected_channel] = useState({
    name: "",
    id: null,
  });
  const [product, setProduct] = useState([]);
  const [optionsCompany, setOptionsCompany] = useState([]);
  const [selected_company, setSelected_company] = useState("");
  const [modal, setModal] = useState({
    email: false,
    dooh: false,
    tv: false,
    companyCreate: false,
  });
  const { dispatch } = useContext(Context);

  const get_data = async () => {
    await api_kampanye_iklan.get_ms_product().then((res) => {
      if (res?.success) {
        setMedia(res.data);
      }
      console.log({ get_ms_product: res });
    });

    await api_kampanye_iklan.get_product().then((res) => {
      console.log({ get_product: res });
      if (res?.success) {
        setProduct(res.data);
      }
    });

    await api_kampanye_iklan.get_company().then((res) => {
      if (res?.success) {
        setOptionsCompany(
          res.data.map((item) => ({
            value: item.company_id,
            label: item.company_name,
          }))
        );
        if (res.data.length === 1) {
          setSelected_company({
            value: res.data[0].company_id,
            label: res.data[0].company_name,
          });
          dispatch({
            type: "SELECTED_COMPANY",
            selected_company: {
              value: res.data[0].company_id,
              label: res.data[0].company_name,
            },
          });
        }
      }
    });
  };

  const btnSelectedMedia = (item) => {
    console.log("ini dia", item);
    setSelected_media({
      ...selected_media,
      id: item.ms_product_id,
      name: item.ms_product_name,
    });

    let product = item.product
      .map((item2) => ({
        ms_channel_id: item2.ms_channel.ms_channel_id,
        ms_channel_name: item2.ms_channel.ms_channel_name,
      }))
      .map((item) => item.ms_channel_id);

    setInventory(
      item.product.filter(
        ({ ms_channel_id }, index) =>
          !product.includes(ms_channel_id, index + 1)
      )
    );
    if (optionsCompany.length !== 1) {
      setSelected_company("");
    }
    setSelected_channel({ name: "", id: null });
    setSelected_inv({ name: "", id: null });
  };

  useEffect(() => {
    if (show === true) {
      get_data();
    }
  }, [show]);

  useEffect(async () => {
    if (props?.ms_product_id) {
      setSelected_media({
        ...selected_media,
        id: props?.ms_product_id,
        name: props?.ms_product_name,
      });
      let find_inventory = (await media1.find(
        (find) => find.ms_product_id === props?.ms_product_id
      )?.product)
        ? media1.find((find) => find.ms_product_id === props?.ms_product_id)
            ?.product
        : [];

      let product = find_inventory
        .map((item2) => ({
          ms_channel_id: item2.ms_channel.ms_channel_id,
          name: item2.ms_channel.ms_channel_name,
        }))
        .map((item) => item.ms_channel_id);

      setInventory(
        find_inventory.filter(
          ({ ms_channel_id }, index) =>
            !product.includes(ms_channel_id, index + 1)
        )
      );
      if (optionsCompany.length !== 1) {
        setSelected_company("");
      }
      setSelected_channel({ name: "", id: null });
      setSelected_inv({ name: "", id: null });
      // console.log("ada dia",find_inventory)
    }
  }, [props?.ms_product_id]);

  const btnSelectedInventory = (item) => {
    setSelected_inv({
      ...selected_inv,
      id: item.ms_channel.ms_channel_id,
      name: item.ms_channel.ms_channel_name,
    });

    let productArr = product.filter(
      (fil) =>
        fil.ms_channel.ms_channel_name === item.ms_channel.ms_channel_name
    );
    setChannel(productArr);
  };

  const btnSelectedChannel = (item) => {
    dispatch({ type: "SET_PRODUCT_ID", product_id: item.product_id });
    setSelected_channel({
      ...selected_channel,
      id: item.ms_inventory.ms_inventory_id,
      name: item.product_name,
    });
  };

  const btnContinues = () => {
    console.log(selected_channel);
    if (selected_channel.name === "DOOH Signage") {
      setModal({ ...modal, dooh: true });
    } else if (
      selected_channel.name === "Youtube Influencer" ||
      selected_channel.name === "Instagram Influencer" ||
      selected_channel.name === "Facebook Influencer" ||
      selected_channel.name === "Twitter Influencer"
    ) {
      setModal({ ...modal, social: true });
    } else if (selected_channel.name === "TV Spot") {
      setModal({ ...modal, tv: true });
    } else {
      setModal({ ...modal, email: true });
    }
  };

  const send_props = {
    selected_media,
    selected_inv,
    selected_channel,
    selected_company,
  };

  return (
    <Modal show={show} onHide={onHide} fullscreen>
      <Modal.Body>
        <Modal_create_campaign_email
          show={modal.email}
          onHide={() => setModal({ ...modal, email: false })}
          props={send_props}
        />

        <Modal_create_campaign_dooh
          show={modal.dooh}
          onHide={() => setModal({ ...modal, dooh: false })}
        />

        <Modal_create_campaign_tv
          show={modal.tv}
          onHide={() => setModal({ ...modal, tv: false })}
        />

        <ModalSocialMedia.Modal_create_campaign_social_media
          show={modal.social}
          onHide={() => setModal({ ...modal, social: false })}
          props={send_props}
        />

        <ModalCompany.Modal_create
          show={modal.companyCreate}
          onHide={() =>
            setModal((state) => ({ ...state, companyCreate: false }))
          }
          getData={get_data}
        />

        <div>
          <div className="container mb-5 mb-md-5">
            <div className="text-center">
              <HeaderPrimary color={COLOR_PRIMARY}>
                Buat iklan apa hari ini?
              </HeaderPrimary>
              <div>
                Pilih penayangan terbaik dalam beriklan melalui Mediacartz. Anda
                dapat memilih untuk menampilkan teks atau foto pada pesan
                singkat (SMS / MMS / Pop-Up) layanan Telko, video di iklan TV,
                promo bersama Influencer atau membuat situs promosi event anda
                sendiri.
              </div>
            </div>
          </div>

          <div className="container">
            <Form>
              <div className="mb-3 mb-md-3">
                <div className="d-flex justify-content-between">
                  <SpanTitle>Media Iklan</SpanTitle>
                  <div>
                    <button
                      className="btn align-items-center justify-content-center d-flex border"
                      style={{ color: "#aaa" }}
                      onClick={() => onHide()}
                    >
                      <ChevronCircleLeft width={20} /> &nbsp;
                      <strong>Kembali</strong>
                    </button>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-around">
                  <hr style={{ width: "40%" }} />
                  <span>Pilih Media Tayang Iklan Anda</span>
                  <hr style={{ width: "40%" }} />
                </div>
              </div>

              <div>
                <div className="row mb-3 mb-md-3">
                  {media1.map((item, idx) => (
                    <div key={idx} className="col-lg-3 col-md-3 col-sm-12">
                      <ContainerButton
                        active={
                          selected_media.name === item.ms_product_name &&
                          selected_media.id === item.ms_product_id
                            ? true
                            : false
                        }
                        onClick={() => btnSelectedMedia(item)}
                      >
                        {item.ms_product_name}
                      </ContainerButton>
                    </div>
                  ))}
                </div>
                {selected_media.name && (
                  <div className="row mb-3 mb-md-3">
                    <div className="d-flex align-items-center justify-content-around">
                      <hr style={{ width: "40%" }} />
                      <span>Pilih Jenis Inventory</span>
                      <hr style={{ width: "40%" }} />
                    </div>

                    <div className="row justify-content-center align-items-center">
                      {inventory1
                        .filter(
                          (filter) =>
                            filter.ms_channel?.ms_channel_name !== "OTP"
                        )
                        .map((item, idx) => (
                          <div
                            key={idx}
                            className="col-lg-3 col-md-3 col-sm-12"
                          >
                            <ContainerButton
                              active={
                                selected_inv.name ===
                                  item.ms_channel.ms_channel_name &&
                                selected_inv.id ===
                                  item.ms_channel.ms_channel_id
                                  ? true
                                  : false
                              }
                              onClick={() => btnSelectedInventory(item)}
                            >
                              {!!item.ms_channel &&
                                item.ms_channel.ms_channel_name}
                            </ContainerButton>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {selected_inv.name && (
                  <div className="mb-3 mb-md-3">
                    <div className="d-flex align-items-center justify-content-around">
                      <hr style={{ width: "40%" }} />
                      <span>Pilih Jenis channel</span>
                      <hr style={{ width: "40%" }} />
                    </div>

                    <div className="row justify-content-center align-items-center">
                      {channel1.map((item, idx) => (
                        <div key={idx} className="col-lg-3 col-md-3 col-sm-12">
                          <ContainerButton
                            active={
                              selected_channel.id ===
                                item.ms_inventory.ms_inventory_id &&
                              selected_channel.name === item.product_name
                                ? true
                                : false
                            }
                            onClick={() => btnSelectedChannel(item)}
                          >
                            {item.product_name}
                          </ContainerButton>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selected_channel.name && (
                  <div className="mb-3 mb-md-3">
                    <div className="d-flex align-items-center justify-content-around">
                      <hr style={{ width: "40%" }} />
                      <span>Pilih Perusahaan</span>
                      <hr style={{ width: "40%" }} />
                    </div>
                    <div className="row mb-3 mb-md-3">
                      <div className="col-md-11 col-sm-11 col-lg-11">
                        <Select
                          placeholder="Pilih Perusahaan"
                          options={optionsCompany}
                          value={selected_company}
                          onChange={(e) => {
                            setSelected_company(e);
                            dispatch({
                              type: "SELECTED_COMPANY",
                              selected_company: e,
                            });
                          }}
                          isDisabled={
                            optionsCompany.length === 1 ? true : false
                          }
                          style={{ width: "100%" }}
                        />
                      </div>
                      <div className="col-lg-1 col-md-1 col-sm-1">
                        <button
                          className="btn border rounded-circle"
                          onClick={() =>
                            setModal((state) => ({
                              ...state,
                              companyCreate: true,
                            }))
                          }
                        >
                          <Plus width={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {selected_company?.value &&
              selected_channel?.id &&
              selected_inv?.id &&
              selected_media?.id ? (
                <div>
                  <div className="d-flex align-items-center justify-content-center text-center">
                    <ButtonPrimary onClick={btnContinues}>
                      Lanjutkan ke Pengisian Iklan
                    </ButtonPrimary>
                  </div>
                </div>
              ) : null}
            </Form>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const SpanTitle = styled.span`
  color: ${COLOR_PRIMARY};
  font-size: 18pt;
`;

const ContainerButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  padding: 15px 0px;
  margin: 10px 0px;
  width: 100%;
  border-radius: 7px;
  background: ${({ active }) => (active ? COLOR_SECONDARY : "#fff")};
  border-color: ${({ active }) => (active ? COLOR_SECONDARY : null)};
  ${({ active }) =>
    active &&
    `box-shadow:0 0 5px ${COLOR_SECONDARY},0 0 15px ${COLOR_SECONDARY},0 0 10px ${COLOR_SECONDARY},0 0 20px ${COLOR_SECONDARY}`};
  font-weight: 650;
  color: ${({ active }) => (active ? "#fff" : "#ccc")};
  font-size: 14pt;
  transition: 250ms;

  &:hover {
    background: ${COLOR_SECONDARY};
    color: #fff;
    border-color: ${COLOR_SECONDARY};
    box-shadow: 0 0 5px ${COLOR_SECONDARY}, 0 0 15px ${COLOR_SECONDARY},
      0 0 10px ${COLOR_SECONDARY}, 0 0 20px ${COLOR_SECONDARY};
  }
`;
