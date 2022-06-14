import React, { useEffect, useState } from "react";
import {
  ButtonPrimary,
  COLOR_PRIMARY,
  ContainerContent,
  HeaderPrimary,
  Td,
  Tr,
} from "../../../../component/style/content/default";
import {
  Form,
  Loadingfunc,
  Pagination,
  TableData,
} from "../../../../component";
import { DropDown_More } from "../../../../component/dropdown";
import { MoreCircle } from "@styled-icons/fluentui-system-regular";
import { api_shorten_url } from "../../../../service/api";
import { Numeric, useTitle } from "../../../../util";
import { Modal_create, Modal_detail } from "./modal";

const header = ["No", "Link Original", "Link Pendek", "Total Klik", "More"];

const data_more = [{ name: "Lihat Detail" }];

export const IdxShorten_URL = () => {
  useTitle("Beriklan | Shorten URL");
  const [data, setData] = useState([]);
  const [page, setPage] = useState({
    page: 1,
    last_page: 1,
  });
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({
    detail: false,
    create: false,
  });
  const [props, setProps] = useState({});

  const getData = () => {
    setLoading(true);
    api_shorten_url.get_shorten_url({}).then((res) => {
      console.log({ get_shorten_url: res });
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
    await api_shorten_url
      .get_shorten_url({ page: e.selected + 1 })
      .then((res) => {
        console.log({ get_shorten_url: res });
        if (res?.success) {
          setData(res.data);
          setPage({ ...page, page: res.page, last_page: res.last_page });
        }
      });
    setLoading(false);
  };

  const btnMore = (name, id, shortened_parameter) => {
    setProps((state) => ({ ...state, shortened_parameter }));

    setModal((state) => ({ ...state, detail: true }));
  };

  return (
    <ContainerContent>
      <HeaderPrimary color={COLOR_PRIMARY}>Daftar Shorten URL</HeaderPrimary>

      {/* MODAL ============== */}

      <Modal_detail
        show={modal.detail}
        onHide={() => setModal((state) => ({ ...state, detail: false }))}
        props={props}
      />

      <Modal_create
        show={modal.create}
        onHide={() => setModal((state) => ({ ...state, create: false }))}
        getData={getData}
      />
      {/* MODAL ============== */}

      <section>
        <Form>
          <section className="d-flex mb-3">
            <ButtonPrimary
              onClick={() => setModal((state) => ({ ...state, create: true }))}
            >
              Create Shorten URL
            </ButtonPrimary>
          </section>

          <section>
            <TableData header={header}>
              {loading ? (
                <Loadingfunc />
              ) : (
                data.map((item, idx) => (
                  <Tr key={idx}>
                    <Td data-label="No">
                      {Numeric({ idx: idx, page: page.page })}
                    </Td>
                    <Td data-label="Link Original">
                      <a href={item.shortened_original_link} target="_blank">
                        {item.shortened_original_link}
                      </a>
                    </Td>
                    <Td data-label="Link Pendek">
                      <a href={item.shortened_full_url} target="_blank">
                        {item.shortened_full_url}
                      </a>
                    </Td>
                    <Td data-label="Total Klik">
                      {item.shortened_total_clicked}
                    </Td>
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
                            id={idx}
                          />
                        }
                        onClick={({ name, id }) =>
                          btnMore(name, id, item.shortened_parameter)
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
