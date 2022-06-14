import { Method } from "../..";

class Customer {
  getListCustomer(page = 1) {
    return Method.get(`customer?sort_by=DESC&page=${page}`)
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  getDetailCustomer(id) {
    return Method.get(`customer/${id}`)
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  getSelection() {
    return Method.get(`customer/form/selection`)
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  getCompany() {
    return Method.get(
      "company?company_active_status=1&company_verified_status_name=verified"
    )
      .then((res) => res.data)
      .catch((err) => err?.response);
  }

  postCustomer(body) {
    return Method.post(`customer`, body)
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }
  putCustomer(body, id) {
    return Method.put(`customer/${id}`, body)
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  deleteCustomer(id) {
    return Method.delete(`customer/${id}`)
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  getHistory(company_id) {
    return Method.get(`customer/company/${company_id}/upload/history`)
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  postUploadDokumen(formData, company_id) {
    return Method.post(`customer/company/${company_id}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  getDownloadfile(company_id) {
    return Method.get(`customer/company/${company_id}/file`, {
      responseType: "blob",
    })
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  getDuplikat(select) {
    return Method.get(`customer/duplicate?check=${select}`)
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }
  deleteMultipleCustomer(body) {
    return Method.delete(`customer`, {
      data: body,
    })
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }
}

export default new Customer();
