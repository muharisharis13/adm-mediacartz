import React, { useEffect, useState, useContext } from "react";
import {
  IdxSlider_range,
  Modal_Component,
  IdxGoogle_maps,
  PlacesAutocomplete1,
  AlertError,
  LoadingIcon,
  AlertSuccess,
} from "../../../../../../component";
import {
  COLOR_SECONDARY,
  Label,
} from "../../../../../../component/style/content/default";
import Select from "react-select";
import { api_penerima } from "../../../../../../service/api";
import { Context } from "../../../../../../service";
import { geocodeByPlaceId } from "react-google-places-autocomplete";

const for_options = {
  company: [],
  channel: [],
  inventory: [],
  brand_operator: [],
  produk_operator: [],
  jenis_kelamin: [],
  OS: [],
  agama: [],
  tipe_lokasi: [],
  kota: [],
  kecamatan: [],
  kelurahan: [],
};

const for_selected = {
  company: "",
  channel: "",
  inventory: "",
  brand_operator: "",
  produk_operator: "",
  jenis_kelamin: "",
  OS: "",
  agama: "",
  tipe_lokasi: "",
  kota: "",
  kecamatan: "",
  kelurahan: "",
};

const for_input = {
  label_penerima: "",
  total_penerima: "",
  client_penerima: "",
  pembuat_iklan: "",
  lat: 0,
  long: 0,
  sliderAge: [22, 55],
  arpu: [10000, 50000],
  radius: 0,
  location: "",
};

