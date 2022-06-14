import React, { useState, useEffect, useContext } from "react";
import {
  Modal_Component,
  Loadingfunc,
  LoadingIcon,
  AlertSuccess,
  AlertError,
} from "component";
import { FormInputCreate } from "containers/customer";
import PropTypes from "prop-types";
import { ApiCustomer as api } from "../../../../service/api";
import { Context } from "../../../../service";
import moment from "moment";
const formatDate = "YYYY-MM-DD";

const Edit = (props) => {
  const { show, onHide, params, getData } = props;
  const { data_user } = useContext(Context);
  const [input, setInput] = useState({
    name: null,
    msisdn: null,
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
  const [loadingBtn, setLoadingBtn] = useState(false);

  const getDataDetail = React.useCallback(async () => {
    setLoading(true);
    await api.getDetailCustomer(params?.id).then((res) => {
      if (res?.success) {
        let response = res?.data;
        setInput({
          name: response?.name,
          msisdn: response?.msisdn,
          email: response?.email,
          jenisKelamin: {
            value: response?.gender,
            label: response?.gender === "m" ? "Laki-Laki" : "Perempuan",
          },
          agama: {
            value: response?.religion,
            label: response?.religion,
          },
          pekerjaan: response?.job,
          perangkat: {
            value: response?.device,
            label: response?.device,
          },
          alamat: response?.address,
          kota: response?.city,
          tempatLahir: response?.birth_place,
          tanggalLahir: response?.birth_date
            ? new Date(response?.birth_date)
            : new Date(),
          perusahaan: {
            value: response?.company?.company_id,
            label: response?.company?.company_name,
          },
        });
      }
      setLoading(false);
    });
  }, [params?.id]);

  useEffect(() => {
    if (show) getDataDetail();
  }, [show]);

  const BtnSubmit = async () => {
    setLoadingBtn(true);
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

    await api.putCustomer(body, params?.id).then(async (res) => {
      console.log(res);

      if (res?.success) {
        await Promise.all([
          AlertSuccess({ title: "SUCCESS", text: res?.success }),
          getData(),
          onHide(),
        ]);
      } else {
        AlertError({ title: "ERROR", text: res?.error });
      }
      setLoadingBtn(false);
    });
  };

  return (
    <Modal_Component
      show={show}
      onHide={onHide}
      title="Edit"
      btnName={loadingBtn ? <LoadingIcon /> : "Submit"}
      btnSubmit
      onClick={loadingBtn ? null : BtnSubmit}
    >
      <div className="container">
        {loading ? (
          <Loadingfunc />
        ) : (
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
          />
        )}
      </div>
    </Modal_Component>
  );
};

export default Edit;

Edit.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  getData: PropTypes.any,
  params: PropTypes.any,
};
