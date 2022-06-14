import React from "react";
import { Route } from "react-router-dom";
import {
  IdxAccount,
  IdxApi_Request,
  IdxCompany,
  IdxCustomer,
  IdxDashboard,
  IdxInsight,
  IdxKampanye_Iklan,
  IdxPenerima,
  IdxSenderId,
  IdxShorten_URL,
  IdxTemplate,
  IdxTransaksi,
  Event,
  Retail,
} from "../pages";

export const Router = () => {
  return (
    <div>
      <Route exact path="/dashboard" component={IdxDashboard} />
      <Route path="/dashboard/company" component={IdxCompany} />
      <Route path="/dashboard/account" component={IdxAccount} />
      <Route path="/dashboard/customer" component={IdxCustomer} />
      <Route path="/dashboard/transaction" component={IdxTransaksi} />
      <Route path="/dashboard/iklans/sender" component={IdxSenderId} />
      <Route path="/dashboard/iklans/receipt" component={IdxPenerima} />
      <Route path="/dashboard/iklans/template" component={IdxTemplate} />
      <Route path="/dashboard/iklans/campaign" component={IdxKampanye_Iklan} />
      <Route path="/dashboard/iklans/api-request" component={IdxApi_Request} />
      <Route path="/dashboard/iklans/shorten-url" component={IdxShorten_URL} />
      <Route path="/dashboard/iklans/insight" component={IdxInsight} />
      <Route path="/dashboard/event/events" component={Event.Events} />
      <Route path="/dashboard/event/create" component={Event.EventsCreate} />
      <Route path="/dashboard/event/organizer" component={Event.Organizer} />
      <Route path="/dashboard/event/seat" component={Event.Seat} />
      <Route path="/dashboard/event/ticket" component={Event.Ticket} />
      <Route path="/dashboard/event/invoice" component={Event.Invoice} />
      <Route path="/dashboard/event/microsite" component={Event.Microsite} />
      <Route path="/dashboard/retail/toko" component={Retail.Toko} />
      <Route path="/dashboard/retail/statistic" component={Retail.Statistic} />
      <Route
        path="/dashboard/retail/master_produk"
        component={Retail.MasterProduk}
      />
      <Route
        path="/dashboard/retail/display_kategori"
        component={Retail.DisplayKategori}
      />
      <Route
        path="/dashboard/retail/transaksi"
        component={Retail.TransaksiRetail}
      />
      <Route
        path="/dashboard/retail/request_stock"
        component={Retail.RequestStock}
      />
    </div>
  );
};
