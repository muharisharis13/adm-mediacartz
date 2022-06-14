import React, { useContext, useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import styled from "styled-components";
import { TimesCircle } from "styled-icons/fa-regular";
import {
  ButtonPrimary,
  COLOR_PRIMARY,
  HeaderSecondary,
  Label,
} from "../../../../component/style/content/default";
import Select from "react-select";
import { CompanyService, Context } from "../../../../service";
import { AlertSuccess, AlertError } from "../../../../component/alert";
import { LoadingIcon } from "../../../../component";

export const Modal_create = ({
  onHide,
  show,
  company_id,
  type_modal,
  getData = () => {
    return null;
  },
}) => {
  const [optKota, setOptKota] = useState([]);
  const [slctKota, setSlctKota] = useState("");
  const [optCat_perusahaan, setOptCat_perusahaan] = useState([]);
  const [slctCat_perusahaan, setSlctCat_perusahaan] = useState("");
  const { data_user } = useContext(Context);
  const [input, setInput] = useState({
    category_company_id: null,
    company_address: "",
    company_contact_person: "",
    company_contact_phone: "",
    company_email: "",
    company_name: "",
    company_phone: "",
    company_zip: "",
    ms_city: null,
    ms_city_id: null,
    user_id: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setTimeout(async () => {
      let get_ms_city = await CompanyService.get_ms_city(e);

      if (get_ms_city.success) {
        return setOptKota(
          get_ms_city.data.map((item) => ({
            value: item.ms_city_id,
            label: `${item.ms_city_name_full}(${item.ms_province.ms_province_name})`,
          }))
        );
      }
    }, 500);
  };

  const OnChangeSelect = (e) => {
    setSlctKota(e);
  };

  const OnChangeValue = (e) => {
    if (
      e.target.name === "company_contact_phone" ||
      e.target.name === "company_phone" ||
      e.target.name === "company_zip"
    ) {
      setInput({
        ...input,
        [e.target.name]: e.target.value.replace(/[^0-9]+/g, ""),
      });
    } else {
      setInput({ ...input, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    if (show) {
      if (data_user !== "") {
        setInput({ ...input, user_id: data_user.id });
      }
    }
  }, [show]);

  useEffect(() => {
    async function fetch() {
      await CompanyService.get_category_company().then((res) => {
        console.log("category", res);
        if (res?.data?.success) {
          setOptCat_perusahaan(
            res.data.data.map((item) => ({
              value: item.category_company_id,
              label: item.category_company_name,
            }))
          );
        }
      });
    }
    fetch();
  }, []);

  useEffect(() => {
    if (company_id) {
      async function fetch() {
        await CompanyService.get_company_detail({
          company_id: company_id,
        }).then((company_detail) => {
          if (company_detail?.data?.success) {
            let data = company_detail.data.data;
            setInput({
              ...input,
              company_name: data.company_name,
              company_email: data.company_email,
              company_address: data.company_address,
              company_phone: data.company_phone,
              company_contact_person: data.company_contact_person,
              company_contact_phone: data.company_contact_phone,
              company_zip: data.company_zip,
              user_id: data_user.id,
            });
            setSlctKota({
              value: data.ms_city.ms_city_id,
              label: data.ms_city.ms_city_name_full,
            });
            setSlctCat_perusahaan({
              value: data.category_company.category_company_id,
              label: data.category_company.category_company_name,
            });
          }
        });
      }

      fetch();
    }
  }, [company_id]);

  const BtnSimpan = async () => {
    setLoading(true);
    const body = {
      company_name: input.company_name,
      company_address: input.company_address,
      company_phone: input.company_phone,
      company_email: input.company_email,
      company_contact_person: input.company_contact_person,
      company_contact_phone: input.company_contact_phone,
      company_zip: input.company_zip,
      ms_city_id: slctKota.value,
      user_id: input.user_id,
      category_company_id: slctCat_perusahaan.value,
    };

    if (type_modal === "Ubah") {
      // alert("berhasil ubah")
      await CompanyService.put_edit_company({
        company_id: company_id,
        body: body,
      }).then(async (res) => {
        if (res.success) {
          await AlertSuccess({ title: "SUCCESS", text: res.success });
          await onHide();
          await getData();
          await setInput({
            category_company_id: null,
            company_address: "",
            company_contact_person: "",
            company_contact_phone: "",
            company_email: "",
            company_name: "",
            company_phone: "",
            company_zip: "",
            ms_city: null,
            ms_city_id: null,
            user_id: 1,
          });
        } else {
          AlertError({ title: "ERROR", text: res.error });
        }
        setLoading(false);
      });
    } else {
      await CompanyService.post_company({ body: body }).then(async (res) => {
        if (res.success) {
          await AlertSuccess({ title: "SUCCESS", text: res.success });
          await onHide();
          await setInput({
            category_company_id: null,
            company_address: "",
            company_contact_person: "",
            company_contact_phone: "",
            company_email: "",
            company_name: "",
            company_phone: "",
            company_zip: "",
            ms_city: null,
            ms_city_id: null,
            user_id: 1,
          });

          await getData();
        } else {
          AlertError({ title: "ERROR", text: res.error });
        }
        setLoading(false);
      });
    }
  };

  const handleClose = async () => {
    await Promise.all([
      setInput({
        category_company_id: null,
        company_address: "",
        company_contact_person: "",
        company_contact_phone: "",
        company_email: "",
        company_name: "",
        company_phone: "",
        company_zip: "",
        ms_city: null,
        ms_city_id: null,
        user_id: null,
      }),
      onHide(),
    ]);
  };

  return (
    <Modal onHide={handleClose} show={show} size="lg">
      <ModalHeader>
        <div
          className="d-flex justify-content-between align-items-center"
          style={{ width: "100%", color: "#fff" }}
        >
          <div>
            <HeaderSecondary>Perusahaan</HeaderSecondary>
          </div>
          <button className="btn text-white" onClick={handleClose}>
            <TimesCircle style={{ width: "20px" }} />{" "}
          </button>
        </div>
      </ModalHeader>
      {/* BODY============== */}
      <Modal.Body style={{ background: "#eaeaea" }}>
        <form>
          <div className="mb-3">
            <Label color={COLOR_PRIMARY} htmlFor="Nama Perusahaan">
              Nama Perusahaan
            </Label>
            <input
              type="text"
              className="form-control"
              id="Nama Perusahaan"
              placeholder="Nama Perusahaan"
              name="company_name"
              onChange={OnChangeValue}
              value={input.company_name}
              disabled={loading ? true : false}
            />
          </div>
          <div className="mb-3">
            <Label color={COLOR_PRIMARY} htmlFor="Email">
              Email
            </Label>
            <input
              type="email"
              className="form-control"
              id="Email"
              placeholder="Email"
              name="company_email"
              onChange={OnChangeValue}
              value={input.company_email}
              disabled={loading ? true : false}
            />
          </div>
          <div className="mb-3">
            <Label color={COLOR_PRIMARY} htmlFor="Alamat">
              Alamat
            </Label>
            <input
              type="text"
              className="form-control"
              id="Alamat"
              placeholder="Alamat"
              name="company_address"
              onChange={OnChangeValue}
              value={input.company_address}
              disabled={loading ? true : false}
            />
          </div>
          <div className="mb-3">
            <Label color={COLOR_PRIMARY} htmlFor="Telepon">
              Telepon
            </Label>
            <input
              type="text"
              className="form-control"
              id="Telepon"
              placeholder="Telepon"
              name="company_phone"
              onChange={OnChangeValue}
              value={input.company_phone}
              disabled={loading ? true : false}
            />
          </div>
          <div className="mb-3">
            <Label color={COLOR_PRIMARY} htmlFor="Contact Person">
              Contact Person
            </Label>
            <input
              type="text"
              className="form-control"
              id="Contact Person"
              placeholder="Contact Person"
              name="company_contact_person"
              onChange={OnChangeValue}
              value={input.company_contact_person}
              disabled={loading ? true : false}
            />
          </div>
          <div className="mb-3">
            <Label color={COLOR_PRIMARY} htmlFor="Contact Phone">
              Contact Phone
            </Label>
            <input
              type="text"
              className="form-control"
              id="Contact Phone"
              placeholder="Ex : 62812 - xxxx - xxxx"
              name="company_contact_phone"
              onChange={OnChangeValue}
              value={input.company_contact_phone}
              disabled={loading ? true : false}
            />
          </div>
          <div className="mb-3">
            <Label color={COLOR_PRIMARY} htmlFor="Kota">
              Kota
            </Label>
            <Select
              id="Kota"
              onInputChange={(e) => handleChange(e)}
              value={slctKota}
              onChange={(e) => OnChangeSelect(e)}
              placeholder="Kota"
              options={optKota}
              isDisabled={loading ? true : false}
            />
          </div>
          <div className="mb-3">
            <Label color={COLOR_PRIMARY} htmlFor="Kode Pos">
              Kode Pos
            </Label>
            <input
              type="text"
              className="form-control"
              id="Kode Pos"
              placeholder="Kode Pos"
              name="company_zip"
              onChange={OnChangeValue}
              value={input.company_zip}
              disabled={loading ? true : false}
            />
          </div>
          <div className="mb-3">
            <Label color={COLOR_PRIMARY} htmlFor="Kategori Perusahaan">
              Kategori Perusahaan
            </Label>
            <Select
              id="Kategori Perusahaan"
              placeholder="Kategori Perusahaan"
              options={optCat_perusahaan}
              onChange={(e) => setSlctCat_perusahaan(e)}
              value={slctCat_perusahaan}
              isDisabled={loading ? true : false}
            />
          </div>
        </form>
      </Modal.Body>
      {/* BODY============== */}
      <Modal.Footer>
        {loading ? (
          <LoadingIcon />
        ) : (
          <div className="d-flex">
            <ButtonPrimary onClick={BtnSimpan}>
              {type_modal === "Ubah" ? "Update" : "Simpan"}
            </ButtonPrimary>
            <button
              onClick={handleClose}
              className="btn bg-light border border-light mx-2"
            >
              Batal
            </button>
          </div>
        )}
      </Modal.Footer>
    </Modal>
  );
};

const ModalHeader = styled(Modal.Header)`
  background: ${COLOR_PRIMARY};
`;
