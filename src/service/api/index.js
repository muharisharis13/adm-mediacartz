import AuthService from "./Auth";
import DashboardService from "./dashboard";
import CompanyService from "./company";
import {
  api_sender_id,
  api_penerima,
  api_template,
  api_kampanye_iklan,
  api_request,
  api_shorten_url,
  api_insight,
} from "./beriklan";
import api_transaksi from "./transaksi";
import api_account from "./account";
import * as ApiEvent from "./Event";
import * as ApiRetail from "./retail";
import ApiCustomer from "./customer";

export {
  ApiCustomer,
  AuthService,
  DashboardService,
  CompanyService,
  api_sender_id,
  api_transaksi,
  api_penerima,
  api_template,
  api_kampanye_iklan,
  api_request,
  api_shorten_url,
  api_insight,
  api_account,
  ApiEvent,
  ApiRetail,
};
