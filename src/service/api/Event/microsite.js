import { Method } from "../..";

class Microsite {
  getMicrositeList(page) {
    return Method.get(
      `microsite?order_by=microsite_id&sort_by=DESC&page=${page}`
    )
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  getMicrositeDetail(microsite_id) {
    return Method.get(`microsite/${microsite_id}`)
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

  postMicrosite(body) {
    return Method.post(`microsite`, body)
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  putMicrosite(body, microsite_id) {
    return Method.get(`microsite/${microsite_id}`, body)
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }
}

export default new Microsite();
