import React, { useState, useEffect, useContext } from "react";
import { Modal } from "react-bootstrap";
import { AlertError, Form, IdxContentBuilder } from "../../../../../component";
import {
  COLOR_PRIMARY,
  HeaderPrimary,
  Label,
  COLOR_SECONDARY,
  ButtonPrimary,
  ButtonDanger,
} from "../../../../../component/style/content/default";
import Priview_email from "../../../../../asset/preview/preview-email.png";
import Priview_sms from "../../../../../asset/preview/preview-sms.png";
import styled from "styled-components";
import Select from "react-select";
import { PlusCircle } from "@styled-icons/bootstrap";
import { Modal_konfirmasi } from "./konfirmasi/modal.konfirmasi";
import { Modal_tambah_sender } from "../../../beriklan/sender_id/modal/modal.tambahSender";
import { Modal_tipe_broadcast } from "../../../beriklan/penerima/modal/buat_baru/modal.tipe_broadcast";
import { Modal_tipe_target } from "../../../beriklan/penerima/modal/buat_baru/modal.tipe_target";
import { api_kampanye_iklan } from "../../../../../service/api";
import * as ModalTemplate from "../../../beriklan/template/modal";
import { Context } from "../../../../../service";
import DatePicker from "react-datepicker";

const opt_variable = [
  { value: 1, label: "ON" },
  { value: 0, label: "OFF" },
];

