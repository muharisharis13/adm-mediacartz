import React, { useState, useEffect, useContext } from "react";
import { Modal } from "react-bootstrap";
import * as Component from "../../../../component";
import { Context, Method } from "../../../../service";
import Select from "react-select";
import { Times } from "styled-icons/fa-solid";

const ModalSelectCompany = (props: { show: boolean, onHide: Function }) => {
  const { show, onHide } = props;
  const [data, setData] = useState([]);
  const { selected_company, dispatch } = useContext(Context);

  useEffect(async () => {
    if (show) {
      await Method.get(`company`)
        .then((res) => {
          console.log(res.data);
          if (res?.data?.success) {
            setData(
              res?.data?.data?.map((item) => ({
                value: item.company_id,
                label: item.company_name,
              }))
            );

            if (res?.data?.data?.length === 1) {
              dispatch({
                type: "SELECTED_COMPANY",
                selected_company: {
                  value: res?.data?.data[0]?.company_id,
                  label: res?.data?.data[0]?.company_name,
                },
              });
            }
          } else {
            Component.AlertError({ title: "Error", text: res?.data?.error });
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  }, [show]);

  const BtnOnChangeSelect = async (e) => {
    await Promise.all([
      dispatch({
        type: "SELECTED_COMPANY",
        selected_company: e,
      }),
      onHide(),
    ]);
  };

  return (
    <Component.Modal_Component
      show={show}
      onHide={onHide}
      title="Select Company"
      // btnSubmit
      // btnName="Lanjut"
      // onClick={BtnOnChangeSelect}
    >
      <div className="container p-lg-2">
        <label htmlFor="">Pilih Perusahaan</label>
        <Select
          placeholder="Select Company"
          value={selected_company}
          options={data}
          onChange={BtnOnChangeSelect}
          isDisabled={data.length === 1 ? true : false}
        />
      </div>
    </Component.Modal_Component>
  );
};

export default ModalSelectCompany;
