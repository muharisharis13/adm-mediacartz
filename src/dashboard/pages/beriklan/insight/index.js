import React, { useEffect, useState } from "react";
import {
  ContainerContent,
  HeaderPrimary,
  COLOR_PRIMARY,
  ButtonPrimary,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "../../../../component/style/content/default";
import {
  Form,
  Pagination,
  Loadingfunc,
  AlertQuestion,
  AlertError,
  AlertSuccess,
  TableData,
} from "../../../../component";
import { DropDown_More } from "../../../../component/dropdown";
import { MoreCircle } from "@styled-icons/fluentui-system-regular";
import { api_insight } from "../../../../service/api";
import { Numeric, useTitle } from "../../../../util";
import { Modal_create, Modal_detail } from "./modal";

const data_more = [
  { name: "Lihat Detail" },
  { name: "Ubah" },
  { name: "Hapus" },
];

const header = ["No", "Nama Insight", "Monitoring", "More"];

export const IdxInsight = () => {
  useTitle("Beriklan | Insight");
  const [data, setData] = useState([]);
  const [page, setPage] = useState({
    page: 1,
    last_page: 1,
  });
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({
    create: false,
    detail: false,
  });
  const [props, setProps] = useState({});

  const getData = async () => {
    setLoading(true);
    await api_insight.get_insight({}).then((res) => {
      console.log({ get_insight: res });
      if (res?.success) {
        setData(res.data);
        setPage({ ...page, page: res.page, last_page: res.last_page });
      }
    });
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const btnPagination = async (e) => {
    setLoading(true);
    await api_insight.get_insight({ page: e.selected + 1 }).then((res) => {
      console.log({ get_insight: res });
      if (res?.success) {
        setData(res.data);
        setPage({ ...page, page: res.page, last_page: res.last_page });
      }
    });
    setLoading(false);
  };

  const btnMore = ({ name, id }) => {
    console.log({ name, id });
    setProps((state) => ({ ...state, id }));

    let data2 = data.find((find) => find.programme_id === id);

    switch (name) {
      case "Lihat Detail":
        setModal({ ...modal, detail: true });
        break;
      case "Ubah":
        setModal({ ...modal, create: true });
        setProps((state) => ({ ...state, data: data2, name: "Ubah" }));
        break;

      case "Hapus":
        AlertQuestion({
          title: "DELETE",
          text: `Do you want to ${data2.programme_name} ?`,
        }).then((res) => {
          if (res.isConfirmed === true) {
            api_insight
              .delete_insight({ programme_id: id })
              .then(async (result) => {
                if (result.success) {
                  await AlertSuccess({
                    title: "SUCCESs",
                    text: result.success,
                  });
                  await getData();
                } else {
                  await AlertError({ title: "ERROR", text: result.error });
                }
              });
          }
        });
        break;

      default:
        break;
    }
  };

  return (
    <ContainerContent>
      <HeaderPrimary color={COLOR_PRIMARY}>Daftar Insight</HeaderPrimary>

      {/* MODAL ============ */}

      <Modal_create
        show={modal.create}
        onHide={() => setModal({ ...modal, create: false })}
        getData={getData}
        props={props}
      />

      <Modal_detail
        show={modal.detail}
        onHide={() => setModal({ ...modal, detail: false })}
        props={props}
      />

      {/* MODAL ============ */}

      <section>
        <Form>
          <section className="d-flex mb-3">
            <ButtonPrimary
              onClick={() => {
                setModal({ ...modal, create: true });
                setProps({});
              }}
            >
              Create Insight
            </ButtonPrimary>
          </section>

          <section>
            <TableData header={header}>
              {loading ? (
                <Loadingfunc />
              ) : (
                data.map((item, idx) => (
                  <Tr
                    key={idx}
                    // style={{ cursor: "pointer" }}
                    // onClick={() =>
                    //   btnMore({ name: "Lihat Detail", id: item.programme_id })
                    // }
                  >
                    <Td data-label="No">
                      {Numeric({ idx: idx, page: page.page })}
                    </Td>
                    <Td data-label="Nama Insight">{item.programme_name}</Td>
                    <Td data-label="Monitoring">
                      <div>
                        {JSON.parse(item.programme_monitor)?.campaign_id
                          ?.length > 0 &&
                          `Campaign ID : ${JSON.parse(
                            item.programme_monitor
                          ).campaign_id.map((item) => `${item}`)}`}
                      </div>
                      <br />
                      <div>
                        {JSON.parse(item.programme_monitor)?.event_id?.length >
                          0 &&
                          `Event ID : ${JSON.parse(
                            item.programme_monitor
                          ).event_id.map((item) => `${item}`)}`}
                      </div>
                    </Td>
                    <Td data-label="More">
                      <DropDown_More
                        id={item.programme_id}
                        onClick={btnMore}
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
