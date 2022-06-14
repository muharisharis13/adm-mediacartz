import React, { useContext, useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
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
  ButtonRegister,
} from "./style";
import { useTitle } from "../../../../util";
import { Cookie, encrypt } from "../../../../service";
import { Loadingfunc } from "../../../../component/loading/index";
import { AlertError, AlertSuccess } from "../../../../component/alert";
import Cookies from "js-cookie";
import { AuthService } from "../../../../service/api";
import { GoogleLogin } from "react-google-login";

export const IdxLogin = () => {
  useTitle("Login");
  const [data, setData] = useState({
    email: "",
    password: "",
    captcha: "",
    svg_captcha: "",
  });
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const onChangeValue = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const btnLogin = async (e) => {
    e.preventDefault();
    await setLoading(true);
    const res = await AuthService.loginUser(data);

    if (res?.success) {
      await Cookies.set("token", encrypt(res.data.auth.token), { expires: 1 });
      await Cookies.set("refreshToken", encrypt(res.data.auth.refreshToken), {
        expires: 1,
      });
      await Cookies.set("company", encrypt(res.data.first_company), {
        expires: 30,
      });
      await Cookies.set("_id", encrypt(res.data.id), {
        expires: 30,
      });

      // await AlertSuccess({ title: "success login", text: "berhasil untuk login silahkan lanjut" });
      // window.location.href = "/dashboard"
    } else if (res.error) {
      if (res.data) {
        setData({ ...data, svg_captcha: res.data.captcha });
      }
      AlertError({ title: "Error", text: res.error });
    }
    await setLoading(false);
  };

  let blob = new Blob([data.svg_captcha && data.svg_captcha], {
    type: "image/svg+xml",
  });
  let url = URL.createObjectURL(blob);

  // useEffect(() => {
  //   fetch("https://8e31-125-208-135-53.ngrok.io/p1/event/all", {
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => res.json)
  //     .then((res) => {
  //       console.log({ ini_res: res });
  //     })
  //     .catch((err) => {
  //       console.error({ err });
  //     });
  // }, []);

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
          await Cookies.set("_id", encrypt(res.data.id), {
            expires: 30,
          });

          // await AlertSuccess({ title: "success login", text: "berhasil untuk login silahkan lanjut" });
          // window.location.href = "/dashboard"
          setRedirect(true);
        } else if (res.error) {
          if (res.data) {
            setData({ ...data, svg_captcha: res.data.captcha });
          }
          AlertError({ title: "Error", text: res.error });
        }
      });
    }
    // else{
    //   alert("Fail Fetch With Google")
    // }
  };

  if (Cookie.get({ name: "token" }) || redirect) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <ContainerLogin>
      <FormContainerLogin onSubmit={btnLogin}>
        <FormInputLogin>
          <ImgLogo
            src="https://stmember.mediacartz.com/images/logo-initial.svg"
            alt="Logo"
          />
        </FormInputLogin>
        <FormInputLogin>
          <TitleLogin>Login</TitleLogin>
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

        {data.svg_captcha && (
          <FormInputLogin>
            {data.svg_captcha && <img src={url} alt="captcha" />}
            <InputLogin
              type="text"
              placeholder="captcha"
              name="captcha"
              onChange={onChangeValue}
              value={data.captcha}
            />
          </FormInputLogin>
        )}

        <FormInputLogin>
          {loading ? (
            <Loadingfunc />
          ) : (
            <ButtonLogin type="submit" onClick={btnLogin}>
              Masuk
            </ButtonLogin>
          )}
        </FormInputLogin>

        <FormInputLogin>
          <Link to="/forgot-password">Forgot Password ?</Link>
        </FormInputLogin>

        <FormInputLogin>
          {/* //contoh */}
          <GoogleLogin
            clientId={process.env.REACT_APP_CLIENT_ID}
            buttonText="Sign in with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </FormInputLogin>

        {/* register */}

        <ContainerOr>
          <LineLogin />
          <TextP>OR</TextP>
          <LineLogin />
        </ContainerOr>

        <FormInputLogin>
          <ButtonRegister to="/register">
            Register , New Account Here !
          </ButtonRegister>
        </FormInputLogin>
      </FormContainerLogin>
    </ContainerLogin>
  );
};
