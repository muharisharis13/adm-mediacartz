import React, { useEffect, useState, useContext } from "react";
import {
  Modal_Component,
  AlertSuccess,
  AlertError,
  IdxContentBuilder,
} from "../../../../../component";
import {
  ButtonPrimary,
  COLOR_SECONDARY,
  Label,
} from "../../../../../component/style/content/default";
import Select from "react-select";
import styled from "styled-components";
import { api_template } from "../../../../../service/api";
import { Context } from "../../../../../service";

const shortTooltip = `Gunakan layanan ini untuk mempersingkat link
yang ingin Anda masukkan ke dalam konten
template. URL yang dipersingkat dapat
dipantau untuk melihat berapa banyak jumlah
klik dari pengguna.`;

export const Modal_clone = ({
  show,
  onHide,
  get_data1,
  nama_template,
  channel,
}) => {
  const [options, setOptions] = useState({
    company: [],
    channel: [],
  });
  const [selected, setSelected] = useState({
    company: "",
    channel: "",
  });
  const [input, setInput] = useState({
    nama_template: "",
    short_url: "",
    result_short_url: "",
    konten_template: "",
  });
  const [file, setFile] = useState("");

  const [modal, setModal] = useState({
    html: false,
  });

  const [html, setHtml] = useState("");
  const [template_id, setTemplate_id] = useState(null);
  const { data_user } = useContext(Context);

  const get_data = async () => {
    await api_template.get_company().then((res) => {
      console.log({ get_company: res });
      if (res?.success) {
        setOptions((state) => ({
          ...state,
          company: res.data.map((item) => ({
            value: item.company_id,
            label: `${item.company_name} (${item.category_company.category_company_name})`,
          })),
        }));
      }
    });

    await api_template.get_channel().then((res) => {
      console.log({ get_channel: res });
      if (res?.success) {
        setOptions((state) => ({
          ...state,
          channel: res.data.map((item) => ({
            value: item.ms_inventory_id,
            label: item.ms_inventory_identifier,
          })),
        }));
      }
    });

    setInput((state) => ({ ...state, nama_template: nama_template }));
    setSelected((selected) => ({
      ...selected,
      channel: {
        value: channel.ms_inventory_id,
        label: channel.ms_inventory_identifier,
      },
    }));
  };

  useEffect(() => {
    if (show) {
      get_data();
    } else {
      setInput({
        nama_template: "",
        short_url: "",
        result_short_url: "",
        konten_template: "",
      });

      setSelected({
        company: "",
        channel: "",
      });
    }
  }, [show]);

  const btnShortenedURL = async () => {
    const body = {
      shortened_original_link: input.short_url,
    };
    await api_template.post_shorten_url({ body }).then(async (res) => {
      console.log({ post_shorten_url: res });
      if (res?.success) {
        await setInput((state) => ({
          ...state,
          result_short_url: res.data.shortened_full_url,
        }));
        await AlertSuccess({ title: "SUCCESS", text: res.success });
      } else {
        await AlertError({ title: "ERROR", text: res.error });
      }
    });
  };

  const btnCopyCliboard = async () => {
    await navigator.clipboard.writeText(input.result_short_url);
    await AlertSuccess({
      title: "SUCCESS",
      text: `Berhasil Copy URL ${input.result_short_url}`,
    });
  };

  const btnSimpan = async () => {
    const body = {
      company_id: selected.company.value,
      ms_inventory_id: selected.channel.value,
      template_content: input.konten_template,
      template_name: input.nama_template,
      user_id: data_user.id,
    };
    if (template_id === null) {
      await api_template.post_template({ body: body }).then(async (res) => {
        console.log({ post_template: res });

        if (res?.success) {
          if (file) {
            const formData = new FormData();

            formData.append("template_media_file", file);
            formData.append("template_id", res.data.template_id);

            await api_template
              .put_upload({ body: formData, template_id: res.data.template_id })
              .then(async (result) => {
                if (result.success) {
                  await AlertSuccess({
                    title: "SUCCESS",
                    text: result.success,
                  });
                  await get_data1();
                  await onHide();
                  setSelected({ ...selected });
                  setInput({ ...input });
                  setFile(null);
                  setTemplate_id(null);
                } else {
                  await AlertError({ title: "ERROR", text: result.error });
                  await setTemplate_id(res.data.template_id);
                }
              });
          } else {
            await AlertSuccess({ title: "SUCCESS", text: res.success });
            await get_data1();
            await onHide();
            setSelected({
              company: "",
              channel: "",
            });
            setInput({
              nama_template: "",
              short_url: "",
              result_short_url: "",
              konten_template: "",
            });
            setFile(null);
          }
        } else {
          AlertError({ title: "ERROR", text: res.error });
        }
      });
    } else {
      await api_template
        .put_template({ body: body, template_id: template_id })
        .then(async (res) => {
          console.log({ post_template: res });

          if (res?.success) {
            if (file) {
              const formData = new FormData();

              formData.append("template_media_file", file);
              formData.append("template_id", res.data.template_id);

              await api_template
                .put_upload({
                  body: formData,
                  template_id: res.data.template_id,
                })
                .then(async (result) => {
                  if (result.success) {
                    await AlertSuccess({
                      title: "SUCCESS",
                      text: result.success,
                    });
                    await get_data1();
                    await onHide();
                    setSelected({
                      company: "",
                      channel: "",
                    });
                    setInput({
                      nama_template: "",
                      short_url: "",
                      result_short_url: "",
                      konten_template: "",
                    });
                    setFile(null);
                    setTemplate_id(null);
                  } else {
                    await AlertError({ title: "ERROR", text: result.error });
                    await setTemplate_id(res.data.template_id);
                  }
                });
            } else {
              await AlertSuccess({ title: "SUCCESS", text: res.success });
              await get_data1();
              await onHide();
              setSelected({
                company: "",
                channel: "",
              });
              setInput({
                nama_template: "",
                short_url: "",
                result_short_url: "",
                konten_template: "",
              });
              setFile(null);
            }
          } else {
            AlertError({ title: "ERROR", text: res.error });
          }
        });
    }
  };

  return (
    <Modal_Component
      size="xl"
      show={show}
      onHide={onHide}
      title="Template"
      btnSubmit
      btnName="Simpan"
      onClick={btnSimpan}
    >
      {/* <small>-pending build content builder</small> */}
      {/* MODAL HTML BUILDER */}
      <IdxContentBuilder
        show={modal.html}
        onHide={() => setModal({ ...modal, html: false })}
        html={html}
      />

      <div className="container">
        <div className="row mb-3 mb-md-3">
          <div className="col-md-6 col-lg-6 col-sm-6">
            <div>
              <Label color={COLOR_SECONDARY}>Perusahaan</Label>
              <Select
                placeholder="Pilih Perusahaan..."
                options={options.company}
                value={selected.company}
                onChange={(e) =>
                  setSelected((state) => ({ ...state, company: e }))
                }
              />
            </div>
          </div>
          <div className="col-md-6 col-lg-6 col-sm-6">
            <div>
              <Label color={COLOR_SECONDARY}>Channel</Label>
              <Select
                placeholder="Pilih Tipe Channel"
                options={options.channel}
                value={selected.channel}
                onChange={(e) =>
                  setSelected((state) => ({ ...state, channel: e }))
                }
              />
            </div>
          </div>
        </div>

        <div className="row mb-3 mb-md-3">
          <div className="col-md-6 col-lg-6 col-sm-6">
            <div>
              <Label color={COLOR_SECONDARY}>Nama Template</Label>
              <input
                type="text"
                className="form-control"
                placeholder="Nama template"
                value={input.nama_template}
                onChange={(e) =>
                  setInput({ ...input, nama_template: e.target.value })
                }
              />
            </div>
          </div>
          <div className="col-md-6 col-lg-6 col-sm-6">
            <div className="row">
              <div className="col-md-6 col-sm-6">
                <div>
                  <Label color={COLOR_SECONDARY}>
                    Perlu short URL?{" "}
                    <span
                      style={{ cursor: "pointer" }}
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title={shortTooltip}
                    >
                      ⓘ
                    </span>
                  </Label>
                  <ContainerInputShor>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="https://website.com"
                      value={input.short_url}
                      onChange={(e) =>
                        setInput((state) => ({
                          ...state,
                          short_url: e.target.value,
                        }))
                      }
                    />
                    <ButtonShort onClick={btnShortenedURL}>Shorten</ButtonShort>
                  </ContainerInputShor>
                </div>
              </div>
              <div className="col-md-6 col-sm-6">
                <div>
                  <Label color={COLOR_SECONDARY}>Short URL</Label>
                  <ContainerInputShor>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="https://website.com"
                      disabled
                      value={input.result_short_url}
                    />
                    <ButtonShort
                      style={{
                        fontSize: "10pt",
                        padding: "0px 0px",
                        display: "flex",
                      }}
                      onClick={btnCopyCliboard}
                    >
                      Copy URL
                    </ButtonShort>
                  </ContainerInputShor>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*   JIKA YANG SELECT EMAIL DAN WHATSAPP */}
        {selected.channel.label === "EMAIL" && (
          <div className="row mb-3 mb-md-3">
            <div className="col-md-6 col-lg-6 col-sm-12">
              <div>
                <Label color={COLOR_SECONDARY}>Perlu Attachment File?</Label>
                <input
                  type="file"
                  name=""
                  id=""
                  className="form-control"
                  accept=".pdf"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
            </div>
          </div>
        )}
        {(selected.channel.label === "EMAIL" ||
          selected.channel.label === "WHATSAPP") && (
          <>
            <div className="row mb-3 mb-md-3">
              <div className="col-lg-12 col-md-12 col-">
                <div>
                  <Label color={COLOR_SECONDARY}>Konten Template</Label>
                  {selected.channel.label === "WHATSAPP" ? null : (
                    <ButtonPrimary
                      className="mb-2 mt-2"
                      onClick={() => setModal({ ...modal, html: true })}
                    >
                      Buka Html Builder
                    </ButtonPrimary>
                  )}
                  <textarea
                    className="form-control"
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    placeholder="Masukkan kontent HTML atau gunakan panduan HTML builder"
                    value={input.konten_template}
                    onChange={(e) =>
                      setInput((state) => ({
                        ...state,
                        konten_template: e.target.value,
                      }))
                    }
                  ></textarea>
                </div>
              </div>
            </div>
          </>
        )}

        {/*   JIKA YANG SELECT EMAIL */}

        {/* JIKA MMS ADA MAKA AKAN MUNCul */}
        {selected.channel.label === "MMS" && (
          <div className="row mb-3 mb-md-3">
            <div className="col-md-6 col-lg-6 col-sm-12">
              <div>
                <Label color={COLOR_SECONDARY}>Perlu Attachment File?</Label>
                <input
                  type="file"
                  name=""
                  id=""
                  className="form-control"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
            </div>
          </div>
        )}
        {/* JIKA MMS ADA MAKA AKAN MUNCul */}

        {/* JIKA YANG SELECT SMS, MMS , USSD */}
        {(selected.channel.label === "SMS" ||
          selected.channel.label === "MMS" ||
          selected.channel.label === "USSD") && (
          <div className="row mb-3 mb-md-3">
            <div className="col-lg-12 col-md-12 col-">
              <div>
                <Label color={COLOR_SECONDARY}>Konten Template</Label>
                <textarea
                  className="form-control"
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  placeholder="Masukkan Isi Pesan"
                  value={input.konten_template}
                  onChange={(e) =>
                    setInput({ ...input, konten_template: e.target.value })
                  }
                ></textarea>
              </div>
            </div>
          </div>
        )}

        {/* JIKA YANG SELECT SMS */}
      </div>
    </Modal_Component>
  );
};

const ContainerInputShor = styled.div`
  display: flex;
`;

const ButtonShort = styled(ButtonPrimary)`
  border-radius: 0;
`;
