import React, { useState, useEffect } from "react";
import * as Util from "../../../../util";
import * as Component from "../../../../component";
import * as Style from "../../../../component/style/content/default";
import * as Services from "../../../../service";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Select from "react-select";

const api = Services.api.ApiEvent.Microsite;

const ModalMicrositeCreate = (props: {
  show: Boolean,
  onHide: Function,
  dataProps: any,
}) => {
  const { show, onHide, dataProps } = props;
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    defaultValues: {
      microsite_name: "",
      microsite_content: "",
      microsite_form_name: "",
      microsite_form_description: "",
      microsite_form_success_message: "",
      microsite_own_url: "",
    },
  });
  const [selected, setSelected] = useState({
    company: "",
  });
  const [options, setOptions] = useState({
    company: [],
  });
  const [loading, setLoading] = useState(false);

  const getCompany = async () => {
    await api.getCompany().then((res) => {
      if (res.success) {
        setOptions((state) => ({
          ...state,
          company: res?.data?.map((item) => ({
            value: item.company_id,
            label: item.company_name,
          })),
        }));
      }
    });
  };

  useEffect(async () => {
    if (show) {
      await getCompany();
    }
  }, [show]);

  const BtnSubmit = async (body) => {
    try {
      setLoading(true);
      await api.postMicrosite(body).then(async (res) => {
        if (res?.success) {
          await Promise.all([
            dataProps?.getList(),
            Component.AlertSuccess({ title: "Success", text: res?.success }),
            onHide(),
            reset({}),
          ]);
        } else {
          Component.AlertError({ title: "Error", text: res?.error });
        }
      });
    } catch (err) {
      Component.AlertError({ title: "Error", text: err });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Component.Modal_Component
      size="xl"
      show={show}
      onHide={onHide}
      title="Microsite"
      btnSubmit
      btnName={loading ? <Component.LoadingIcon /> : "Simpan"}
      onClick={loading ? null : handleSubmit(BtnSubmit)}
    >
      <Container>
        <div className="form">
          <div className="mb-3">
            <Style.Label color={Style.COLOR_SECONDARY}>
              Nama Microsite
            </Style.Label>
            <input
              type="text"
              placeholder="Masukkan Nama Microsite"
              className="form-control"
              {...register("microsite_name", { required: true })}
            />
            {errors.microsite_name && "Field is Required"}
          </div>
          <div className="mb-3">
            <Style.Label color={Style.COLOR_SECONDARY}>
              Nama Microsite
            </Style.Label>
            <Style.ButtonPrimary className="mb-3">
              Buka Html Builder
            </Style.ButtonPrimary>
            <textarea
              type="text"
              placeholder="Html Builder"
              className="form-control"
              {...register("microsite_content")}
            />
          </div>
          <div className="mb-3">
            <Style.Label color={Style.COLOR_SECONDARY}>
              Nama Form Feedback / Survey
            </Style.Label>
            <input
              type="text"
              placeholder="Masukkan Nama Form Feedback / Survey"
              className="form-control"
              {...register("microsite_form_name", { required: true })}
            />
            {errors.microsite_form_name && "Field is Required"}
          </div>
          <div className="mb-3">
            <Style.Label color={Style.COLOR_SECONDARY}>
              Deskripsi Form Feedback / Survey
            </Style.Label>
            <input
              type="text"
              placeholder="Masukkan Deskripsi Form"
              className="form-control"
              {...register("microsite_form_description", { required: true })}
            />
            {errors.microsite_form_description && "Field is Required"}
          </div>
          <div className="mb-3">
            <Style.Label color={Style.COLOR_SECONDARY}>
              Pesan Berhasil / Terimakasih (Setelah user mengisi form)
            </Style.Label>
            <input
              type="text"
              placeholder="Masukkan Pesan"
              className="form-control"
              {...register("microsite_form_success_message", {
                required: true,
              })}
            />
            {errors.microsite_form_success_message && "Field is Required"}
          </div>
          <div className="mb-3">
            <Style.Label color={Style.COLOR_SECONDARY}>
              Url Kepemilikan Microsite
            </Style.Label>
            <input
              type="text"
              placeholder="Masukkan Url https://yourwebsite.com"
              className="form-control"
              {...register("microsite_own_url")}
            />
          </div>
          <div className="mb-3">
            <Style.Label color={Style.COLOR_SECONDARY}>Perusahaan</Style.Label>
            <Select
              placeholder="Select Perusahaan"
              options={options.company}
              value={selected.company}
              onChange={(e) =>
                setSelected((state) => ({ ...state, company: e }))
              }
            />
          </div>
        </div>
      </Container>
    </Component.Modal_Component>
  );
};

export default ModalMicrositeCreate;

const Container = styled.div`
  .form {
    padding: 20px;
    background-color: #fff;
    box-shadow: 0px 3px 6px rgb(0 0 0 / 16%);
    color: rgba(10, 10, 10, 0.5);
    max-width: 100%;
    position: relative;
    border-radius: 10px;
  }
`;
