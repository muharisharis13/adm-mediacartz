import React, { useEffect, useState } from "react";
import * as Component from "../../../../component";
import * as Style from "../../../../component/style/content/default";
import * as Services from "../../../../service";
import * as Util from "../../../../util";
import styled from "styled-components";

const api = Services.api.ApiEvent.Invoice;
const ModalInvoiceDetail = (props: {
  show: any,
  onHide: Function,
  dataProps: any,
}) => {
  const { show, onHide, dataProps } = props;
  const { data } = dataProps;
  const [info, setInfo] = useState([]);
  const [bank, setBank] = useState([]);
  const [status, setStatus] = useState([]);

  useEffect(() => {
    if (show) {
      setInfo([
        {
          title: "Nomor Invoice",
          text: data?.invoice_number,
        },
        {
          title: "Total Invoice",
          text: Util.FormatCurrency.input(data?.invoice_total),
        },
        {
          title: "Persentase Biaya",
          text: data?.invoice_fee_percentage
            ? `${Util.FormatCurrency.input(data?.invoice_fee_percentage)} %`
            : "",
        },
        {
          title: "Biaya Invoice",
          text: Util.FormatCurrency.currency(data?.invoice_fee_amount),
        },
        {
          title: "Grand Total",
          text: Util.FormatCurrency.currency(data?.invoice_grand_total),
        },
      ]);

      setBank([
        {
          title: "Nama Bank Penerima",
          text: data?.invoice_recipient_bank_name ?? "",
        },
        {
          title: "Nama Akun Penerima",
          text: data?.invoice_recipient_bank_name ?? "",
        },
        {
          title: "Nomor Rekening Penerima",
          text: data?.invoice_recipient_account_name ?? "",
        },
      ]);

      setStatus([
        {
          title: "Status Persetujuan Invoice",
          text: (
            <div
              dangerouslySetInnerHTML={{
                __html: Util.displayStatus(data?.invoice_approve_status_name),
              }}
            />
          ),
        },
        {
          title: "Tanggal Dibuat",
          text: Util.Moment(data?.invoice_created_datetime),
        },
        {
          title: "Dibuat Oleh",
          text: data?.invoice_created_by?.name ?? "",
        },
        {
          title: "Perusahaan",
          text: data?.company?.company_name ?? "",
        },
        {
          title: "Download",
          text: (
            <a
              href={null}
              onClick={() =>
                BtnDownload(data?.invoice_id, data?.invoice_number)
              }
              title="Download Invoice"
              style={{ cursor: "pointer" }}
            >
              <span class="icon is-small">&#128193;</span>
            </a>
          ),
        },
      ]);
    }
  }, [show]);

  const BtnDownload = async (invoice_id, invoice_number) => {
    await api.getDownloadInvoice(invoice_id).then((result) => {
      if (result) {
        //download file
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(result);
        link.setAttribute("download", `invoice-${invoice_number}.pdf`);
        document.body.appendChild(link);
        link.click();
      } else {
        Component.AlertError({
          title: "Error",
          text: "Invoice File Not Found",
        });
      }
    });
  };

  return (
    <Component.Modal_Component
      title="Detail Invoice"
      show={show}
      onHide={onHide}
      size="xl"
    >
      <Container className="container">
        {info?.map((item: any, idx: number) => (
          <div key={idx} className="wrap-content">
            <div className="title">{item.title}</div>
            <div className="text">{item.text}</div>
          </div>
        ))}

        <div className="mt-5">
          <div className="text-header">Bank Penerima</div>
          <div>
            {bank?.map((item: any, idx: number) => (
              <div key={idx} className="wrap-content">
                <div className="title">{item.title}</div>
                <div className="text">{item.text}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <div className="text-header">Status</div>
          <div>
            {status?.map((item: any, idx: number) => (
              <div key={idx} className="wrap-content">
                <div className="title">{item.title}</div>
                <div className="text">{item.text}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Component.Modal_Component>
  );
};

export default ModalInvoiceDetail;

const Container = styled.div`
  .wrap-content {
    display: flex;
    align-items: center;
    width: 100%;
    background-color: #fff;
    padding: 4px 20px;
    border-bottom: thin solid #eaeaea;

    .title {
      max-width: 400px;
      width: 100%;
      font-weight: bold;
      color: ${Style.COLOR_SECONDARY};
    }
  }
`;
