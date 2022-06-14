import React, { memo } from "react";
import { COLOR_SECONDARY, Label } from "component/style/content/default";
import {
  SelectJenisKelamin,
  SelectAgama,
  SelectDevice,
  SelectPerusahaan,
} from "component/select";
import DatePicker from "react-datepicker";
import PropTypes from "prop-types";

const formInputCreate = (props) => {
  const {
    name,
    msisdn,
    email,
    jenisKelamin,
    agama,
    pekerjaan,
    perangkat,
    alamat,
    kota,
    tempatLahir,
    tanggalLahir,
    perusahaan,
    onChangeHandler,
  } = props;

  return (
    <React.Fragment>
      <div className="row mb-3">
        <div className="col-12">
          <Label color={COLOR_SECONDARY} htmlFor="Nama Customer">
            Nama Customer
          </Label>
          <input
            type="text"
            id="Nama Customer"
            placeholder="Nama Customer"
            className="form-control"
            value={name}
            name="name"
            onChange={onChangeHandler}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6 col-sm-12">
          <Label color={COLOR_SECONDARY} htmlFor="MSISDN">
            MSISDN
          </Label>
          <input
            type="text"
            id="MSISDN"
            placeholder="MSISDN"
            className="form-control"
            value={msisdn}
            name="msisdn"
            onChange={onChangeHandler}
          />
        </div>
        <div className="col-md-6 col-sm-12">
          <Label color={COLOR_SECONDARY} htmlFor="Email">
            Email
          </Label>
          <input
            type="email"
            id="Email"
            placeholder="Email"
            className="form-control"
            value={email}
            name="email"
            onChange={onChangeHandler}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6 col-sm-12">
          <Label color={COLOR_SECONDARY} htmlFor="Jenis kelamin">
            Jenis kelamin
          </Label>
          <SelectJenisKelamin
            value={jenisKelamin}
            onChange={(e) => onChangeHandler(e, "jenisKelamin")}
          />
        </div>
        <div className="col-md-6 col-sm-12">
          <Label color={COLOR_SECONDARY} htmlFor="Agama">
            Agama
          </Label>
          <SelectAgama
            value={agama}
            onChange={(e) => onChangeHandler(e, "agama")}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6 col-sm-12">
          <Label color={COLOR_SECONDARY} htmlFor="Pekerjaan">
            Pekerjaan
          </Label>
          <input
            type="text"
            placeholder="Pekerjaan"
            id="Pekerjaan"
            className="form-control"
            value={pekerjaan}
            name="pekerjaan"
            onChange={onChangeHandler}
          />
        </div>
        <div className="col-md-6 col-sm-12">
          <Label color={COLOR_SECONDARY} htmlFor="Perangkat">
            Perangkat
          </Label>
          <SelectDevice
            value={perangkat}
            onChange={(e) => onChangeHandler(e, "perangkat")}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6 col-sm-12">
          <Label color={COLOR_SECONDARY} htmlFor="Alamat">
            Alamat
          </Label>
          <input
            type="text"
            placeholder="Alamat"
            id="Alamat"
            className="form-control"
            value={alamat}
            name="alamat"
            onChange={onChangeHandler}
          />
        </div>
        <div className="col-md-6 col-sm-12">
          <Label color={COLOR_SECONDARY} htmlFor="Kota">
            Kota
          </Label>
          <input
            type="text"
            placeholder="Kota"
            id="Kota"
            className="form-control"
            value={kota}
            name="kota"
            onChange={onChangeHandler}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6 col-sm-12">
          <Label color={COLOR_SECONDARY} htmlFor="Tempat Lahir">
            Tempat Lahir
          </Label>
          <input
            type="text"
            placeholder="Tempat Lahir"
            id="Tempat Lahir"
            className="form-control"
            value={tempatLahir}
            name="tempatLahir"
            onChange={onChangeHandler}
          />
        </div>
        <div className="col-md-6 col-sm-12">
          <Label color={COLOR_SECONDARY} htmlFor="Tanggal Lahir">
            Tanggal Lahir
          </Label>
          <DatePicker
            id="Tanggal Lahir"
            placeholderText="Select Date"
            className="form-control"
            selected={tanggalLahir}
            onChange={(e) => onChangeHandler(e, "tanggalLahir")}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <Label color={COLOR_SECONDARY} htmlFor="Perusahaan">
            Perusahaan
          </Label>
          <SelectPerusahaan
            value={perusahaan}
            onChange={(e) => onChangeHandler(e, "perusahaan")}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default memo(formInputCreate);

formInputCreate.propTypes = {
  name: PropTypes.string,
  msisdn: PropTypes.string,
  email: PropTypes.string,
  jenisKelamin: PropTypes.object,
  agama: PropTypes.object,
  pekerjaan: PropTypes.string,
  perangkat: PropTypes.object,
  alamat: PropTypes.string,
  kota: PropTypes.string,
  tempatLahir: PropTypes.string,
  tanggalLahir: PropTypes.any,
  perusahaan: PropTypes.object,
  onChangeHandler: PropTypes.any,
};
