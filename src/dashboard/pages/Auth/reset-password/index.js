import React from 'react'
import { Link } from 'react-router-dom'
import { ButtonLogin, ContainerLogin, ContainerSignInGoogle, FormContainerLogin, FormInputLogin, ImgIconGoogle, ImgLogo, InputLogin, LineLogin, TextSignGoogle, TitleLogin, ContainerOr, TextP, ButtonRegister } from '../login/style'
import IcnGoogle from "../../../../asset/icon/icon-google.png"

export const IdxResetPassword = () => {
  return (
    <ContainerLogin>

      <FormContainerLogin>
        <FormInputLogin>
          <ImgLogo src="https://stmember.mediacartz.com/images/logo-initial.svg" alt="Logo" />
        </FormInputLogin>
        <FormInputLogin>
          <TitleLogin>Reset Password</TitleLogin>
        </FormInputLogin>


        <FormInputLogin>
          <InputLogin type="email" placeholder="Email" />
        </FormInputLogin>

        <FormInputLogin>
          <InputLogin type="password" placeholder="Password" />
        </FormInputLogin>

        <FormInputLogin>
          <InputLogin type="password" placeholder="Confirmation password" />
        </FormInputLogin>

        <FormInputLogin>
          <ButtonLogin>
            Reset
          </ButtonLogin>
        </FormInputLogin>



      </FormContainerLogin>
    </ContainerLogin>
  )
}
