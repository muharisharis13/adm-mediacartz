import React, { useEffect, useState } from "react";
import Select from "react-select";
import { ApiCustomer as api } from "../../service/api";
import PropTypes from "prop-types";

const SelectPerangkat = (props) => {
  const [data, setData] = useState([]);
  const { onChange, value } = props;

  const getData = async () => {
    await api.getCompany().then((res) => {
      if (res?.success) {
        const mapping = res?.data?.map((item) => ({
          value: item.company_id,
          label: item.company_name,
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
      placeholder="Pilih Perusahaan"
    />
  );
};

export default React.memo(SelectPerangkat);

SelectPerangkat.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.any,
};
