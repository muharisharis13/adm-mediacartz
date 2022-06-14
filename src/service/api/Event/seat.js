import { Method } from "../../index";

class Seat {
  getSeat(page) {
    return Method.get(`seat?order_by=seat_id&sort_by=DESC&page=${page}`)
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  getSeatDetail(seat_id) {
    return Method.get(`seat/${seat_id}`)
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  getLayoutBlob(seat_id) {
    return Method.get(`seat/${seat_id}/image`, {
      responseType: "blob",
    })
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  putSeatDetailInactive(seat_detail_id) {
    return Method.put(`seat/detail/${seat_detail_id}/inactivate`)
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }
}

export default new Seat();
