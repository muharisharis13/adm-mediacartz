export const data_nav = [
  {
    path: "/dashboard",
    name: "Beranda",
  },
  {
    path: "/dashboard/company",
    name: "Perusahaan",
  },
  {
    path: "/dashboard/account",
    name: "Akun",
  },
  {
    path: "/dashboard/customer",
    name: "Customer",
  },
  {
    path: "/dashboard/transaction",
    name: "Transaksi",
  },
  {
    path: "/#iklan",
    name: "Beriklan",
    sub: [
      {
        path: "/dashboard/iklans/sender",
        name: "Sender ID",
      },
      {
        path: "/dashboard/iklans/receipt",
        name: "Penerima",
      },
      {
        path: "/dashboard/iklans/template",
        name: "Template",
      },
      {
        path: "/dashboard/iklans/campaign",
        name: "Kampanye Iklan",
      },
      {
        path: "/dashboard/iklans/api-request",
        name: "API Request",
      },
      {
        path: "/dashboard/iklans/shorten-url",
        name: "Shorten URL",
      },
      {
        path: "/dashboard/iklans/insight",
        name: "Insights",
      },
    ],
  },
  {
    path: "/#event",
    name: "Event",
    sub: [
      {
        path: "/dashboard/event/events",
        name: "Event",
      },
      {
        path: "/dashboard/event/organizer",
        name: "Organizer",
      },
      {
        path: "/dashboard/event/seat",
        name: "Seat",
      },
      {
        path: "/dashboard/event/ticket",
        name: "Ticket",
      },
      {
        path: "/dashboard/event/invoice",
        name: "Invoice",
      },
      {
        path: "/dashboard/event/microsite",
        name: "Microsite",
      },
    ],
  },
  {
    path: "/#retail",
    name: "Retail",
    sub: [
      {
        path: "/dashboard/retail/toko",
        name: "Toko",
      },
      {
        path: "/dashboard/retail/statistic",
        name: "Statistic",
      },
      {
        path: "/dashboard/retail/display_kategori",
        name: "Display Kategori",
      },
      {
        path: "/dashboard/retail/master_produk",
        name: "Master Produk",
      },
      {
        path: "/dashboard/retail/transaksi",
        name: "Transaksi",
      },
      {
        path: "/dashboard/retail/request_stock",
        name: "Request Stock",
      },
    ],
  },
];

export const data_user_nav = [
  {
    name: "Profil",
    path: "/path",
  },
  {
    name: "Ubah Kata Sandi",
    path: "/change-password",
  },
  {
    name: "Logout",
    path: "/logout",
  },
];
