import React, { useState, useContext } from "react";
import {
  Modal_Component,
  LoadingIcon,
  AlertSuccess,
  AlertError,
} from "component";
import { FormInputCreate } from "containers/customer";
import PropTypes from "prop-types";
import { ApiCustomer as api } from "../../../../service/api";
import { Context } from "service";
import moment from "moment";

const formatDate = "YYYY-MM-DD";

const Create = (props) => {
  const { show, onHide, getData } = props;
  const [input, setInput] = useState({
    name: null,
    msisdn: 62,
    email: null,
    jenisKelamin: null,
    agama: null,
    pekerjaan: null,
    perangkat: null,
    alamat: null,
    kota: null,
    tempatLahir: null,
    tanggalLahir: null,
    perusahaan: null,
  });
  const [loading, setLoading] = useState(false);
  const { data_user } = useContext(Context);

  const onChangeHandler = (e, action) => {
    if (!action) {
      setInput((state) => ({
        ...state,
        [e.target.name]: e.target.value,
      }));
    } else {
      setInput((state) => ({
        ...state,
        [action]: e,
      }));
    }
  };

  const BtnSubmitHandler = async () => {
    setLoading(true);
    const body = {
      name: input.name,
      msisdn: input.msisdn,
      email: input.email,
      gender: input.jenisKelamin?.value,
      religion: input.agama?.value,
      job: input.pekerjaan,
      birth_place: input.tempatLahir,
      birth_date: moment(new Date(input.tanggalLahir)).format(formatDate),
      address: input.alamat,
      city: input.kota,
      device: input.perangkat?.value,
      company_id: input.perusahaan?.value,
      user_id: data_user?.id,
    };
    await api.postCustomer(body).then(async (res) => {
      if (res?.success) {
        await Promise.all([
          AlertSuccess({ title: "SUCCESS", text: res.success }),
          getData(),
          onHide(),
        ]);
      } else {
        AlertError({ title: "ERRORR", text: res?.error });
      }
      setLoading(false);
    });
  };

  return (
    <Modal_Component
      title="Customer"
      show={show}
      onHide={onHide}
      btnName={loading ? <LoadingIcon /> : "Submit"}
      btnSubmit
      onClick={loading ? null : BtnSubmitHandler}
    >
      <div className="container">
        <FormInputCreate
          name={input.name}
          msisdn={input.msisdn}
          email={input.email}
          jenisKelamin={input.jenisKelamin}
          agama={input.agama}
          pekerjaan={input.pekerjaan}
          perangkat={input.perangkat}
          alamat={input.alamat}
          kota={input.kota}
          tempatLahir={input.tempatLahir}
          tanggalLahir={input.tanggalLahir}
          perusahaan={input.perusahaan}
          onChangeHandler={onChangeHandler}
        />
      </div>
    </Modal_Component>
  );
};

export default Create;

Create.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  getData: PropTypes.any,
};
