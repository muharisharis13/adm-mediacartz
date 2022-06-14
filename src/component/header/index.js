import React, { useContext, useState, useEffect } from "react";
import {
  Container,
  ImgLogo,
  LinkNav,
  SectionCenter,
  SectionLogo,
  SectionUser,
  SubMenu,
  SubMenuList,
  SectionIconMenu,
} from "../style/header";
import { data_nav, data_user_nav } from "./nav-data";
import { ArrowIosDownwardOutline } from "@styled-icons/evaicons-outline";
import { IdxHeaderMobile } from "./mobile_v";
import { Menu4 } from "@styled-icons/remix-line";
import { SectionUser1 } from "./tablet_v/sectionUser";
import { Context, decrypt, DashboardService } from "../../service";
import Cookies from "js-cookie";
import { AuthService } from "../../service/api";
import * as Modal from "./modal";
import { AlertError } from "../../component";

export const IdxHeader = () => {
  const [submenuIklan, setSubmenuIklan] = useState({
    name: "",
    open: false,
  });
  const [isOpenEvnt, setIsOpenEvnt] = useState({
    name: "",
    open: false,
  });
  const [modal, setModal] = useState({
    profil: false,
    password: false,
  });

  const [data, setData] = useState({
    profile: null,
  });

  const [isOpenUser, setisOpenUser] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const [cat_company, setCat_company] = useState(null);
  const { data_user, dispatch } = useContext(Context);

  useEffect(async () => {
    if (Cookies.get("company")) {
      let get_company = decrypt(Cookies.get("company"));
      const _id = Cookies.get("_id") ? decrypt(Cookies.get("_id")) : null;
      if (get_company !== null) {
        setCat_company(get_company?.company?.category_company);
      }
      if (_id) {
        await DashboardService.user(_id).then(async (res) => {
          if (res?.data?.success) {
            dispatch({ type: "DATA_USER", data_user: res.data.data });
          } else {
            // await AlertError({title:'ERROR', text:"Terjadi kesalahan"})
            // await window.location.reload();
          }
        });
      }
    }
  }, []);

  return (
    <Container>
      {/* MODAL======= */}
      <Modal.Modal_profil
        show={modal.profil}
        onHide={() => setModal((state) => ({ ...state, profil: false }))}
        data={data.profile}
      />

      <Modal.Modal_password
        show={modal.password}
        onHide={() => setModal((state) => ({ ...state, password: false }))}
      />

      {/* MODAL======= */}

      <SectionLogo>
        {/* icon compnay */}

        <ImgLogo
          src="https://stmember.mediacartz.com/images/logo.svg"
          alt="lg-company"
        />

        {/* MOBILE VERSION */}
        <SectionIconMenu>
          <Menu4
            style={{ width: "30px" }}
            onClick={() => setIsOpenMenu(true)}
          />
        </SectionIconMenu>
        {/* END MOBILE VERSION END */}

        {/* TABLET VERSION */}
        <SectionUser1
          setisOpenUser={setisOpenUser}
          isOpenUser={isOpenUser}
          data_user_nav={data_user_nav}
        />
        {/* TABLET VERSION END */}
      </SectionLogo>

      <SectionCenter>
        {/* navigation */}
        {data_nav.map((item, idx) => (
          <div style={{ position: "relative" }}>
            <LinkNav
              to={
                item.name !== "Beriklan" &&
                item.name !== "Event" &&
                item.name !== "Retail"
                  ? item.path
                  : "#"
              }
              key={idx}
              pathname1={item.path}
              onMouseEnter={
                item.name === "Beriklan"
                  ? () => setSubmenuIklan({ name: item.name, open: true })
                  : item.name === "Event"
                  ? () => setIsOpenEvnt({ name: item.name, open: true })
                  : item.name === "Retail"
                  ? () => setIsOpenEvnt({ name: item.name, open: true })
                  : null
              }
              onMouseLeave={() => {
                setIsOpenEvnt({ name: "", open: false });
                setSubmenuIklan({ name: "", open: false });
              }}
            >
              {item.name}
              {item.sub && (
                <ArrowIosDownwardOutline style={{ width: "15px" }} />
              )}
            </LinkNav>
            {item.sub && (
              <SubMenu
                show={
                  isOpenEvnt.name === item.name
                    ? isOpenEvnt.open
                    : submenuIklan.name === item.name
                    ? submenuIklan.open
                    : false
                }
                onMouseEnter={
                  item.name === "Beriklan"
                    ? () => setSubmenuIklan({ name: item.name, open: true })
                    : item.name === "Event"
                    ? () => setIsOpenEvnt({ name: item.name, open: true })
                    : item.name === "Retail"
                    ? () => setIsOpenEvnt({ name: item.name, open: true })
                    : null
                }
                onMouseLeave={() => {
                  setSubmenuIklan({ name: "", open: false });
                  setIsOpenEvnt({ name: "", open: false });
                }}
              >
                {item.sub &&
                  item.sub.map((sub, idxsub) => (
                    <SubMenuList key={idxsub} to={sub.path}>
                      {sub.name}
                    </SubMenuList>
                  ))}
              </SubMenu>
            )}
          </div>
        ))}
      </SectionCenter>
      <SectionUser>
        {/* user */}
        <div style={{ position: "relative" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onMouseEnter={() => setisOpenUser(true)}
            onMouseLeave={() => setisOpenUser(false)}
          >
            <strong>
              {data_user.name}{" "}
              {cat_company ? `(${cat_company?.category_company_name})` : null}
            </strong>
            &nbsp;
            <ArrowIosDownwardOutline style={{ width: "15px" }} />
          </div>

          <SubMenu
            show={isOpenUser}
            onMouseEnter={() => setisOpenUser(true)}
            onMouseLeave={() => setisOpenUser(false)}
          >
            {data_user_nav.map((item, idx) => (
              <SubMenuList
                to="#"
                key={idx}
                onClick={() => btnSubMenu(item.name)}
              >
                {item.name}
              </SubMenuList>
            ))}
          </SubMenu>
        </div>
      </SectionUser>

      {/* MOBILE VERSION */}
      <IdxHeaderMobile show={isOpenMenu} close={() => setIsOpenMenu(false)} />
    </Container>
  );

  function btnSubMenu(name) {
    switch (name) {
      case "Logout":
        const body = {
          refresh_token: decrypt(Cookies.get("refreshToken")),
        };
        AuthService.logoutUser(body).then((res) => {
          if (res?.success) {
            Cookies.remove("refreshToken");
            Cookies.remove("token");
            Cookies.remove("company");
            window.location.replace("/login");
          }
        });
        break;
      case "Profil":
        AuthService.profile().then((res) => {
          if (res?.success) {
            setData((state) => ({
              ...state,
              profile: res.data,
            }));
            setModal((state) => ({ ...state, profil: true }));
          } else {
            AlertError({ title: "ERROR", text: res.error });
          }
        });
        break;

      case "Ubah Kata Sandi":
        setModal((state) => ({ ...state, password: true }));
        break;
      default:
        break;
    }
  }
};
