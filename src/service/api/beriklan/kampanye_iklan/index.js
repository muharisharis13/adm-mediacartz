import { Method } from "../../..";
import axios from "axios";

class Api_kampanye_iklan {
  get_iklan_list = ({ page = 1 }) => {
    return Method.get(`/campaign?page=${page}`).then((res) => {
      return res?.data;
    });
  };

  get_ms_product = () => {
    return Method.get(
      `/list/ms_product?ms_product_active_status_name=active&sort_by=ASC`
    ).then((res) => {
      return res?.data;
    });
  };

  get_product = () => {
    return Method.get(
      `/product?order_by=product_id&limit=30&sort_by=ASC&product_active_status_name=active&product_available_for_campaign_status_name=true`
    ).then((res) => {
      return res?.data;
    });
  };

  get_company = () => {
    return Method.get(
      `/company?company_active_status=1&company_verified_status_name=verified`
    ).then((res) => {
      return res?.data;
    });
  };

  get_sender = ({ ms_inventory = 1, ms_channel = 1, company_id = null }) => {
    return Method.get(
      `/sender?company_id=${company_id}&ms_inventory_id=${ms_inventory}&ms_channel_id=${ms_channel}&eligibleForCampaign=true`
    ).then((res) => {
      return res?.data;
    });
  };

  get_penerima = ({ ms_inventory = 1, ms_channel = 1, company_id = null }) => {
    return Method.get(
      `/recipient?&recipient_active_status_name=active&company_id=${company_id}&ms_inventory_id=${ms_inventory}&ms_channel_id=${ms_channel}`
    ).then((res) => {
      return res?.data;
    });
  };

  get_template = ({ ms_inventory, ms_channel = 1, avail_for_company_id }) => {
    return Method.get(
      `/template?&template_approve_status_name=approved&avail_for_company_id=${avail_for_company_id}&ms_inventory_id=${ms_inventory}`
    ).then((res) => {
      return res?.data;
    });
  };

  get_template_detail = (template_id) => {
    return Method.get(`/template/${template_id}`).then((res) => {
      return res?.data;
    });
  };
  get_saldo = (company_id) => {
    return Method.get(`/balance/company/${company_id}`).then((res) => {
      return res?.data;
    });
  };

  post_amount = ({ body }) => {
    return Method.post(`/campaign/amount`, body).then((res) => {
      return res?.data;
    });
  };

  post_campaign = ({ body }) => {
    return Method.post(`/campaign`, body).then((res) => {
      return res?.data;
    });
  };

  post_draft = ({ body }) => {
    return Method.post(`/campaign/draft`, body).then((res) => {
      return res?.data;
    });
  };

  post_test = ({ body }) => {
    return Method.post(`/campaign/test`, body).then((res) => {
      return res?.data;
    });
  };

  get_bucket_detail = ({ product_id, company_id }) => {
    return Method.get(
      `/bucket/company/${company_id}?product_id=${product_id}`
    ).then((res) => {
      return res?.data;
    });
  };

  get_publisher_inventory = ({ body }) => {
    return Method.post(`/campaign/publisher/inventory`, body).then((res) => {
      return res?.data;
    });
  };
  get_publisher_product = ({ body }) => {
    return Method.post(`/campaign/publisher/product`, body).then((res) => {
      return res?.data;
    });
  };

  get_publisher_provinsi = () => {
    return Method.get(`/campaign/publisher/province`).then((res) => {
      return res?.data;
    });
  };

  get_publisher_kabupaten = ({ ms_province_id }) => {
    return Method.get(
      `/campaign/publisher/city?ms_province_id=${ms_province_id}`
    ).then((res) => {
      return res?.data;
    });
  };
  get_publisher_kota = ({ ms_city_id }) => {
    return Method.get(
      `/campaign/publisher/district?ms_city_id=${ms_city_id}`
    ).then((res) => {
      return res?.data;
    });
  };

  get_publisher_kecamatan = ({ ms_district_id }) => {
    return Method.get(
      `/campaign/publisher/village?ms_district_id=${ms_district_id}`
    ).then((res) => {
      return res?.data;
    });
  };

  post_publisher_create_dooh = ({ body }) => {
    return Method.post(`/campaign/publisher`, body).then((res) => {
      return res?.data;
    });
  };

  post_storage_Server = ({ file }) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("email", process.env.REACT_APP_EMAIL);
    formData.append("password", process.env.REACT_APP_PASSWORD);
    return axios({
      method: "post",
      url: process.env.REACT_APP_URL_STORAGE,
      timeout: 4000,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        console.error({ err });
      });
  };

  get_category_spot_harga = () => {
    return Method.get(`/campaign/tvc/category`).then((res) => {
      return res?.data;
    });
  };

  post_tvc_program = ({ body }) => {
    return Method.post(`/campaign/tvc/programme`, body).then((res) => {
      return res?.data;
    });
  };

  post_tvc_schedule = (body) => {
    return Method.post(`campaign/tvc/schedule`, body).then((res) => {
      return res?.data;
    });
  };

  post_campaign_tvc(body) {
    return Method.post(`campaign/tvc`, body).then((res) => {
      return res?.data;
    });
  }

  get_product_social({ ms_channel_id, ms_inventory_id, ms_product_id }) {
    return Method.get(
      `product?product_available_for_campaign_status_name=true&ms_channel_id=${ms_channel_id}&ms_inventory_id=${ms_inventory_id}&ms_product_id=${ms_product_id}`
    ).then((res) => {
      return res?.data;
    });
  }

  get_kol_master() {
    return Method.get(`campaign/kol/master`).then((res) => {
      return res?.data;
    });
  }

  post_kol_influencer = (body) => {
    return Method.post(`campaign/kol/influencer`, body).then((res) => {
      return res?.data;
    });
  };

  post_kol(body) {
    return Method.post(`campaign/kol`, body).then((res) => {
      return res?.data;
    });
  }

  get_detail_campaign(campaign_id) {
    return Method.get(`campaign/${campaign_id}`).then((res) => {
      return res?.data;
    });
  }

  get_campaign_id_fee(campaign_id) {
    return Method.get(`campaign/${campaign_id}/fee`).then((res) => {
      return res?.data;
    });
  }
  get_campaign_id_media(campaign_id) {
    return Method.get(`campaign/${campaign_id}/media`).then((res) => {
      return res?.data;
    });
  }

  get_campaign_status(campaign_id) {
    return Method.get(
      `campaign/${campaign_id}/status?order_by=campaign_status_id&sort_by=DESC`
    ).then((res) => {
      return res?.data;
    });
  }

  post_clone(body) {
    return Method.post(`campaign/clone`, body).then((res) => {
      return res?.data;
    });
  }

  get_campaign_report(campaign_id) {
    return Method.get(`campaign/${campaign_id}/report`).then((res) => {
      return res?.data;
    });
  }

  get_file_campign(campaign_id, filename) {
    return Method.get(`campaign/${campaign_id}/file/${filename}`, {
      responseType: "blob",
    }).then((res) => {
      return res?.data;
    });
  }

  get_file_shorted(shortened_id) {
    return Method.get(`shortened/${shortened_id}/file`, {
      responseType: "blob",
    }).then((res) => {
      return res?.data;
    });
  }
}

export default new Api_kampanye_iklan();
