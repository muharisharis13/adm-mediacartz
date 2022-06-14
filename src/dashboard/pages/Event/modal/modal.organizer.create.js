import React, { useState, useEffect, useContext } from "react";
import * as Util from "../../../../util";
import * as Component from "../../../../component";
import * as Style from "../../../../component/style/content/default";
import * as Services from "../../../../service";
import { useForm } from "react-hook-form";
import Select from "react-select";
import * as ModalCompany from "../../company/modal";
import { PlusCircle } from "@styled-icons/bootstrap";

export default function ModalOrganizerCreate(props: {
  show: boolean,
  onHide: Function,
  data_props: any,
  company: any,
}) {
  const { show, onHide, data_props } = props;
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const message_error_input = "Please Input This Field";
  const api = Services.api.ApiEvent.Organizer;
  const { data_user } = useContext(Services.Context);

  const [selected, setSelected] = useState({
    ms_city: null,
    company: null,
  });
  const [options, setOptions] = useState({
    company: [],
    ms_city: [],
  });
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({
    companyCreate: false,
  });

  // console.log({data_props})

  const GetData = async () => {
    await Promise.all([
      api.getCompany().then((res) => {
        console.log(res);
        setOptions((state) => ({
          ...state,
          company: res?.data?.map((item) => ({
            value: item.company_id,
            label: item.company_name,
          })),
        }));
      }),

      api.getMsCity().then((res) => {
        if (res?.success) {
          setOptions((state) => ({
            ...state,
            ms_city: res?.data?.map((item) => ({
              value: item.ms_city_id,
              label: item.ms_city_name,
            })),
          }));
        }
      }),
    ]);
  };

  useEffect(async () => {
    if (show) {
      let dataDetail = data_props?.dataDetail?.detail;

      if (dataDetail?.organizer_id) {
        setValue("organizer_name", dataDetail?.organizer_name);
        setValue("email", dataDetail?.organizer_email);
        setValue("phone_1", dataDetail?.organizer_phone1);
        setValue("phone_2", dataDetail?.organizer_phone2);
        setValue("whatsapp_1", dataDetail?.organizer_whatsapp1);
        setValue("whatsapp_2", dataDetail?.organizer_whatsapp2);
        setValue("alamat", dataDetail?.organizer_address);
        setValue("website_url", dataDetail?.organizer_website);
        setValue("twitter_name", dataDetail?.organizer_twitter_name);
        setValue("twitter_url", dataDetail?.organizer_twitter_link);
        setValue("facebook_name", dataDetail?.organizer_facebook_nme);
        setValue("facebook_url", dataDetail?.organizer_facebook_link);
        setValue("facebook_name", dataDetail?.organizer_instagram_name);
        setValue("facebook_url", dataDetail?.organizer_instagram_link);
        setValue("youtube_name", dataDetail?.organizer_youtube_name);
        setValue("youtube_url", dataDetail?.organizer_youtube_link);
        setValue("kode_pos", dataDetail?.organizer_zip);
        setSelected((state) => ({
          ...state,
          ms_city: {
            value: dataDetail?.ms_city_id,
            label: dataDetail?.ms_city?.ms_city_name,
          },
          company: {
            value: dataDetail?.company,
            label: dataDetail?.company?.company_name,
          },
        }));
      }
      console.log("props", props?.company);

      if (props?.company) {
        setSelected((state) => ({
          ...state,
          company: {
            value: props?.company?.value,
            label: props?.company?.label,
          },
        }));
      }
      GetData();
    } else {
      setSelected({
        ms_city: null,
        company: null,
      });
      reset({});
    }
  }, [show]);

  const btnSubmit = (e) => {
    setLoading(true);
    try {
      const row = e;
      const formData = new FormData();
      formData.append("organizer_logo", row.logo_organizer[0]);
      formData.append("organizer_name", row.organizer_name);
      formData.append("organizer_email", row.email);
      formData.append("organizer_phone1", row.phone_1);
      formData.append("organizer_phone2", row.phone_2);
      formData.append("organizer_whatsapp1", row.whatsapp_1);
      formData.append("organizer_whatsapp2", row.whatsapp_2);
      formData.append("organizer_address", row.alamat);
      formData.append("organizer_website", row.website_url);
      formData.append("organizer_twitter_name", row.twitter_name);
      formData.append("organizer_twitter_link", row.twitter_url);
      formData.append("organizer_facebook_name", row.facebook_name);
      formData.append("organizer_facebook_link", row.facebook_url);
      formData.append("organizer_youtube_name", row.youtube_name);
      formData.append("organizer_youtube_link", row.youtube_url);
      formData.append("organizer_instagram_name", row.instagram_name);
      formData.append("organizer_instagram_link", row.instagram_url);
      formData.append("organizer_zip", row.kode_pos);
      formData.append("user_id", data_user.id);
      formData.append("company_id", selected?.company?.value);
      formData.append("ms_city_id", selected?.ms_city?.value);

      if (data_props?.dataDetail?.detail?.organizer_id) {
        api
          .putOrganizer(formData, data_props?.dataDetail?.detail?.organizer_id)
          .then(async (res) => {
            console.log(res);
            if (res?.success) {
              await Promise.all([
                Component.AlertSuccess({ title: "Success", text: res.success }),
                data_props?.getList(),
                onHide(),
              ]);
              reset({});
            } else {
              Component.AlertError({ title: "Error", text: res.error });
            }
          });
      } else {
        api.postOrganizer(formData).then(async (res) => {
          console.log(res);
          if (res?.success) {
            await Promise.all([
              Component.AlertSuccess({ title: "Success", text: res.success }),
              data_props?.getList(),
              onHide(),
            ]);
            reset({});
          } else {
            Component.AlertError({ title: "Error", text: res.error });
          }
        });
      }
    } catch (err) {
      Component.AlertError({ title: "Error", text: err });
    } finally {
      setLoading(false);
    }
  };

  const onInputChange = (e) => {
    console.log(e);

    setTimeout(() => {
      api.getMsCity(e).then((res) => {
        if (res?.success) {
          setOptions((state) => ({
            ...state,
            ms_city: res?.data?.map((item) => ({
              value: item.ms_city_id,
              label: item.ms_city_name,
            })),
          }));
        }
      });
    }, 1000);
  };

  const btnOnHide = () => {
    reset({});
    onHide();
  };
  return (
    <Component.Modal_Component
      title="Organizer"
      show={show}
      onHide={btnOnHide}
      size="xl"
      btnSubmit
      btnName={loading ? <Component.LoadingIcon /> : "Simpan"}
      onClick={handleSubmit(btnSubmit)}
    >
      {/* MODAL =========== */}
      <ModalCompany.Modal_create
        show={modal.companyCreate}
        onHide={() => setModal((state) => ({ ...state, companyCreate: false }))}
        getData={GetData}
      />
      <div className="mb-3">
        <Style.Label color={Style.COLOR_SECONDARY}>Nama Organizer</Style.Label>
        <input
          type="text"
          placeholder="Masukkan Nama Organizer"
          className="form-control"
          {...register("organizer_name")}
        />
        {errors?.organizer_name && message_error_input}
      </div>
      <div className="mb-3">
        <Style.Label color={Style.COLOR_SECONDARY}>Email</Style.Label>
        <input
          type="email"
          placeholder="Masukkan Email"
          className="form-control"
          {...register("email", {
            pattern: {
              value: Util.Regex.email,
              message: "Please Input Valid Email !",
            },
          })}
        />
        {errors?.email && errors?.email?.message}
      </div>
      <div className="mb-3">
        <Style.Label color={Style.COLOR_SECONDARY}>Phone</Style.Label>
        <div className="row">
          <div className="col-md-6 col-lg-6 col-sm-12">
            <input
              type="text"
              placeholder="Phone 1"
              className="form-control"
              {...register("phone_1", {
                pattern: {
                  value: Util.Regex.number,
                  message: "Please Input Only Number",
                },
              })}
            />
            {errors?.phone_1 && errors?.phone_1?.message}
          </div>
          <div className="col-md-6 col-lg-6 col-sm-12">
            <input
              type="text"
              placeholder="Phone 2"
              className="form-control"
              {...register("phone_2", {
                pattern: {
                  value: Util.Regex.number,
                  message: "Please Input Only Number",
                },
              })}
            />
            {errors?.phone_2 && errors?.phone_2?.message}
          </div>
        </div>
      </div>
      <div className="mb-3">
        <Style.Label color={Style.COLOR_SECONDARY}>Whatsapp</Style.Label>
        <div className="row">
          <div className="col-md-6 col-lg-6 col-sm-12">
            <input
              type="text"
              placeholder="Whatsapp 1"
              className="form-control"
              {...register("whatsapp_1", {
                pattern: {
                  value: Util.Regex.number,
                  message: "Please Input Only Number",
                },
              })}
            />
            {errors?.whatsapp_1 && errors?.whatsapp_1?.message}
          </div>
          <div className="col-md-6 col-lg-6 col-sm-12">
            <input
              type="text"
              placeholder="Whatsapp 2"
              className="form-control"
              {...register("whatsapp_2", {
                pattern: {
                  value: Util.Regex.number,
                  message: "Please Input Only Number",
                },
              })}
            />
            {errors?.whatsapp_2 && errors?.whatsapp_2?.message}
          </div>
        </div>
      </div>
      <div className="mb-3">
        <Style.Label color={Style.COLOR_SECONDARY}>Alamat</Style.Label>
        <input
          type="text"
          placeholder="Masukkan Alamat"
          className="form-control"
          {...register("alamat")}
        />
        {errors?.alamat && message_error_input}
      </div>
      <div className="mb-3">
        <Style.Label color={Style.COLOR_SECONDARY}>Website</Style.Label>
        <input
          type="url"
          placeholder="https://www.website.com"
          className="form-control"
          {...register("website_url")}
        />
        {errors?.website && message_error_input}
      </div>
      <div className="mb-3">
        <Style.Label color={Style.COLOR_SECONDARY}>Twitter</Style.Label>
        <div className="row">
          <div className="col-md-6 col-lg-6 col-sm-12">
            <input
              type="text"
              className="form-control"
              placeholder="Twitter Name"
              {...register("twitter_name")}
            />
            {errors?.twitter && message_error_input}
          </div>
          <div className="col-md-6 col-lg-6 col-sm-12">
            <input
              type="url"
              className="form-control"
              placeholder="Twitter Link"
              {...register("twitter_url")}
            />
            {errors?.twitter_url && message_error_input}
          </div>
        </div>
      </div>
      <div className="mb-3">
        <Style.Label color={Style.COLOR_SECONDARY}>Facebook</Style.Label>
        <div className="row">
          <div className="col-md-6 col-lg-6 col-sm-12">
            <input
              type="text"
              className="form-control"
              placeholder="Facebook Name"
              {...register("facebok_name")}
            />
            {errors?.facebook_name && message_error_input}
          </div>
          <div className="col-md-6 col-lg-6 col-sm-12">
            <input
              type="url"
              className="form-control"
              placeholder="Facebook Link"
              {...register("facebook_url")}
            />
            {errors?.facebook_url && message_error_input}
          </div>
        </div>
      </div>
      <div className="mb-3">
        <Style.Label color={Style.COLOR_SECONDARY}>Instagram</Style.Label>
        <div className="row">
          <div className="col-md-6 col-lg-6 col-sm-12">
            <input
              type="text"
              className="form-control"
              placeholder="Instagram Name"
              {...register("instagram_name")}
            />
            {errors?.instagram_name && message_error_input}
          </div>
          <div className="col-md-6 col-lg-6 col-sm-12">
            <input
              type="url"
              className="form-control"
              placeholder="Instagram Link"
              {...register("instagram_url")}
            />
            {errors?.instagram_url && message_error_input}
          </div>
        </div>
      </div>
      <div className="mb-3">
        <Style.Label color={Style.COLOR_SECONDARY}>Youtube</Style.Label>
        <div className="row">
          <div className="col-md-6 col-lg-6 col-sm-12">
            <input
              type="text"
              className="form-control"
              placeholder="Youtube Name"
              {...register("youtube_name")}
            />
          </div>
          <div className="col-md-6 col-lg-6 col-sm-12">
            <input
              type="url"
              className="form-control"
              placeholder="Youtube Link"
              {...register("youtube_url")}
            />
          </div>
        </div>
      </div>
      <div className="mb-3">
        <Style.Label color={Style.COLOR_SECONDARY}>Kota</Style.Label>
        <Select
          placeholder="Select Kota"
          options={options.ms_city}
          value={selected?.ms_city}
          onChange={(e) => setSelected((state) => ({ ...state, ms_city: e }))}
          onInputChange={(e) => onInputChange(e)}
        />
      </div>
      <div className="mb-3">
        <Style.Label color={Style.COLOR_SECONDARY}>Kode Pos</Style.Label>
        <input
          type="text"
          placeholder="Masukkan Kode POS"
          className="form-control"
          {...register("kode_pos", {
            pattern: {
              value: Util.Regex.number,
              message: "Please Input Number Only",
            },
          })}
        />
        {errors?.kode_pos && errors?.kode_pos?.message}
      </div>
      <div className="mb-3 flex-column d-flex">
        <Style.Label color={Style.COLOR_SECONDARY}>Logo Organizer</Style.Label>
        {data_props?.dataDetail?.imageUrl && (
          <img
            width={200}
            src={data_props?.dataDetail?.imageUrl}
            alt={data_props?.dataDetail?.imageUrl}
          />
        )}
        <input
          type="file"
          accept="image/*"
          placeholder="Masukkan Kode POS"
          className="form-control"
          {...register("logo_organizer")}
        />
        {errors?.logo_organizer && message_error_input}
      </div>
      <div className="mb-3 mb-lg-5">
        <Style.Label color={Style.COLOR_SECONDARY}>Perusahaan</Style.Label>
        <div className="d-flex align-items-center">
          <div style={{ width: "100%" }}>
            <Select
              placeholder="Select Perusahaan"
              options={options.company}
              value={selected.company}
              onChange={(e) =>
                setSelected((state) => ({ ...state, company: e }))
              }
              isDisabled={
                data_props?.dataDetail?.detail?.organizer_id ? true : false
              }
            />
          </div>

          <button
            className="btn"
            onClick={() =>
              setModal((state) => ({ ...state, companyCreate: true }))
            }
          >
            <PlusCircle width={20} />
          </button>
        </div>
      </div>
    </Component.Modal_Component>
  );
}
