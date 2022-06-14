import React, { useEffect, useState } from "react";
import { Container, Logo, Container2 } from "./style";
import { Button } from "../style";
import { decrypt } from "../../../service";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const dataNav = [
  {
    name: "Product",
    path: "/home/product",
  },
  {
    name: "Solutions",
    path: "/home/solutions",
  },
  {
    name: "Customers",
    path: "/home/customers",
  },
  {
    name: "Partners",
    path: "/home/partners",
  },
  {
    name: "Company",
    path: "/home/company",
  },
  {
    name: "Resources",
    path: "/home/resources",
  },
];

export const IdxHeader = () => {
  const [navbar, setNavbar] = useState(null);
  const [company, setCompany] = useState({});

  const ChangeBackground = () => {
    if (window.scrollY >= 441) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  window.addEventListener("scroll", ChangeBackground);

  useEffect(() => {
    if (Cookies.get("company")) {
      setCompany(decrypt(Cookies.get("company")));
    }
  }, []);

  return (
    <div style={{ paddingBottom: "70px" }}>
      <Container active={navbar}>
        <div
          onClick={() => (window.location.href = "/home")}
          style={{ width: "100%" }}
        >
          <Logo></Logo>
        </div>
        <Container2 className="wrap-nav" style={{ width: "100%" }}>
          {dataNav.map((item: any, idx: number) => (
            <Link key={idx} to={item.path}>
              <div className="text-link-nav">{item.name}</div>
            </Link>
          ))}
        </Container2>
        <div
          className="d-flex"
          style={{ justifyContent: "flex-end", width: "100%" }}
        >
          <div>
            {!Cookies.get("token") ? (
              <Button.ButtonPrimary medium>
                <Link to="/register">
                  {navbar ? (
                    <div>
                      <i className="icon-create" /> Let's Create!
                    </div>
                  ) : (
                    "Register"
                  )}
                </Link>
              </Button.ButtonPrimary>
            ) : navbar ? (
              <Button.ButtonPrimary medium>
                <div>
                  <i className="icon-create" /> Let's Create!
                </div>
              </Button.ButtonPrimary>
            ) : null}
          </div>
          <div style={{ marginLeft: "16px" }}>
            <Link to="/login">
              <Button.ButtonSecondary medium>
                {navbar ? (
                  <div>
                    {/* // before login icon */}

                    {!Cookies.get("token") ? (
                      <i className="icon-log-in" />
                    ) : (
                      <i className="icon-user" />
                    )}

                    {/* // afterlogin */}
                  </div>
                ) : (
                  <div className="d-flex">
                    {/* before login */}
                    {!Cookies.get("token") ? (
                      "Login"
                    ) : (
                      <>
                        <i className="icon-user" />{" "}
                        {company?.ms_user?.ms_user_name}
                      </>
                    )}

                    {/* after login */}
                  </div>
                )}
              </Button.ButtonSecondary>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};
