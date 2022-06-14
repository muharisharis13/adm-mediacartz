import React from "react";
import { Modal_Component } from "component";

const Konversi = (props) => {
  const { show, onHide } = props;

  return (
    <Modal_Component title="Konversi" show={show} onHide={onHide}>
      Konversi
    </Modal_Component>
  );
};

export default Konversi;
