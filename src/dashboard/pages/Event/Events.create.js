import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import * as Style from "../../../component/style/content/default";
import * as Services from "../../../service";
import * as Component from "../../../component";
import Select from "react-select";
import { Link } from "react-router-dom";
import { EventsCreateDetail } from "./Events.create.detail";
import { useForm } from "react-hook-form";

const EventsCreate = () => {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState("");
  const [data, setData] = useState({
    category_venue: [],
    category_event: [],
  });
  const [selected_data, setSelected_data] = useState({
    category_venue: null,
    category_event: null,
  });
  const [page, setPage] = useState({
    front: true,
    detail: false,
  });
  const { data_event } = useContext(Services.Context);

  useEffect(async () => {
    if (data_event?.event_id) {
      setPage((state) => ({ ...state, front: false, detail: true }));
    }
    await Promise.all([
      Services.api.ApiEvent.Event.getCompany().then((res) => {
        if (res?.success) {
          setOptions(
            res?.data?.map((item) => ({
              value: item.company_id,
              label: item.company_name,
            }))
          );
        }
      }),
      Services.api.ApiEvent.Event.getCategoryVenue().then((res) => {
        console.log("category_venue", res);
        if (res?.success) {
          setData((state) => ({
            ...state,
            category_venue: res.data,
          }));
        }
      }),
    ]);
  }, []);

  const btnOnClickKategoriRuang = (category_vanue_id) => {
    setSelected_data((state) => ({
      ...state,
      category_venue: category_vanue_id,
    }));
    Services.api.ApiEvent.Event.getCategoryEvent().then((res) => {
      console.log("category_event", res);
      if (res?.success) {
        setData((state) => ({
          ...state,
          category_event: res.data?.filter(
            (filter) => filter?.category_venue_id === category_vanue_id
          ),
        }));
      }
    });
  };

  const btnLanjut = () =>
    setPage((state) => ({ ...state, front: false, detail: true }));
  if (page.front) {
    return (
      <Container className="container">
        <div className="wrap-header text-center">
          <h1 className="text-header">Buat Event apa hari ini ?</h1>
          <span className="text-small-header">
            Isi formulir dengan lengkap dan promosikan event online atau
            offline-mu sekarang
          </span>
        </div>

        <Component.Form className=" mt-4">
          <div className="mb-3">
            <Style.Label color={Style.COLOR_PRIMARY}>Perusahaan</Style.Label>
            <Select
              placeholder="Select Perusahaan"
              options={options}
              value={selected}
              onChange={(e) => setSelected(e)}
            />
          </div>

          <div className="wrap-kat-ruangan mb-5">
            <Style.Label color={Style.COLOR_PRIMARY}>
              Kategori Ruangan
            </Style.Label>{" "}
            <br />
            <span>Pilih Kategori ruangan untuk event</span>
            <div
              className="list d-flex mt-3"
              style={{
                gridGap: "10px",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {data?.category_venue?.map((item: any, idx: number) => (
                <CardButton
                  className="card-button"
                  key={idx}
                  active={
                    item.category_venue_id === selected_data.category_venue
                      ? true
                      : false
                  }
                  onClick={() =>
                    btnOnClickKategoriRuang(item.category_venue_id)
                  }
                >
                  <h5>{item.category_venue_name}</h5>
                </CardButton>
              ))}
            </div>
          </div>
          {selected_data?.category_venue && (
            <div className="wrap-kat-ruangan mb-5">
              <Style.Label color={Style.COLOR_PRIMARY}>
                Kategori Event
              </Style.Label>{" "}
              <br />
              <span>Pilih Kategori event anda</span>
              <div
                className="list align-items-center justify-content-center d-flex mt-3"
                style={{ gridGap: "10px", flexWrap: "wrap" }}
              >
                {data?.category_event?.map((item: any, idx: number) => (
                  <CardButton
                    className="card-button"
                    key={idx}
                    active={
                      item.category_event_id === selected_data.category_event
                        ? true
                        : false
                    }
                    onClick={() =>
                      setSelected_data((state) => ({
                        ...state,
                        category_event: item.category_event_id,
                      }))
                    }
                  >
                    <h5>{item.category_event_name}</h5>
                  </CardButton>
                ))}
              </div>
            </div>
          )}
          {selected_data?.category_event &&
            selected &&
            selected_data?.category_venue && (
              <div className="wrap-button d-flex" style={{ gridGap: "10px" }}>
                <Style.ButtonPrimary onClick={btnLanjut}>
                  Lanjutkan ke pembuatan event
                </Style.ButtonPrimary>
                <Link to="/dashboard/event/events">
                  <div className="btn border">Batal</div>
                </Link>
              </div>
            )}
        </Component.Form>
      </Container>
    );
  } else if (page.detail) {
    return (
      <EventsCreateDetail
        btnKemabali={() =>
          setPage((state) => ({ ...state, front: true, detail: false }))
        }
        selected_data={selected_data}
        company_id={selected}
      />
    );
  }
};

export default EventsCreate;

const CardButton = styled.div`
  min-width: 300px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ active }) => (active ? "#2dbded" : "white")};
  border: ${({ active }) => (active ? "#2dbded" : "1px solid #d1d1d1")};
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
  box-shadow: 0px 3px 5px -2px rgb(161 170 166 / 50%);
  position: relative;
  color: ${({ active }) => (active ? "#fff" : "#d1d1d1")};
  cursor: pointer;
  /* grid-template-columns: 1fr 1fr 1fr 1fr; */
  /* grid-gap:10px; */
  h5 {
    font-weight: 600;
  }
`;

const Container = styled.div`
  .wrap-form {
    .wrap-kat-ruangan {
      display: flex;
      flex-direction: column;
    }
    background-color: #fff;
    box-shadow: 0px 3px 6px rgb(0 0 0 / 16%);
    color: rgba(10, 10, 10, 0.5);
    max-width: 100%;
    position: relative;
    border-radius: 10px;
    padding: 1.5rem;
    width: 100%;
  }

  .wrap-header {
    .text-header {
      color: ${Style.COLOR_PRIMARY};
    }
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
