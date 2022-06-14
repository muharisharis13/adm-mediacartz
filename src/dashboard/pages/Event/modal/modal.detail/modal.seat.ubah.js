import React, { useState, useEffect } from "react";
import * as Component from "../../../../../component";
import * as Style from "../../../../../component/style/content/default";
import * as Services from "../../../../../service";
import * as Util from "../../../../../util";
import styled from "styled-components";
import Select from "react-select";
import DatePicker from "react-datepicker";
import Helmet from "react-helmet";
import moment from "moment";
import { Times } from "@styled-icons/typicons";

const header = [
  "Tanggal Event",
  "Tipe Alokasi",
  "Nama Seat",
  "Jumlah Seat (Pcs)",
  "Tipe Harga",
  "Harga Seat (IDR)",
  "Nominal Min. Donasi (IDR)",
  "Jumlah Pembelian Maks. (Pcs)",
];

const allowedFileTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif"];

const ModalSeatUbah = (props: {
  show: boolean,
  onHide: Function,
  data: any,
  btnMoreEvent: any,
}) => {
  const { show, onHide, data, btnMoreEvent } = props;
  const [options, setOptions] = useState({
    tipe_alokasi: [],
    tipe_harga: [],
    event: [],
  });
  const [selected, setSelected] = useState({
    tipe_alokasi: "",
    tipe_harga: "",
    event: "",
  });
  const [data_seat, setData_seat] = useState([]);
  const [seat_layout_image, setSeat_layout_image] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    if (show) {
      if (data) {
        if (data?.event?.event_id) {
          setSelected((state) => ({
            ...state,
            event: {
              value: data?.event?.event_id,
              label: `${data?.event?.event_name} (${Util.Moment(
                data?.event?.event_start_datetime
              )} ~ ${Util.Moment(data?.event?.event_end_datetime)})`,
            },
          }));
        }
        if (data?.seat?.seat_detail) {
          setData_seat(
            data?.seat?.seat_detail?.map((item) => ({
              seat_detail_id: item.seat_detail_id,
              date_event: new Date(item.seat_detail_datetime),
              tipe_alokasi: {
                value: item.ms_seat,
                label: item.ms_seat.ms_seat_name,
              },
              nama_seat: item.seat_detail_name,
              jumlah_seat: item.seat_detail_quantity,
              tipe_harga: {
                value: item.ms_price,
                label: item.ms_price.ms_price_name,
              },
              harga_seat: item.seat_detail_price,
              nominal_min_donation: item.seat_detail_minimum_donation_amount,
              max_purchased: item.seat_detail_maximum_purchased_quantity,
              seat_detail_active_status_name:
                item.seat_detail_active_status_name,
            }))
          );
        } else if (data?.seat_detail) {
          setData_seat(
            data?.seat_detail?.map((item) => ({
              seat_detail_id: item.seat_detail_id,
              date_event: new Date(item.seat_detail_datetime),
              tipe_alokasi: {
                value: item.ms_seat,
                label: item.ms_seat.ms_seat_name,
              },
              nama_seat: item.seat_detail_name,
              jumlah_seat: item.seat_detail_quantity,
              tipe_harga: {
                value: item.ms_price,
                label: item.ms_price.ms_price_name,
              },
              harga_seat: item.seat_detail_price,
              nominal_min_donation: item.seat_detail_minimum_donation_amount,
              max_purchased: item.seat_detail_maximum_purchased_quantity,
              seat_detail_active_status_name:
                item.seat_detail_active_status_name,
            }))
          );
        }
        await setSeat_layout_image(data?.seat?.seat_layout_image);
      }
      await Services.api.ApiEvent.Event.getMs_seat().then((res) => {
        console.log("getMS_seat", res);
        if (res?.success) {
          setOptions((state) => ({
            ...state,
            tipe_alokasi: res?.data?.map((item) => ({
              value: item,
              label: item.ms_seat_name,
            })),
          }));
        }
      });
      await Services.api.ApiEvent.Event.getMs_price().then((res) => {
        console.log(res);
        if (res?.success) {
          setOptions((state) => ({
            ...state,
            tipe_harga: res?.data?.map((item) => ({
              value: item,
              label: item.ms_price_name,
            })),
          }));
        }
      });

      Services.api.ApiEvent.Event.getOwnEvent().then((res) => {
        if (res?.success) {
          setOptions((state) => ({
            ...state,
            event: res?.data?.map((item) => ({
              value: item.event_id,
              label: `${item.event_name} (${Util.Moment(
                item.event_start_datetime
              )} ~ ${Util.Moment(item.event_end_datetime)})`,
            })),
          }));
        }
      });
    }
  }, [show]);

  const btnTambahSeat = () => {
    setData_seat((state) => [
      ...state,
      {
        date_event: new Date(),
        tipe_alokasi: "",
        nama_seat: "",
        jumlah_seat: "",
        tipe_harga: "",
        harga_seat: "",
        nominal_min_donation: "",
        max_purchased: "",
      },
    ]);
  };

  const onChangeFile = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();
    if (allowedFileTypes.includes(file.type)) {
      reader.readAsDataURL(file);
      reader.onload = async function (event) {
        const imgElement = document.createElement("img");
        imgElement.src = event.target.result;

        imgElement.onload = async function (e2) {
          const canvas = document.createElement("canvas");
          var MAX_WIDTH = 400;
          var MAX_HEIGHT = 300;
          var width = imgElement.width;
          var height = imgElement.heigh;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");

          ctx.drawImage(e2.target, 0, 0, canvas.width, canvas.height);

          const srcEncoded = ctx.canvas.toDataURL(e2.target, "image/jpg");

          setSeat_layout_image(await getAsJPEGBlob(srcEncoded));
        };
      };
    } else {
      Component.AlertError({ title: "Warning", text: "No valid image file" });
    }
  };

  function getAsJPEGBlob(canvas) {
    if (canvas.mozGetAsFile)
      return canvas.mozGetAsFile("foo.jpg", "image/jpeg");
    else {
      const binary = atob(canvas.split(",")[1]);
      const array = [];
      for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      return new Blob([new Uint8Array(array)], { type: "image/jpeg" });
    }
  }

  const btnSimpan = async () => {
    try {
      setLoading(true);
      let result;

      const formData = new FormData();
      formData.append(
        "seat_layout_image",
        document.getElementById("seat_layout_image").files[0]
      );

      if (data?.event_id) {
        formData.append("event_id", data?.event_id);
      } else {
        formData.append("event_id", selected.event?.value);
      }

      // jika mau edit
      if (data?.seat?.seat_id || data?.seat_id) {
        result = await Services.api.ApiEvent.Event.putSeat(
          data?.seat?.seat_id || data?.seat_id,
          formData
        );
      } else {
        //create new
        console.log("berhasil buat seat");
        result = await Services.api.ApiEvent.Event.postSeat(formData);
        console.log("ini result", result);
      }

      if (result && result?.error) {
        Component.AlertError({ title: "Error", text: result.error });
      } else if (result && result?.success) {
        // console.log("aaaaaa", result);
        // setSeat_id(result?.data?.seat_id);
      }

      if (result && result.success) {
        console.log({ muharis: data_seat });
        for (const sub of data_seat) {
          if (sub.harga_seat === null) {
            return (sub.harga_seat = "0");
          }

          if (
            sub.date_event &&
            sub.tipe_alokasi &&
            sub.nama_seat &&
            sub.jumlah_seat &&
            sub.tipe_harga &&
            sub.max_purchased
          ) {
            // console.log("ini date event", sub.date_event);
            // console.log("ini seat_detail_id", sub.seat_detail_id);
            sub.date_event = sub.date_event
              ? moment(new Date(sub.date_event)).format("YYYY-MM-DD HH:mm:ss")
              : "";

            if (sub?.seat_detail_id) {
              console.log("ini put");
              result = await Services.api.ApiEvent.Event.putDetailSeat(
                sub.seat_detail_id,
                sub
              );
            } else if (!sub?.seat_detail_id) {
              console.log("ini post");
              result = await Services.api.ApiEvent.Event.postDetailSeat(
                data?.seat?.seat_id || data?.seat_id || result?.data?.seat_id,
                sub
              );
            }
          }
        }

        if (result && result.success) {
          await Promise.all([
            Component.AlertSuccess({
              title: "Success",
              text: result.success,
            }),
            // btnMoreEvent ?? btnMoreEvent("Lihat Detail", data?.event_id),
            onHide(),
            window.location.reload(),
          ]);
        } else {
          Component.AlertError({ title: "Error", text: result.error });
        }
      } else {
        Component.AlertError({ title: "Error", text: result.error });
      }
    } catch (error) {
      Component.AlertError({ title: "Error", text: error });
    } finally {
      setLoading(false);
    }
  };

  const btnDeleteSeatDetail = async (seat_detail_id) => {
    // await Services.api.ApiEvent.Seat.putSeatDetailInactive(seat_detail_id).then(
    //   async (res) => {
    //     console.log(res);
    //     if (res?.success) {
    //       await Promise.all([
    //         Component.AlertSuccess({ title: "Success", text: res.success }),
    //         window.location.reload(),
    //       ]);
    //     }
    //   }
    // );
    setData_seat(
      data_seat.filter((filter) => filter.seat_detail_id !== seat_detail_id)
    );
  };

  console.log("ini data seat ubah", data);
  console.log("data seat", data_seat);

  return (
    <Component.Modal_Component
      title="Seat"
      size="xl"
      onHide={onHide}
      show={show}
      btnSubmit
      btnName="Simpan"
      onClick={btnSimpan}
      fullscreen
    >
      <Container>
        <div className="mb-3">
          <Style.Label color={Style.COLOR_SECONDARY} htmlFor="">
            Pilih Event
          </Style.Label>
          <Select
            placeholder="Pilih Event"
            options={options.event}
            value={selected.event}
            onChange={(e) => setSelected((state) => ({ ...state, event: e }))}
          />
        </div>
        <div
          className="mb-3"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Style.Label color={Style.COLOR_SECONDARY} htmlFor="">
            Denah Layout Seat
          </Style.Label>
          <img
            src={data?.seat_image_url ? data?.seat_image_url : ""}
            alt=""
            width="300"
            data-action="zoom"
          />
          <input
            type="file"
            name=""
            className="mt-2 form-control"
            id="seat_layout_image"
            onChange={(event) => onChangeFile(event)}
          />
        </div>
        <div className="mb-3">
          <Style.Label color={Style.COLOR_SECONDARY} htmlFor="">
            Rincian Seat
          </Style.Label>
          <Component.TableData header={header}>
            {data_seat?.map((item: any, idx: number) => (
              <tr key={idx}>
                <td>
                  <DatePicker
                    className="form-control"
                    placeholderText="Date"
                    selected={new Date(item.date_event)}
                    onChange={(e) => {
                      item.date_event = e;
                      setData_seat([...data_seat]);
                    }}
                  />
                </td>
                <td>
                  <Select
                    placeholder="Select Tipe Alokasi"
                    options={options.tipe_alokasi}
                    value={item.tipe_alokasi}
                    onChange={(e) => {
                      item.tipe_alokasi = e;
                      setData_seat([...data_seat]);
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nama Seat"
                    defaultValue={item.nama_seat}
                    onChange={(e) => {
                      item.nama_seat = e.target.value;
                      setData_seat([...data_seat]);
                    }}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Jumlah Seat"
                    defaultValue={item.jumlah_seat}
                    onChange={(e) => {
                      item.jumlah_seat = parseInt(e.target.value);
                      setData_seat([...data_seat]);
                    }}
                  />
                </td>
                <td>
                  <Select
                    type="text"
                    placeholder="Tipe Harga"
                    options={options.tipe_harga}
                    value={item.tipe_harga}
                    onChange={(e) => {
                      item.tipe_harga = e;
                      setData_seat([...data_seat]);
                    }}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Harga Seat (IDR)"
                    defaultValue={item.harga_seat}
                    onChange={(e) => {
                      item.harga_seat = parseInt(e.target.value);
                      setData_seat([...data_seat]);
                    }}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Nominal Min. Donasi (IDR)"
                    defaultValue={item.nominal_min_donation}
                    onChange={(e) => {
                      item.nominal_min_donation = parseInt(e.target.value);
                      setData_seat([...data_seat]);
                    }}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Jumlah Pembelian Maks."
                    defaultValue={item.max_purchased}
                    onChange={(e) => {
                      item.max_purchased = parseInt(e.target.value);
                      setData_seat([...data_seat]);
                    }}
                  />
                </td>
                <td>
                  <Times
                    width={25}
                    cursor="pointer"
                    onClick={() => btnDeleteSeatDetail(item.seat_detail_id)}
                  />
                </td>
              </tr>
            ))}
          </Component.TableData>
          <div className="button mt-3">
            <Style.ButtonPrimary type="" onClick={btnTambahSeat}>
              + Tambah Seat Baru
            </Style.ButtonPrimary>
          </div>
        </div>
      </Container>
      <Helmet>
        <script src="zoom.min.js" />
      </Helmet>
    </Component.Modal_Component>
  );
};

export default ModalSeatUbah;

const Container = styled.div`
  background-color: #fff;
  box-shadow: 0px 3px 6px rgb(0 0 0 / 16%);
  color: rgba(10, 10, 10, 0.9);
  max-width: 100%;
  position: relative;
  border-radius: 10px;
  padding: 10px;
`;