export const Modal_create_campaign_email = ({ show, onHide, props }) => {
  const [selected_schedule, setSelected_schedule] = useState("Kirim Sekarang");
  const [modal, setModal] = useState({
    konfirmasi: false,
    sender_id: false,
    penerima: false,
    content_builder: false,
    template: false,
  });
  const [input, setInput] = useState({
    nama_iklan: "",
    selected_sender: "",
    selected_penerima: "",
    selected_template: "",
    subject_email: "",
    konten_builder: "",
    variabel: { value: 1, label: "ON" },
    attachment_file: "",
    from_date: null,
    end_date: null,
  });
  const [options, setOptions] = useState({
    sender_id: [],
    penerima: [],
    template: [],
  });
  const [props2, setProps] = useState(props);
  const { current_campaign, selected_company, dispatch } = useContext(Context);

  console.log("ini penerima", input.selected_penerima);

  const btnKonfirmasi = () => {
    if (
      input.nama_iklan &&
      input.selected_penerima &&
      input.selected_template &&
      input.konten_builder
    ) {
      setModal({ ...modal, konfirmasi: true });
    } else {
      AlertError({ title: "ERROR", text: "Please check your input" });
    }
  };

  const onChangeInput = (e) => {
    setInput((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const onChangeSelect = (e, type) => {
    switch (type) {
      case "sender":
        setInput((state) => ({ ...state, selected_sender: e }));
        break;
      case "penerima":
        setInput((state) => ({ ...state, selected_penerima: e }));
        break;
      case "template":
        setInput((state) => ({ ...state, selected_template: e }));
        api_kampanye_iklan.get_template_detail(e.value).then((res) => {
          if (res?.success) {
            setInput((state) => ({
              ...state,
              konten_builder: res.data.template_content,
            }));
          }
        });
        break;

      default:
        break;
    }
  };

  console.log("props muharis", props);

  const GetData = async () => {
    await Promise.all([
      api_kampanye_iklan
        .get_sender({
          company_id:
            props &&
            props.selected_company?.value &&
            props.selected_company?.value,
          ms_inventory:
            props && props.selected_channel?.id && props.selected_channel?.id,
          ms_channel: props && props.selected_inv?.id && props.selected_inv?.id,
        })
        .then((res) => {
          if (res?.success) {
            setOptions((state) => ({
              ...state,
              sender_id: res.data.map((item) => ({
                value: item.sender_id,
                label: `${item.sender_name} (${item.sender_approve_status_name})`,
              })),
            }));
          }
        }),

      api_kampanye_iklan
        .get_penerima({
          company_id:
            props &&
            props.selected_company?.value &&
            props.selected_company?.value,
          ms_inventory:
            props && props.selected_channel?.id && props.selected_channel?.id,
          ms_channel: props && props.selected_inv?.id && props.selected_inv?.id,
        })
        .then((res) => {
          if (res?.success) {
            setOptions((state) => ({
              ...state,
              penerima: res.data.map((item) => ({
                value: {
                  id: item.recipient_id,
                  name: item.recipient_label,
                  total_recipient: item.recipient_total_recipient,
                },
                label: `${item.recipient_label} ${item.recipient_total_recipient} total (${item.recipient_active_status_name})`,
              })),
            }));
          }
        }),

      api_kampanye_iklan
        .get_template({
          ms_inventory:
            props && props.selected_channel?.id && props.selected_channel?.id,
          avail_for_company_id: selected_company.value
            ? selected_company.value
            : props.selected_company?.value,
        })
        .then((res) => {
          console.log("get_template", res);
          if (res?.success) {
            setOptions((state) => ({
              ...state,
              template: res.data.map((item) => ({
                value: item.template_id,
                label: item.template_name,
              })),
            }));
          }
        }),
    ]);
  };
  useEffect(() => {
    if (show === true) {
      if (current_campaign.campaign_id) {
        setInput((state) => ({
          ...state,
          nama_iklan: current_campaign.campaign_name,
          selected_sender: {
            value: current_campaign.campaign_message?.sender?.sender_id,
            label: current_campaign.campaign_message?.sender?.sender_name,
          },
          selected_penerima: {
            value: {
              id: current_campaign.campaign_message?.recipient?.recipient_id,
              name: current_campaign.campaign_message?.recipient
                ?.recipient_label,
              total_recipient:
                current_campaign.campaign_message?.recipient
                  ?.recipient_total_recipient,
            },
            label: `${current_campaign.campaign_message?.recipient?.recipient_label} ${current_campaign.campaign_message?.recipient?.recipient_total_recipient} total (${current_campaign.campaign_message?.recipient?.recipient_active_status_name})`,
          },
          selected_template: {
            value: current_campaign.campaign_message?.template?.template_id,
            label: current_campaign.campaign_message?.template?.template_name,
          },
          subject_email:
            current_campaign.campaign_message?.campaign_message_subject,
          konten_builder:
            current_campaign.campaign_message?.template?.template_content,
          variabel: { value: 1, label: "ON" },
          attachment_file: "",
          from_date: null,
          end_date: null,
        }));
      }
      if (props.selected_inv) {
        setProps(props);
      }
      GetData();
    } else if (show === false) {
      dispatch({
        type: "SET_CURRENT_CAMPAIGN",
        current_campaign: {},
      });
      setInput({
        nama_iklan: "",
        selected_sender: "",
        selected_penerima: "",
        selected_template: "",
        subject_email: "",
        konten_builder: "",
        variabel: { value: 1, label: "ON" },
        attachment_file: "",
        from_date: null,
        end_date: null,
      });
    }
  }, [show]);

  const btnSelectSchedule = (item) => {
    switch (item) {
      case "Buat Jadwal":
        setSelected_schedule(item);
        break;
      case "Kirim Sekarang":
        setSelected_schedule(item);
        setInput((state) => ({ ...state, from_date: null, end_date: null }));
        break;

      default:
        break;
    }
  };

  const send_props = {
    input,
    props,
  };

  return (
    <Modal fullscreen show={show} onHide={onHide}>
      <Modal.Body>
        {/* MODAL ====== */}
        <Modal_konfirmasi
          show={modal.konfirmasi}
          onHide={() => setModal({ ...modal, konfirmasi: false })}
          props={send_props ? send_props : {}}
        />

        <Modal_tambah_sender
          show={modal.sender_id}
          onHide={() => setModal({ ...modal, sender_id: false })}
          props={props2}
        />

        <Modal_tipe_broadcast
          show={
            props2 &&
            (props2.selected_inv?.name !== "LBA" ||
              props2.selected_inv?.name !== "TARGETED")
              ? modal.penerima
              : null
          }
          onHide={
            props2 &&
            (props2.selected_inv?.name !== "LBA" ||
              props2.selected_inv?.name !== "TARGETED")
              ? () => setModal({ ...modal, penerima: false })
              : null
          }
          props={props2}
        />

        <Modal_tipe_target
          show={
            props2 &&
            (props2.selected_inv?.name === "LBA" ||
              props2.selected_inv?.name === "TARGETED")
              ? modal.penerima
              : null
          }
          onHide={
            props2 &&
            (props2.selected_inv?.name === "LBA" ||
              props2.selected_inv?.name === "TARGETED")
              ? () => setModal({ ...modal, penerima: false })
              : null
          }
          props={props2}
        />

        <ModalTemplate.Modal_create
          show={modal.template}
          onHide={() => setModal((state) => ({ ...state, template: false }))}
        />

        <ModalTemplate.Modal_create
          show={modal.template}
          onHide={() => setModal((state) => ({ ...state, template: false }))}
          props={{
            company: {
              value: props?.selected_company?.value,
              label: props?.selected_company?.label,
            },
            channel: {
              value: props?.selected_channel?.id,
              label: props?.selected_channel?.name,
            },
          }}
          get_data1={GetData}
        />

        <IdxContentBuilder
          show={modal.content_builder}
          onHide={() => setModal({ ...modal, content_builder: false })}
        />

        <div className="container mb-3 mb-md-3">
          <HeaderPrimary color={COLOR_PRIMARY}>
            Detail Iklan {props?.selected_company?.label}
          </HeaderPrimary>
          <span>Anda dapat membuat iklan sesuai dengn kebutuhan anda!</span>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-8">
              <Form>
                <div className="mb-3 mb-md-3">
                  <Label color={COLOR_SECONDARY}>Nama Iklan</Label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Masukkan Nama iklan"
                    value={input.nama_iklan}
                    name="nama_iklan"
                    onChange={onChangeInput}
                  />
                </div>

                {props2.selected_channel?.name === "USSD Targeted" ? null : (
                  <div className="mb-3 mb-md-3">
                    <Label color={COLOR_SECONDARY}>Sender ID</Label>
                    <div
                      className="d-flex"
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <div style={{ width: "100%" }}>
                        <Select
                          placeholder="Pilih Sender"
                          value={input.selected_sender}
                          options={options.sender_id}
                          onChange={(e) => onChangeSelect(e, "sender")}
                        />
                      </div>
                      <button
                        className="btn"
                        onClick={() => setModal({ ...modal, sender_id: true })}
                      >
                        <PlusCircle
                          width={20}
                          style={{ color: COLOR_SECONDARY }}
                        />
                      </button>
                    </div>
                  </div>
                )}

                <div className="mb-3 mb-md-3">
                  <div className="row">
                    <div className="col-sm-6">
                      <Label color={COLOR_SECONDARY}>Penerima</Label>
                      <div
                        className="d-flex"
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <div style={{ width: "100%" }}>
                          <Select
                            placeholder="Pilih Penerima"
                            options={options.penerima}
                            value={input.selected_penerima}
                            onChange={(e) => onChangeSelect(e, "penerima")}
                          />
                        </div>
                        <button
                          className="btn"
                          onClick={() => setModal({ ...modal, penerima: true })}
                        >
                          <PlusCircle
                            width={20}
                            style={{ color: COLOR_SECONDARY }}
                          />
                        </button>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <Label color={COLOR_SECONDARY}>Butuh Template</Label>
                      <div
                        className="d-flex align-items-center justify-content-center"
                        style={{ width: "100%" }}
                      >
                        <div style={{ width: "100%" }}>
                          <Select
                            placeholder="Pilih Template"
                            options={options.template}
                            value={input.selected_template}
                            onChange={(e) => onChangeSelect(e, "template")}
                          />
                        </div>

                        <button
                          className="btn"
                          onClick={() =>
                            setModal((state) => ({ ...state, template: true }))
                          }
                        >
                          <PlusCircle
                            width={20}
                            style={{ color: COLOR_SECONDARY }}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {props2 && props2.selected_channel?.id === 1 ? (
                  <div className="mb-3 mb-md-3">
                    <Label color={COLOR_SECONDARY}>Subject Email</Label>
                    <input
                      type="email"
                      required
                      className="form-control"
                      placeholder="Masukkan Subject Email"
                      value={input.subject_email}
                      name="subject_email"
                      onChange={onChangeInput}
                    />
                  </div>
                ) : props2.selected_channel?.id === 2 ? null : null}

                <div className="mb-3 mb-md-3">
                  <Label color={COLOR_SECONDARY}>Konten Iklan</Label>
                  {props2 && props2.selected_channel?.id === 1 ? (
                    <div className="mb-2 mb-md-2">
                      <ButtonPrimary
                        onClick={() =>
                          setModal({ ...modal, content_builder: true })
                        }
                      >
                        Buka HTML Builder
                      </ButtonPrimary>
                    </div>
                  ) : props2.selected_channel?.id === 2 ? null : null}
                  <textarea
                    className="form-control"
                    id=""
                    cols="30"
                    rows="10"
                    placeholder="Masukkan konten"
                    value={input.konten_builder}
                    name="konten_builder"
                    onChange={onChangeInput}
                  ></textarea>
                </div>

                {props2.selected_channel?.name === "SMS LBA" ||
                props2.selected_channel?.name === "MMS LBA" ||
                props2.selected_channel?.name === "SMS Targeted" ||
                props2.selected_channel?.name === "USSD Targeted" ? null : (
                  <div className="mb-3 mb-md-3">
                    <div className="d-flex align-items-center">
                      <div>
                        <span style={{ color: COLOR_SECONDARY }}>
                          Gunakan Variabel
                        </span>
                        <div>Apakah ini? ⓘ</div>
                      </div>
                      &nbsp;&nbsp;&nbsp;
                      <div style={{ width: "30%" }}>
                        <Select
                          options={opt_variable}
                          value={input.variabel}
                          onChange={(e) => setInput({ ...input, variabel: e })}
                        />
                      </div>
                    </div>
                  </div>
                )}
                {props2 &&
                (props2.selected_channel?.name === "MMS LBA" ||
                  props2.selected_channel?.name === "Email Broadcast") ? (
                  <div className="mb-3 mb-md-3">
                    <Label color={COLOR_SECONDARY}>
                      Perlu Attachment File ?
                    </Label>
                    <input
                      type="file"
                      name=""
                      id=""
                      className="form-control"
                      accept={
                        props2.selected_channel?.name === "MMS LBA"
                          ? "image/jpeg,image/png"
                          : ".pdf"
                      }
                      onChange={(e) =>
                        setInput({
                          ...input,
                          attachment_file: e.target.files[0],
                        })
                      }
                    />
                  </div>
                ) : null}

                <div className="mb-3 mb-md-3">
                  {/* HEADER ========== */}
                  <div className="d-flex justify-content-center align-items-center mb-3 mb-md-3">
                    {props2.selected_channel?.name === "SMS LBA" ||
                    props2.selected_channel?.name === "MMS LBA" ||
                    props2.selected_channel?.name === "SMS Targeted" ||
                    props2.selected_channel?.name === "USSD Targeted"
                      ? null
                      : ["Buat Jadwal", "Kirim Sekarang"].map((item, idx) => (
                          <DivSchedule
                            active={item === selected_schedule ? true : false}
                            key={idx}
                            onClick={() => {
                              btnSelectSchedule(item);
                            }}
                          >
                            {item}
                          </DivSchedule>
                        ))}
                  </div>
                  {(selected_schedule === "Buat Jadwal" ||
                    props2.selected_channel?.name === "SMS LBA" ||
                    props2.selected_channel?.name === "MMS LBA" ||
                    props2.selected_channel?.name === "SMS Targeted" ||
                    props2.selected_channel?.name === "USSD Targeted") && (
                    <div>
                      <div className="row">
                        <div className="col-md-6">
                          <div>
                            <Label color={COLOR_SECONDARY}>Jadwal Mulai</Label>
                            {/* <input type="datetime-local" name="from_date" id="" className="form-control" value={input.from_date} onChange={onChangeInput} /> */}
                            <DatePicker
                              className="form-control"
                              name="from_date"
                              selected={input.from_date}
                              onChange={(e) =>
                                setInput((state) => ({
                                  ...state,
                                  from_date: e,
                                }))
                              }
                              selectsStart
                              startDate={input.from_date}
                              endDate={input.end_date}
                              dateFormat="yyyy-MMM-dd, hh:mm:ss"
                              showTimeSelect
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div>
                            <Label color={COLOR_SECONDARY}>
                              Jadwal Berakhir
                            </Label>
                            {/* <input type="datetime-local" name="end_date" id="" className="form-control" value={input.end_date} onChange={onChangeInput} /> */}
                            <DatePicker
                              className="form-control"
                              name="end_date"
                              selected={input.end_date}
                              onChange={(e) =>
                                setInput((state) => ({ ...state, end_date: e }))
                              }
                              selectsEnd
                              startDate={input.end_date}
                              endDate={input.end_date}
                              minDate={input.from_date}
                              dateFormat="yyyy-MMM-dd, hh:mm:ss"
                              showTimeSelect
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mb-3 mb-md-3">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex">
                      <ButtonPrimary onClick={btnKonfirmasi}>
                        Lanjutkan ke Konfirmasi Terakhir
                      </ButtonPrimary>
                      &nbsp; &nbsp;
                      {/* <ButtonDanger onClick={BtnSimpanDraft}>Simpan Sebagai Draft</ButtonDanger> */}
                    </div>
                    <div>
                      <button className="btn border" onClick={() => onHide()}>
                        Kembali
                      </button>
                    </div>
                  </div>
                </div>
              </Form>
            </div>
            <div className="col-lg-4 col-md-4">
              <div className="mb-3 mb-md-3">
                <h4>Pratinjau</h4>
                <span>Pratinjau dari iklan akan tampil disini</span>
              </div>
              <div className="mb-3 mb-md-3">
                {props2 && props2.selected_channel?.id === 1 ? (
                  <div style={{ position: "relative" }}>
                    <ImgPreview src={Priview_email} alt="Preview-email" />
                    <div
                      style={{
                        position: "absolute",
                        top: "50px",
                        left: "10px",
                        overflow: "scroll",
                        width: "95%",
                        height: "400px",
                      }}
                      dangerouslySetInnerHTML={{ __html: input.konten_builder }}
                    ></div>
                  </div>
                ) : (
                  <div style={{ position: "relative" }}>
                    <ImgPreview src={Priview_sms} alt="Preview-email" />
                    <div
                      style={{
                        position: "absolute",
                        top: "110px",
                        left: "80px",
                        flexWrap: "wrap",
                        width: "70%",
                        height: "270px",
                        wordWrap: "break-word",
                        overflow: "auto",
                      }}
                    >
                      {input.konten_builder}
                    </div>
                  </div>
                )}
              </div>

              <div className="mb-3 mb-md-3">
                <Label color={COLOR_SECONDARY}>Short URL</Label>
                <ContainerInputShor>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="https://website.com"
                  />
                  <ButtonShort
                    style={{
                      fontSize: "10pt",
                      padding: "0px 0px",
                      display: "flex",
                    }}
                  >
                    Short URL
                  </ButtonShort>
                </ContainerInputShor>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const ButtonShort = styled(ButtonPrimary)`
  border-radius: 0;
`;

const ContainerInputShor = styled.div`
  display: flex;
`;

const DivSchedule = styled.div`
  width: 100%;
  border: 1px solid #ccc;
  text-align: center;
  padding: 7px 0;
  cursor: pointer;
  transition: 250ms;
  &:last-child {
    border-left: none;
  }

  background: ${({ active }) => (active ? COLOR_SECONDARY : "transparent")};
  color: ${({ active }) => (active ? "#fff" : "#000")};

  &:hover {
    background: ${COLOR_SECONDARY};
    color: #fff;
  }
`;

const ImgPreview = styled.img`
  width: 100%;
  object-fit: obtain;
`;
