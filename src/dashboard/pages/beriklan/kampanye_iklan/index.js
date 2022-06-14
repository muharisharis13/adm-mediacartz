import React, { useEffect, useState, useContext } from "react";
import {
  ButtonPrimary,
  COLOR_PRIMARY,
  ContainerContent,
  HeaderPrimary,
  Table,
  Th,
  Thead,
  Tbody,
  Tr,
  Td,
  COLOR_HOVER_DANGER,
} from "../../../../component/style/content/default";
import { MoreCircle } from "@styled-icons/fluentui-system-regular";
import * as Modal from "./modal";
import { DropDown_More } from "../../../../component/dropdown";
import {
  Form,
  Loadingfunc,
  Pagination,
  AlertQuestion,
  AlertSuccess,
  TableData,
} from "../../../../component";
import { api_kampanye_iklan } from "../../../../service/api";
import { Context } from "../../../../service";
import { Numeric, Moment, displayStatus, useTitle } from "../../../../util";
import styled from "styled-components";
import { Modal_create_campaign } from "./modal/modal.create_campaign";
import { Modal_create_campaign_email } from "./modal/modal.create_campaign_email";

const headers = [
  "#ID",
  "Nama Iklan",
  "Produk",
  "Jadwal Iklan",
  "Perusahaan",
  "Total Penerima",
  "Status",
  "More",
];

