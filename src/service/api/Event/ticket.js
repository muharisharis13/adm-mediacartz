import { Method } from "../..";

class Ticket {
  getTicketList(page) {
    return Method.get(`ticket?order_by=ticket_id&sort_by=DESC&page=${page}`)
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  getDetailTicket(ticket_id) {
    return Method.get(`ticket/${ticket_id}`)
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  getDownloadTicket(ticket_id) {
    return Method.get(`ticket/${ticket_id}/download`, {
      responseType: "blob",
    })
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }
}

export default new Ticket();
