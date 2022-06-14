import { Method } from "../..";

const CompanyService = () => {
  const get_company = ({ sort_by = "DESC", page = 1 }) => {
    return Method.get(
      `/company?page=${page}&company_active_status=1&company_verified_status_name=verified`
    )
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  };

  const get_ms_city = (name) => {
    return Method.get(
      `/list/ms_city?ms_city_active_status=1&ms_city_name_full=${name}`
    ).then((res) => {
      return res.data;
    });
  };

  const get_category_company = () => {
    return Method.get(`/category_company?category_company_active_status=1`)
      .then((res) => {
        return res;
      })
      .catch((err) => err);
  };

  const post_company = ({ body }) => {
    return Method.post(`/company`, body).then((res) => {
      return res.data;
    });
  };

  const get_company_detail = ({ company_id }) => {
    return Method.get(`/company/${company_id}`)
      .then((res) => {
        return res;
      })
      .catch((err) => err);
  };

  const get_balance_company = ({ company_id }) => {
    return Method.get(`/balance/company/${company_id}`).then((res) => {
      return res.data;
    });
  };

  const get_balance_company_w_pagination = ({ company_id, page = 1 }) => {
    return Method.get(`/balance?company_id=${company_id}&page=${page}`).then(
      (res) => {
        return res.data;
      }
    );
  };

  const get_bucket_company = ({ company_id }) => {
    return Method.get(`/bucket/company/${company_id}`).then((res) => {
      return res.data;
    });
  };

  const get_bucket_company_w_pagination = ({ company_id, page = 1 }) => {
    return Method.get(`/bucket?company_id=${company_id}&page=${page}`).then(
      (res) => {
        return res.data;
      }
    );
  };

  const get_link_company = ({ company_id }) => {
    return Method.get(`/company/${company_id}/link`).then((res) => {
      return res.data;
    });
  };

  const put_edit_company = ({ company_id, body }) => {
    return Method.put(`/company/${company_id}`, body).then((res) => {
      return res.data;
    });
  };

  const get_pricebook_company = ({ company_id }) => {
    return Method.get(`/pricebook/company/${company_id}`).then((res) => {
      return res.data;
    });
  };

  const get_package_company = ({ company_id }) => {
    return Method.get(`/package/company/${company_id}`).then((res) => {
      return res.data;
    });
  };

  const get_package_detail_company = ({ package_id }) => {
    return Method.get(`/package/${package_id}`).then((res) => {
      return res.data;
    });
  };

  const get_company_active_verified = ({
    company_active_status = 1,
    company_verified_status_name = "verified",
  }) => {
    return Method.get(`/company`).then((res) => {
      return res.data;
    });
  };

  const put_company_parent = ({ company_id }) => {
    return Method.put(`/company/${company_id}/parent`).then((res) => {
      return res.data;
    });
  };

  const get_company_client_key = ({ company_id }) => {
    return Method.get(`/company/${company_id}/client_key`).then((res) => {
      return res.data;
    });
  };

  const get_company_client_key_new = ({ company_id }) => {
    return Method.get(`/company/${company_id}/client_key/new`).then((res) => {
      return res.data;
    });
  };

  const put_company_ip = ({ company_id, body }) => {
    return Method.put(`/company/${company_id}/ip`, body).then((res) => {
      return res.data;
    });
  };

  return {
    get_company,
    get_ms_city,
    get_category_company,
    post_company,
    get_company_detail,
    get_balance_company,
    get_bucket_company,
    get_link_company,
    put_edit_company,
    get_bucket_company_w_pagination,
    get_balance_company_w_pagination,
    get_pricebook_company,
    get_package_company,
    get_package_detail_company,
    get_company_active_verified,
    put_company_parent,
    get_company_client_key,
    get_company_client_key_new,
    put_company_ip,
  };
};

export default CompanyService();
