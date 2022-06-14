import AdvertisingIcon from "../../asset/icon/advertising3.svg" ;
import EventIcon from "../../asset/icon/event.svg" ;
import ProtalIcon from "../../asset/icon/portal.svg" ;
import PieIcon from "../../asset/icon/pie-chart.svg";
import PubAdsIcon from "../../asset/icon/publisher_ads.svg";
import * as assets from "../../asset"

export const  json_nav =[
  {
    "title":"Advertising",
    "icon":AdvertisingIcon,
    "section_category" :[
      {
        "title":"Messaging",
        "section_sub_category": [
          {
            "title":"Targeted",
            "section_channel_inventory" :[
              { 
                "title":"SMS",
                "content":{
                  "title":"Targeted SMS",
                  "deskripsi" :"Cara beriklan praktis dengan mengirimkan pesan text  (SMS) ke pelanggan selular di seluruh Indonesia dengan profile target sesuai kebutuhan pengiklan",
                  "manfaat_dan_kelebihan" :[
                    {
                      icon:assets.IconTarget,
                      text:"Bermacam-macam profil target",
                      small_text:"(Gender,Usia,Agama,Lokasi Kota,Kecamatan, Kelurahan, Jenis HP)"
                    },
                    {
                      icon:assets.IconRadio,
                      text:"Menjangkau seluruh area di indonesia",
                      small_text:null
                    },
                    {
                      icon:assets.IconBarChart,
                      text:"Penerima Nomor Operator Telkomsel",
                      small_text:null
                    }
                  ],
                  "simulasi_visual":[
                    {
                      title:"1st step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                    {
                      title:"2nd step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                    {
                      title:"3rd step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                    {
                      title:"4th step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                  ],
                  "syarat_membuat_iklan" :[
                    {
                      text:"Memastikan pengiklan memiliki balance yang ditop up",
                      small_text:null,
                    },
                    {
                      text:"Sudah memiliki Sender Name (Nama pengirim SMS) dengan syarat",
                      small_text:[
                        {
                          point:"a",
                          text:"Maximum 11 karakter"
                        },
                        {
                          point:"b",
                          text:"Tidak Menggunakan spasi"
                        },
                        {
                          point:"c",
                          text:"Tidak Mengandung karakter selain huruf dan angka"
                        },
                        {
                          point:"d",
                          text:"Menggunakan huruf kapital"
                        },
                      ],
                    },
                    {
                      text:"satu pesan maximum 160 karakter, jika lebih akan dihitung lebih dari 1 pesan per sekali kirim",
                      small_text:null
                    }
                  ],
                  "cara_membuat_iklan" :"<ul><li>Pastikan sudah terdaftar di Mediacartz</li><li>Login ke MediaCartz</li><li>Melakukan topup sesuai kebutuhan</li><li>Pastikan data KTP sudah diupload sesuai dengan data pengiklan sehingga approval iklan tidak terkendala</li><li>Pilih iklan Messaging</li><li>Tentukan invenotry type Targeted dan Channel SMS</li><li>Pastikan Nama Perusahaan atau Bisnis sudah sesuai untuk campaign yang akan di create lalu lanjut</li><li>Isi Form iklan <br /> a. Nama Iklan <br /> b. Pilih Nama pengirim/Sender yang sudah ada (jika belum ada pilih tombol + untuk menambahkan nama pengirim baru, lalu pilih nama pengirim tersebut) </li></ul>",
                  "harga" :500,
                  "satuan": "pesan",
                  "testimoni":[]
                }
              },
              {
                "title":"USSD",
                "content":{
                  "title":"Targeted USSD",
                  "deskripsi" :"Cara beriklan praktis dengan mengirimkan pesan text  (USSD) ke pelanggan selular di seluruh Indonesia dengan profile target sesuai kebutuhan pengiklan",
                  "manfaat_dan_kelebihan" :[
                    {
                      icon:assets.IconTarget,
                      text:"Bermacam-macam profil target",
                      small_text:"(Gender,Usia,Agama,Lokasi Kota,Kecamatan, Kelurahan, Jenis HP)"
                    },
                    {
                      icon:assets.IconRadio,
                      text:"Menjangkau seluruh area di indonesia",
                      small_text:null
                    },
                    {
                      icon:assets.IconBarChart,
                      text:"Penerima Nomor Operator Telkomsel",
                      small_text:null
                    }
                  ],
                  "simulasi_visual":[
                    {
                      title:"1st step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                    {
                      title:"2nd step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                    {
                      title:"3rd step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                    {
                      title:"4th step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                  ],
                  "syarat_membuat_iklan" :[
                    {
                      text:"Memastikan pengiklan memiliki balance yang ditop up",
                      small_text:null,
                    },
                    {
                      text:"Sudah memiliki Sender Name (Nama pengirim SMS) dengan syarat",
                      small_text:[
                        {
                          point:"a",
                          text:"Maximum 11 karakter"
                        },
                        {
                          point:"b",
                          text:"Tidak Menggunakan spasi"
                        },
                        {
                          point:"c",
                          text:"Tidak Mengandung karakter selain huruf dan angka"
                        },
                        {
                          point:"d",
                          text:"Menggunakan huruf kapital"
                        },
                      ],
                    },
                    {
                      text:"satu pesan maximum 160 karakter, jika lebih akan dihitung lebih dari 1 pesan per sekali kirim",
                      small_text:null
                    }
                  ],
                  "cara_membuat_iklan" :"<ul><li>Pastikan sudah terdaftar di Mediacartz</li><li>Login ke MediaCartz</li><li>Melakukan topup sesuai kebutuhan</li><li>Pastikan data KTP sudah diupload sesuai dengan data pengiklan sehingga approval iklan tidak terkendala</li><li>Pilih iklan Messaging</li><li>Tentukan invenotry type Targeted dan Channel SMS</li><li>Pastikan Nama Perusahaan atau Bisnis sudah sesuai untuk campaign yang akan di create lalu lanjut</li><li>Isi Form iklan <br /> a. Nama Iklan <br /> b. Pilih Nama pengirim/Sender yang sudah ada (jika belum ada pilih tombol + untuk menambahkan nama pengirim baru, lalu pilih nama pengirim tersebut) </li></ul>",
                  "harga" :500,
                  "satuan": "pesan",
                  "testimoni":[]
                }
              }
            ]
          },
          {
            "title":"LBA",
            "section_channel_inventory":[
              {
                "title":"SMS",
                "content":{
                  "title":"LBA SMS",
                  "deskripsi" :"Cara beriklan praktis dengan mengirimkan pesan text  (SMS) ke pelanggan selular di seluruh Indonesia dengan profile target sesuai kebutuhan pengiklan",
                  "manfaat_dan_kelebihan" :[
                    {
                      icon:assets.IconTarget,
                      text:"Bermacam-macam profil target",
                      small_text:"(Gender,Usia,Agama,Lokasi Kota,Kecamatan, Kelurahan, Jenis HP)"
                    },
                    {
                      icon:assets.IconRadio,
                      text:"Menjangkau seluruh area di indonesia",
                      small_text:null
                    },
                    {
                      icon:assets.IconBarChart,
                      text:"Penerima Nomor Operator Telkomsel",
                      small_text:null
                    }
                  ],
                  "simulasi_visual":[
                    {
                      title:"1st step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                    {
                      title:"2nd step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                    {
                      title:"3rd step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                    {
                      title:"4th step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                  ],
                  "syarat_membuat_iklan" :[
                    {
                      text:"Memastikan pengiklan memiliki balance yang ditop up",
                      small_text:null,
                    },
                    {
                      text:"Sudah memiliki Sender Name (Nama pengirim SMS) dengan syarat",
                      small_text:[
                        {
                          point:"a",
                          text:"Maximum 11 karakter"
                        },
                        {
                          point:"b",
                          text:"Tidak Menggunakan spasi"
                        },
                        {
                          point:"c",
                          text:"Tidak Mengandung karakter selain huruf dan angka"
                        },
                        {
                          point:"d",
                          text:"Menggunakan huruf kapital"
                        },
                      ],
                    },
                    {
                      text:"satu pesan maximum 160 karakter, jika lebih akan dihitung lebih dari 1 pesan per sekali kirim",
                      small_text:null
                    }
                  ],
                  "cara_membuat_iklan" :"<ul><li>Pastikan sudah terdaftar di Mediacartz</li><li>Login ke MediaCartz</li><li>Melakukan topup sesuai kebutuhan</li><li>Pastikan data KTP sudah diupload sesuai dengan data pengiklan sehingga approval iklan tidak terkendala</li><li>Pilih iklan Messaging</li><li>Tentukan invenotry type Targeted dan Channel SMS</li><li>Pastikan Nama Perusahaan atau Bisnis sudah sesuai untuk campaign yang akan di create lalu lanjut</li><li>Isi Form iklan <br /> a. Nama Iklan <br /> b. Pilih Nama pengirim/Sender yang sudah ada (jika belum ada pilih tombol + untuk menambahkan nama pengirim baru, lalu pilih nama pengirim tersebut) </li></ul>",
                  "harga" :500,
                  "satuan": "pesan",
                  "testimoni":[]
                }
              }
            ]
          },
          {
            "title":"Broadcast",
            "section_channel_inventory":[
              {
                "title":"SMS",
                "content":{
                  "title":"LBA SMS",
                  "deskripsi" :"Cara beriklan praktis dengan mengirimkan pesan text  (SMS) ke pelanggan selular di seluruh Indonesia dengan profile target sesuai kebutuhan pengiklan",
                  "manfaat_dan_kelebihan" :[
                    {
                      icon:assets.IconTarget,
                      text:"Bermacam-macam profil target",
                      small_text:"(Gender,Usia,Agama,Lokasi Kota,Kecamatan, Kelurahan, Jenis HP)"
                    },
                    {
                      icon:assets.IconRadio,
                      text:"Menjangkau seluruh area di indonesia",
                      small_text:null
                    },
                    {
                      icon:assets.IconBarChart,
                      text:"Penerima Nomor Operator Telkomsel",
                      small_text:null
                    }
                  ],
                  "simulasi_visual":[
                    {
                      title:"1st step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                    {
                      title:"2nd step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                    {
                      title:"3rd step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                    {
                      title:"4th step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                  ],
                  "syarat_membuat_iklan" :[
                    {
                      text:"Memastikan pengiklan memiliki balance yang ditop up",
                      small_text:null,
                    },
                    {
                      text:"Sudah memiliki Sender Name (Nama pengirim SMS) dengan syarat",
                      small_text:[
                        {
                          point:"a",
                          text:"Maximum 11 karakter"
                        },
                        {
                          point:"b",
                          text:"Tidak Menggunakan spasi"
                        },
                        {
                          point:"c",
                          text:"Tidak Mengandung karakter selain huruf dan angka"
                        },
                        {
                          point:"d",
                          text:"Menggunakan huruf kapital"
                        },
                      ],
                    },
                    {
                      text:"satu pesan maximum 160 karakter, jika lebih akan dihitung lebih dari 1 pesan per sekali kirim",
                      small_text:null
                    }
                  ],
                  "cara_membuat_iklan" :"<ul><li>Pastikan sudah terdaftar di Mediacartz</li><li>Login ke MediaCartz</li><li>Melakukan topup sesuai kebutuhan</li><li>Pastikan data KTP sudah diupload sesuai dengan data pengiklan sehingga approval iklan tidak terkendala</li><li>Pilih iklan Messaging</li><li>Tentukan invenotry type Targeted dan Channel SMS</li><li>Pastikan Nama Perusahaan atau Bisnis sudah sesuai untuk campaign yang akan di create lalu lanjut</li><li>Isi Form iklan <br /> a. Nama Iklan <br /> b. Pilih Nama pengirim/Sender yang sudah ada (jika belum ada pilih tombol + untuk menambahkan nama pengirim baru, lalu pilih nama pengirim tersebut) </li></ul>",
                  "harga" :500,
                  "satuan": "pesan",
                  "testimoni":[]
                }
              },
              {
                "title":"Email Marketing",
                "content":{
                  "title":"Email Marketing",
                  "deskripsi" :"Cara beriklan praktis dengan mengirimkan pesan text  (EMAIL) ke pelanggan selular di seluruh Indonesia dengan profile target sesuai kebutuhan pengiklan",
                  "manfaat_dan_kelebihan" :[
                    {
                      icon:assets.IconTarget,
                      text:"Bermacam-macam profil target",
                      small_text:"(Gender,Usia,Agama,Lokasi Kota,Kecamatan, Kelurahan, Jenis HP)"
                    },
                    {
                      icon:assets.IconRadio,
                      text:"Menjangkau seluruh area di indonesia",
                      small_text:null
                    },
                    {
                      icon:assets.IconBarChart,
                      text:"Penerima Nomor Operator Telkomsel",
                      small_text:null
                    }
                  ],
                  "simulasi_visual":[
                    {
                      title:"1st step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                    {
                      title:"2nd step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                    {
                      title:"3rd step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                    {
                      title:"4th step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                  ],
                  "syarat_membuat_iklan" :[
                    {
                      text:"Memastikan pengiklan memiliki balance yang ditop up",
                      small_text:null,
                    },
                    {
                      text:"Sudah memiliki Sender Name (Nama pengirim SMS) dengan syarat",
                      small_text:[
                        {
                          point:"a",
                          text:"Maximum 11 karakter"
                        },
                        {
                          point:"b",
                          text:"Tidak Menggunakan spasi"
                        },
                        {
                          point:"c",
                          text:"Tidak Mengandung karakter selain huruf dan angka"
                        },
                        {
                          point:"d",
                          text:"Menggunakan huruf kapital"
                        },
                      ],
                    },
                    {
                      text:"satu pesan maximum 160 karakter, jika lebih akan dihitung lebih dari 1 pesan per sekali kirim",
                      small_text:null
                    }
                  ],
                  "cara_membuat_iklan" :"<ul><li>Pastikan sudah terdaftar di Mediacartz</li><li>Login ke MediaCartz</li><li>Melakukan topup sesuai kebutuhan</li><li>Pastikan data KTP sudah diupload sesuai dengan data pengiklan sehingga approval iklan tidak terkendala</li><li>Pilih iklan Messaging</li><li>Tentukan invenotry type Targeted dan Channel SMS</li><li>Pastikan Nama Perusahaan atau Bisnis sudah sesuai untuk campaign yang akan di create lalu lanjut</li><li>Isi Form iklan <br /> a. Nama Iklan <br /> b. Pilih Nama pengirim/Sender yang sudah ada (jika belum ada pilih tombol + untuk menambahkan nama pengirim baru, lalu pilih nama pengirim tersebut) </li></ul>",
                  "harga" :500,
                  "satuan": "pesan",
                  "testimoni":[]
                }
              },
              {
                "title":"Whatsapp",
                "content":{
                  "title":"Whatsapp",
                  "deskripsi" :"Cara beriklan praktis dengan mengirimkan pesan text  (EMAIL) ke pelanggan selular di seluruh Indonesia dengan profile target sesuai kebutuhan pengiklan",
                  "manfaat_dan_kelebihan" :[
                    {
                      icon:assets.IconTarget,
                      text:"Bermacam-macam profil target",
                      small_text:"(Gender,Usia,Agama,Lokasi Kota,Kecamatan, Kelurahan, Jenis HP)"
                    },
                    {
                      icon:assets.IconRadio,
                      text:"Menjangkau seluruh area di indonesia",
                      small_text:null
                    },
                    {
                      icon:assets.IconBarChart,
                      text:"Penerima Nomor Operator Telkomsel",
                      small_text:null
                    }
                  ],
                  "simulasi_visual":[
                    {
                      title:"1st step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                    {
                      title:"2nd step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                    {
                      title:"3rd step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                    {
                      title:"4th step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                  ],
                  "syarat_membuat_iklan" :[
                    {
                      text:"Memastikan pengiklan memiliki balance yang ditop up",
                      small_text:null,
                    },
                    {
                      text:"Sudah memiliki Sender Name (Nama pengirim SMS) dengan syarat",
                      small_text:[
                        {
                          point:"a",
                          text:"Maximum 11 karakter"
                        },
                        {
                          point:"b",
                          text:"Tidak Menggunakan spasi"
                        },
                        {
                          point:"c",
                          text:"Tidak Mengandung karakter selain huruf dan angka"
                        },
                        {
                          point:"d",
                          text:"Menggunakan huruf kapital"
                        },
                      ],
                    },
                    {
                      text:"satu pesan maximum 160 karakter, jika lebih akan dihitung lebih dari 1 pesan per sekali kirim",
                      small_text:null
                    }
                  ],
                  "cara_membuat_iklan" :"<ul><li>Pastikan sudah terdaftar di Mediacartz</li><li>Login ke MediaCartz</li><li>Melakukan topup sesuai kebutuhan</li><li>Pastikan data KTP sudah diupload sesuai dengan data pengiklan sehingga approval iklan tidak terkendala</li><li>Pilih iklan Messaging</li><li>Tentukan invenotry type Targeted dan Channel SMS</li><li>Pastikan Nama Perusahaan atau Bisnis sudah sesuai untuk campaign yang akan di create lalu lanjut</li><li>Isi Form iklan <br /> a. Nama Iklan <br /> b. Pilih Nama pengirim/Sender yang sudah ada (jika belum ada pilih tombol + untuk menambahkan nama pengirim baru, lalu pilih nama pengirim tersebut) </li></ul>",
                  "harga" :500,
                  "satuan": "pesan",
                  "testimoni":[]
                }
              },
            ]
          },
          {
            "title":"API",
            "section_channel_inventory":[
              {
                "title":"SMS BC",
                "content":{
                  "title":"SMS BC",
                  "deskripsi" :"Cara beriklan praktis dengan mengirimkan pesan text  (SMS) ke pelanggan selular di seluruh Indonesia dengan profile target sesuai kebutuhan pengiklan",
                  "manfaat_dan_kelebihan" :[
                    {
                      icon:assets.IconTarget,
                      text:"Bermacam-macam profil target",
                      small_text:"(Gender,Usia,Agama,Lokasi Kota,Kecamatan, Kelurahan, Jenis HP)"
                    },
                    {
                      icon:assets.IconRadio,
                      text:"Menjangkau seluruh area di indonesia",
                      small_text:null
                    },
                    {
                      icon:assets.IconBarChart,
                      text:"Penerima Nomor Operator Telkomsel",
                      small_text:null
                    }
                  ],
                  "simulasi_visual":[
                    {
                      title:"1st step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                    {
                      title:"2nd step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                    {
                      title:"3rd step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                    {
                      title:"4th step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                  ],
                  "syarat_membuat_iklan" :[
                    {
                      text:"Memastikan pengiklan memiliki balance yang ditop up",
                      small_text:null,
                    },
                    {
                      text:"Sudah memiliki Sender Name (Nama pengirim SMS) dengan syarat",
                      small_text:[
                        {
                          point:"a",
                          text:"Maximum 11 karakter"
                        },
                        {
                          point:"b",
                          text:"Tidak Menggunakan spasi"
                        },
                        {
                          point:"c",
                          text:"Tidak Mengandung karakter selain huruf dan angka"
                        },
                        {
                          point:"d",
                          text:"Menggunakan huruf kapital"
                        },
                      ],
                    },
                    {
                      text:"satu pesan maximum 160 karakter, jika lebih akan dihitung lebih dari 1 pesan per sekali kirim",
                      small_text:null
                    }
                  ],
                  "cara_membuat_iklan" :"<ul><li>Pastikan sudah terdaftar di Mediacartz</li><li>Login ke MediaCartz</li><li>Melakukan topup sesuai kebutuhan</li><li>Pastikan data KTP sudah diupload sesuai dengan data pengiklan sehingga approval iklan tidak terkendala</li><li>Pilih iklan Messaging</li><li>Tentukan invenotry type Targeted dan Channel SMS</li><li>Pastikan Nama Perusahaan atau Bisnis sudah sesuai untuk campaign yang akan di create lalu lanjut</li><li>Isi Form iklan <br /> a. Nama Iklan <br /> b. Pilih Nama pengirim/Sender yang sudah ada (jika belum ada pilih tombol + untuk menambahkan nama pengirim baru, lalu pilih nama pengirim tersebut) </li></ul>",
                  "harga" :500,
                  "satuan": "pesan",
                  "testimoni":[]
                }
              },
              {
                "title":"Whatsapp",
                "content":{
                  "title":"Whatsapp",
                  "deskripsi" :"Cara beriklan praktis dengan mengirimkan pesan text  (EMAIL) ke pelanggan selular di seluruh Indonesia dengan profile target sesuai kebutuhan pengiklan",
                  "manfaat_dan_kelebihan" :[
                    {
                      icon:assets.IconTarget,
                      text:"Bermacam-macam profil target",
                      small_text:"(Gender,Usia,Agama,Lokasi Kota,Kecamatan, Kelurahan, Jenis HP)"
                    },
                    {
                      icon:assets.IconRadio,
                      text:"Menjangkau seluruh area di indonesia",
                      small_text:null
                    },
                    {
                      icon:assets.IconBarChart,
                      text:"Penerima Nomor Operator Telkomsel",
                      small_text:null
                    }
                  ],
                  "simulasi_visual":[
                    {
                      title:"1st step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                    {
                      title:"2nd step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                    {
                      title:"3rd step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                    {
                      title:"4th step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                  ],
                  "syarat_membuat_iklan" :[
                    {
                      text:"Memastikan pengiklan memiliki balance yang ditop up",
                      small_text:null,
                    },
                    {
                      text:"Sudah memiliki Sender Name (Nama pengirim SMS) dengan syarat",
                      small_text:[
                        {
                          point:"a",
                          text:"Maximum 11 karakter"
                        },
                        {
                          point:"b",
                          text:"Tidak Menggunakan spasi"
                        },
                        {
                          point:"c",
                          text:"Tidak Mengandung karakter selain huruf dan angka"
                        },
                        {
                          point:"d",
                          text:"Menggunakan huruf kapital"
                        },
                      ],
                    },
                    {
                      text:"satu pesan maximum 160 karakter, jika lebih akan dihitung lebih dari 1 pesan per sekali kirim",
                      small_text:null
                    }
                  ],
                  "cara_membuat_iklan" :"<ul><li>Pastikan sudah terdaftar di Mediacartz</li><li>Login ke MediaCartz</li><li>Melakukan topup sesuai kebutuhan</li><li>Pastikan data KTP sudah diupload sesuai dengan data pengiklan sehingga approval iklan tidak terkendala</li><li>Pilih iklan Messaging</li><li>Tentukan invenotry type Targeted dan Channel SMS</li><li>Pastikan Nama Perusahaan atau Bisnis sudah sesuai untuk campaign yang akan di create lalu lanjut</li><li>Isi Form iklan <br /> a. Nama Iklan <br /> b. Pilih Nama pengirim/Sender yang sudah ada (jika belum ada pilih tombol + untuk menambahkan nama pengirim baru, lalu pilih nama pengirim tersebut) </li></ul>",
                  "harga" :500,
                  "satuan": "pesan",
                  "testimoni":[]
                }
              },
            ]
          },
        ]
      },
      {
        "title":"Digital Signage",
        "section_sub_category": [
          {
            "title":"Fix Signage",
            "section_channel_inventory" :[
              { 
                "title":"DOOH",
                "content":{
                  "title":"DOOH",
                  "deskripsi" :"Cara beriklan praktis dengan mengirimkan pesan text  (SMS) ke pelanggan selular di seluruh Indonesia dengan profile target sesuai kebutuhan pengiklan",
                  "manfaat_dan_kelebihan" :[
                    {
                      icon:assets.IconTarget,
                      text:"Bermacam-macam profil target",
                      small_text:"(Gender,Usia,Agama,Lokasi Kota,Kecamatan, Kelurahan, Jenis HP)"
                    },
                    {
                      icon:assets.IconRadio,
                      text:"Menjangkau seluruh area di indonesia",
                      small_text:null
                    },
                    {
                      icon:assets.IconBarChart,
                      text:"Penerima Nomor Operator Telkomsel",
                      small_text:null
                    }
                  ],
                  "simulasi_visual":[
                    {
                      title:"1st step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                    {
                      title:"2nd step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                    {
                      title:"3rd step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                    {
                      title:"4th step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                  ],
                  "syarat_membuat_iklan" :[
                    {
                      text:"Memastikan pengiklan memiliki balance yang ditop up",
                      small_text:null,
                    },
                    {
                      text:"Sudah memiliki Sender Name (Nama pengirim SMS) dengan syarat",
                      small_text:[
                        {
                          point:"a",
                          text:"Maximum 11 karakter"
                        },
                        {
                          point:"b",
                          text:"Tidak Menggunakan spasi"
                        },
                        {
                          point:"c",
                          text:"Tidak Mengandung karakter selain huruf dan angka"
                        },
                        {
                          point:"d",
                          text:"Menggunakan huruf kapital"
                        },
                      ],
                    },
                    {
                      text:"satu pesan maximum 160 karakter, jika lebih akan dihitung lebih dari 1 pesan per sekali kirim",
                      small_text:null
                    }
                  ],
                  "cara_membuat_iklan" :"<ul><li>Pastikan sudah terdaftar di Mediacartz</li><li>Login ke MediaCartz</li><li>Melakukan topup sesuai kebutuhan</li><li>Pastikan data KTP sudah diupload sesuai dengan data pengiklan sehingga approval iklan tidak terkendala</li><li>Pilih iklan Messaging</li><li>Tentukan invenotry type Targeted dan Channel SMS</li><li>Pastikan Nama Perusahaan atau Bisnis sudah sesuai untuk campaign yang akan di create lalu lanjut</li><li>Isi Form iklan <br /> a. Nama Iklan <br /> b. Pilih Nama pengirim/Sender yang sudah ada (jika belum ada pilih tombol + untuk menambahkan nama pengirim baru, lalu pilih nama pengirim tersebut) </li></ul>",
                  "harga" :500,
                  "satuan": "pesan",
                  "testimoni":[]
                }
              },
              {
                "title":"Videotron",
                "content":{
                  "title":"Videotron",
                  "deskripsi" :"Cara beriklan praktis dengan mengirimkan pesan text  (USSD) ke pelanggan selular di seluruh Indonesia dengan profile target sesuai kebutuhan pengiklan",
                  "manfaat_dan_kelebihan" :[
                    {
                      icon:assets.IconTarget,
                      text:"Bermacam-macam profil target",
                      small_text:"(Gender,Usia,Agama,Lokasi Kota,Kecamatan, Kelurahan, Jenis HP)"
                    },
                    {
                      icon:assets.IconRadio,
                      text:"Menjangkau seluruh area di indonesia",
                      small_text:null
                    },
                    {
                      icon:assets.IconBarChart,
                      text:"Penerima Nomor Operator Telkomsel",
                      small_text:null
                    }
                  ],
                  "simulasi_visual":[
                    {
                      title:"1st step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                    {
                      title:"2nd step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                    {
                      title:"3rd step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                    {
                      title:"4th step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                  ],
                  "syarat_membuat_iklan" :[
                    {
                      text:"Memastikan pengiklan memiliki balance yang ditop up",
                      small_text:null,
                    },
                    {
                      text:"Sudah memiliki Sender Name (Nama pengirim SMS) dengan syarat",
                      small_text:[
                        {
                          point:"a",
                          text:"Maximum 11 karakter"
                        },
                        {
                          point:"b",
                          text:"Tidak Menggunakan spasi"
                        },
                        {
                          point:"c",
                          text:"Tidak Mengandung karakter selain huruf dan angka"
                        },
                        {
                          point:"d",
                          text:"Menggunakan huruf kapital"
                        },
                      ],
                    },
                    {
                      text:"satu pesan maximum 160 karakter, jika lebih akan dihitung lebih dari 1 pesan per sekali kirim",
                      small_text:null
                    }
                  ],
                  "cara_membuat_iklan" :"<ul><li>Pastikan sudah terdaftar di Mediacartz</li><li>Login ke MediaCartz</li><li>Melakukan topup sesuai kebutuhan</li><li>Pastikan data KTP sudah diupload sesuai dengan data pengiklan sehingga approval iklan tidak terkendala</li><li>Pilih iklan Messaging</li><li>Tentukan invenotry type Targeted dan Channel SMS</li><li>Pastikan Nama Perusahaan atau Bisnis sudah sesuai untuk campaign yang akan di create lalu lanjut</li><li>Isi Form iklan <br /> a. Nama Iklan <br /> b. Pilih Nama pengirim/Sender yang sudah ada (jika belum ada pilih tombol + untuk menambahkan nama pengirim baru, lalu pilih nama pengirim tersebut) </li></ul>",
                  "harga" :500,
                  "satuan": "pesan",
                  "testimoni":[]
                }
              }
            ]
          },
          {
            "title":"Mobile Signage",
            "section_channel_inventory" :[
              { 
                "title":"Train",
                "content":{
                  "title":"Train",
                  "deskripsi" :"Cara beriklan praktis dengan mengirimkan pesan text  (SMS) ke pelanggan selular di seluruh Indonesia dengan profile target sesuai kebutuhan pengiklan",
                  "manfaat_dan_kelebihan" :[
                    {
                      icon:assets.IconTarget,
                      text:"Bermacam-macam profil target",
                      small_text:"(Gender,Usia,Agama,Lokasi Kota,Kecamatan, Kelurahan, Jenis HP)"
                    },
                    {
                      icon:assets.IconRadio,
                      text:"Menjangkau seluruh area di indonesia",
                      small_text:null
                    },
                    {
                      icon:assets.IconBarChart,
                      text:"Penerima Nomor Operator Telkomsel",
                      small_text:null
                    }
                  ],
                  "simulasi_visual":[
                    {
                      title:"1st step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                    {
                      title:"2nd step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                    {
                      title:"3rd step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                    {
                      title:"4th step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                  ],
                  "syarat_membuat_iklan" :[
                    {
                      text:"Memastikan pengiklan memiliki balance yang ditop up",
                      small_text:null,
                    },
                    {
                      text:"Sudah memiliki Sender Name (Nama pengirim SMS) dengan syarat",
                      small_text:[
                        {
                          point:"a",
                          text:"Maximum 11 karakter"
                        },
                        {
                          point:"b",
                          text:"Tidak Menggunakan spasi"
                        },
                        {
                          point:"c",
                          text:"Tidak Mengandung karakter selain huruf dan angka"
                        },
                        {
                          point:"d",
                          text:"Menggunakan huruf kapital"
                        },
                      ],
                    },
                    {
                      text:"satu pesan maximum 160 karakter, jika lebih akan dihitung lebih dari 1 pesan per sekali kirim",
                      small_text:null
                    }
                  ],
                  "cara_membuat_iklan" :"<ul><li>Pastikan sudah terdaftar di Mediacartz</li><li>Login ke MediaCartz</li><li>Melakukan topup sesuai kebutuhan</li><li>Pastikan data KTP sudah diupload sesuai dengan data pengiklan sehingga approval iklan tidak terkendala</li><li>Pilih iklan Messaging</li><li>Tentukan invenotry type Targeted dan Channel SMS</li><li>Pastikan Nama Perusahaan atau Bisnis sudah sesuai untuk campaign yang akan di create lalu lanjut</li><li>Isi Form iklan <br /> a. Nama Iklan <br /> b. Pilih Nama pengirim/Sender yang sudah ada (jika belum ada pilih tombol + untuk menambahkan nama pengirim baru, lalu pilih nama pengirim tersebut) </li></ul>",
                  "harga" :500,
                  "satuan": "pesan",
                  "testimoni":[]
                }
              },
            ]
          },
        ]
      },
      {
        "title":"TV & Radio",
        "section_sub_category": [
          {
            "title":"TV SPOT ",
            "section_channel_inventory" :[
              { 
                "title":"MIC",
                "content":{
                  "title":"MIC",
                  "deskripsi" :"Cara beriklan praktis dengan mengirimkan pesan text  (SMS) ke pelanggan selular di seluruh Indonesia dengan profile target sesuai kebutuhan pengiklan",
                  "manfaat_dan_kelebihan" :[
                    {
                      icon:assets.IconTarget,
                      text:"Bermacam-macam profil target",
                      small_text:"(Gender,Usia,Agama,Lokasi Kota,Kecamatan, Kelurahan, Jenis HP)"
                    },
                    {
                      icon:assets.IconRadio,
                      text:"Menjangkau seluruh area di indonesia",
                      small_text:null
                    },
                    {
                      icon:assets.IconBarChart,
                      text:"Penerima Nomor Operator Telkomsel",
                      small_text:null
                    }
                  ],
                  "simulasi_visual":[
                    {
                      title:"1st step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                    {
                      title:"2nd step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                    {
                      title:"3rd step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                    {
                      title:"4th step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                  ],
                  "syarat_membuat_iklan" :[
                    {
                      text:"Memastikan pengiklan memiliki balance yang ditop up",
                      small_text:null,
                    },
                    {
                      text:"Sudah memiliki Sender Name (Nama pengirim SMS) dengan syarat",
                      small_text:[
                        {
                          point:"a",
                          text:"Maximum 11 karakter"
                        },
                        {
                          point:"b",
                          text:"Tidak Menggunakan spasi"
                        },
                        {
                          point:"c",
                          text:"Tidak Mengandung karakter selain huruf dan angka"
                        },
                        {
                          point:"d",
                          text:"Menggunakan huruf kapital"
                        },
                      ],
                    },
                    {
                      text:"satu pesan maximum 160 karakter, jika lebih akan dihitung lebih dari 1 pesan per sekali kirim",
                      small_text:null
                    }
                  ],
                  "cara_membuat_iklan" :"<ul><li>Pastikan sudah terdaftar di Mediacartz</li><li>Login ke MediaCartz</li><li>Melakukan topup sesuai kebutuhan</li><li>Pastikan data KTP sudah diupload sesuai dengan data pengiklan sehingga approval iklan tidak terkendala</li><li>Pilih iklan Messaging</li><li>Tentukan invenotry type Targeted dan Channel SMS</li><li>Pastikan Nama Perusahaan atau Bisnis sudah sesuai untuk campaign yang akan di create lalu lanjut</li><li>Isi Form iklan <br /> a. Nama Iklan <br /> b. Pilih Nama pengirim/Sender yang sudah ada (jika belum ada pilih tombol + untuk menambahkan nama pengirim baru, lalu pilih nama pengirim tersebut) </li></ul>",
                  "harga" :500,
                  "satuan": "pesan",
                  "testimoni":[]
                }
              },
            ]
          },
          {
            "title":"RADIO SPOT ",
            "section_channel_inventory" :[
              { 
                "title":"Teens",
                "content":{
                  "title":"Teens",
                  "deskripsi" :"Cara beriklan praktis dengan mengirimkan pesan text  (SMS) ke pelanggan selular di seluruh Indonesia dengan profile target sesuai kebutuhan pengiklan",
                  "manfaat_dan_kelebihan" :[
                    {
                      icon:assets.IconTarget,
                      text:"Bermacam-macam profil target",
                      small_text:"(Gender,Usia,Agama,Lokasi Kota,Kecamatan, Kelurahan, Jenis HP)"
                    },
                    {
                      icon:assets.IconRadio,
                      text:"Menjangkau seluruh area di indonesia",
                      small_text:null
                    },
                    {
                      icon:assets.IconBarChart,
                      text:"Penerima Nomor Operator Telkomsel",
                      small_text:null
                    }
                  ],
                  "simulasi_visual":[
                    {
                      title:"1st step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                    {
                      title:"2nd step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                    {
                      title:"3rd step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                    {
                      title:"4th step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                  ],
                  "syarat_membuat_iklan" :[
                    {
                      text:"Memastikan pengiklan memiliki balance yang ditop up",
                      small_text:null,
                    },
                    {
                      text:"Sudah memiliki Sender Name (Nama pengirim SMS) dengan syarat",
                      small_text:[
                        {
                          point:"a",
                          text:"Maximum 11 karakter"
                        },
                        {
                          point:"b",
                          text:"Tidak Menggunakan spasi"
                        },
                        {
                          point:"c",
                          text:"Tidak Mengandung karakter selain huruf dan angka"
                        },
                        {
                          point:"d",
                          text:"Menggunakan huruf kapital"
                        },
                      ],
                    },
                    {
                      text:"satu pesan maximum 160 karakter, jika lebih akan dihitung lebih dari 1 pesan per sekali kirim",
                      small_text:null
                    }
                  ],
                  "cara_membuat_iklan" :"<ul><li>Pastikan sudah terdaftar di Mediacartz</li><li>Login ke MediaCartz</li><li>Melakukan topup sesuai kebutuhan</li><li>Pastikan data KTP sudah diupload sesuai dengan data pengiklan sehingga approval iklan tidak terkendala</li><li>Pilih iklan Messaging</li><li>Tentukan invenotry type Targeted dan Channel SMS</li><li>Pastikan Nama Perusahaan atau Bisnis sudah sesuai untuk campaign yang akan di create lalu lanjut</li><li>Isi Form iklan <br /> a. Nama Iklan <br /> b. Pilih Nama pengirim/Sender yang sudah ada (jika belum ada pilih tombol + untuk menambahkan nama pengirim baru, lalu pilih nama pengirim tersebut) </li></ul>",
                  "harga" :500,
                  "satuan": "pesan",
                  "testimoni":[]
                }
              },
              { 
                "title":"Adult",
                "content":{
                  "title":"Adult",
                  "deskripsi" :"Cara beriklan praktis dengan mengirimkan pesan text  (SMS) ke pelanggan selular di seluruh Indonesia dengan profile target sesuai kebutuhan pengiklan",
                  "manfaat_dan_kelebihan" :[
                    {
                      icon:assets.IconTarget,
                      text:"Bermacam-macam profil target",
                      small_text:"(Gender,Usia,Agama,Lokasi Kota,Kecamatan, Kelurahan, Jenis HP)"
                    },
                    {
                      icon:assets.IconRadio,
                      text:"Menjangkau seluruh area di indonesia",
                      small_text:null
                    },
                    {
                      icon:assets.IconBarChart,
                      text:"Penerima Nomor Operator Telkomsel",
                      small_text:null
                    }
                  ],
                  "simulasi_visual":[
                    {
                      title:"1st step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                    {
                      title:"2nd step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                    {
                      title:"3rd step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                    {
                      title:"4th step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                  ],
                  "syarat_membuat_iklan" :[
                    {
                      text:"Memastikan pengiklan memiliki balance yang ditop up",
                      small_text:null,
                    },
                    {
                      text:"Sudah memiliki Sender Name (Nama pengirim SMS) dengan syarat",
                      small_text:[
                        {
                          point:"a",
                          text:"Maximum 11 karakter"
                        },
                        {
                          point:"b",
                          text:"Tidak Menggunakan spasi"
                        },
                        {
                          point:"c",
                          text:"Tidak Mengandung karakter selain huruf dan angka"
                        },
                        {
                          point:"d",
                          text:"Menggunakan huruf kapital"
                        },
                      ],
                    },
                    {
                      text:"satu pesan maximum 160 karakter, jika lebih akan dihitung lebih dari 1 pesan per sekali kirim",
                      small_text:null
                    }
                  ],
                  "cara_membuat_iklan" :"<ul><li>Pastikan sudah terdaftar di Mediacartz</li><li>Login ke MediaCartz</li><li>Melakukan topup sesuai kebutuhan</li><li>Pastikan data KTP sudah diupload sesuai dengan data pengiklan sehingga approval iklan tidak terkendala</li><li>Pilih iklan Messaging</li><li>Tentukan invenotry type Targeted dan Channel SMS</li><li>Pastikan Nama Perusahaan atau Bisnis sudah sesuai untuk campaign yang akan di create lalu lanjut</li><li>Isi Form iklan <br /> a. Nama Iklan <br /> b. Pilih Nama pengirim/Sender yang sudah ada (jika belum ada pilih tombol + untuk menambahkan nama pengirim baru, lalu pilih nama pengirim tersebut) </li></ul>",
                  "harga" :500,
                  "satuan": "pesan",
                  "testimoni":[]
                }
              },
              { 
                "title":"News",
                "content":{
                  "title":"News",
                  "deskripsi" :"Cara beriklan praktis dengan mengirimkan pesan text  (SMS) ke pelanggan selular di seluruh Indonesia dengan profile target sesuai kebutuhan pengiklan",
                  "manfaat_dan_kelebihan" :[
                    {
                      icon:assets.IconTarget,
                      text:"Bermacam-macam profil target",
                      small_text:"(Gender,Usia,Agama,Lokasi Kota,Kecamatan, Kelurahan, Jenis HP)"
                    },
                    {
                      icon:assets.IconRadio,
                      text:"Menjangkau seluruh area di indonesia",
                      small_text:null
                    },
                    {
                      icon:assets.IconBarChart,
                      text:"Penerima Nomor Operator Telkomsel",
                      small_text:null
                    }
                  ],
                  "simulasi_visual":[
                    {
                      title:"1st step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                    {
                      title:"2nd step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                    {
                      title:"3rd step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                    {
                      title:"4th step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                  ],
                  "syarat_membuat_iklan" :[
                    {
                      text:"Memastikan pengiklan memiliki balance yang ditop up",
                      small_text:null,
                    },
                    {
                      text:"Sudah memiliki Sender Name (Nama pengirim SMS) dengan syarat",
                      small_text:[
                        {
                          point:"a",
                          text:"Maximum 11 karakter"
                        },
                        {
                          point:"b",
                          text:"Tidak Menggunakan spasi"
                        },
                        {
                          point:"c",
                          text:"Tidak Mengandung karakter selain huruf dan angka"
                        },
                        {
                          point:"d",
                          text:"Menggunakan huruf kapital"
                        },
                      ],
                    },
                    {
                      text:"satu pesan maximum 160 karakter, jika lebih akan dihitung lebih dari 1 pesan per sekali kirim",
                      small_text:null
                    }
                  ],
                  "cara_membuat_iklan" :"<ul><li>Pastikan sudah terdaftar di Mediacartz</li><li>Login ke MediaCartz</li><li>Melakukan topup sesuai kebutuhan</li><li>Pastikan data KTP sudah diupload sesuai dengan data pengiklan sehingga approval iklan tidak terkendala</li><li>Pilih iklan Messaging</li><li>Tentukan invenotry type Targeted dan Channel SMS</li><li>Pastikan Nama Perusahaan atau Bisnis sudah sesuai untuk campaign yang akan di create lalu lanjut</li><li>Isi Form iklan <br /> a. Nama Iklan <br /> b. Pilih Nama pengirim/Sender yang sudah ada (jika belum ada pilih tombol + untuk menambahkan nama pengirim baru, lalu pilih nama pengirim tersebut) </li></ul>",
                  "harga" :500,
                  "satuan": "pesan",
                  "testimoni":[]
                }
              },
            ]
          },
        ]
      },
      {
        "title":"KOL",
        "section_sub_category": [
          {
            "title":"Influencer",
            "section_channel_inventory" :[
              { 
                "title":"Instagram",
                "content":{
                  "title":"Instagram",
                  "deskripsi" :"Cara beriklan praktis dengan mengirimkan pesan text  (SMS) ke pelanggan selular di seluruh Indonesia dengan profile target sesuai kebutuhan pengiklan",
                  "manfaat_dan_kelebihan" :[
                    {
                      icon:assets.IconTarget,
                      text:"Bermacam-macam profil target",
                      small_text:"(Gender,Usia,Agama,Lokasi Kota,Kecamatan, Kelurahan, Jenis HP)"
                    },
                    {
                      icon:assets.IconRadio,
                      text:"Menjangkau seluruh area di indonesia",
                      small_text:null
                    },
                    {
                      icon:assets.IconBarChart,
                      text:"Penerima Nomor Operator Telkomsel",
                      small_text:null
                    }
                  ],
                  "simulasi_visual":[
                    {
                      title:"1st step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                    {
                      title:"2nd step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                    {
                      title:"3rd step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                    {
                      title:"4th step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                  ],
                  "syarat_membuat_iklan" :[
                    {
                      text:"Memastikan pengiklan memiliki balance yang ditop up",
                      small_text:null,
                    },
                    {
                      text:"Sudah memiliki Sender Name (Nama pengirim SMS) dengan syarat",
                      small_text:[
                        {
                          point:"a",
                          text:"Maximum 11 karakter"
                        },
                        {
                          point:"b",
                          text:"Tidak Menggunakan spasi"
                        },
                        {
                          point:"c",
                          text:"Tidak Mengandung karakter selain huruf dan angka"
                        },
                        {
                          point:"d",
                          text:"Menggunakan huruf kapital"
                        },
                      ],
                    },
                    {
                      text:"satu pesan maximum 160 karakter, jika lebih akan dihitung lebih dari 1 pesan per sekali kirim",
                      small_text:null
                    }
                  ],
                  "cara_membuat_iklan" :"<ul><li>Pastikan sudah terdaftar di Mediacartz</li><li>Login ke MediaCartz</li><li>Melakukan topup sesuai kebutuhan</li><li>Pastikan data KTP sudah diupload sesuai dengan data pengiklan sehingga approval iklan tidak terkendala</li><li>Pilih iklan Messaging</li><li>Tentukan invenotry type Targeted dan Channel SMS</li><li>Pastikan Nama Perusahaan atau Bisnis sudah sesuai untuk campaign yang akan di create lalu lanjut</li><li>Isi Form iklan <br /> a. Nama Iklan <br /> b. Pilih Nama pengirim/Sender yang sudah ada (jika belum ada pilih tombol + untuk menambahkan nama pengirim baru, lalu pilih nama pengirim tersebut) </li></ul>",
                  "harga" :500,
                  "satuan": "pesan",
                  "testimoni":[]
                }
              },
              { 
                "title":"Youtube",
                "content":{
                  "title":"Youtube",
                  "deskripsi" :"Cara beriklan praktis dengan mengirimkan pesan text  (SMS) ke pelanggan selular di seluruh Indonesia dengan profile target sesuai kebutuhan pengiklan",
                  "manfaat_dan_kelebihan" :[
                    {
                      icon:assets.IconTarget,
                      text:"Bermacam-macam profil target",
                      small_text:"(Gender,Usia,Agama,Lokasi Kota,Kecamatan, Kelurahan, Jenis HP)"
                    },
                    {
                      icon:assets.IconRadio,
                      text:"Menjangkau seluruh area di indonesia",
                      small_text:null
                    },
                    {
                      icon:assets.IconBarChart,
                      text:"Penerima Nomor Operator Telkomsel",
                      small_text:null
                    }
                  ],
                  "simulasi_visual":[
                    {
                      title:"1st step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                    {
                      title:"2nd step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                    {
                      title:"3rd step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                    {
                      title:"4th step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                  ],
                  "syarat_membuat_iklan" :[
                    {
                      text:"Memastikan pengiklan memiliki balance yang ditop up",
                      small_text:null,
                    },
                    {
                      text:"Sudah memiliki Sender Name (Nama pengirim SMS) dengan syarat",
                      small_text:[
                        {
                          point:"a",
                          text:"Maximum 11 karakter"
                        },
                        {
                          point:"b",
                          text:"Tidak Menggunakan spasi"
                        },
                        {
                          point:"c",
                          text:"Tidak Mengandung karakter selain huruf dan angka"
                        },
                        {
                          point:"d",
                          text:"Menggunakan huruf kapital"
                        },
                      ],
                    },
                    {
                      text:"satu pesan maximum 160 karakter, jika lebih akan dihitung lebih dari 1 pesan per sekali kirim",
                      small_text:null
                    }
                  ],
                  "cara_membuat_iklan" :"<ul><li>Pastikan sudah terdaftar di Mediacartz</li><li>Login ke MediaCartz</li><li>Melakukan topup sesuai kebutuhan</li><li>Pastikan data KTP sudah diupload sesuai dengan data pengiklan sehingga approval iklan tidak terkendala</li><li>Pilih iklan Messaging</li><li>Tentukan invenotry type Targeted dan Channel SMS</li><li>Pastikan Nama Perusahaan atau Bisnis sudah sesuai untuk campaign yang akan di create lalu lanjut</li><li>Isi Form iklan <br /> a. Nama Iklan <br /> b. Pilih Nama pengirim/Sender yang sudah ada (jika belum ada pilih tombol + untuk menambahkan nama pengirim baru, lalu pilih nama pengirim tersebut) </li></ul>",
                  "harga" :500,
                  "satuan": "pesan",
                  "testimoni":[]
                }
              },
              { 
                "title":"Tiktok",
                "content":{
                  "title":"Tiktok",
                  "deskripsi" :"Cara beriklan praktis dengan mengirimkan pesan text  (SMS) ke pelanggan selular di seluruh Indonesia dengan profile target sesuai kebutuhan pengiklan",
                  "manfaat_dan_kelebihan" :[
                    {
                      icon:assets.IconTarget,
                      text:"Bermacam-macam profil target",
                      small_text:"(Gender,Usia,Agama,Lokasi Kota,Kecamatan, Kelurahan, Jenis HP)"
                    },
                    {
                      icon:assets.IconRadio,
                      text:"Menjangkau seluruh area di indonesia",
                      small_text:null
                    },
                    {
                      icon:assets.IconBarChart,
                      text:"Penerima Nomor Operator Telkomsel",
                      small_text:null
                    }
                  ],
                  "simulasi_visual":[
                    {
                      title:"1st step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                    {
                      title:"2nd step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                    {
                      title:"3rd step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                    {
                      title:"4th step on what to do",
                      content:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est.",
                      image:"https://images.unsplash.com/photo-1558391765-51bfeb4ee61e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    },
                  ],
                  "syarat_membuat_iklan" :[
                    {
                      text:"Memastikan pengiklan memiliki balance yang ditop up",
                      small_text:null,
                    },
                    {
                      text:"Sudah memiliki Sender Name (Nama pengirim SMS) dengan syarat",
                      small_text:[
                        {
                          point:"a",
                          text:"Maximum 11 karakter"
                        },
                        {
                          point:"b",
                          text:"Tidak Menggunakan spasi"
                        },
                        {
                          point:"c",
                          text:"Tidak Mengandung karakter selain huruf dan angka"
                        },
                        {
                          point:"d",
                          text:"Menggunakan huruf kapital"
                        },
                      ],
                    },
                    {
                      text:"satu pesan maximum 160 karakter, jika lebih akan dihitung lebih dari 1 pesan per sekali kirim",
                      small_text:null
                    }
                  ],
                  "cara_membuat_iklan" :"<ul><li>Pastikan sudah terdaftar di Mediacartz</li><li>Login ke MediaCartz</li><li>Melakukan topup sesuai kebutuhan</li><li>Pastikan data KTP sudah diupload sesuai dengan data pengiklan sehingga approval iklan tidak terkendala</li><li>Pilih iklan Messaging</li><li>Tentukan invenotry type Targeted dan Channel SMS</li><li>Pastikan Nama Perusahaan atau Bisnis sudah sesuai untuk campaign yang akan di create lalu lanjut</li><li>Isi Form iklan <br /> a. Nama Iklan <br /> b. Pilih Nama pengirim/Sender yang sudah ada (jika belum ada pilih tombol + untuk menambahkan nama pengirim baru, lalu pilih nama pengirim tersebut) </li></ul>",
                  "harga" :500,
                  "satuan": "pesan",
                  "testimoni":[]
                }
              },
            ]
          },
        ]
      },
    ]
  },
  {
    "title":"Event",
    "icon" : EventIcon,
    "section_category":null
  },
  {
    "title":"Portal",
    "icon" : ProtalIcon,
    "section_category":null
  },
  {
    "title":"CRM",
    "icon" : PieIcon,
    "section_category":null
  },
  {
    "title":"Publisher Ads",
    "icon" : PubAdsIcon,
    "section_category":null
  },
  
]