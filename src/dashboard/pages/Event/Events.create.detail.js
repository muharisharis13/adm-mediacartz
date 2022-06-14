import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import * as Style from "../../../component/style/content/default";
import * as Component from "../../../component";
import * as Services from "../../../service";
import * as ModalDetail from "./modal/modal.detail/index";
import * as Util from "../../../util";
import { useForm } from "react-hook-form";
import Datepicker from "react-datepicker";
import Select from "react-select";
import { Link, Redirect } from "react-router-dom";
import moment from "moment";
import { PlusCircle } from "@styled-icons/bootstrap";
import * as Modal from "./modal";

export const EventsCreateDetail = (props: {
  btnKemabali: Function,
  selected_data: Object,
  company_id: Object,
}) => {
  const { btnKemabali, selected_data, company_id } = props;
  let api = Services.api.ApiEvent.Event;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [googleMap, setGoogleMap] = useState({});
  const [input, setInput] = useState({
    lat: null,
    long: null,
    location: null,
    image_banner: {
      url: "",
      file: null,
    },
    html: "",
    shorten: "",
    shortened_compact_url: "",
    valueAutoComplete: null,
  });
  const [tags, setTags] = useState([]);
  const [date, setDate] = useState({
    from_date: new Date(),
    end_date: new Date(),
    from_date_ticket: new Date(),
    end_date_ticket: new Date(),
  });
  const [selected, setSelected] = useState({
    city: null,
    event_organizer: null,
    company: null,
  });
  const [options, setOptions] = useState({
    city: [],
    event_organizer: [],
  });
  const [current_event, setCurrent_event] = useState(null);
  const [data_props, setData_props] = useState({});
  const { data_user, data_event } = useContext(Services.Context);
  const [modal, setModal] = useState({
    createOrganizer: false,
    ubahSeat: false,
  });
  const [redirect, setRedirect] = useState(false);
  const [venue, setVenue] = useState(null);
  const [category_event, setCategory_event] = useState(null);

  useEffect(async () => {
    await setGoogleMap(
      new window.google.maps.Map(document.getElementById("map"), {
        center: {
          lat: -6.21462,
          lng: 106.84513,
        },
        zoom: 13,
        zoomControl: false,
        gestureHandling: "none",
      })
    );
    await Services.api.ApiEvent.Event.getOrganizer(company_id?.value).then(
      (res) => {
        console.log(res);
        if (res.success) {
          setOptions((state) => ({
            ...state,
            event_organizer: res?.data?.map((item) => ({
              value: item.organizer_id,
              label: item.organizer_name,
            })),
          }));
        }
      }
    );
    if (selected_data?.category_venue) {
      setVenue(selected_data?.category_venue);
      setCategory_event(selected_data?.category_event);
    }
    if (company_id) {
      setSelected((state) => ({
        ...state,
        company: company_id,
      }));
    }
    if (data_event?.event_id) {
      setValue("event_name", data_event?.event_name);
      setDate((state) => ({
        ...state,
        from_date: new Date(data_event?.event_start_datetime),
        end_date: new Date(data_event?.event_end_datetime),
        from_date_ticket: new Date(
          data_event?.event_ticket_sale_start_datetime
        ),
        end_date_ticket: new Date(data_event?.event_ticket_sale_end_datetime),
      }));
      setSelected((state) => ({
        ...state,
        city: {
          value: data_event?.ms_city?.ms_city_id,
          label: data_event?.ms_city?.ms_city_name,
        },
        event_organizer: {
          value: data_event?.organizer,
          label: data_event?.organizer?.organizer_name,
        },
        company: {
          value: data_event?.company,
          label: data_event?.company_name,
        },
      }));
      setInput((state) => ({
        ...state,
        valueAutoComplete: data_event?.event_location,
        image_banner: {
          url: data_event?.event_image_url,
        },
        html: data_event?.event_description,
        lat: data_event?.event_location_coordinate?.split(",")[0],
        long: data_event?.event_location_coordinate?.split(",")[1],
        location: data_event?.event_location,
      }));
      setVenue(data_event?.category_venue_id);
      setCategory_event(data_event?.category_event_id);
      setValue("event_access_phrase", data_event?.event_access_phrase);
      setValue("event_detail_lokasi", data_event?.event_location_detail);
      setTags(data_event?.tag?.map((item) => item.tag_name));
      setValue("event_external_platform", data_event?.event_external_platform);
      setValue("event_external_url", data_event?.event_external_url);
      // console.log("lat long",data_event?.event_location_coordinate?.split(","))
    }
  }, []);

  console.log("data event", data_event);
  console.log("tags", tags);

  const onChangeAutoComplete = async (e) => {
    let { place_id } = e.value;
    const request = {
      placeId: place_id,
    };

    const PlaceService = new window.google.maps.places.PlacesService(googleMap);

    PlaceService.getDetails(request, (place, status) => {
      console.log({ place });
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        //set lat, lng
        setInput((state) => ({
          ...state,
          lat: place.geometry?.location?.lat(),
          long: place.geometry?.location?.lng(),
          location: place.formatted_address,
        }));

        // Create marker
        var marker = new window.google.maps.Marker({
          map: googleMap,
          position: place.geometry.location,
        });

        // Center map on place location
        googleMap.setCenter(place.geometry.location);
      }
    });
  };

  const onChangeSelectCity = (e) => {
    setTimeout(async () => {
      await Services.api.ApiEvent.Event.getMsCity(e).then((res) => {
        if (res.success) {
          setOptions((state) => ({
            ...state,
            city: res?.data?.map((item) => ({
              value: item.ms_city_id,
              label: item.ms_city_name,
            })),
          }));
        }
      });
    }, 1500);
  };

  const onChangeFileAttc = (e) => {
    let file = e.target.files[0];

    if (file) {
      setInput((state) => ({
        ...state,
        image_banner: {
          file: file,
          url: URL.createObjectURL(file),
        },
      }));
    }
  };

  const btnShorten = async (e) => {
    // console.log(e.shorten)
    const body = {
      shortened_original_link: e.shorten,
    };
    await Services.api.ApiEvent.Event.postShortened(body).then((res) => {
      console.log(res);
      if (res.success) {
        Component.AlertSuccess({ title: "Success", text: res.success });
        setInput((state) => ({
          ...state,
          shortened_compact_url: res?.data?.shortened_compact_url,
        }));
      } else {
        Component.AlertError({ title: "Error", text: res.error });
      }
    });
  };

  async function previewEvent(item) {
    let event_data = item;

    Component.AlertQuestion({
      title: "Question",
      text: `Apakah anda ingin melihat pratinjau event ${event_data.event_name}?`,
    }).then((res) => {
      if (res.isConfirmed) {
        window.open(event_data.event_url, "_blank");
      }
    });
  }

  async function goBack(event_data) {
    setRedirect(true);
    if (event_data) {
      await previewEvent(event_data);
    }
  }

  async function createSeat(item) {
    let event_data = item;

    Component.AlertQuestion({
      title: "Warning",
      text: `Apakah anda ingin membuat seat untuk event ${event_data.event_name}?`,
    }).then(async (res) => {
      if (res.isConfirmed) {
        await setData_props({
          seat: {
            seat_layout_image: null,
          },
          event_id: event_data.event_id,
        });
        await setModal((state) => ({ ...state, ubahSeat: true }));
      }
    });
  }

  const btnSave = async (e) => {
    console.log("selected", selected);
    const formData = new FormData();
    formData.append("event_image", input.image_banner.file);
    formData.append("event_name", e.event_name);
    formData.append("event_description", input.html);
    formData.append(
      "event_start_datetime",
      moment(date.from_date).format("YYYY-MM-DD HH:mm:ss")
    );
    formData.append(
      "event_end_datetime",
      moment(date.end_date).format("YYYY-MM-DD HH:mm:ss")
    );
    formData.append(
      "event_ticket_sale_start_datetime",
      moment(date.from_date_ticket).format("YYYY-MM-DD HH:mm:ss")
    );
    formData.append(
      "event_ticket_sale_end_datetime",
      moment(date.end_date_ticket).format("YYYY-MM-DD HH:mm:ss")
    );
    formData.append("event_location", input.location);
    formData.append("event_location_detail", e.event_detail_lokasi);
    formData.append("event_location_coordinate", `${input.lat},${input.long}`);
    formData.append("event_access_phrase", e.event_access_phrase);
    formData.append("category_event_id", category_event);
    formData.append("category_venue_id", venue);
    formData.append("user_id", data_user.id);
    formData.append("company_id", selected?.company?.value);
    formData.append("ms_city_id", selected?.city?.value);
    formData.append("event_tag", tags.join(","));
    formData.append(
      "organizer_id",
      selected.event_organizer?.value?.organizer_id ||
        selected.event_organizer?.value
    );
    formData.append("event_external_platform", e.event_external_platform);
    formData.append("event_external_url", e.event_external_url);
    formData.append("microsite_id", "");

    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    console.log(e);
    if (!selected_data.category_event && !input.image_banner.file) {
      return Component.AlertError({
        title: "Error",
        text: "Mohon masukan file gambar untuk banner event",
      });
    }

    try {
      if (current_event?.event_id || data_event?.event_id) {
        await api
          .putEvent(
            formData,
            current_event ? current_event?.event_id : data_event?.event_id
          )
          .then(async (res) => {
            console.log(res);
            if (res?.success) {
              await Component.AlertSuccess({
                title: "Success",
                text: res.success,
              });
              await goBack(res.data);
            } else {
              Component.AlertError({ title: "ERROR", text: res.error });
            }
          });
      } else {
        await api.postEvent(formData).then(async (res) => {
          console.log(res);
          if (res?.success) {
            await Component.AlertSuccess({
              title: "Success",
              text: res.success,
            });

            setCurrent_event(res.data);
            await createSeat(res.data);
          } else {
            Component.AlertError({ title: "ERROR", text: res.error });
          }
        });
      }
    } catch (error) {
      Component.AlertError({ title: "Error", text: error });
    }
  };

  return (
    <Container className="container">
      {redirect && <Redirect to="/dashboard/event/events" />}
      {/* MODAL ===== */}
      <ModalDetail.ModalSeatUbah
        data={data_props}
        show={modal.ubahSeat}
        onHide={() => setModal((state) => ({ ...state, ubahSeat: false }))}
      />

      <Modal.ModalOrganizerCreate
        show={modal.createOrganizer}
        onHide={() =>
          setModal((state) => ({ ...state, createOrganizer: false }))
        }
        company={selected?.company}
      />
      <div className="wrap-header">
        <h2 className="text-header">Detail Event</h2>
        <span className="text-small-header">
          Anda dapat membuat event sesuai dengan kebutuhan anda !
        </span>
      </div>

      <div className="wrap-form mt-5 mb-5">
        <div className="mb-3">
          <Style.Label color={Style.COLOR_SECONDARY}>Nama Event</Style.Label>
          <input
            type="text"
            placeholder="Masukkan nama event"
            className="form-control"
            {...register("event_name")}
          />
        </div>
        <div className="mb-3">
          <div className="row">
            <div className="col-md-6 col-sm-12 col-lg-6">
              <Style.Label color={Style.COLOR_SECONDARY}>
                Tanggal Mulai
              </Style.Label>
              <Datepicker
                selected={date.from_date}
                className="form-control"
                onChange={(e) =>
                  setDate((state) => ({ ...state, from_date: e }))
                }
                selectsStart
                minDate={new Date()}
                startDate={date.from_date}
              />
            </div>
            <div className="col-md-6 col-sm-12 col-lg-6">
              <Style.Label color={Style.COLOR_SECONDARY}>
                Tanggal Berakhir
              </Style.Label>
              <Datepicker
                selected={date.end_date}
                className="form-control"
                onChange={(e) =>
                  setDate((state) => ({ ...state, end_date: e }))
                }
                selectsEnd
                startDate={date.from_date}
                endDate={date.end_date}
                minDate={date.from_date}
              />
            </div>
          </div>
        </div>

        <div className="mb-3">
          <div className="row">
            <div className="col-md-6 col-sm-12 col-lg-6">
              <Style.Label color={Style.COLOR_SECONDARY}>
                Tanggal Mulai penjualan Tiket
              </Style.Label>
              <Datepicker
                selected={date.from_date_ticket}
                className="form-control"
                onChange={(e) =>
                  setDate((state) => ({ ...state, from_date_ticket: e }))
                }
                selectsStart
                minDate={new Date()}
                startDate={date.from_date_ticket}
              />
            </div>
            <div className="col-md-6 col-sm-12 col-lg-6">
              <Style.Label color={Style.COLOR_SECONDARY}>
                Tanggal Berakhir Penjualan Tiket
              </Style.Label>
              <Datepicker
                selected={date.end_date_ticket}
                className="form-control"
                onChange={(e) =>
                  setDate((state) => ({ ...state, end_date_ticket: e }))
                }
                selectsEnd
                startDate={date.from_date_ticket}
                endDate={date.end_date_ticket}
                minDate={date.from_date_ticket}
              />
            </div>
          </div>
        </div>
        <div className="mb-3">
          <div className="row">
            <div className="col-md-6 col-sm-12 col-lg-6">
              <Style.Label color={Style.COLOR_SECONDARY}>Kota</Style.Label>
              <Select
                placeholder="Masukkan Nama Kota"
                options={options.city}
                value={selected.city}
                onInputChange={onChangeSelectCity}
                onChange={(e) =>
                  setSelected((state) => ({ ...state, city: e }))
                }
              />
            </div>
            {venue === 1 && (
              <div className="col-md-6 col-sm-12 col-lg-6">
                <Style.Label color={Style.COLOR_SECONDARY}>
                  Kode Akses Event
                </Style.Label>
                <input
                  type="text"
                  placeholder="Kode Akses Event"
                  className="form-control"
                  {...register("event_access_phrase")}
                />
              </div>
            )}
          </div>
        </div>
        <div className="mb-3">
          <div className="row">
            <div className="col-md-6 col-lg-6 col-sm-6">
              <Style.Label color={Style.COLOR_SECONDARY}>Lokasi</Style.Label>
              <Component.PlacesAutocomplete1
                handleOnchange={onChangeAutoComplete}
              />
            </div>
            <div className="col-md-6 col-lg-6 col-sm-6">
              <Style.Label color={Style.COLOR_SECONDARY}>
                Detail Lokasi
              </Style.Label>
              <input
                type="text"
                placeholder="Masukkan Detail Lokasi"
                className="form-control"
                {...register("event_detail_lokasi")}
              />
            </div>
          </div>
        </div>
        {/* GOOGLE MAPSSS */}
        <div className="mb-3">
          <div>
            <div id="map" style={{ width: "100%", height: "240px" }} />
          </div>
        </div>

        <div className="mb-3">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <Style.Label color={Style.COLOR_SECONDARY}>
                Event Organizer
              </Style.Label>
              <div className="d-flex align-items-center">
                <div style={{ width: "100%" }}>
                  <Select
                    placeholder="Pilih Organizer"
                    options={options.event_organizer}
                    value={selected.event_organizer}
                    onChange={(e) =>
                      setSelected((state) => ({ ...state, event_organizer: e }))
                    }
                  />
                </div>
                <button
                  className="btn"
                  onClick={() =>
                    setModal((state) => ({ ...state, createOrganizer: true }))
                  }
                >
                  <PlusCircle width={20} />
                </button>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <Style.Label color={Style.COLOR_SECONDARY}>Tag Event</Style.Label>
              <Component.Tags state={tags} setState={setTags} />
            </div>
          </div>
        </div>

        <div className="mb-3">
          <Style.Label color={Style.COLOR_SECONDARY}>
            Gambar Banner Event
          </Style.Label>
          <div className="row">
            <div className="col-md-6 col-lg-6 col-sm-12">
              <img
                src={input.image_banner?.url}
                alt=""
                id="event-file"
                width={150}
                className="event-file"
              />
            </div>
            <div className="col-md-6 col-lg-6 col-sm-12">
              <input
                type="file"
                name=""
                id=""
                className="form-control"
                accept="image/*"
                placeholder="Choose Your File"
                onChange={onChangeFileAttc}
              />
              <p>
                *Kapasitas maksimal ukuran file 300Kb
                <br />
                *Dimensi rekomendasi banner: 1900 x 900 piksel
              </p>
            </div>
          </div>
        </div>

        <div className="mb-3">
          <Style.Label color={Style.COLOR_SECONDARY}>
            Gambar Banner Event
          </Style.Label>

          <Style.ButtonPrimary>Buka Html Builder</Style.ButtonPrimary>

          <div className="mt-3">
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              className="form-control"
              placeholder="Masukkan Konten HTML atau gunakan panduan Html Builder"
              value={input.html}
              onChange={(e) =>
                setInput((state) => ({ ...state, html: e.target.value }))
              }
            />
          </div>
        </div>

        <div className="mb-3">
          <Style.Label
            color={Style.COLOR_SECONDARY}
            style={{ display: "flex", gridGap: "10px" }}
          >
            Perlu sort URL?
            <div
              data-bs-toggle="tooltip"
              data-bs-html={true}
              title="Gunakan layanan ini untuk mempersingkat link yang ingin
                  Anda masukkan ke dalam konten template. URL yang
                  dipersingkat dapat dipantau untuk melihat berapa banyak
                  jumlah klik dari pengguna."
            >
              ⓘ
            </div>
          </Style.Label>
          <WrapInputSort className="d-flex align-items-center">
            <input
              type="text"
              placeholder="https://yourwebsite.com"
              className="form-control"
              {...register("shorten")}
            />
            <span onClick={handleSubmit(btnShorten)}>Shorten</span>
          </WrapInputSort>
        </div>

        <div className="mb-3">
          <Style.Label color={Style.COLOR_SECONDARY}>
            Platform Eksternal
          </Style.Label>
          <input
            type="text"
            placeholder="Masukkan platform eksternal"
            className="form-control mb-3"
            {...register("event_external_platform")}
          />
          <input
            type="text"
            placeholder="Masukkan platform eksternal contoh (https://yourwebsite.com)"
            className="form-control"
            {...register("event_external_url")}
          />
        </div>

        <div
          className="wrap-button mb-3 d-flex"
          style={{ alignItems: "center", gridGap: "10px" }}
        >
          <Style.ButtonPrimary onClick={handleSubmit(btnSave)}>
            Konfirmasi & Buat Event
          </Style.ButtonPrimary>
          <button className="btn border" onClick={btnKemabali}>
            Kembali
          </button>
          <Link to="/dashboard/event/events">
            <button className="btn border">Batal</button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

const WrapInputSort = styled.div`
  span {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    height: auto;
    background: ${Style.COLOR_SECONDARY};
    color: #fff;
    padding: 9px 10px;
    border-radius: 0px 10px 10px 0px;
  }
`;

const Container = styled.div`
  .wrap-form {
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
`;
