import React, { useState, useEffect } from "react";
import {
  ButtonPrimary,
  COLOR_PRIMARY,
  ContainerContent,
  HeaderPrimary,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "../../../../component/style/content/default";
import {
  Form,
  Pagination,
  Loadingfunc,
  AlertError,
  TableData,
  AlertSuccess,
} from "../../../../component";
import {
  DivContainerFormRow1,
  ContainerInput,
  Input,
  LabelInput,
  DivContainerForm,
  BtnFilter,
  BtnWithLine,
  DivContainerFormRow2,
} from "../style";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { MoreCircle } from "@styled-icons/fluentui-system-regular";
import { DropDown_More } from "../../../../component/dropdown";
import { api_request } from "../../../../service/api";
import moment from "moment";
import {
  Moment,
  displayStatus,
  FormatCurrency,
  useTitle,
} from "../../../../util";
import { Modal_detail } from "./modal/modal.detail";
import { Modal_statistik_api } from "./modal/modal.statistik_api";

export const header = [
  "Tanggal",
  "Nomor Transaksi",
  "Produk",
  "Sender ID",
  "Status",
  "Penerima",
  "More",
];

const data_more = [{ name: "Lihat Detail" }];

export const IdxApi_Request = () => {
  useTitle("Beriklan | Api Request");
  const [data, setData] = useState([]);
  const [input, setInput] = useState({
    nomor_transaksi: "",
    sender: "",
    from_date: new Date(),
    end_date: new Date(),
    selected_company: "",
  });
  const [page, setPage] = useState({
    page: 1,
    last_page: 1,
  });
  const [summary, setSummary] = useState([]);
  const [opt_company, setOpt_company] = useState([]);
  const [modal, setModal] = useState({
    detail: false,
    statistik_api: false,
  });
  const [props, setProps] = useState({});
  const [loading, setLoading] = useState(false);

  const get_data = async () => {
    await api_request.get_company().then((res) => {
      console.log({ get_company: res });
      if (res?.success) {
        let data_company = res.data.map((item) => ({
          value: item.company_id,
          label: `${item.company_name} (${item.category_company?.category_company_name})`,
        }));
        setOpt_company(data_company);
      }
    });
  };

  useEffect(() => {
    get_data();
  }, []);

  const onChangeValueInput = (e) => {
    setInput((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const btnFilter = async () => {
    console.log({ input });
    setLoading(true);
    await api_request
      .get_api_request({
        api_transaction_number: input.nomor_transaksi,
        api_sender: input.sender,
        company_id: input.selected_company.value,
        api_from_datetime: moment(input.from_date).format(
          "YYYY-MM-DD HH:mm:ss"
        ),
        api_until_datetime: moment(input.end_date).format(
          "YYYY-MM-DD HH:mm:ss"
        ),
      })
      .then((res) => {
        console.log({ get_api_request: res });
        if (res?.success) {
          setData(res.data);
          setPage((state) => ({
            ...state,
            page: res.page,
            last_page: res.last_page,
          }));
          setSummary(res.summary);
        } else {
          AlertError({ title: "ERROR", text: res.error });
        }
      });
    setLoading(false);
  };

  const btnPagination = async (e) => {
    let selected = e.selected + 1;

    await api_request
      .get_api_request({
        api_transaction_number: input.nomor_transaksi,
        api_sender: input.sender,
        company_id: input.selected_company.value,
        api_from_datetime: moment(input.from_date).format(
          "YYYY-MM-DD HH:mm:ss"
        ),
        api_until_datetime: moment(input.end_date).format(
          "YYYY-MM-DD HH:mm:ss"
        ),
        page: selected,
      })
      .then((res) => {
        console.log({ get_api_request: res });
        if (res?.success) {
          setData(res.data);
          setPage((state) => ({
            ...state,
            page: res.page,
            last_page: res.last_page,
          }));
          setSummary(res.summary);
        }
      });
  };

  const btnMore = (name, id) => {
    setProps((state) => ({ ...state, id: id }));
    if (name === "Lihat Detail") {
      setModal({ ...modal, detail: true });
    }
  };

  const BtnDownload = async () => {
    await api_request
      .get_api_request_report({
        api_transaction_number: input.nomor_transaksi,
        api_sender: input.sender,
        company_id: input.selected_company.value,
        api_from_datetime: moment(input.from_date).format(
          "YYYY-MM-DD HH:mm:ss"
        ),
        api_until_datetime: moment(input.end_date).format(
          "YYYY-MM-DD HH:mm:ss"
        ),
      })
      .then((res) => {
        if (res?.success) {
          AlertSuccess({ title: "Success", text: res?.success });
        } else {
          AlertError({ title: "Error", text: res?.error });
        }
      });
  };

  const BtnReset = () => {
    setInput((state) => ({
      ...state,
      nomor_transaksi: "",
      sender: "",
      from_date: new Date(),
      end_date: new Date(),
      selected_company: "",
    }));
  };

  // console.log({ summary });
  return (
    <ContainerContent>
      <HeaderPrimary color={COLOR_PRIMARY}>Daftar API Request</HeaderPrimary>

      {/* MODAL============= */}

      <Modal_detail
        show={modal.detail}
        onHide={() => setModal({ ...modal, detail: false })}
        props={props}
      />

      <Modal_statistik_api
        show={modal.statistik_api}
        onHide={() => setModal({ ...modal, statistik_api: false })}
      />

      {/* MODAL============= */}

      <section>
        <Form>
          <section className="d-flex mb-3">
            <ButtonPrimary
              onClick={() => setModal({ ...modal, statistik_api: true })}
            >
              Lihat Statistik API
            </ButtonPrimary>
          </section>

          <section style={{ marginBottom: "50px" }}>
            <DivContainerForm>
              <DivContainerFormRow1>
                <ContainerInput>
                  <LabelInput forHtml="Nomor Transaksi">
                    Nomor Transaksi
                  </LabelInput>
                  <Input
                    type="text"
                    placeholder="Nomor Transaksi"
                    name="nomor_transaksi"
                    onChange={onChangeValueInput}
                  />
                </ContainerInput>
                <ContainerInput>
                  <LabelInput forHtml="Sender">Sender</LabelInput>
                  <Input
                    type="text"
                    placeholder="Sender"
                    name="sender"
                    onChange={onChangeValueInput}
                  />
                </ContainerInput>
                <ContainerInput>
                  <LabelInput forHtml="Dari Tanggal">Dari Tanggal</LabelInput>
                  {/* <Input type="datetime-local" placeholder="Nomor Transaksi" name="from_date" value={input.from_date}  onChange={onChangeValueInput} /> */}
                  <DatePicker
                    className="form-control"
                    selected={input.from_date}
                    showTimeSelect
                    onChange={(e) =>
                      setInput((state) => ({ ...state, from_date: e }))
                    }
                    selectsStart
                    startDate={input.from_date}
                    endDate={input.end_date}
                    dateFormat="yyyy-MMM-dd, hh:mm:ss"
                  />
                </ContainerInput>
                <ContainerInput>
                  <LabelInput forHtml="Sampai Tanggal">
                    Sampai Tanggal
                  </LabelInput>
                  {/* <Input type="datetime-local" placeholder="Sampai Tanggal" name="end_date" value={input.end_date} className="form-control" onChange={onChangeValueInput} /> */}
                  <DatePicker
                    className="form-control"
                    selected={input.end_date}
                    showTimeSelect
                    onChange={(e) =>
                      setInput((state) => ({ ...state, end_date: e }))
                    }
                    selectsEnd
                    startDate={input.from_date}
                    endDate={input.end_date}
                    minDate={input.from_date}
                    dateFormat="yyyy-MMM-dd, hh:mm:ss"
                  />
                </ContainerInput>
                <ContainerInput>
                  <LabelInput forHtml="Perusahaan">Perusahaan</LabelInput>
                  <Select
                    placeholder="Select Perusahaan"
                    options={opt_company}
                    value={input.selected_company}
                    onChange={(e) =>
                      setInput((state) => ({ ...state, selected_company: e }))
                    }
                  />
                </ContainerInput>
              </DivContainerFormRow1>
              <DivContainerFormRow2
                className="d-flex justify-content-around"
                style={{ width: "calc(60%/2)" }}
              >
                <BtnFilter onClick={btnFilter}>Filter</BtnFilter>
                <BtnWithLine onClick={BtnDownload}>Download</BtnWithLine>
                <BtnWithLine onClick={BtnReset}>Reset</BtnWithLine>
              </DivContainerFormRow2>
            </DivContainerForm>
          </section>

          {summary?.length > 0 ? (
            <div className="wrap-summary mb-5">
              <h3>Ringkasan Keseluruhan</h3>
              <div className="d-flex align-items-center justify-content-evenly">
                {summary?.map((item: any, idx: number) => (
                  <div
                    className="container-summary d-block text-center"
                    key={idx}
                  >
                    <strong>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: displayStatus(item.api_status_name),
                        }}
                      />
                    </strong>
                    <div style={{ fontWeight: "700", fontSize: "16px" }}>
                      {FormatCurrency.input(item.total)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {/* TABLE ====== */}
          <section style={{ overflowY: "scroll" }}>
            <TableData header={header}>
              {loading ? (
                <Loadingfunc />
              ) : (
                data.map((item, idx) => (
                  <Tr
                    key={idx}
                    // style={{ cursor: "pointer" }}
                    // onClick={() => btnMore("Lihat Detail", item.api_id)}
                  >
                    <Td data-label="Tanggal">
                      {Moment(item.api_created_datetime)}
                    </Td>
                    <Td data-label="Nomor Transaksi">
                      {item.api_transaction_number}
                    </Td>
                    <Td data-label="Produk">{`${item.api_media} ${item.api_channel}`}</Td>
                    <Td data-label="Sender ID">{item.api_sender_name}</Td>
                    <Td data-label="Status">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: displayStatus(item.api_status_name),
                        }}
                      />
                    </Td>
                    <Td data-label="Penerima">{item.api_recipient_address}</Td>
                    {/* <Td>
                      <Verified style={{ width: "25px", color: "#04D010" }} />
                      <Unverified style={{ width: "25px", color: "#ccc" }} />
                    </Td> */}
                    <Td data-label="More">
                      <DropDown_More
                        data_more={data_more}
                        title={
                          <MoreCircle
                            style={{
                              width: "25px",
                              color: "#ccc",
                              cursor: "pointer",
                            }}
                          />
                        }
                        onClick={({ name, id }) => btnMore(name, id)}
                        id={item.api_id}
                      />
                    </Td>
                  </Tr>
                ))
              )}
            </TableData>
          </section>

          {data.length > 0 && (
            <section>
              <Pagination
                page={page.page}
                totalPage={page.last_page}
                handleOnChange={btnPagination}
              />
            </section>
          )}

          {/* SECTION MOBILE VERSION======== */}
        </Form>
      </section>
    </ContainerContent>
  );
};
