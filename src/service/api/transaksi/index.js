import { Method } from "../.."

const api_transaksi = () => {

  const get_transaksi = ({ transaction_id = "transaction_id", sort_by = "DESC", page = 1 }) => {
    return Method.get(`/transaction/buyer?order_by=${transaction_id}&sort_by=${sort_by}&page=${page}`)
      .then(res => {
        return res?.data
      })
  }

  const get_transaksi_detail = ({ transaction_id }) => {
    return Method.get(`/transaction/${transaction_id}`)
      .then(res => {
        return res?.data
      })
  }

  const get_company_active_verified = ({ company_active_status = 1, company_verified_status_name = "verified" }) => {
    return Method.get(`/company?company_active_status=${company_active_status}&company_verified_status_name=${company_verified_status_name}`)
      .then(res => {
        return res?.data
      })
  }

  const get_payment = ({ params = true }) => {
    return Method.get(`/list/ms_payment?${params && "order_by=ms_payment_id&sort_by=asc&eligible_for_topup_balance=true"}`)
      .then(res => {
        return res?.data
      })
  }


  const post_transaction_balance = ({ body }) => {
    return Method.post(`/transaction/balance`, body)
      .then(res => {
        return res?.data
      })
  }

  const get_package_company = ({ company_id }) => {
    return Method.get(`/package/company/${company_id}`)
      .then(res => {
        return res?.data
      })
  }

  const post_transaction_package = ({ body }) => {
    return Method.post(`/transaction/package`, body)
      .then(res => {
        return res?.data
      })
  }

  const put_transaction_upload = ({ body, transaction_id }) => {
    return Method.put(`/transaction/${transaction_id}/upload`, body)
      .then(res => {
        return res?.data
      })
  }

  const get_transaction_image = ({ transaction_id }) => {
    return Method.get(`/transaction/${transaction_id}/file`, { responseType: "blob" })
      .then(res => {
        return res?.data
      })
  }

  return { get_transaksi, get_transaksi_detail, get_company_active_verified, get_payment, post_transaction_balance, get_package_company, post_transaction_package, put_transaction_upload, get_transaction_image }
}

export default api_transaksi();
