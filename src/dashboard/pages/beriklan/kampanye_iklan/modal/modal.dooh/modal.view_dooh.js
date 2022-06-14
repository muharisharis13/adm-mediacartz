import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import { api_kampanye_iklan } from "../../../../../../service/api";
import { Context } from "../../../../../../service";
import {
  ButtonPrimary,
  COLOR_SECONDARY,
  HeaderPrimary,
  Label,
} from "../../../../../../component/style/content/default";
import Select from "react-select";
import styled from "styled-components";
import { Loadingfunc, Pagination, Card } from "../../../../../../component";
import { Modal_view_dooh_detail } from "./modal.view_dooh_detail";

export const Modal_view_dooh = (props) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    data: [],
    last_page: 1,
    page: 1,
  });
  const [options, setOptions] = useState({
    provinsi: [],
    kabupaten: [],
    kota: [],
    kecamatan: [],
  });
  const [input, setInput] = useState({
    selected_provinsi: "",
    selected_kabupaten: "",
    selected_kota: "",
    selected_kecamatan: "",
  });
  const [modal, setModal] = useState({
    detail: false,
  });
  const [parsing, setParsing] = useState({});
  const { selected_company } = useContext(Context);

  const getData = async () => {
    const body = {
      inventory_category_id: props?.id,
      page: 1,
      rows: 20,
      partner_company_id: selected_company.value,
    };

    console.log("ini body", body);
    await api_kampanye_iklan
      .get_publisher_product({ body: body })
      .then((res) => {
        console.log({ get_publisher_product: res });
        if (res?.success) {
          setData((state) => ({
            ...state,
            data: res.data.data,
            page: res.data.page,
            last_page: res.data.lastPage,
          }));
        }
      });
  };

  useEffect(async () => {
    if (props.show === true) {
      setLoading(true);
      await getData();

      await api_kampanye_iklan.get_publisher_provinsi().then((res) => {
        console.log({ get_publisher_provinsi: res });
        if (res?.success) {
          setOptions((state) => ({
            ...state,
            provinsi: res.data.map((item) => ({
              value: item.ms_province_id,
              label: item.ms_province_name,
            })),
          }));
        }
      });
      setLoading(false);
    }
  }, [props.show]);

  const onChangeSelect = (e, name) => {
    switch (name) {
      case "selected_provinsi":
        setInput((state) => ({ ...state, selected_provinsi: e }));
        api_kampanye_iklan
          .get_publisher_kabupaten({ ms_province_id: e.value })
          .then((res) => {
            console.log({ get_publisher_kabupaten: res });
            if (res?.success) {
              setOptions((state) => ({
                ...state,
                kabupaten: res.data.map((item) => ({
                  value: item.ms_city_id,
                  label: item.ms_city_name_full,
                })),
              }));
              setInput((state) => ({
                ...state,
                selected_kabupaten: "",
                selected_kota: "",
                selected_kecamatan: "",
              }));
            }
          });
        break;
      case "selected_kabupaten":
        setInput((state) => ({ ...state, selected_kabupaten: e }));
        api_kampanye_iklan
          .get_publisher_kota({ ms_city_id: e.value })
          .then((res) => {
            console.log({ get_publisher_kota: res });
            if (res?.success) {
              setOptions((state) => ({
                ...state,
                kota: res.data.map((item) => ({
                  value: item.ms_district_id,
                  label: item.ms_district_name,
                })),
              }));
              setInput((state) => ({
                ...state,
                selected_kota: "",
                selected_kecamatan: "",
              }));
            }
          });
        break;
      case "selected_kota":
        setInput((state) => ({ ...state, selected_kota: e }));
        api_kampanye_iklan
          .get_publisher_kecamatan({ ms_district_id: e.value })
          .then((res) => {
            console.log({ get_publisher_kecamatan: res });
            if (res?.success) {
              setOptions((state) => ({
                ...state,
                kecamatan: res.data.map((item) => ({
                  value: item.ms_village_id,
                  label: item.ms_village_name,
                })),
              }));
              setInput((state) => ({ ...state, selected_kecamatan: "" }));
            }
          });
        break;
      case "selected_kecamatan":
        setInput((state) => ({ ...state, selected_kecamatan: e }));
        break;

      default:
        break;
    }
  };

  const btnFilter = () => {
    setLoading(true);
    const body = {
      inventory_category_id: props?.id,
      ms_city_id: input.selected_kabupaten.value
        ? input.selected_kabupaten.value
        : "",
      ms_village_id: input.selected_kecamatan.value
        ? input.selected_kecamatan.value
        : "",
      ms_district_id: input.selected_kota.value
        ? input.selected_kota.value
        : "",
      ms_province_id: input.selected_provinsi.value
        ? input.selected_provinsi.value
        : "",
      follower: "",
      page: 1,
      rows: 20,
    };
    console.log({ body });
    api_kampanye_iklan.get_publisher_product({ body: body }).then((res) => {
      console.log({ get_publisher_product: res });
      if (res?.success) {
        setData((state) => ({
          ...state,
          data: res.data.data,
          page: res.data.page,
          last_page: res.data.lastPage,
        }));
      }
    });
    setLoading(false);
  };

  const BtnReset = () => {
    getData();
    setInput({
      selected_provinsi: "",
      selected_kabupaten: "",
      selected_kota: "",
      selected_kecamatan: "",
    });
  };

  const btnPagination = (e) => {
    setLoading(true);
    const body = {
      inventory_category_id: props?.id,
      ms_city_id: input.selected_kabupaten.value
        ? input.selected_kabupaten.value
        : "",
      ms_village_id: input.selected_kecamatan.value
        ? input.selected_kecamatan.value
        : "",
      ms_district_id: input.selected_kota.value
        ? input.selected_kota.value
        : "",
      ms_province_id: input.selected_provinsi.value
        ? input.selected_provinsi.value
        : "",
      follower: "",
      page: e.selected + 1,
      rows: 20,
    };
    console.log({ body });
    api_kampanye_iklan.get_publisher_product({ body: body }).then((res) => {
      console.log({ get_publisher_product: res });
      if (res?.success) {
        setData((state) => ({
          ...state,
          data: res.data.data,
          page: res.data.page,
          last_page: res.data.lastPage,
        }));
      }
    });
    setLoading(false);
  };

  const btnDetailDooh = (idx) => {
    setModal((state) => ({ ...state, detail: true }));
    setParsing((state) => ({ ...state, data: data.data[idx] }));
  };

  return (
    <Modal fullscreen show={props.show} onHide={props.onHide}>
      <Modal.Body>
        {/* MODAL================ */}

        <Modal_view_dooh_detail
          show={modal.detail}
          onHide={() => setModal((state) => ({ ...state, detail: false }))}
          data={parsing.data}
        />

        {/* MODAL================ */}

        <div className="container mb-3 mb-md-3">
          <HeaderPrimary color={COLOR_SECONDARY}>Product DOOH</HeaderPrimary>
        </div>
        <div className="container mb-3 mb-md-3 border rounded-2 p-5">
          <div className="mb-5 mb-md-5">
            <div className="row">
              <div className="col-md-6 col-sm-6 col-lg-6">
                <div className="mb-3 mb-md-3">
                  <Label color={COLOR_SECONDARY}>Provinsi</Label>
                  <Select
                    placeholder="Select Provinsi"
                    options={options.provinsi}
                    value={input.selected_provinsi}
                    onChange={(e) => onChangeSelect(e, "selected_provinsi")}
                  />
                </div>
              </div>
              <div className="col-md-6 col-sm-6 col-lg-6">
                <div className="mb-3 mb-md-3">
                  <Label color={COLOR_SECONDARY}>Kabupaten</Label>
                  <Select
                    placeholder="Select Kabupaten"
                    options={options.kabupaten}
                    value={input.selected_kabupaten}
                    onChange={(e) => onChangeSelect(e, "selected_kabupaten")}
                    isDisabled={input.selected_provinsi.value ? false : true}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 col-sm-6 col-lg-6">
                <div className="mb-3 mb-md-3">
                  <Label color={COLOR_SECONDARY}>Kota</Label>
                  <Select
                    placeholder="Select Kota"
                    options={options.kota}
                    value={input.selected_kota}
                    onChange={(e) => onChangeSelect(e, "selected_kota")}
                    isDisabled={input.selected_kabupaten.value ? false : true}
                  />
                </div>
              </div>
              <div className="col-md-6 col-sm-6 col-lg-6">
                <div className="mb-3 mb-md-3">
                  <Label color={COLOR_SECONDARY}>Kecamatan</Label>
                  <Select
                    placeholder="Select Kecamatan"
                    options={options.kecamatan}
                    value={input.selected_kecamatan}
                    onChange={(e) => onChangeSelect(e, "selected_kecamatan")}
                    isDisabled={input.selected_kota.value ? false : true}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <div style={{ marginRight: "8px" }}>
              <ButtonPrimary
                style={{ padding: "7px 20px" }}
                onClick={btnFilter}
              >
                Cari
              </ButtonPrimary>
            </div>
            <div style={{ marginRight: "8px", display: "flex" }}>
              <button className="btn border" onClick={BtnReset}>
                Reset
              </button>{" "}
              &nbsp;&nbsp;&nbsp;
              <button className="btn btn-danger" onClick={() => props.onHide()}>
                Kembali
              </button>
            </div>
          </div>
        </div>

        <div className="container mb-3 mb-md-3">
          <div
            className="d-flex"
            style={{ flexWrap: "wrap", display: "grid", gridGap: "20px" }}
          >
            {loading ? (
              <Loadingfunc />
            ) : (
              data.data?.map((item, idx) => (
                <DivListCard key={idx} onClick={() => btnDetailDooh(idx)}>
                  <Card.Card_dooh item={item} />
                </DivListCard>
              ))
            )}
          </div>
        </div>

        <div className="container">
          <Pagination
            page={data.page}
            totalPage={data.last_page}
            handleOnChange={btnPagination}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};

const DivListCard = styled.div`
  /* margin-right:calc(300px / 12.5) ;
margin-top:calc(300px / 12.5);
cursor:pointer;


&:last-child{
  margin-right:0;
} */
`;

Modal_view_dooh.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};
