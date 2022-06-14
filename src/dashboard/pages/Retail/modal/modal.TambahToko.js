import React, { useContext, useState, useEffect, useRef } from "react";
import * as Component from "../../../../component";
import * as Style from "../../../../component/style/content/default";
import * as Services from "../../../../service";
import * as Util from "../../../../util";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Select from "react-select";
import { Plus } from "@styled-icons/bootstrap";
import { Delete } from "@styled-icons/typicons";
import Datepicker from "react-datepicker";
import moment from "moment";

const api = Services.api.ApiRetail.toko;

export default function ModalTambahTokoh(props: {
  show: boolean,
  onHide: Function,
  data: any,
  onSubmit: Function,
  onEdit: Function
}) {
  const { selected_company } = useContext(Services.Context);
  const { show, onHide, data, onSubmit, onEdit } = props;
  const {
    register,
    getValues,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      namaToko: "",
      email: "",
      phone: "",
      kodePos: "",
      instagram: "",
      twitter: "",
      youtube: "",
      facebook: ""
    },
  });

  const [input, setInput] = useState({
    logoToko:
      "https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/256x256/store.png",
    lat: "",
    long: "",
    address: "",
    selectedCity: "",
    arrImageToko: [],
    arrJamOperational: [
      `${new Date()}-${new Date()}`,
      `${new Date()}-${new Date()}`,
    ],
  });
  const [map, setMap] = useState({});
  const [options, setOptions] = useState({
    city: [],
  });
  let resetImage = useRef();
  let resetImageLogo = useRef();
  const [loading, setLoading] = useState(false);
  const [mondayFrom, setMondayFrom] = useState("");
  const [mondayTo, setMondayTo] = useState("");
  const [mondayClose, setMondayClose] = useState(false);
  const [tuesdayFrom, setTuesdayFrom] = useState("");
  const [tuesdayTo, setTuesdayTo] = useState("");
  const [tuesdayClose, setTuesdayClose] = useState(false);
  const [wednesdayFrom, setWednesdayFrom] = useState("");
  const [wednesdayTo, setWednesdayTo] = useState("");
  const [wednesdayClose, setWednesdayClose] = useState(false);
  const [thursdayFrom, setThursdayFrom] = useState("");
  const [thursdayTo, setThursdayTo] = useState("");
  const [thursdayClose, setThursdayClose] = useState(false);
  const [fridayFrom, setFridayFrom] = useState("");
  const [fridayTo, setFridayTo] = useState("");
  const [fridayClose, setFridayClose] = useState(false);
  const [saturdayFrom, setSaturdayFrom] = useState("");
  const [saturdayTo, setSaturdayTo] = useState("");
  const [saturdayClose, setSaturdayClose] = useState(false);
  const [sundayFrom, setSundayFrom] = useState("");
  const [sundayTo, setSundayTo] = useState("");
  const [sundayClose, setSundayClose] = useState(false);
  const [isJadwal, setIsJadwal] = useState(0);

  useEffect(async () => {
    if (show) {
      await Promise.all([
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
        ),
        api.getMsCity().then((res) => {
          if (res?.success) {
            setOptions((state) => ({
              ...state,
              city: res?.data?.map((item) => ({
                value: item.ms_city_id,
                label: item.ms_city_name_full,
              })),
            }));
          }
        }),
      ]);
    }
  }, [show]);

  const onChangeAutoComplete = async (e) => {
    let { place_id } = e.value;
    const request = {
      placeId: place_id,
    };

    const PlaceService = new window.google.maps.places.PlacesService(map);

    PlaceService.getDetails(request, (place, status) => {
      // console.log({ place });
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        //set lat, lng
        setInput((state) => ({
          ...state,
          lat: place.geometry?.location?.lat(),
          long: place.geometry?.location?.lng(),
          address: place.formatted_address,
        }));

        // Create marker
        var marker = new window.google.maps.Marker({
          map: map,
          position: place.geometry.location,
        });

        // Center map on place location
        map.setCenter(place.geometry.location);

        const mapData = new window.google.maps.Map(document.getElementById("map"), {
          center: {
            lat: place.geometry?.location?.lat(),
            lng: place.geometry?.location?.lng(),
          },
          zoom: 13,
          zoomControl: false,
          gestureHandling: "none",
        })
  
        new window.google.maps.Marker({
          map: mapData,
          position: {lat: parseFloat(place.geometry?.location?.lat()), lng: parseFloat(place.geometry?.location?.lng()),}
        });
      }
    });
  };

  const OnInputChangeCity = (e) => {
    // console.log(e);

    setTimeout(() => {
      api.getMsCity(e).then((res) => {
        if (res?.success) {
          setOptions((state) => ({
            ...state,
            city: res?.data?.map((item) => ({
              value: item.ms_city_id,
              label: item.ms_city_name_full,
            })),
          }));
        }
      });
    }, 1000);
  };

  const OnChangeInput = (e) => {
    if (e.target.files[0]) {
      setInput((state) => ({
        ...state,
        [e.target.name]: e.target.files[0],
      }));
    } else {
      setInput((state) => ({
        ...state,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const OnChangeInputImage = (e, name) => {
    switch (name) {
      case "logoToko":
        api.postStorageServer(e.target.files[0]).then((res) => {
          console.log('res', res);
          if (res?.data) {
            resetImageLogo.current.value = "";
            setInput((state) => ({
              ...state,
              logoToko: res?.data?.url,
            }));
          }
        })
        break;
      case "gambar":
        api.postStorageServer(e.target.files[0]).then((res) => {
          console.log(res);
          if (res?.data) {
            resetImage.current.value = "";
            setInput((state) => ({
              ...state,
              arrImageToko: [...input.arrImageToko, res?.data?.url],
            }));
          }
        });
        break;

      default:
        break;
    }
  };

  const BtnDeleteImageArr = (item) => {
    let filter = input.arrImageToko.filter((filter) => filter !== item);

    setInput((state) => ({
      ...state,
      arrImageToko: filter,
    }));
  };

  const BtnSubmit = () => {
    if(!data){
      CreateProcess()
    }else{
      EditProcess()
    }
  };

  const CreateProcess = async () => {
    try {
      const check_validate = validate();
      if(check_validate===false){
        return false
      }

      setLoading(true);

      const monTime = mondayClose?'':moment(mondayFrom).format('HH:mm')+'-'+moment(mondayTo).format('HH:mm');
      const tueTime = tuesdayClose?'':moment(tuesdayFrom).format('HH:mm')+'-'+moment(tuesdayTo).format('HH:mm');
      const wedTime = wednesdayClose?'':moment(wednesdayFrom).format('HH:mm')+'-'+moment(wednesdayTo).format('HH:mm');
      const thuTime = thursdayClose?'':moment(thursdayFrom).format('HH:mm')+'-'+moment(thursdayTo).format('HH:mm');
      const friTime = fridayClose?'':moment(fridayFrom).format('HH:mm')+'-'+moment(fridayTo).format('HH:mm');
      const satTime = saturdayClose?'':moment(saturdayFrom).format('HH:mm')+'-'+moment(saturdayTo).format('HH:mm');
      const sunTime = sundayClose?'':moment(sundayFrom).format('HH:mm')+'-'+moment(sundayTo).format('HH:mm');

      const data_post = {
        store_name: getValues("namaToko"),
        store_image: input.arrImageToko,
        store_logo: input.logoToko,
        store_coordinate: input?.lat+','+input?.long,
        store_address: input.address,
        store_zip: getValues("kodePos"),
        ms_city_id: input.selectedCity.value,
        store_email: getValues("email"),
        store_phone: getValues("phone"),
        company_id: selected_company.value,
        store_active_status: 1,
        store_instagram: getValues("instagram"),
        store_facebook: getValues("facebook"),
        store_twitter: getValues("twitter"),
        store_youtube: getValues("youtube"),
        store_operation_time: isJadwal===0?null:[monTime, tueTime, wedTime, thuTime, friTime, satTime, sunTime]
      }

      await api.postToko(data_post).then(async (res) => {
        console.log('res', res)
        if (res?.success) {
          await Promise.all([
            Component.AlertSuccess({ title: "Success", text: res?.success }),
            onSubmit(),
            onHide()
          ]);
        } else {
          Component.AlertError({ title: "Error", text: res?.error });
        }
      })
    } catch (err) {
      console.log('err', err)
      Component.AlertError({ title: "Error", text: err });
    } finally {
      setLoading(false);
    }
  }

  const EditProcess = async () => {
    try {
      const check_validate = validate();
      if(check_validate===false){
        return false
      }

      setLoading(true);

      const monTime = mondayClose?'':moment(mondayFrom).format('HH:mm')+'-'+moment(mondayTo).format('HH:mm');
      const tueTime = tuesdayClose?'':moment(tuesdayFrom).format('HH:mm')+'-'+moment(tuesdayTo).format('HH:mm');
      const wedTime = wednesdayClose?'':moment(wednesdayFrom).format('HH:mm')+'-'+moment(wednesdayTo).format('HH:mm');
      const thuTime = thursdayClose?'':moment(thursdayFrom).format('HH:mm')+'-'+moment(thursdayTo).format('HH:mm');
      const friTime = fridayClose?'':moment(fridayFrom).format('HH:mm')+'-'+moment(fridayTo).format('HH:mm');
      const satTime = saturdayClose?'':moment(saturdayFrom).format('HH:mm')+'-'+moment(saturdayTo).format('HH:mm');
      const sunTime = sundayClose?'':moment(sundayFrom).format('HH:mm')+'-'+moment(sundayTo).format('HH:mm');

      const data_post = {
        store_name: getValues("namaToko"),
        store_image: input.arrImageToko,
        store_logo: input.logoToko,
        store_coordinate: input?.lat+','+input?.long,
        store_address: input.address,
        store_zip: getValues("kodePos"),
        ms_city_id: input.selectedCity.value,
        store_email: getValues("email"),
        store_phone: getValues("phone"),
        company_id: selected_company.value,
        store_active_status: 1,
        store_instagram: getValues("instagram"),
        store_facebook: getValues("facebook"),
        store_twitter: getValues("twitter"),
        store_youtube: getValues("youtube"),
        store_operation_time: isJadwal===0?null:[monTime, tueTime, wedTime, thuTime, friTime, satTime, sunTime]
      }

      await api.putToko(data.store_id, data_post).then(async (res) => {
        console.log('res', res)
        if (res?.success) {
          await Promise.all([
            Component.AlertSuccess({ title: "Success", text: res?.success }),
            onEdit(),
            onHide()
          ]);
        } else {
          Component.AlertError({ title: "Error", text: res?.error });
        }
      })
    } catch (err) {
      console.log('err', err)
      Component.AlertError({ title: "Error", text: err });
    } finally {
      setLoading(false);
    }
  }

  const validate = () => {
    if(isJadwal===1){
      if(!mondayClose){
        if(mondayFrom===''){
          Component.AlertError({ title: "Error", text: 'Jam mulai hari Senin harus diisi'})
          return false
        }

        if(mondayTo===''){
          Component.AlertError({ title: "Error", text: 'Jam berakhir hari Senin harus diisi'})
          return false
        }
      }

      if(!tuesdayClose){
        if(tuesdayFrom===''){
          Component.AlertError({ title: "Error", text: 'Jam mulai hari Selasa harus diisi'})
          return false
        }

        if(tuesdayTo===''){
          Component.AlertError({ title: "Error", text: 'Jam berakhir hari Selasa harus diisi'})
          return false
        }
      }

      if(!wednesdayClose){
        if(wednesdayFrom===''){
          Component.AlertError({ title: "Error", text: 'Jam mulai hari Rabu harus diisi'})
          return false
        }

        if(wednesdayTo===''){
          Component.AlertError({ title: "Error", text: 'Jam berakhir hari Rabu harus diisi'})
          return false
        }
      }

      if(!thursdayClose){
        if(thursdayFrom===''){
          Component.AlertError({ title: "Error", text: 'Jam mulai hari Kamis harus diisi'})
          return false
        }

        if(thursdayClose===''){
          Component.AlertError({ title: "Error", text: 'Jam berakhir hari Kamis harus diisi'})
          return false
        }
      }

      if(!fridayClose){
        if(fridayFrom===''){
          Component.AlertError({ title: "Error", text: 'Jam mulai hari Jumat harus diisi'})
          return false
        }

        if(fridayTo===''){
          Component.AlertError({ title: "Error", text: 'Jam berakhir hari Jumat harus diisi'})
          return false
        }
      }

      if(!saturdayClose){
        if(saturdayFrom===''){
          Component.AlertError({ title: "Error", text: 'Jam mulai hari Sabtu harus diisi'})
          return false
        }

        if(saturdayTo===''){
          Component.AlertError({ title: "Error", text: 'Jam berakhir hari Sabtu harus diisi'})
          return false
        }
      }

      if(!sundayClose){
        if(sundayFrom===''){
          Component.AlertError({ title: "Error", text: 'Jam mulai hari Minggu harus diisi'})
          return false
        }

        if(sundayTo===''){
          Component.AlertError({ title: "Error", text: 'Jam berakhir hari Minggu harus diisi'})
          return false
        }
      }

      return true;
    }else{
      return true;
    }
  }

  useEffect(()=>{
    if(data){
      const coordinate = data.store_coordinate.split(",");
      setValue("namaToko", data.store_name);
      setValue("email", data.store_email);
      setValue("phone", data.store_phone);
      setValue("kodePos", data.store_zip);
      setValue("instagram", data.store_instagram);
      setValue("facebook", data.store_facebook);
      setValue("twitter", data.store_twitter);
      setValue("youtube", data.store_youtube);
      setInput({...input, 
        logoToko: data.store_logo,
        address: data.store_address,
        lat: parseFloat(coordinate[0]),
        long: parseFloat(coordinate[1]),
        selectedCity: {
          value: data.ms_city.ms_city_id,
          label: data.ms_city.ms_city_name
        },
        arrImageToko: data.store_image
      });

      const mapData = new window.google.maps.Map(document.getElementById("map"), {
        center: {
          lat: parseFloat(coordinate[0]),
          lng: parseFloat(coordinate[1]),
        },
        zoom: 13,
        zoomControl: false,
        gestureHandling: "none",
      })

      new window.google.maps.Marker({
        map: mapData,
        position: {lat: parseFloat(coordinate[0]), lng: parseFloat(coordinate[1]),}
      });

      const time = data.store_operation_time;
      if(time){
        setIsJadwal(1);
        if(time[0]!==""){
          const mon = time[0].split('-');
          setMondayFrom(moment('01-01-2021 '+mon[0]+':00').toDate())
          setMondayTo(mon[1]?moment('01-01-2021 '+mon[1]+':00').toDate():'')
        }else{
          setMondayClose(true)
        }

        if(time[1]!==""){
          const tue = time[1].split('-');
          setTuesdayFrom(moment('01-01-2021 '+tue[0]+':00').toDate())
          setTuesdayTo(tue[1]?moment('01-01-2021 '+tue[1]+':00').toDate():'')
        }else{
          setTuesdayClose(true)
        }

        if(time[2]!==""){
          const wed = time[2].split('-');
          setWednesdayFrom(moment('01-01-2021 '+wed[0]+':00').toDate())
          setWednesdayTo(wed[1]?moment('01-01-2021 '+wed[1]+':00').toDate():'')
        }else{
          setWednesdayClose(true)
        }

        if(time[3]!==""){
          const thu = time[3].split('-');
          setThursdayFrom(moment('01-01-2021 '+thu[0]+':00').toDate())
          setThursdayTo(thu[1]?moment('01-01-2021 '+thu[1]+':00').toDate():'')
        }else{
          setThursdayClose(true)
        }

        if(time[4]!==""){
          const fri = time[4].split('-');
          setFridayFrom(moment('01-01-2021 '+fri[0]+':00').toDate())
          setFridayTo(fri[1]?moment('01-01-2021 '+fri[1]+':00').toDate():'')
        }else{
          setFridayClose(true)
        }

        if(time[5]!==""){
          const sat = time[5].split('-');
          setSaturdayFrom(moment('01-01-2021 '+sat[0]+':00').toDate())
          setSaturdayTo(sat[1]?moment('01-01-2021 '+sat[1]+':00').toDate():'')
        }else{
          setSaturdayClose(true)
        }

        if(time[6]!==""){
          const sun = time[6].split('-');
          setSundayFrom(moment('01-01-2021 '+sun[0]+':00').toDate())
          setSundayTo(sun[1]?moment('01-01-2021 '+sun[1]+':00').toDate():'')
        }else{
          setSundayClose(true)
        }
      }else{
        setIsJadwal(0);
      }

    }else{
      setValue("namaToko", "");
      setValue("email", "");
      setValue("phone", "");
      setValue("kodePos", "");
      setValue("instagram", "");
      setValue("facebook", "");
      setValue("twitter", "");
      setValue("youtube", "");
      setInput({...input, 
        logoToko: "https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/256x256/store.png",
        address: "",
        lat: "",
        long: "",
        selectedCity: "",
        arrImageToko: []
      });
      setMondayFrom("");
      setMondayTo("");
      setMondayClose(false);
      setTuesdayFrom("");
      setTuesdayTo("");
      setTuesdayClose(false);
      setWednesdayFrom("");
      setWednesdayTo("");
      setWednesdayClose(false);
      setThursdayFrom("");
      setThursdayTo("");
      setThursdayClose(false);
      setFridayFrom("");
      setFridayTo("");
      setFridayClose(false);
      setSaturdayFrom("");
      setSaturdayTo("");
      setSaturdayClose(false);
      setSundayFrom("");
      setSundayTo("");
      setSundayClose(false);
      setIsJadwal(0);
    }
  }, [show])

  return (
    <Component.Modal_Component
      title={data?"Edit Toko":"Buat Toko"}
      btnSubmit
      btnName={loading ? <Component.LoadingIcon /> : "Simpan"}
      onClick={loading ? null : BtnSubmit}
      onHide={onHide}
      show={show}
    >
      <Container className="container">
        <div className="mb-3">
          <div className="d-flex align-items-center flex-column justify-content-start">
            <div className="image-logo">
              <img src={input.logoToko} alt="logo toko" />
            </div>
            <input
              type="file"
              id="input-file-logo"
              className="d-none"
              accept=".png,.jpeg,.jpg"
              ref={resetImageLogo}
              onChange={(e) => OnChangeInputImage(e, "logoToko")}
            />
            <label
              htmlFor="input-file-logo"
              style={{ cursor: "pointer", fontWeight: "600" }}
              className="btn border mt-1"
            >
              Upload Logo
            </label>
          </div>
        </div>

        <div className="mb-3">
          <Style.Label color={Style.COLOR_SECONDARY}>Nama Toko</Style.Label>
          <input
            type="text"
            name="namaToko"
            className="form-control"
            placeholder="Masukkan Nama Toko"
            {...register("namaToko", { required: true })}
          />
        </div>
        <div className="mb-3">
          <Style.Label color={Style.COLOR_SECONDARY}>Email</Style.Label>
          <input
            type="text"
            name="email"
            className="form-control"
            placeholder="Masukkan Nama Toko"
            {...register("email", { required: true })}
          />
        </div>
        <div className="mb-3">
          <Style.Label color={Style.COLOR_SECONDARY}>Phone Number</Style.Label>
          <input
            type="text"
            name="phone"
            className="form-control"
            placeholder="Masukkan Nama Toko"
            {...register("phone", { required: true })}
          />
        </div>
        <div className="mb-3">
          <Style.Label color={Style.COLOR_SECONDARY}>Alamat</Style.Label>
          <Component.PlacesAutocomplete1
            handleOnchange={onChangeAutoComplete}
          />
          <div
            id="map"
            className="mt-2"
            style={{ width: "100%", height: "400px" }}
          />
        </div>

        <div className="mb-3">
          <Style.Label color={Style.COLOR_SECONDARY}>Kota</Style.Label>
          <Select
            placeholder="Select Kota"
            options={options.city}
            onChange={(e) =>
              setInput((state) => ({ ...state, selectedCity: e }))
            }
            onInputChange={OnInputChangeCity}
            value={input.selectedCity}
          />
        </div>
        <div className="mb-3">
          <Style.Label color={Style.COLOR_SECONDARY}>Kode Pos</Style.Label>
          <input
            type="text"
            className="form-control"
            placeholder="Masukkan Kode Pos"
            {...register("kodePos", { required: true })}
          />
        </div>
        <div className="mb-3">
          <Style.Label color={Style.COLOR_SECONDARY}>Instagram</Style.Label>
          <input
            type="text"
            className="form-control"
            placeholder="Masukkan Instagram"
            {...register("instagram", { required: true })}
          />
        </div>
        <div className="mb-3">
          <Style.Label color={Style.COLOR_SECONDARY}>Facebook</Style.Label>
          <input
            type="text"
            className="form-control"
            placeholder="Masukkan Facebook"
            {...register("facebook", { required: true })}
          />
        </div>
        <div className="mb-3">
          <Style.Label color={Style.COLOR_SECONDARY}>Twitter</Style.Label>
          <input
            type="text"
            className="form-control"
            placeholder="Masukkan Twitter"
            {...register("twitter", { required: true })}
          />
        </div>
        <div className="mb-3">
          <Style.Label color={Style.COLOR_SECONDARY}>Youtube</Style.Label>
          <input
            type="text"
            className="form-control"
            placeholder="Masukkan Youtube"
            {...register("youtube", { required: true })}
          />
        </div>
        <div className="mb-3">
          <Style.Label color={Style.COLOR_SECONDARY}>Gambar</Style.Label>
          <div className="list-gambar d-flex gap-3 flex-wrap">
            {input.arrImageToko.length > 0
              ? input?.arrImageToko?.map((item: any, idx: number) => (
                  <div style={{ position: "relative" }}>
                    <div key={idx} className="image-gambar">
                      <img src={item} alt="" />
                    </div>
                    <div className="btn-delete">
                      <Delete
                        cursor="pointer"
                        width={30}
                        onClick={() => BtnDeleteImageArr(item)}
                      />
                    </div>
                  </div>
                ))
              : null}
            <input
              type="file"
              name=""
              id="gambar"
              className="d-none"
              ref={resetImage}
              onChange={(e) => OnChangeInputImage(e, "gambar")}
            />
            <label
              htmlFor="gambar"
              className="image-gambar"
              style={{ cursor: "pointer" }}
            >
              <Plus width={100} />
            </label>
          </div>
        </div>

        <div className="mb-3">
          <Style.Label color={Style.COLOR_SECONDARY}>Jam Buka Toko</Style.Label>
          <div className="mt-2 d-flex flex-row">
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                checked={isJadwal===0}
                onChange={()=>setIsJadwal(0)}
                id="bukaterus"
              />
              <label className="form-check-label" for="bukaterus">
                Buka Terus
              </label>
            </div>
            
            <div className="form-check ms-3">
              <input
                type="radio"
                className="form-check-input"
                checked={isJadwal===1}
                onChange={()=>setIsJadwal(1)}
                id="terjadwal"
              />
              <label className="form-check-label" for="terjadwal">
                Terjadwal
              </label>
            </div>
          </div>
          
          {
            isJadwal===1 &&
            <div className="mt-2">
              <div className="d-flex flex-row align-items-center">
                <label style={{width:120}}>Senin</label>
                {
                  !mondayClose &&
                  <div className="d-flex flex-row align-items-center">
                    <Datepicker
                      selected={mondayFrom}
                      className="form-control ms-2"
                      onChange={(e) => setMondayFrom(e) }
                      showTimeSelect
                      showTimeSelectOnly
                      dateFormat="h:mm aa"
                      timeFormat="h:mm aa"
                    />
                    <div className="ms-3"> s/d </div>
                    <Datepicker
                      selected={mondayTo}
                      className="form-control ms-2"
                      onChange={(e) => setMondayTo(e) }
                      showTimeSelect
                      showTimeSelectOnly
                      dateFormat="h:mm aa"
                      timeFormat="h:mm aa"
                    />
                  </div>
                }
                <div className="form-check ms-4">
                  <input className="form-check-input" type="checkbox" id="mondayclose" checked={mondayClose} onChange={()=>setMondayClose(!mondayClose)}/>
                  <label className="form-check-label" for="mondayclose">
                    Tutup
                  </label>
                </div>
              </div>
              <div className="d-flex flex-row align-items-center mt-2">
                <label style={{width:120}}>Selasa</label>
                {
                  !tuesdayClose &&
                  <div className="d-flex flex-row align-items-center">
                    <Datepicker
                      selected={tuesdayFrom}
                      className="form-control ms-2"
                      onChange={(e) => setTuesdayFrom(e) }
                      showTimeSelect
                      showTimeSelectOnly
                      dateFormat="h:mm aa"
                      timeFormat="h:mm aa"
                    />
                    <div className="ms-3"> s/d </div>
                    <Datepicker
                      selected={tuesdayTo}
                      className="form-control ms-2"
                      onChange={(e) => setTuesdayTo(e) }
                      showTimeSelect
                      showTimeSelectOnly
                      dateFormat="h:mm aa"
                      timeFormat="h:mm aa"
                    />
                  </div>
                }
                <div className="form-check ms-4">
                  <input className="form-check-input" type="checkbox" id="tuesdayclose" checked={tuesdayClose} onChange={()=>setTuesdayClose(!tuesdayClose)}/>
                  <label className="form-check-label" for="tuesdayclose">
                    Tutup
                  </label>
                </div>
              </div>
              <div className="d-flex flex-row align-items-center mt-2">
                <label style={{width:120}}>Rabu</label>
                {
                  !wednesdayClose &&
                  <div className="d-flex flex-row align-items-center">
                    <Datepicker
                      selected={wednesdayFrom}
                      className="form-control ms-2"
                      onChange={(e) => setWednesdayFrom(e) }
                      showTimeSelect
                      showTimeSelectOnly
                      dateFormat="h:mm aa"
                      timeFormat="h:mm aa"
                    />
                    <div className="ms-3"> s/d </div>
                    <Datepicker
                      selected={wednesdayTo}
                      className="form-control ms-2"
                      onChange={(e) => setWednesdayTo(e) }
                      showTimeSelect
                      showTimeSelectOnly
                      dateFormat="h:mm aa"
                      timeFormat="h:mm aa"
                    />
                  </div>
                }
                <div className="form-check ms-4">
                  <input className="form-check-input" type="checkbox" id="wednesdayClose" checked={wednesdayClose} onChange={()=>setWednesdayClose(!wednesdayClose)}/>
                  <label className="form-check-label" for="wednesdayClose">
                    Tutup
                  </label>
                </div>
              </div>
              <div className="d-flex flex-row align-items-center mt-2">
                <label style={{width:120}}>Kamis</label>
                {
                  !thursdayClose &&
                  <div className="d-flex flex-row align-items-center">
                    <Datepicker
                      selected={thursdayFrom}
                      className="form-control ms-2"
                      onChange={(e) => setThursdayFrom(e) }
                      showTimeSelect
                      showTimeSelectOnly
                      dateFormat="h:mm aa"
                      timeFormat="h:mm aa"
                    />
                    <div className="ms-3"> s/d </div>
                    <Datepicker
                      selected={thursdayTo}
                      className="form-control ms-2"
                      onChange={(e) => setThursdayTo(e) }
                      showTimeSelect
                      showTimeSelectOnly
                      dateFormat="h:mm aa"
                      timeFormat="h:mm aa"
                    />
                  </div>
                }
                <div className="form-check ms-4">
                  <input className="form-check-input" type="checkbox" id="thursdayClose" checked={thursdayClose} onChange={()=>setThursdayClose(!thursdayClose)}/>
                  <label className="form-check-label" for="thursdayClose">
                    Tutup
                  </label>
                </div>
              </div>
              <div className="d-flex flex-row align-items-center mt-2">
                <label style={{width:120}}>Jumat</label>
                {
                  !fridayClose &&
                  <div className="d-flex flex-row align-items-center">
                    <Datepicker
                      selected={fridayFrom}
                      className="form-control ms-2"
                      onChange={(e) => setFridayFrom(e) }
                      showTimeSelect
                      showTimeSelectOnly
                      dateFormat="h:mm aa"
                      timeFormat="h:mm aa"
                    />
                    <div className="ms-3"> s/d </div>
                    <Datepicker
                      selected={fridayTo}
                      className="form-control ms-2"
                      onChange={(e) => setFridayTo(e) }
                      showTimeSelect
                      showTimeSelectOnly
                      dateFormat="h:mm aa"
                      timeFormat="h:mm aa"
                    />
                  </div>
                }
                <div className="form-check ms-4">
                  <input className="form-check-input" type="checkbox" id="fridayClose" checked={fridayClose} onChange={()=>setFridayClose(!fridayClose)}/>
                  <label className="form-check-label" for="fridayClose">
                    Tutup
                  </label>
                </div>
              </div>
              <div className="d-flex flex-row align-items-center mt-2">
                <label style={{width:120}}>Sabtu</label>
                {
                  !saturdayClose &&
                  <div className="d-flex flex-row align-items-center">
                    <Datepicker
                      selected={saturdayFrom}
                      className="form-control ms-2"
                      onChange={(e) => setSaturdayFrom(e) }
                      showTimeSelect
                      showTimeSelectOnly
                      dateFormat="h:mm aa"
                      timeFormat="h:mm aa"
                    />
                    <div className="ms-3"> s/d </div>
                    <Datepicker
                      selected={saturdayTo}
                      className="form-control ms-2"
                      onChange={(e) => setSaturdayTo(e) }
                      showTimeSelect
                      showTimeSelectOnly
                      dateFormat="h:mm aa"
                      timeFormat="h:mm aa"
                    />
                  </div>
                }
                <div className="form-check ms-4">
                  <input className="form-check-input" type="checkbox" id="saturdayClose" checked={saturdayClose} onChange={()=>setSaturdayClose(!saturdayClose)}/>
                  <label className="form-check-label" for="saturdayClose">
                    Tutup
                  </label>
                </div>
              </div>
              <div className="d-flex flex-row align-items-center mt-2">
                <label style={{width:120}}>Minggu</label>
                {
                  !sundayClose &&
                  <div className="d-flex flex-row align-items-center">
                    <Datepicker
                      selected={sundayFrom}
                      className="form-control ms-2"
                      onChange={(e) => setSundayFrom(e) }
                      showTimeSelect
                      showTimeSelectOnly
                      dateFormat="h:mm aa"
                      timeFormat="h:mm aa"
                    />
                    <div className="ms-3"> s/d </div>
                    <Datepicker
                      selected={sundayTo}
                      className="form-control ms-2"
                      onChange={(e) => setSundayTo(e) }
                      showTimeSelect
                      showTimeSelectOnly
                      dateFormat="h:mm aa"
                      timeFormat="h:mm aa"
                    />
                  </div>
                }
                <div className="form-check ms-4">
                  <input className="form-check-input" type="checkbox" id="sundayClose" checked={sundayClose} onChange={()=>setSundayClose(!sundayClose)}/>
                  <label className="form-check-label" for="sundayClose">
                    Tutup
                  </label>
                </div>
              </div>
            </div>
          }
        </div>
      </Container>
    </Component.Modal_Component>
  );
}

const Container = styled.div`
  .list-gambar {
    .btn-delete {
      position: absolute;
      top: -10px;
      right: -10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: red;
      background-color: #fff;
      border-radius: 50%;
    }
    .image-gambar {
      width: 150px;
      height: 150px;
      border-radius: 10px 10px 10px 10px;
      overflow: hidden;
      background-color: green;
      color: #fff;
      font-weight: 600;
      justify-content: center;
      align-items: center;
      display: flex;
      img {
        max-width: 150px;
        width: 100%;
        height: 150px;
        object-fit: cover;
        border-radius: 10px;
      }
    }
  }
  .image-logo {
    img {
      width: 100%;
    }
    max-width: 150px;
    width: 100%;
    height: 150px;
    border-radius: 999px;
    overflow: hidden;
  }
`;
