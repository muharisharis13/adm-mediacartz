import React, { useEffect, useState } from "react";
import * as Component from "../../../../component";
import * as Style from "../../../../component/style/content/default";
import * as Services from "../../../../service";
import * as Util from "../../../../util";
import styled from "styled-components";

const api = Services.api.ApiEvent.Ticket;

const ModalTicketDetail = (props: {
  show: boolean,
  onHide: Function,
  dataProps: any,
}) => {
  const { show, onHide, dataProps } = props;
  const { data } = dataProps;
  const [info, setInfo] = useState([]);
  const [event, setEvent] = useState([]);
  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    if (show) {
      if (data) {
        setInfo([
          {
            title: "Nama Tiket",
            text: data?.ticket_name,
          },
          {
            title: "Kode Booking Tiket",
            text: data?.ticket_booking_number,
          },
          {
            title: "Tanggal Tiket",
            text: Util.Moment(data?.ticket_datetime),
          },
          {
            title: "Tanggal Diterbitkan",
            text: Util.Moment(data?.ticket_issued_datetime),
          },
          {
            title: "Harga Tiket",
            text: Util.Moment(data?.ticket_price),
          },
          {
            title: "Tipe Seat",
            text: Util.Moment(data?.ms_seat?.ms_seat_name),
          },
          {
            title: "Nomor Seat Tiket",
            text: Util.Moment(data?.ticket_seat_number),
          },
          {
            title: "Status Tiket",
            text: (
              <div
                dangerouslySetInnerHTML={{
                  __html: Util.displayStatus(data?.ticket_status_name),
                }}
              />
            ),
          },
          {
            title: "Diterbitkan Untuk",
            text: data?.ticket_issued_for?.name,
          },
        ]);

        setEvent([
          {
            title: "Nama Event",
            text: data?.event?.event_name,
          },
          {
            title: "Tanggal Event",
            text: `${Util.Moment(
              data?.event?.event_start_datetime
            )} ~ ${Util.Moment(data?.event?.event_end_datetime)}`,
          },
          {
            title: "Lokasi Event",
            text: data?.event?.event_location,
          },
          {
            title: "Organizer",
            text: data?.event?.organizer?.organizer_name,
          },
          {
            title: "Kota",
            text: data?.event?.ms_city?.ms_city_name_full,
          },
        ]);

        setTransaction([
          {
            title: "Nomor Transaksi",
            text: data?.transaction?.transaction_number,
          },
          {
            title: "Nama Pembayaran",
            text: data?.transaction?.ms_payment?.ms_payment_name,
          },
          {
            title: "Tipe Transaksi",
            text: data?.transaction?.ms_transaction?.ms_transaction_name,
          },
          {
            title: "Jumlah Transaksi",
            text: Util.FormatCurrency.currency(
              data?.transaction?.transaction_amount
            ),
          },
          {
            title: "Kuantitas",
            text: data?.transaction?.transaction_quantity,
          },
          {
            title: "Pajak",
            text: Util.FormatCurrency.currency(
              data?.transaction?.transaction_tax
            ),
          },
          {
            title: "Diskon",
            text: Util.FormatCurrency.currency(
              data?.transaction?.transaction_discount
            ),
          },
          {
            title: "Donasi",
            text: Util.FormatCurrency.currency(
              data?.transaction?.transaction_donation
            ),
          },
          {
            title: "Biaya Administrasi",
            text: Util.FormatCurrency.currency(
              data?.transaction?.transaction_administration_fee
            ),
          },
          {
            title: "Jumlah Total Transaksi",
            text: Util.FormatCurrency.currency(
              data?.transaction?.transaction_total_amount
            ),
          },
          {
            title: "Tanggal Transaksi",
            text: Util.Moment(data?.transaction?.transaction_created_datetime),
          },
          {
            title: "Status",
            text: (
              <div
                dangerouslySetInnerHTML={{
                  __html: Util.displayStatus(
                    data?.transaction?.transaction_approve_status_name
                  ),
                }}
              />
            ),
          },
          {
            title: "Transaksi Oleh",
            text: `(${data?.transaction?.transaction_created_by?.name})`,
          },
          {
            title: "Download Ticket",
            text: data?.ticket_status_name === "issued" && (
              <a
                href={null}
                onClick={() =>
                  BtnDownloadTicket(
                    data?.ticket_id,
                    data?.ticket_booking_number
                  )
                }
                title="Download Ticket"
              >
                <span className="icon is-small" style={{ cursor: "pointer" }}>
                  &#128193;
                </span>
              </a>
            ),
          },
        ]);
      }
    }
  }, [show]);

  const BtnDownloadTicket = (ticket_id, ticket_booking_number) => {
    api.getDownloadTicket(ticket_id).then((res) => {
      if (res) {
        //download file
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(res);
        link.setAttribute("download", `${ticket_booking_number}.pdf`);
        document.body.appendChild(link);
        link.click();
      } else {
        Component.AlertError({ title: "Error", text: "File Not Found" });
      }
    });
  };

  return (
    <Component.Modal_Component
      title="Detail Ticket"
      show={show}
      onHide={onHide}
      size="xl"
    >
      <Container className="container">
        {info?.map((item: any, idx: number) => (
          <div key={idx} className="wrap-content">
            <div className="title">{item.title}</div>
            <div className="text">{item.text}</div>
          </div>
        ))}

        <div className="mt-5">
          <div className="name">Event</div>
          {event?.map((item: any, idx: number) => (
            <div key={idx} className="wrap-content">
              <div className="title">{item.title}</div>
              <div className="text">{item.text}</div>
            </div>
          ))}
        </div>

        <div className="mt-5">
          <div className="name">Transaksi</div>
          {transaction?.map((item: any, idx: number) => (
            <div key={idx} className="wrap-content">
              <div className="title">{item.title}</div>
              <div className="text">{item.text}</div>
            </div>
          ))}
        </div>
      </Container>
    </Component.Modal_Component>
  );
};

export default ModalTicketDetail;

const Container = styled.div`
  .wrap-content {
    display: flex;
    align-items: center;
    width: 100%;
    background-color: #fff;
    padding: 4px 20px;
    border-bottom: thin solid #eaeaea;

    .title {
      max-width: 400px;
      width: 100%;
      font-weight: bold;
      color: ${Style.COLOR_SECONDARY};
    }
  }
`;
