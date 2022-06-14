import React, { useState } from "react";
import {
  AlertError,
  AlertSuccess,
  Modal_Component,
} from "../../../../component";
import PropTypes from "prop-types";
import {
  COLOR_PRIMARY,
  Label,
} from "../../../../component/style/content/default";
import * as api from "../../../../service/api";

export const Modal_create = (props) => {
  const [input, setInput] = useState({});

  console.log(input);
  return (
    <Modal_Component
      title="User"
      show={props.show}
      onHide={props.onHide}
      btnSubmit
      btnName="Simpan"
      onClick={BtnCreateAccount}
    >
      <div className="container">
        <div className="mb-3 mb-md-3">
          <Label color={COLOR_PRIMARY}>Nama</Label>
          <input
            type="text"
            placeholder="Masukkan Nama"
            className="form-control"
            name="name"
            onChange={onChange}
          />
        </div>
        <div className="mb-3 mb-md-3">
          <Label color={COLOR_PRIMARY}>email</Label>
          <input
            type="email"
            placeholder="email"
            autoComplete="false"
            className="form-control"
            name="email"
            onChange={onChange}
          />
        </div>
        <div className="mb-3 mb-md-3">
          <Label color={COLOR_PRIMARY}>password</Label>
          <input
            type="password"
            placeholder="password"
            autoComplete="false"
            className="form-control"
            name="password"
            onChange={onChange}
          />
          <small>
            Jika password tidak diisi maka pengguna akan dikirimkan password
            oleh sistem secara otomatis
          </small>
        </div>
        <div className="mb-3 mb-md-3">
          <Label color={COLOR_PRIMARY}>Re-type Password</Label>
          <input
            type="password"
            placeholder="re - password"
            className="form-control"
            name="retype_password"
            onChange={onChange}
          />
        </div>
      </div>
    </Modal_Component>
  );

  function onChange(e) {
    setInput((state) => ({ ...state, [e.target.name]: e.target.value }));
  }

  async function BtnCreateAccount() {
    await api.api_account.post_user({ body: input }).then(async (res) => {
      console.log(res);
      if (res?.success) {
        await AlertSuccess({ title: "SUCCESS", text: res.success });
        await setInput({});
        await props.onHide();
        await props.getData();
      } else {
        AlertError({ title: "ERROR", text: res.error });
      }
    });
  }
};

Modal_create.defaultProps = {
  show: false,
};

Modal_create.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};
