import React from "react";
import { Modal } from "react-bootstrap";
import styled from "styled-components";
import {
  COLOR_PRIMARY,
  HeaderSecondary,
  ButtonPrimary,
} from "../style/content/default";
import { TimesCircle } from "styled-icons/fa-regular";

export const Modal_Component = ({
  children,
  size = "lg",
  show,
  onHide,
  title,
  btnSubmit,
  onClick,
  btnName = "button",
  dialogClassName,
  fullscreen,
}) => {
  return (
    <Modal
      fullscreen={fullscreen ? true : false}
      show={show}
      onHide={onHide}
      size={size}
      dialogClassName={dialogClassName}
      enforceFocus={false}
    >
      <ModalHeader>
        <div
          className="d-flex justify-content-between align-items-center"
          style={{ width: "100%", color: "#fff" }}
        >
          <div>
            <HeaderSecondary>{title}</HeaderSecondary>
          </div>
          <button className="btn text-white" onClick={onHide}>
            <TimesCircle style={{ width: "20px" }} />{" "}
          </button>
        </div>
      </ModalHeader>
      <Modal.Body style={{ background: "#eaeaea", minHeight: "150px" }}>
        {children}
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex">
          {btnSubmit && (
            <ButtonPrimary type="submit" onClick={onClick && onClick}>
              {btnName}
            </ButtonPrimary>
          )}
          <button
            onClick={onHide}
            className="btn bg-light border border-gray mx-2"
          >
            Tutup
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

const ModalHeader = styled(Modal.Header)`
  background: ${COLOR_PRIMARY};
`;
