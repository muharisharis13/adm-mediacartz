import { Method } from "../../..";

class Api_request {
  get_company = () => {
    return Method.get(
      `/company?company_active_status=1&company_verified_status_name=verified`
    ).then((res) => {
      return res.data;
    });
  };

  get_api_request = ({
    page = 1,
    api_transaction_number = "",
    api_sender = "",
    company_id = "",
    api_from_datetime,
    api_until_datetime,
  }) => {
    return Method.get(
      `/api_request?sort_by=DESC&page=${page}&api_transaction_number=${
        api_transaction_number !== "" ? api_transaction_number : ""
      }&api_sender=${api_sender !== "" ? api_sender : ""}&company_id=${
        company_id !== "" ? company_id : ""
      }&api_from_datetime=${api_from_datetime}&api_until_datetime=${api_until_datetime}`
    ).then((res) => {
      return res.data;
    });
  };

  get_api_request_report({
    api_transaction_number = "",
    api_sender = "",
    company_id = "",
    api_from_datetime,
    api_until_datetime,
  }) {
    return Method.get(
      `api_request/report?&api_transaction_number=${
        api_transaction_number !== "" ? api_transaction_number : ""
      }&api_sender=${api_sender !== "" ? api_sender : ""}&company_id=${
        company_id !== "" ? company_id : ""
      }&api_from_datetime=${api_from_datetime}&api_until_datetime=${api_until_datetime}`
    )
      .then((res) => res?.data)
      .catch((err) => err?.response);
  }

  get_api_request_detail = (id) => {
    return Method.get(`/api_request/${id}`).then((res) => {
      return res.data;
    });
  };

  get_product = ({ api_media = "" }) => {
    return Method.get(
      `/list/api_product?${api_media !== "" ? `api_media=${api_media}` : ""}`
    ).then((res) => {
      return res.data;
    });
  };

  get_status = () => {
    return Method.get(`/list/api_status`).then((res) => {
      return res.data;
    });
  };

  get_summary = ({
    api_status = "",
    company_id = "",
    api_media = "",
    api_channel = "",
    api_from_date = "",
    api_until_date = "",
    calender_interval = "",
  }) => {
    return Method.get(
      `/api_request/summary?${api_status && `api_status=${api_status}`}${
        company_id && `&company_id=${company_id}`
      }${api_media && `&api_media=${api_media}`}${
        api_channel && `&api_channel=${api_channel}`
      }${api_from_date && `&api_from_date=${api_from_date}`}${
        api_until_date && `&api_until_date=${api_until_date}`
      }${calender_interval && `&calender_interval=${calender_interval}`}`
    ).then((res) => {
      return res.data;
    });
  };
}

export default new Api_request();
