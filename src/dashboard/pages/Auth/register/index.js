import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ButtonLogin,
  ContainerLogin,
  FormContainerLogin,
  FormInputLogin,
  ImgLogo,
  InputLogin,
  LineLogin,
  TitleLogin,
  ContainerOr,
  TextP,
} from "../login/style";
import Cookies from "js-cookie";
import { AlertSuccess, AlertError, Loadingfunc } from "../../../../component";
import { AuthService } from "../../../../service/api";
import { Cookie, encrypt } from "../../../../service";
import { useTitle } from "../../../../util";
import { GoogleLogin } from "react-google-login";

export const IdxRegister = () => {
  useTitle("Register");
  const [data, setData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [loading, setLoading] = useState(false);

  const onChangeValue = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const btnRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const body = {
      name: data.fullname,
      email: data.email,
      password: data.password,
      retype_password: data.confirm_password,
    };

    const res = await AuthService.registerUser({ url: "/register", body });

    console.log("ini res", res);

    if (res?.success) {
      await AlertSuccess({ title: "success", text: res.success });
      window.location.href = "/login";
    } else {
      await AlertError({ title: "error", text: res.error });
    }
    setLoading(false);
  };

  const responseGoogle = (response) => {
    // console.log(response.tokenId);

    if (response.tokenId) {
      const body = {
        id_token: response.tokenId,
      };
      AuthService.loginUserWithGoogle(body).then(async (res) => {
        console.log({ loginUserWithGoogle: res });
        if (res?.success) {
          await Cookies.set("token", encrypt(res.data.auth.token), {
            expires: 1,
          });
          await Cookies.set(
            "refreshToken",
            encrypt(res.data.auth.refreshToken),
            { expires: 1 }
          );
          await Cookies.set("company", encrypt(res.data.first_company), {
            expires: 30,
          });

          // await AlertSuccess({ title: "success login", text: "berhasil untuk login silahkan lanjut" });
          window.location.href = "/dashboard";
        } else if (res.error) {
          if (res.data) {
            setData({ ...data, svg_captcha: res.data.captcha });
          }
          AlertError({ title: "Error", text: res.error });
        }
      });
    } else {
      alert("Fail Fetch With Google");
    }
  };

  return (
    <ContainerLogin>
      <FormContainerLogin onSubmit={btnRegister}>
        <FormInputLogin>
          <ImgLogo
            src="https://stmember.mediacartz.com/images/logo-initial.svg"
            alt="Logo"
          />
        </FormInputLogin>
        <FormInputLogin>
          <TitleLogin>Register</TitleLogin>
        </FormInputLogin>

        <FormInputLogin>
          <InputLogin
            type="text"
            placeholder="Fullname"
            name="fullname"
            onChange={onChangeValue}
            value={data.fullname}
          />
        </FormInputLogin>
        <FormInputLogin>
          <InputLogin
            type="email"
            placeholder="Email"
            name="email"
            onChange={onChangeValue}
            value={data.email}
          />
        </FormInputLogin>

        <FormInputLogin>
          <InputLogin
            type="password"
            placeholder="Password"
            name="password"
            onChange={onChangeValue}
            value={data.password}
          />
        </FormInputLogin>

        <FormInputLogin>
          <InputLogin
            type="password"
            placeholder="Confirmation password"
            name="confirm_password"
            onChange={onChangeValue}
            value={data.confirm_password}
          />
        </FormInputLogin>

        <FormInputLogin>
          {loading ? (
            <Loadingfunc />
          ) : (
            <ButtonLogin type="submit">Register</ButtonLogin>
          )}
        </FormInputLogin>

        <ContainerOr>
          <LineLogin />
          <TextP>OR</TextP>
          <LineLogin />
        </ContainerOr>

        <FormInputLogin>
          <GoogleLogin
            clientId={process.env.REACT_APP_CLIENT_ID}
            buttonText="Sign Up With Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </FormInputLogin>

        {/* BACK TO LOGIN */}

        <FormInputLogin>
          <Link to="/login">Back To Login</Link>
        </FormInputLogin>
      </FormContainerLogin>
    </ContainerLogin>
  );
};
