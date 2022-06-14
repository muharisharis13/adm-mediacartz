import { Plus } from "@styled-icons/fa-solid";
import React, { useEffect, useContext, useState } from "react";
import {
  COLOR_PRIMARY,
  COLOR_SECONDARY,
  ContainerContent,
  HeaderPrimary,
} from "../../../component/style/content/default";
import { ButtonCardSaldo, ContainerCardSaldo, TextSaldo, Title } from "./style";
import { IdxCampaign } from "./campaign";
import { IdxStatistik } from "./statistik";
import { decrypt, DashboardService, Context } from "../../../service";
import { FormatCurrency, useTitle } from "../../../util";
import Cookies from "js-cookie";
import styled from "styled-components";
import { Modal_topup_saldo } from "../../pages/transaksi/modal/modal.topup_saldo";
import { Modal_beli_paket } from "../../pages/transaksi/modal/modal.beli_paket";
import * as Modal from "./modal";

const last = [
  { value: 7, label: "7" },
  { value: 15, label: "15" },
];

export const IdxDashboard = () => {
  const company = Cookies.get("company") ? decrypt(Cookies.get("company")) : {};
  const { data_user, dispatch } = useContext(Context);
  const [data, setData] = useState({
    balance: 0,
    bucket: null,
    list: null,
  });
  const [options, setOptions] = useState({
    last: last,
  });
  const [selected, setSelected] = useState({
    last: last[0],
  });
  const [modal, setModal] = useState({
    topup: false,
    saldo: false,
    topup_paket: false,
  });
  useTitle("Dashboard");

  useEffect(async () => {
    if (company !== null) {
      const user = await DashboardService.user(company.user_id);
      if (user?.success) {
        await dispatch({ type: "DATA_USER", data_user: user.data });
      }
    }

    if (company !== null) {
      await DashboardService.get_balance(company.company_id).then((res) => {
        console.log({ get_balance: res });
        if (res?.success) {
          setData((state) => ({ ...state, balance: res.data }));
        }
      });

      await DashboardService.get_bucket(company.company_id).then((res) => {
        if (res?.success) {
          setData((state) => ({ ...state, bucket: res.data }));
        }
      });
      await DashboardService.get_list({
        company_id: company.company_id,
        last: selected.last?.value,
      }).then((res) => {
        console.log({ get_list: res });
        if (res?.success) {
          setData((state) => ({ ...state, list: res.data }));
        }
      });
    }
  }, []);

  return (
    <Container>
      <Modal_topup_saldo
        show={modal.topup}
        onHide={() => setModal((state) => ({ ...state, topup: false }))}
      />
      <Modal_beli_paket
        show={modal.topup_paket}
        onHide={() => setModal((state) => ({ ...state, topup_paket: false }))}
      />

      <Modal.Modal_list_saldo
        show={modal.saldo}
        onHide={() => setModal((state) => ({ ...state, saldo: false }))}
        props={company ? company : {}}
      />

      <section className="d-block mb-5">
        <div className="d-flex">
          <HeaderPrimary color={COLOR_PRIMARY}>Halo, </HeaderPrimary>
          <HeaderPrimary color={COLOR_SECONDARY}>
            {data_user.name}
          </HeaderPrimary>
        </div>
        <div>
          <h5>{company?.company && company?.company?.company_name}</h5>
        </div>
      </section>

      <section className="mb-4 mb-md-4">
        <div className="row">
          <div className="col-lg-6 col-md-12 col-sm-12 mb-4 mb-md-4">
            <Title className="mb-2">Saldo Anda</Title>

            <ContainerCardSaldo
              className="d-flex align-items-center justify-content-between"
              style={{ padding: "10px" }}
            >
              <TextSaldo
                style={{ cursor: "pointer" }}
                onClick={() => setModal((state) => ({ ...state, saldo: true }))}
              >
                {FormatCurrency.currency(data.balance)}
              </TextSaldo>
              <ButtonCardSaldo
                onClick={() => setModal((state) => ({ ...state, topup: true }))}
              >
                <Plus style={{ width: "15px" }} />
                &nbsp; Top up Saldo
              </ButtonCardSaldo>
            </ContainerCardSaldo>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12">
            <Title className="mb-2">Kuota Aktif</Title>

            <ContainerCardSaldo style={{ padding: "10px" }}>
              <div>
                {data.bucket && data.bucket.length > 0 ? (
                  <div className="news">
                    <ul>
                      {data.bucket?.map((item, idx) => (
                        <li key={idx}>
                          <a>
                            {item.bucket_name} ({item.bucket_impression}{" "}
                            tersisa)
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="empty">Tidak ada kuota saat ini</div>
                )}
              </div>
              <ButtonCardSaldo
                onClick={() =>
                  setModal((state) => ({ ...state, topup_paket: true }))
                }
              >
                <Plus style={{ width: "15px" }} /> &nbsp; Beli Paket
              </ButtonCardSaldo>
            </ContainerCardSaldo>
          </div>
        </div>
      </section>

      {company?.company_id && (
        <section>
          <IdxCampaign
            setData={setData}
            data={data.list}
            options={options}
            setOptions={setOptions}
            selected={selected}
            setSelected={setSelected}
          />
        </section>
      )}

      {company?.company_id && (
        <section>
          <IdxStatistik data={data} />
        </section>
      )}
    </Container>
  );
};

const Container = styled(ContainerContent)`
  @keyframes ticker {
    0% {
      margin-top: 0;
    }
    25% {
      margin-top: -30px;
    }
    50% {
      margin-top: -60px;
    }
    75% {
      margin-top: -90px;
    }
    100% {
      margin-top: 0;
    }
  }
  .empty {
    padding-left: 20px;
    font-size: 22px;
    color: #2dbded;
  }

  .news {
    height: 26px;
    overflow: hidden;
    -webkit-user-select: none;
  }

  .news ul {
    float: left;
    padding-left: 20px;
    animation: ticker 10s cubic-bezier(1, 0, 0.5, 0) infinite;
    -webkit-user-select: none;
  }

  .news ul li {
    line-height: 30px;
    list-style: none;
  }

  .news ul li a {
    color: #2dbded;
    text-decoration: none;
    font-size: 16px;
  }

  .news ul:hover {
    animation-play-state: paused;
  }
`;
