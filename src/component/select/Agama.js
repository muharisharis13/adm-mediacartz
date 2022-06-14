import React, { useEffect, useState } from "react";
import Select from "react-select";
import { ApiCustomer as api } from "../../service/api";
import PropTypes from "prop-types";

const SelectAgama = (props) => {
  const [data, setData] = useState([]);
  const { onChange, value } = props;

  const getData = async () => {
    await api.getSelection().then((res) => {
      if (res?.success) {
        const mapping = res?.data?.religion?.map((item) => ({
          value: item,
          label: item,
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
      placeholder="Pilih Agama"
    />
  );
};

export default React.memo(SelectAgama);

SelectAgama.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.any,
};
