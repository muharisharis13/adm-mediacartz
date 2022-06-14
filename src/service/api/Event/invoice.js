import { Method } from "../..";

class Invoice {
  getInvoiceList(page) {
    return Method.get(`invoice?order_by=invoice_id&sort_by=DESC&page=${page}`)
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  getDetailInvoice(invoice_id) {
    return Method.get(`invoice/${invoice_id}`)
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  getDownloadInvoice(invoice_id) {
    return Method.get(`invoice/${invoice_id}/download`, {
      responseType: "blob",
    })
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }
}

export default new Invoice();