export const Modal_tipe_target = ({ show, onHide, getData1, props }) => {
  const [options, setOptions] = useState(for_options);
  const [selected, setSelected] = useState(for_selected);
  const [input, setInput] = useState(for_input);
  const [circle, setCircle] = useState(null);
  const [map2, setMap] = useState({});
  const [gmaps, setShowgmaps] = useState(false);
  const [loading_btn, setLoading_btn] = useState(false);
  const { data_user } = useContext(Context);

  const getData = async () => {
    await api_penerima.get_penerima_company().then((res) => {
      if (res?.success) {
        setOptions((state) => ({
          ...state,
          company: res.data.map((item) => ({
            value: item.company_id,
            label: item.company_name,
          })),
        }));
      }
    });

    await api_penerima.get_ms_inventory().then((res) => {
      console.log({ get_ms_inventory: res });
      if (res?.success) {
        setOptions((state) => ({
          ...state,
          channel: res.data.map((item) => ({
            value: item.ms_inventory_id,
            label: item.ms_inventory_identifier,
          })),
        }));
      }
    });

    await api_penerima.get_inventory().then((res) => {
      console.log({ get_inventory: res });
      if (res?.success) {
        setOptions((state) => ({
          ...state,
          inventory: res.data.map((item) => ({
            value: item,
            label: item.ms_channel_name,
          })),
        }));
      }
    });

    await api_penerima.get_ms_operator().then((res) => {
      console.log({ get_ms_operator: res });
      if (res?.success) {
        setSelected((state) => ({
          ...state,
          brand_operator: {
            value: res?.data[0],
            label: res?.data[0]?.ms_operator_name,
          },
        }));
        setOptions((state) => ({
          ...state,
          brand_operator: res.data.map((item) => ({
            value: item,
            label: item.ms_operator_name,
          })),
        }));
        if (res.data.find((find) => find.ms_operator_name === "Telkomsel")) {
          let product_operator = res.data.find(
            (find) => find.ms_operator_name === "Telkomsel"
          ).ms_operator_product;
          let split = product_operator.split(",");

          setOptions((state) => ({
            ...state,
            produk_operator: split.map((item) => ({
              value: item,
              label: item,
            })),
          }));

          console.log({ ini_dia: product_operator.split(",") });
        }
      }
    });

    await api_penerima.get_gender().then((res) => {
      if (res?.success) {
        setOptions((state) => ({
          ...state,
          jenis_kelamin: res.data.map((item) => ({
            value: item.ms_gender_id,
            label: item.ms_gender_name,
          })),
        }));
      }
    });

    await api_penerima.get_religion().then((res) => {
      console.log({ agama: res });
      if (res?.success) {
        setOptions((state) => ({
          ...state,
          agama: res.data.map((item) => ({
            value: item.ms_religion_id,
            label: item.ms_religion_name,
          })),
        }));
      }
    });

    await api_penerima.get_ms_location().then((res) => {
      console.log({ get_ms_location: res });
      if (res?.success) {
        setOptions((state) => ({
          ...state,
          tipe_lokasi: res.data.map((item) => ({
            value: item.ms_location_id,
            label: item.ms_location_name,
          })),
        }));
      }
    });
  };

  useEffect(() => {
    console.log("ini propssss", props);
    if (show) {
      getData();
      if (
        props &&
        (props.selected_company || props.selected_channel || props.selected_inv)
      ) {
        setSelected((state) => ({
          ...state,
          company: props.selected_company,
          channel: {
            value: props.selected_channel.id,
            label:
              props.selected_channel.id === 2
                ? "SMS"
                : props.selected_channel.id === 1
                ? "MMS"
                : "USSD",
          },
          inventory: {
            value: props.selected_inv.id,
            label: props.selected_inv.name,
          },
        }));
      }

      if (props.recipient_id && props.data) {
        let data_props = props.data;
        setInput((state) => ({
          ...state,
          label_penerima: data_props.recipient_label,
          total_penerima: data_props.recipient_total_recipient,
          client_penerima: "",
          pembuat_iklan: "",
          lat: 0,
          long: 0,
          sliderAge: [22, 55],
          arpu: [10000, 50000],
          radius: 0,
          location: "",
        }));
        setSelected((state) => ({
          ...state,
          company: {
            value: data_props.company?.company_id,
            label: data_props.company?.company_name,
          },
          channel: {
            value: data_props.ms_inventory,
            label: data_props.ms_inventory?.ms_inventory_identifier,
          },
          inventory: {
            value: data_props.ms_channel,
            label: data_props.ms_channel?.ms_channel_name,
          },
          brand_operator: "",
          produk_operator: "",
          jenis_kelamin: "",
          OS: "",
          agama: "",
          tipe_lokasi: "",
          kota: "",
          kecamatan: "",
          kelurahan: "",
        }));
        console.log("ini props", data_props);
      }
    }
  }, [show]);

  useEffect(() => {
    if (gmaps) {
      setMap(
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
    }
  }, [gmaps]);

  const onChangeSelect = ({ e, name }) => {
    switch (name) {
      case "company":
        setSelected({ ...selected, company: e });
        break;
      case "channel":
        setSelected({ ...selected, channel: e });
        break;
      case "inventory":
        setSelected({ ...selected, inventory: e });
        if (e.label === "LBA") {
          setShowgmaps(true);
        } else if (e.label !== "LBA") {
          setShowgmaps(false);
          setMap(null);
        }
        break;
      case "brand_operator":
        if (e.label === "Indosat" || e.label === "Telkomsel") {
          api_penerima.get_operating_system().then((res) => {
            if (res?.success) {
              setOptions((state) => ({
                ...state,
                OS: res.data.map((item) => ({
                  value: item.ms_operating_system_id,
                  label: item.ms_operating_system_name,
                })),
              }));
            }
          });
        } else {
          setSelected((state) => ({ ...state, OS: "" }));
        }
        setSelected((state) => ({
          ...state,
          brand_operator: {
            value: e.value,
            label: e.label,
          },
          produk_operator: "",
        }));
        break;
      case "produk_operator":
        setSelected({ ...selected, produk_operator: e });
        break;
      case "jenis_kelamin":
        setSelected({ ...selected, jenis_kelamin: e });
        break;

      default:
        break;
    }
  };

  const onChangeInput = ({ e, name }) => {
    if (name === "total_penerima") {
      setInput({
        ...input,
        [e.target.name]: e.target.value.replace(/[^0-9]+/g, ""),
      });
    } else if (
      e.target.name === "pembuat_iklan" ||
      e.target.name === "client_penerima"
    ) {
      setInput({
        ...input,
        [e.target.name]: e.target.value.replace(/[^0-9]+/g, ""),
      });
    } else {
      setInput({ ...input, [e.target.name]: e.target.value });
    }
  };

  const onChangeAutoComplete = async (e) => {
    let { place_id } = e.value;
    const request = {
      placeId: place_id,
    };

    const PlaceService = new window.google.maps.places.PlacesService(map2);

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
          map: map2,
          position: place.geometry.location,
        });

        // Center map on place location
        map2.setCenter(place.geometry.location);
      }
    });
  };

  const onChangeSetRadius = (e) => {
    if (circle) circle.setMap(null);

    let radius = e.target.value;
    setInput((state) => ({ ...state, radius: radius }));
    let circle2 = new window.google.maps.Circle({
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
      map: map2,
      center: map2.center,
      // editable: true,
      radius: parseInt(radius), //in meters
    });

    setCircle(circle2);
  };

  const btnSimpan = () => {
    const data_props = props.data;
    console.log(data_props);
    setLoading_btn(true);

    let body = {
      company_id: selected?.company?.value,
      ms_channel_id: selected?.inventory?.value.ms_channel_id,
      ms_inventory_id: selected?.channel?.value,
      recipient_label: input.label_penerima,
      // recipient_profiling_city: selected?.kota?.value?.ms_city_name,
      recipient_profiling_city_json: selected?.kota,

      recipient_profiling_district_json: selected?.kecamatan,
      recipient_profiling_from_age: JSON.stringify(input?.sliderAge[0]),
      recipient_profiling_from_arpu: JSON.stringify(input?.sliderAge[1]),
      recipient_profiling_gender: selected?.jenis_kelamin?.label
        ? selected?.jenis_kelamin?.label
        : "",
      recipient_profiling_location: `${input.location} (${input.lat},${input.long})`,
      recipient_profiling_location_type: selected?.tipe_lokasi?.label
        ? selected?.tipe_lokasi?.label
        : null,
      recipient_profiling_max_radius: parseInt(input.radius),
      recipient_profiling_min_radius: 0,
      recipient_profiling_operator: selected?.brand_operator?.label,
      recipient_profiling_os: selected?.OS
        ? `${selected?.OS?.map((item) => item.label)}`
        : "",
      recipient_profiling_product: selected?.product_operator
        ? `${selected.produk_operator?.map((item) => item.label)}`
        : "",
      recipient_profiling_religion: selected?.agama
        ? `${selected.agama?.map((item) => item.label)}`
        : "",
      recipient_profiling_uat_client: input.client_penerima,
      recipient_profiling_uat_internal: input.pembuat_iklan,
      recipient_profiling_until_age: JSON.stringify(input.sliderAge[1]),
      recipient_profiling_until_arpu: JSON.stringify(input.arpu[1]),

      recipient_profiling_village_json: selected.kelurahan,
      recipient_total_recipient: input.total_penerima,
      user_id: data_user.id,
    };

    console.log("ini body", body);

    if (data_props) {
      if (data_props.recipient_id) {
        api_penerima
          .put_recipient_profiling({
            body,
            recipient_id: data_props.recipient_id,
          })
          .then(async (res) => {
            console.log(res);
            if (res?.success) {
              await setMap("");
              await onHide();
              await getData1();
              await AlertSuccess({ title: "SUCCESS", text: res.success });
              onHide();
              setInput(for_input);
              setSelected(for_selected);
              setOptions(for_options);
              setMap("");
            } else {
              await AlertError({ title: "ERROR", text: res.error });
            }
            await setLoading_btn(false);
          });
      }
    } else {
      api_penerima.post_recipient_profiling(body).then(async (res) => {
        console.log(res);
        if (res?.success) {
          await setMap("");
          await onHide();
          await getData1();
          await AlertSuccess({ title: "SUCCESS", text: res.success });
          onHide();
          setInput(for_input);
          setSelected(for_selected);
          setOptions(for_options);
          setMap("");
        } else {
          await AlertError({ title: "ERROR", text: res.error });
        }
        await setLoading_btn(false);
      });
    }
  };

  const btnOnClose = () => {
    onHide();
    setInput(for_input);
    setSelected(for_selected);
    setOptions(for_options);
    setMap("");
  };

  const handleOnInputChangeKota = (e) => {
    setTimeout(() => {
      api_penerima.get_ms_city(e).then((res) => {
        if (res?.success) {
          setOptions((state) => ({
            ...state,
            kota: res.data.map((item) => ({
              value: item,
              label: `${item.ms_city_name} (${item.ms_province?.ms_province_name})`,
            })),
          }));
        }
      });
    }, 1500);
  };

  const onChangeSelectKota = (e) => {
    setSelected((state) => ({ ...state, kota: e }));
    api_penerima.get_ms_district(e.value?.ms_city_id).then((res) => {
      if (res?.success) {
        setOptions((state) => ({
          ...state,
          kecamatan: res.data.map((item) => ({
            value: item,
            label: item.ms_district_name,
          })),
        }));
      }
    });
  };

  const onChangeSelectKecamatan = (e) => {
    setSelected((state) => ({ ...state, kecamatan: e }));
  };

  useEffect(() => {
    if (selected.kecamatan) {
      api_penerima
        .get_ms_village({
          current_ms_city_id: selected.kota?.value?.ms_city_id,
          ms_district_array: selected.kecamatan
            ?.map(
              (item) => `where_in_ms_district_id[]=${item.value.ms_district_id}`
            )
            .join("&"),
        })
        .then((res) => {
          if (res?.success) {
            setOptions((state) => ({
              ...state,
              kelurahan: res.data.map((item) => ({
                value: item,
                label: item.ms_village_name,
              })),
            }));
          }
        });
    }
  }, [selected.kecamatan]);

  useEffect(() => {
    if (
      selected.inventory?.value?.ms_channel_id === 3 ||
      (selected?.inventory?.value?.ms_channel_id === 2 &&
        selected?.channel?.value === 3)
    ) {
      setSelected((state) => ({
        ...state,
        brand_operator: {
          value: options.brand_operator[0].value,
          label: options.brand_operator[0].label,
        },
      }));
      console.log("hahahah", options.brand_operator[0]);
    }
  }, [selected.inventory, selected.channel]);

  return (
    <Modal_Component
      show={show}
      onHide={btnOnClose}
      title="Penerima"
      btnName={loading_btn ? <LoadingIcon /> : "Simpan"}
      btnSubmit
      onClick={loading_btn ? btnSimpan : btnSimpan}
    >
      <div className="container">
        <div className="row mb-3 mb-md-3">
          <div className="col-lg-4 col-md-4 col-sm-12">
            <Label color={COLOR_SECONDARY}>Perusahaan</Label>
            <Select
              placeholder="Pilih Perusahaan..."
              options={options.company}
              value={selected.company}
              onChange={(e) => onChangeSelect({ e, name: "company" })}
              isDisabled={props?.recipient_id ? true : false}
            />
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12">
            <Label color={COLOR_SECONDARY}>Label Penerima</Label>
            <input
              type="text"
              className="form-control"
              placeholder="Masukkan Label Penerima"
              name="label_penerima"
              value={input.label_penerima}
              onChange={(e) => onChangeInput({ e, name: "label_penerima" })}
            />
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12">
            <Label color={COLOR_SECONDARY}>Total Penerima</Label>
            <input
              type="text"
              className="form-control"
              placeholder="Masukkan Total Penerima"
              name="total_penerima"
              value={input.total_penerima}
              onChange={(e) => onChangeInput({ e, name: "total_penerima" })}
            />
            <div>
              <small>
                <i>Minimal Total Penerima = 2.000</i>
              </small>
            </div>
          </div>
        </div>

        <div className="row mb-3 mb-md-3">
          <div className="col-md-6 col-lg-6 col-sm-12">
            <Label color={COLOR_SECONDARY}>Channel</Label>
            <Select
              placeholder="Pilih Tipe Channel..."
              options={options.channel}
              value={selected.channel}
              onChange={(e) => onChangeSelect({ e, name: "channel" })}
              isDisabled={props && props.selected_channel ? true : false}
            />
          </div>
          <div className="col-md-6 col-lg-6 col-sm-12">
            <Label color={COLOR_SECONDARY}>Inventory</Label>
            <Select
              placeholder="Pilih Tipe Inventory..."
              options={options.inventory}
              value={selected.inventory}
              onChange={(e) => onChangeSelect({ e, name: "inventory" })}
              isDisabled={props && props.selected_inv ? true : false}
            />
          </div>
        </div>

        <div className="row mb-3 mb-md-3">
          <div className="col-md-6 col-lg-6 col-sm-12">
            <Label color={COLOR_SECONDARY}>Brand Operator</Label>
            {/* {JSON.stringify(selected.inventory)} <br /> */}
            {/* {console.log(selected.brand_operator)} */}
            <Select
              placeholder="Pilih Operator..."
              options={options.brand_operator}
              value={selected.brand_operator}
              onChange={(e) => onChangeSelect({ e, name: "brand_operator" })}
              isDisabled={
                selected.inventory?.value?.ms_channel_id === 3 ||
                (selected?.inventory?.value?.ms_channel_id === 2 &&
                  selected?.channel?.value === 3)
                  ? true
                  : false
              }
            />
          </div>
          {selected.brand_operator?.value
            ?.ms_operator_has_product_status_name === "true" && (
            <div className="col-md-6 col-lg-6 col-sm-12">
              <Label color={COLOR_SECONDARY}>Produk Operator</Label>
              <Select
                isMulti
                placeholder="Pilih Operator..."
                options={options.produk_operator}
                value={selected.produk_operator}
                onChange={(e) => onChangeSelect({ e, name: "produk_operator" })}
              />
            </div>
          )}
        </div>

        <div className="row mb-3 mb-md-3">
          {selected.brand_operator?.value?.ms_operator_has_age_status_name ===
            "true" && (
            <div className="col-md-6 col-lg-6 col-sm-12">
              <Label color={COLOR_SECONDARY}>Usia</Label>
              <div>
                <IdxSlider_range
                  min={20}
                  max={100}
                  defaultValue={input.sliderAge}
                  onChange={(e) =>
                    setInput((state) => ({ ...state, sliderAge: e }))
                  }
                />
              </div>
            </div>
          )}
          {selected.brand_operator?.value
            ?.ms_operator_has_gender_status_name === "true" && (
            <div className="col-md-6 col-lg-6 col-sm-12">
              <Label color={COLOR_SECONDARY}>Jenis Kelamin</Label> <br />
              <i>
                <small>Klik Reset untuk memilih semua</small>
              </i>
              <Select
                placeholder="Pilih Jenis Kelamin"
                options={options.jenis_kelamin}
                value={selected.jenis_kelamin}
                onChange={(e) => onChangeSelect({ e, name: "jenis_kelamin" })}
              />
              {selected.jenis_kelamin.value && (
                <div
                  className="btn"
                  onClick={() =>
                    setSelected((state) => ({ ...state, jenis_kelamin: "" }))
                  }
                >
                  Reset
                </div>
              )}
            </div>
          )}
        </div>

        <div className="row mb-3 mb-md-3">
          {selected.brand_operator?.value?.ms_operator_has_os_status_name ===
            "true" && (
            <div className="col-md-6 col-lg-6 col-sm-12">
              <Label color={COLOR_SECONDARY}>Sistem Operasi</Label>
              <Select
                isMulti
                placeholder="Pilih Sistem Operasi"
                options={options.OS}
                value={selected.OS}
                onChange={(e) => setSelected((state) => ({ ...state, OS: e }))}
              />
            </div>
          )}
          {selected.brand_operator?.value
            ?.ms_operator_has_religion_status_name === "true" && (
            <div className="col-md-6 col-lg-6 col-sm-12">
              <Label color={COLOR_SECONDARY}>Agama</Label>
              <Select
                isMulti
                placeholder="Pilih Agama"
                options={options.agama}
                value={selected.agama}
                onChange={(e) =>
                  setSelected((state) => ({ ...state, agama: e }))
                }
              />
            </div>
          )}
        </div>

        {selected.brand_operator?.value?.ms_operator_has_arpu_status_name ===
          "true" && (
          <div className="row mb-3 mb-md-3">
            <div className="col-md-12 col-lg-12 col-sm-12">
              <Label color={COLOR_SECONDARY}>
                ARPU (Average Revenue Per User)
              </Label>
              <IdxSlider_range
                min={0}
                max={200000}
                defaultValue={input.arpu}
                onChange={(e) => setInput((state) => ({ ...state, arpu: e }))}
              />
            </div>
          </div>
        )}
        {/* TODO: otw belum ada data */}
        {selected.inventory?.value?.ms_channel_has_location_status_name ===
          "false" && (
          <div className="row mb-3 mb-md-3">
            <div className="col-md-4 col-lg-4 col-sm-12">
              <Label color={COLOR_SECONDARY}>Kota</Label>
              <Select
                placeholder="Pilih Nama Kota"
                options={options.kota}
                value={selected.kota}
                onChange={(e) => onChangeSelectKota(e)}
                onInputChange={handleOnInputChangeKota}
              />
            </div>
            <div className="col-md-4 col-lg-4 col-sm-12">
              <Label color={COLOR_SECONDARY}>Kecamatan</Label>
              <Select
                placeholder="Pilih Kecamatan"
                options={options.kecamatan}
                value={selected.kecamatan}
                onChange={(e) => onChangeSelectKecamatan(e)}
                isMulti
              />
            </div>
            <div className="col-md-4 col-lg-4 col-sm-12">
              <Label color={COLOR_SECONDARY}>Kelurahaan</Label>
              <Select
                placeholder="Pilih Kelurahan"
                options={options.kelurahan}
                value={selected.kelurahan}
                onChange={(e) =>
                  setSelected((state) => ({ ...state, kelurahan: e }))
                }
                isMulti
              />
            </div>
          </div>
        )}

        {selected.inventory?.value?.ms_channel_has_location_status_name ===
          "true" && (
          <>
            <div className="row mb-3 mb-md-3">
              <div className="col-md-12 col-lg-12 col-sm-12 mb-3 mb-md-3">
                <Label color={COLOR_SECONDARY}>Alamat Lokasi</Label>
                <PlacesAutocomplete1 handleOnchange={onChangeAutoComplete} />
              </div>
              <div className="col-md-12 col-lg-12 col-sm-12 border">
                {/* <IdxGoogle_maps /> */}
                <div id="map" style={{ width: "100%", height: "400px" }}></div>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <Label color={COLOR_SECONDARY}>Tipe Lokasi</Label> <br />
                <i>
                  <small>Klik Reset untuk memilih semua</small>
                </i>
                <Select
                  placeholder="Pilih Tipe Lokasi"
                  options={options.tipe_lokasi}
                  value={selected.tipe_lokasi}
                  onChange={(e) =>
                    setSelected((state) => ({ ...state, tipe_lokasi: e }))
                  }
                />
                {selected.tipe_lokasi.value && (
                  <div
                    className="btn"
                    onClick={() =>
                      setSelected((state) => ({ ...state, tipe_lokasi: "" }))
                    }
                  >
                    Reset
                  </div>
                )}
              </div>
              <div className="col-md-6">
                <Label color={COLOR_SECONDARY}>Max. Radius</Label> <br />
                <i>
                  <small>Satuan radius dalam Meter</small>
                </i>
                <input
                  type="number"
                  placeholder="Max. Radius"
                  className="form-control"
                  max={3000}
                  step={50}
                  value={input.radius}
                  onChange={(e) => onChangeSetRadius(e)}
                />
              </div>
            </div>
          </>
        )}

        {/* process.env.REACT_APP_GOOGLE_MAP_API_KEY */}

        <div className="row mb-3 mb-md-3">
          <div className="col-md-6 col-lg-6 col-sm-12">
            <Label color={COLOR_SECONDARY}>MSISDN Client Penerima</Label>
            <input
              type="text"
              className="form-control"
              placeholder="628XXXX"
              value={input.client_penerima}
              name="client_penerima"
              onChange={(e) => onChangeInput({ e })}
            />
            <div>
              <small>
                <i>Masukkan MSISDN untuk menerima bukti pengiriman</i>
              </small>
            </div>
          </div>
          <div className="col-md-6 col-lg-6 col-sm-12">
            <Label color={COLOR_SECONDARY}>MSISDN Pembuat Iklan</Label>
            <input
              type="text"
              className="form-control"
              placeholder="628XXXX"
              value={input.pembuat_iklan}
              name="pembuat_iklan"
              onChange={(e) => onChangeInput({ e })}
            />
            <div>
              <small>
                <i>Masukkan MSISDN untuk menerima bukti pengiriman</i>
              </small>
            </div>
          </div>
        </div>

        {/* //TODO: BAGIAN TUKAR TUKAR */}
      </div>
    </Modal_Component>
  );
};