const Filter_dropdown = (item) => {
  let data_more;

  if (item.campaign_updatable_status === 1) {
    data_more = [{ name: "Lihat Detail" }, { name: "Ubah" }];
  } else if (item.campaign_cloneable_status === 1) {
    data_more = [
      { name: "Lihat Detail" },
      { name: "Clone" },
      { name: "Laporan" },
    ];
  } else {
    data_more = [{ name: "Lihat Detail" }];
  }

  if (
    item.campaign_cloneable_status === 1 &&
    item.campaign_updatable_status === 1
  ) {
    data_more = [
      { name: "Lihat Detail" },
      { name: "Clone" },
      { name: "Laporan" },
      { name: "Ubah" },
    ];
  }

  return data_more;
};
export const IdxKampanye_Iklan = () => {
  useTitle("Beriklan | Iklan");
  const [data, setData] = useState([]);
  const [page, setPage] = useState({
    page: 1,
    last_page: 1,
  });
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({
    create: false,
    detail: false,
    ubah_email_broad: false,
    laporan: false,
  });
  const [campaign_id, setCampaign_id] = useState(null);
  const [send_props, setSend_props] = useState({});
  const { dispatch } = useContext(Context);

  const get_data = async () => {
    setLoading(true);
    await api_kampanye_iklan.get_iklan_list({ page: page.page }).then((res) => {
      console.log({ get_iklan_list: res });
      if (res?.success) {
        setData(res.data);
        setPage({
          page: res.page,
          last_page: res.last_page,
        });
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    get_data();
  }, []);

  const btnPagination = async (e) => {
    setLoading(true);
    await api_kampanye_iklan
      .get_iklan_list({ page: e.selected + 1 })
      .then((res) => {
        console.log({ get_iklan_list: res });
        if (res?.success) {
          setData(res.data);
          setPage({
            page: res.page,
            last_page: res.last_page,
          });
        }
        setLoading(false);
      });
  };

  const BtnMore = ({ name, id, item }) => {
    setCampaign_id(id);

    switch (name) {
      case "Lihat Detail":
        setModal((state) => ({ ...state, detail: true }));
        break;
      case "Clone":
        AlertQuestion({
          text: `Apakah anda ingin menduplikasi campaign?`,
          title: "Clone",
        }).then((result) => {
          const body = {
            campaign_id: id,
          };

          if (result.isConfirmed) {
            api_kampanye_iklan.post_clone(body).then(async (res) => {
              console.log({ res });
              if (res?.success) {
                await AlertSuccess({ title: "SUCCESS", text: res.success });
                await get_data();
              }
            });
          }
        });
        break;
      case "Ubah":
        if (item?.product?.product_name) {
          api_kampanye_iklan.get_detail_campaign(id).then((res) => {
            if (res?.success) {
              dispatch({
                type: "SET_CURRENT_CAMPAIGN",
                current_campaign: res.data,
              });
              setSend_props((state) => ({
                ...state,
                selected_inv: {
                  id: res.data.product.ms_channel.ms_channel_id,
                  name: res.data.product.ms_channel.ms_channel_name,
                },
                selected_channel: {
                  id: res.data.product.ms_inventory.ms_inventory_id,
                  name: res.data.product.product_name,
                },
                selected_company: {
                  value: res.data.company.company_id,
                  label: res.data.company.company_name,
                },
              }));
              setModal((state) => ({ ...state, ubah_email_broad: true }));
            }
          });
        }
        break;
      case "Laporan":
        setModal((state) => ({ ...state, laporan: true }));
        break;

      default:
        break;
    }
  };

  return (
    <ContainerContent>
      <HeaderPrimary color={COLOR_PRIMARY}>Daftar Iklan</HeaderPrimary>

      {/* MODAL=================== */}

      <Modal_create_campaign
        show={modal.create}
        onHide={() => setModal((state) => ({ ...state, create: false }))}
      />

      <Modal.Modal_Detail
        show={modal.detail}
        onHide={() => setModal((state) => ({ ...state, detail: false }))}
        props={{ campaign_id }}
      />

      <Modal.Modal_laporan
        show={modal.laporan}
        onHide={() => setModal((state) => ({ ...state, laporan: false }))}
        data_props={{ campaign_id }}
      />

      <Modal_create_campaign_email
        show={modal.ubah_email_broad}
        onHide={() =>
          setModal((state) => ({ ...state, ubah_email_broad: false }))
        }
        props={send_props}
      />

      {/* MODAL================== */}

      <section>
        <Form>
          <section className="d-flex mb-3">
            <ButtonPrimary
              onClick={() => setModal((state) => ({ ...state, create: true }))}
            >
              Create Iklan
            </ButtonPrimary>
          </section>

          <section>
            <TableData header={headers}>
              {loading ? (
                <Loadingfunc />
              ) : (
                data.map((item, idx) => (
                  <Tr
                    key={idx}
                    // style={{ cursor: "pointer" }}
                    // onClick={() =>
                    //   BtnMore({
                    //     name: "Lihat Detail",
                    //     id: item.campaign_id,
                    //     item,
                    //   })
                    // }
                  >
                    <Td data-label="#ID">{item.campaign_id}</Td>
                    <Td data-label="Nama Iklan">{item.campaign_name}</Td>
                    <Td data-label="Produk">
                      {!!item.product && item.product.product_name}
                    </Td>
                    <Td data-label="Jadwal Iklan">
                      {!!item.campaign_date &&
                        Moment(item.campaign_date.campaign_date_from_datetime)}
                    </Td>
                    <Td data-label="Perusahaan">
                      {!!item.company && item.company.company_name}
                    </Td>
                    <Td data-label="Total Penerima">
                      {item.campaign_total_recipient}
                    </Td>
                    <Td data-label="Status">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: displayStatus(item.campaign_status_name),
                        }}
                      />
                    </Td>
                    <Td data-label="More">
                      <DropDown_More
                        id={item.campaign_id}
                        onClick={({ name, id }) => BtnMore({ name, id, item })}
                        data_more={Filter_dropdown(item)}
                        title={
                          <MoreCircle
                            style={{
                              width: "25px",
                              color: "#ccc",
                              cursor: "pointer",
                            }}
                          />
                        }
                      />
                    </Td>
                  </Tr>
                ))
              )}
            </TableData>
          </section>

          <section>
            <Pagination
              totalPage={page.last_page}
              page={page.page}
              handleOnChange={btnPagination}
            />
          </section>

          {/* SECTION MOBILE VERSION======== */}
        </Form>
      </section>
    </ContainerContent>
  );
};

const TagStatus = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  padding: 2px 0px;
  border-radius: 5px;
  background: ${({ status }) =>
    status === "completed" || status === "approved"
      ? "green"
      : status === "rejected"
      ? COLOR_HOVER_DANGER
      : status === "draft" ||
        status === "pending" ||
        status === "progressing" ||
        status === "verifying"
      ? "gray"
      : null};
`;
