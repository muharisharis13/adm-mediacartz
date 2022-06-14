import { Method } from "../../index";

class Organizer {
  getOrganizer(page) {
    return Method.get(
      `organizer?order_by=organizer_id&sort_by=DESC&page=${page}`
    )
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  getCompany() {
    return Method.get(
      `company?company_active_status=1&company_vefiried_status_name=verified`
    )
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  getMsCity(ms_city_name) {
    return Method.get(
      `list/ms_city?sort_by=ASC&order_by=ms_city_id&ms_city_active_status=1&${
        ms_city_name && `ms_city_name_full=${ms_city_name}`
      }`
    )
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  postOrganizer(body) {
    return Method.post(`organizer`, body, {
      headers: {
        "Content-Type": "multipart",
      },
    })
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  putOrganizer(body, organizer_id) {
    return Method.put(`organizer/${organizer_id}`, body, {
      headers: {
        "Content-Type": "multipart",
      },
    })
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  getDetailOrganizer(organizer_id) {
    return Method.get(`organizer/${organizer_id}`)
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  getLogoBlob(organizer_id) {
    return Method.get(`organizer/${organizer_id}/logo`, {
      responseType: "blob",
    })
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  getNpwpFile(organizer_id) {
    return Method.get(`organizer/${organizer_id}/document/npwp`, {
      responseType: "blob",
    })
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  putUploadDocument(formData, organizer_id) {
    return Method.put(`organizer/${organizer_id}/upload`, formData, {
      headers: {
        "Content-Type": "multipart",
      },
    })
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }
}

export default new Organizer();
