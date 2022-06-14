import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ButtonLogin,
  FormContainerLogin,
  FormInputLogin,
  ImgLogo,
  InputLogin,
  TitleLogin,
} from "../login/style";
import { ContainerLogin, FormInputForgot, TextForgot } from "./style";
import {
  AlertSuccess,
  AlertError,
  Loadingfunc,
} from "../../../../component/index";
import { AuthService } from "../../../../service";
import { useTitle } from "../../../../util";

export const IdxForgotPassword = () => {
  useTitle("Forgot Password");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const btnSendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await AuthService.forgotPasswordUser({
      body: { email: email },
    });

    if (res?.success) {
      AlertSuccess({ title: "success", text: res.success });
    } else {
      AlertError({ title: "error", text: res.error });
    }
    setEmail("");
    setLoading(false);
  };

  return (
    <ContainerLogin>
      <FormContainerLogin onSubmit={btnSendEmail}>
        <FormInputLogin>
          <ImgLogo
            src="https://stmember.mediacartz.com/images/logo-initial.svg"
            alt="Logo"
          />
        </FormInputLogin>
        <FormInputLogin>
          <TitleLogin>Forgot Password ?</TitleLogin>
        </FormInputLogin>

        <FormInputForgot>
          <TextForgot>
            Masukan alamat email anda untuk mendapatkan petunjuk dalam mengatur
            ulang password.
          </TextForgot>
        </FormInputForgot>

        <FormInputLogin>
          <InputLogin
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </FormInputLogin>

        <FormInputLogin>
          {loading ? (
            <Loadingfunc />
          ) : (
            <ButtonLogin type="submit">Send</ButtonLogin>
          )}
        </FormInputLogin>

        <FormInputLogin>
          <Link to="/login">Back to login</Link>
        </FormInputLogin>
      </FormContainerLogin>
    </ContainerLogin>
  );
};
