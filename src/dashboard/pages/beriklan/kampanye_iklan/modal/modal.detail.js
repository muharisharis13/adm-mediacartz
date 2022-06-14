import React, { useEffect, useState } from "react";
import { Modal_Component, Loadingfunc } from "../../../../../component";
import {
  COLOR_HOVER_DANGER,
  COLOR_SECONDARY,
} from "../../../../../component/style/content/default";
import PropTypes from "prop-types";
import styled from "styled-components";
import { api_kampanye_iklan } from "../../../../../service/api";
import { FormatCurrency, Moment, displayStatus } from "../../../../../util";
import { Table } from "react-bootstrap";
import { Modal_detail_label_penerima } from "./index";

export const Modal_Detail = (props) => {
  const [data, setData] = useState({});
  const [data_fee, setData_fee] = useState([]);
  const [data_status, setData_status] = useState([]);
  let selected_revised;
  const [modal, setModal] = useState({
    label_penerima: false,
  });
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    if (props.show === true) {
      await api_kampanye_iklan
        .get_campaign_status(props.props?.campaign_id)
        .then((res) => {
          if (res?.success) {
            setData_status(res.data);
            selected_revised = res.data[0]
              ? res.data[0].campaign_status_id
              : "";
          }
        });

      await api_kampanye_iklan
        .get_campaign_id_media(props.props?.campaign_id)
        .then((res) => {});

      await api_kampanye_iklan
        .get_campaign_id_fee(props.props?.campaign_id)
        .then((res) => {
          if (res?.success) {
            setData_fee(res.data);
          }
        });
      setLoading(true);
      await api_kampanye_iklan
        .get_detail_campaign(props.props?.campaign_id)
        .then((res) => {
          console.log({ get_detail_campaign: res });
          if (res?.success) {
            setData(res.data);
          }
          setLoading(false);
        });
    }
  }, [props.show]);

  return (
    <Modal_Component
      show={props.show}
      onHide={props.onHide}
      title={`Detail Iklan ${data.product?.product_name}`}
      btnName="Ajukan Pembatalan"
      btnSubmit
      onClick={() => alert("belum ada function")}
    >
      {/* Modal */}
      {loading ? (
        <Loadingfunc />
      ) : (
        <>
          <Modal_detail_label_penerima
            show={modal.label_penerima}
            onHide={() =>
              setModal((state) => ({ ...state, label_penerima: false }))
            }
          />

          {/* Modal */}
          <Container className="container">
            <div className="wrap-1">
              <div className="list-content d-flex">
                <strong className="title">Nama Iklan</strong>
                <div className="content">{data.campaign_name}</div>
              </div>
              <div className="list-content d-flex">
                <strong className="title">Nama Produk</strong>
                <div className="content">{data.product?.product_name}</div>
              </div>
              <div className="list-content d-flex">
                <strong className="title">Perusahaan</strong>
                <div className="content">{data.company?.company_name}</div>
              </div>
              <div className="list-content d-flex">
                <strong className="title">Jadwal Iklan</strong>
                <div className="content">
                  {data.campaign_date?.map(
                    (item) =>
                      `${Moment(item.campaign_date_from_datetime)} ~ ${Moment(
                        item.campaign_date_until_datetime
                      )} `
                  )}
                </div>
              </div>
              <div className="list-content d-flex">
                <strong className="title">Status Iklan</strong>
                <div className="content">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: displayStatus(data?.campaign_status_name),
                    }}
                  />
                </div>
              </div>
              <div className="list-content d-flex">
                <strong className="title">Dibuat Oleh</strong>
                <div className="content">
                  {data.campaign_created_by && data.campaign_created_by.name},{" "}
                  {Moment(data.campaign_created_datetime)}
                </div>
              </div>
              {data.campaign_message && (
                <>
                  <div className="list-content d-flex">
                    <strong className="title">Sender ID</strong>
                    <div className="content">
                      {data.campaign_message && data.campaign_message.sender
                        ? data.campaign_message.sender.sender_name
                        : "-"}
                    </div>
                  </div>
                  <div className="list-content d-flex">
                    <strong className="title">Label Penerima</strong>
                    <div className="content">
                      {/* TODO: // di sini show modal data parsing: row.data.campaign_message.recipient.recipient_id */}
                      {data.campaign_message &&
                      data.campaign_message.recipient ? (
                        <a href="#">
                          {data.campaign_message?.recipient?.recipient_label}
                        </a>
                      ) : (
                        "-"
                      )}
                    </div>
                  </div>
                  <div className="list-content d-flex">
                    <strong className="title">Total Penerima</strong>
                    <div className="content">
                      {data.campaign_total_recipient
                        ? FormatCurrency.input(data.campaign_total_recipient)
                        : "-"}
                    </div>
                  </div>
                  <div className="list-content d-flex">
                    <strong className="title">Pakai Template</strong>
                    <div className="content">
                      {data.campaign_message &&
                      data.campaign_message.template_id
                        ? "✔"
                        : "-"}
                    </div>
                  </div>
                  <div className="list-content d-flex">
                    <strong className="title">Pakai Variabel Penerima</strong>
                    <div className="content">
                      {data.campaign_message &&
                      data.campaign_message
                        .campaign_message_has_custom_parse_status === 1
                        ? "✔"
                        : "-"}
                    </div>
                  </div>
                  <div className="list-content d-flex">
                    <strong className="title">Pesan</strong>
                    <div className="content">
                      {data.campaign_message &&
                        data.campaign_message.campaign_message_content && (
                          <div
                            dangerouslySetInnerHTML={{
                              __html:
                                data.campaign_message.campaign_message_content,
                            }}
                          />
                        )}
                    </div>
                  </div>
                  <div className="list-content d-flex">
                    <strong className="title">Attachment</strong>
                    <div className="content">
                      {data.campaign_message.campaign_message_media_file
                        ? data.campaign_message.campaign_message_media_file
                        : ""}
                    </div>
                  </div>
                </>
              )}

              {data.campaign_aggregator_transaction_id && (
                <>
                  {data.product?.ms_inventory.ms_inventory_identifier ===
                  "MIC" ? (
                    <>
                      <div className="list-content d-flex">
                        <strong className="title">Status Order</strong>
                        <div className="content">
                          <TagStatus status={data.campaign_status_name}>
                            {data.campaign_status_name}
                          </TagStatus>
                        </div>
                      </div>
                    </>
                  ) : null}
                </>
              )}
            </div>

            <div className="wrap-2 mt-5">
              <h4 className="title">Biaya Iklan</h4>

              <Table style={{ background: "#fff" }}>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Tanggal</th>
                    <th>Bucket Saat Ini</th>
                    <th>Bucket Debit</th>
                    <th>Bucket Credit</th>
                    <th>Saldo Saat ini</th>
                    <th>Balance Debit</th>
                    <th>Balance Credit</th>
                  </tr>
                </thead>
                <tbody>
                  {data_fee.map(
                    (item, idx) =>
                      item.bucket_history_credit > 0 ||
                      item.bucket_history_debit > 0 ||
                      item.balance_history_credit > 0 ||
                      (item.balance_history_debit > 0 && (
                        <tr key={idx}>
                          <td>{idx + 1}</td>
                          <td>{Moment(item.campaign_fee_created_datetime)}</td>
                          <td>{item.bucket ? item.bucket.bucket_name : "-"}</td>
                          <td>
                            {item.bucket_history_debit
                              ? FormatCurrency.currency(
                                  item.bucket_history_debit,
                                  false
                                )
                              : "-"}
                          </td>
                          <td>
                            {item.bucket_history_credit
                              ? FormatCurrency.currency(
                                  item.bucket_history_credit,
                                  false
                                )
                              : "-"}
                          </td>
                          <td>
                            {item.balance
                              ? FormatCurrency.currency(
                                  item.balance.balance_current_balance
                                )
                              : "-"}
                          </td>
                          <td>
                            {item.balance_history_debit
                              ? FormatCurrency.currency(
                                  item.balance_history_debit
                                )
                              : "-"}
                          </td>
                          <td>
                            {item.balance_history_credit
                              ? FormatCurrency.currency(
                                  item.balance_history_credit
                                )
                              : "-"}
                          </td>
                        </tr>
                      ))
                  )}
                </tbody>
              </Table>
            </div>

            <div className="wrap-3 mt-5">
              <h4 className="title">Status Iklan</h4>
              <Table style={{ background: "#fff" }}>
                <thead>
                  <tr>
                    <th>Tanggal</th>
                    <th>Status</th>
                    <th>Deskripsi</th>
                    <th>Respon Anda</th>
                  </tr>
                </thead>
                <tbody>
                  {data_status.map((item, idx) => (
                    <tr key={idx}>
                      <td>{Moment(item.campaign_status_datetime)}</td>
                      <td>
                        <TagStatus status={item.campaign_status_name}>
                          {item.campaign_status_name}
                        </TagStatus>
                      </td>
                      <td>
                        {data.product?.ms_channel_id === 6 ? (
                          <>
                            {item.campaign_status_note
                              ? item.campaign_status_note
                              : ""}
                            <br />
                            {JSON.parse(item.campaign_status_json)
                              ?.order_influencer?.length > 0 && (
                              <>
                                <strong>Influencer</strong>:
                                <ul>
                                  {JSON.parse(
                                    item.campaign_status_json
                                  )?.order_influencer?.map((inf) => (
                                    <li>
                                      {inf.influencer_name}, status:{inf.status}
                                    </li>
                                  ))}
                                </ul>
                              </>
                            )}
                            {item.campaign_status_json &&
                              JSON.parse(item.campaign_status_json)
                                ?.need_Action &&
                              JSON.parse(item.campaign_status_json).need_action
                                .link_content && (
                                <>
                                  <br />
                                  <strong>Link</strong>:
                                  <a
                                    href={
                                      JSON.parse(item.campaign_status_json)
                                        .need_action.link_content
                                    }
                                    target="_blank"
                                  >
                                    {JSON.parse(item.campaign_status_json)
                                      .need_action.link_content
                                      ? JSON.parse(item.campaign_status_json)
                                          .need_action.link_content
                                      : "-"}
                                  </a>
                                  <br />
                                  <strong>Description</strong>:
                                  {JSON.parse(item.campaign_status_json)
                                    .need_action.description
                                    ? JSON.parse(item.campaign_status_json)
                                        .need_action.description
                                    : "-"}
                                </>
                              )}
                          </>
                        ) : item.campaign_status_noe ? (
                          item.campaign_status_note
                        ) : (
                          ""
                        )}
                      </td>
                      <td>
                        {/* jika tipe KOL dan status needaction dan belum memberikan response balik */}
                        {data.product?.ms_channel_id === 6 &&
                          item.campaign_status_name === "needaction" &&
                          item.campaign_status_feedback_json === null && (
                            <a
                              href={null}
                              class="button is-primary"
                              onClick={() => alert("response to influencer")}
                            >
                              Response to Influencer
                            </a>
                          )}

                        {/* Jika tipe MIC dan status needaction dan belum memberikan response balik */}
                        {data.product?.ms_channel_id === 5 &&
                          item.campaign_status_name === "needaction" &&
                          item.campaign_status_feedback_json === null &&
                          item.campaign_status_id === selected_revised && (
                            <a
                              href={null}
                              class="button is-primary"
                              onClick={() => alert("upload file revisi")}
                            >
                              Upload File Revisi
                            </a>
                          )}

                        {item.campaign_status_feedback_json && (
                          <>
                            <strong>Response</strong>:
                            {
                              JSON.parse(item.campaign_status_feedback_json)
                                .action
                            }
                            <br />
                            <strong>Message</strong>:
                            {
                              JSON.parse(item.campaign_status_feedback_json)
                                .message
                            }
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Container>
        </>
      )}
    </Modal_Component>
  );
};

const TagStatus = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  padding: 2px 10px;
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

const Container = styled.div`
  .list-content {
    display: flex;
    background: #ffff;
    padding: 5px;
    border-bottom: thin solid #ccc;
    &:last-child {
      border-bottom: none;
    }
  }
  .title {
    width: 200px;
    color: ${COLOR_SECONDARY};
  }
`;

Modal_Detail.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  props: PropTypes.any,
};
