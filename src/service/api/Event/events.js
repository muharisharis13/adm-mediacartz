import { Method } from "../../index";

interface Props {
  page: number;
}

class Event {
  getListEvent({ page }: Props) {
    return Method.get(`event/own?order_by=event_id&sort_by&page=${page}`)
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  getDetailEvent(event_id: number) {
    return Method.get(`event/${event_id}`)
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  getImageBlob(event_id: number) {
    return Method.get(`event/${event_id}/image`, {
      responseType: "blob",
    })
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  getAgenda(event_id: number) {
    return Method.get(`event/${event_id}/agenda`)
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  postAgenda(body) {
    return Method.post(`event/agenda`, body)
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  getAgenda2(event_id) {
    return Method.get(`event/${event_id}/agenda`)
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  getAgendaDetail(event_agenda_id) {
    return Method.get(`event/agenda/${event_agenda_id}`)
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  putAgenda(event_agenda_id, body) {
    return Method.put(`event/agenda/${event_agenda_id}`, body)
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  deleteAgenda(event_agenda_id) {
    return Method.delete(`/event/agenda/${event_agenda_id}`)
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  postPhoto(formData) {
    return Method.post(`event/gallery`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  deletePhotoGallery(event_id, gallery_id) {
    return Method.delete(`event/${event_id}/gallery/${gallery_id}`)
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  getOwnEvent() {
    return Method.get(`event/own?event_expired_status_name=valid`)
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  getMs_seat() {
    return Method.get(`list/ms_seat`)
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  getMs_price() {
    return Method.get(`list/ms_price`)
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  putSeat(seat_id, formData) {
    return Method.put(`seat/${seat_id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  postSeat(formData) {
    return Method.post(`seat`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  putDetailSeat(seat_detail_id, data) {
    const body = {
      seat_detail_datetime: data?.date_event,
      seat_detail_name: data?.nama_seat,
      seat_detail_price: data?.harga_seat,
      seat_detail_minimum_donation_amout: data?.nominal_min_donation,
      seat_detail_quantity: data?.jumlah_seat,
      seat_detail_maximum_purchased_quantity: data?.max_purchased,
      ms_price_id: data?.tipe_harga?.value?.ms_price_id,
      ms_seat_id: data?.tipe_alokasi?.value?.ms_seat_id,
    };
    console.log(body);
    return Method.put(`seat/detail/${seat_detail_id}`, body)
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }
  postDetailSeat(seat_id, data) {
    const body = {
      seat_detail_datetime: data?.date_event,
      seat_detail_name: data?.nama_seat,
      seat_detail_price: data?.harga_seat,
      seat_detail_minimum_donation_amout: data?.nominal_min_donation,
      seat_detail_quantity: data?.jumlah_seat,
      seat_detail_maximum_purchased_quantity: data?.max_purchased,
      ms_price_id: data?.tipe_harga?.value?.ms_price_id,
      ms_seat_id: data?.tipe_alokasi?.value?.ms_seat_id,
    };
    return Method.post(`seat/detail/${seat_id}`, body)
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  putInactiveSeat(seat_detail_id) {
    return Method.put(`seat/detail/${seat_detail_id}/inactivate`)
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  putActiveSeat(seat_detail_id) {
    return Method.put(`seat/detail/${seat_detail_id}/activate`)
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  getCompany() {
    return Method.get(
      `company?company_active_status=1&company_verified_status_name=verified`
    )
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  getCategoryVenue() {
    return Method.get(`category_venue`)
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  getCategoryEvent() {
    return Method.get(`category_event`)
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  getMsCity(ms_city_name_full) {
    return Method.get(
      `list/ms_city?ms_city_active_status=1&ms_city_name_full=${ms_city_name_full}`
    )
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  getOrganizer(company_id) {
    return Method.get(
      `organizer?company_id=${company_id}&organizer_active_status_name=active&organizer_verified_status_name=verified`
    )
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  postShortened(body) {
    return Method.post(`shortened`, body)
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  postEvent(body) {
    return Method.post(`event`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => res?.data)
      .catch((res) => res?.response);
  }

  putEvent(body, event_id) {
    return Method.put(`event/${event_id}`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  putScanTiket(body) {
    return Method.put(`ticket/scan`, body)
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  getTiket({ organizer_id, event_id, page, query }) {
    return Method.get(
      `organizer/${organizer_id}/event/${event_id}/ticket?&page=${page}${query}`
    )
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  putAttendTicket({ event_id, ticket_id }) {
    return Method.put(`event/${event_id}/ticket/${ticket_id}/attend`)
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  getDownloadInvoice({ invoice_id }) {
    return Method.get(`invoice/${invoice_id}/download`, {
      responseType: "blob",
    })
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  postSaveInvoice({ organizer_id, event_id, body }) {
    return Method.post(
      `organizer/${organizer_id}/event/${event_id}/invoice`,
      body
    )
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  getTransaction({ page, organizer_id, event_id }) {
    return Method.get(
      `organizer/${organizer_id}/event/${event_id}/transaction?page=${page}`
    )
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  getSummary({ organizer_id, event_id }) {
    return Method.get(
      `organizer/${organizer_id}/event/${event_id}/transaction/summary1`
    )
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  putActiveEvent(event_id) {
    return Method.put(`event/${event_id}/activate`)
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  putInActiveEvent(event_id) {
    return Method.put(`event/${event_id}/inactivate`)
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }
}

export default new Event();
