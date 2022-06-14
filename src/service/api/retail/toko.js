import { Method } from "../..";
import axios from "axios";

class Toko {
  getListToko(company_id, page) {
    return Method.get(`company/${company_id}/store?page=${page}`)
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  getTokoDetalMenu(store_id) {
    return Method.get(`store/${store_id}/menu`)
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  getMenuDetail(menu_id) {
    return Method.get(`menu/${menu_id}`)
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  getMsCity(ms_city_name) {
    return Method.get(
      `ms_city?${ms_city_name ? `ms_city_name=${ms_city_name}` : null}`
    )
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  getMsMerchantPayment() {
    return Method.get(`list/ms_merchant_payment`)
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  async postStorageServer(file) {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("email", process.env.REACT_APP_EMAIL);
    formData.append("password", process.env.REACT_APP_PASSWORD);

    console.log('utl cdn', process.env.REACT_APP_URL_STORAGE)

    try {
      const res = await axios({
        method: "post",
        url: process.env.REACT_APP_URL_STORAGE,
        timeout: 4000,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res?.data;
    } catch (err) {
      return err?.response;
    }
  }

  putTokoStatus(store_id, status) {
    return Method.put(`store/${store_id}/${status}`)
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  postToko(body) {
    return Method.post(`store`, body)
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  putToko(store_id, body) {
    return Method.put(`store/${store_id}`, body)
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }
}

export default new Toko();
