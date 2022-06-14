import React, { useEffect, useState } from "react";
import Select from "react-select";
import { ApiCustomer as api } from "../../service/api";
import PropTypes from "prop-types";

const SelectJenisKelamin = (props) => {
  const [data, setData] = useState([]);
  const { onChange, value } = props;

  const getData = async () => {
    await api.getSelection().then((res) => {
      if (res?.success) {
        const mapping = res?.data?.gender?.map((item) => ({
          value: item,
          label: item === "m" ? "Laki-Laki" : "Perempuan",
        }));
        setData(mapping);
      }
    });
  };
  useEffect(() => {
    getData();
  }, []);

  const onSelectHandler = (e) => onChange(e);

  return (
    <Select
      options={data}
      onChange={onSelectHandler}
      value={value}
      placeholder="Pilih Jenis Kelamin"
      name="jenisKelamin"
    />
  );
};

export default React.memo(SelectJenisKelamin);

SelectJenisKelamin.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.any,
};
