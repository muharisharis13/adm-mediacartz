import React, { useState, useEffect } from "react";
import {
  Form,
  Pagination,
  Loadingfunc,
  TableData,
  DropDown_More,
} from "../../../../component";
import {
  ButtonPrimary,
  COLOR_PRIMARY,
  ContainerContent,
  HeaderPrimary,
  Table,
  Th,
  Thead,
  TagStatus,
  Tbody,
  Tr,
  Td,
} from "../../../../component/style/content/default";
import { MoreCircle } from "@styled-icons/fluentui-system-regular";
import { api_template } from "../../../../service/api";
import { Numeric, displayStatus, useTitle } from "../../../../util";
import { Modal_clone, Modal_create, Modal_detail, Modal_edit } from "./modal";

const header = [
  "No",
  "Nama Template",
  "Perusahaan",
  "Tipe Channel",
  "Status Persetujuan",
  "More",
];

const data_more = [
  { name: "Lihat Detail" },
  { name: "Ubah" },
  { name: "Clone Template" },
];

export const IdxTemplate = () => {
  useTitle("Beriklan | Template");
  const [data, setData] = useState([]);
  const [page, setPage] = useState({
    page: 1,
    last_page: null,
  });
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({
    detail: false,
    create: false,
    edit: false,
    clone: false,
  });
  const [template_id, setTemplate_id] = useState(null);

  const get_data = async () => {
    setLoading(true);
    await api_template.get_template_list({ page: page.page }).then((res) => {
      console.log({ get_template_list: res });
      if (res?.success) {
        setData(res.data);
        setPage((state) => ({
          ...state,
          page: res.page,
          last_page: res.last_page,
        }));
      }
    });
    setLoading(false);
  };

  const btnPagination = async (e) => {
    setLoading(true);
    await api_template
      .get_template_list({ page: e.selected + 1 })
      .then((res) => {
        console.log({ get_template_list: res });
        if (res?.success) {
          setData(res.data);
          setPage((state) => ({
            ...state,
            page: res.page,
            last_page: res.last_page,
          }));
        }
      });
    setLoading(false);
  };

  const btnMore = ({ name, id }) => {
    setTemplate_id(id);
    switch (name) {
      case "Lihat Detail":
        setModal((modal) => ({ ...modal, detail: true }));
        break;
      case "Ubah":
        setModal((modal) => ({ ...modal, edit: true }));
        break;
      case "Clone Template":
        setModal((modal) => ({ ...modal, clone: true }));
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    get_data();
  }, []);

  return (
    <ContainerContent>
      <HeaderPrimary color={COLOR_PRIMARY}>Daftar Template</HeaderPrimary>

      {/* MODAL ================ */}
      {/* <Helmet>
            <script type="text/javascript" src="contentbuilder/assets/jquery.min.js" />
            <script type="text/javascript" src="contentbuilder/contentbuilder/contentbuilder.js" />
            <script type="text/javascript" src="contentbuilder/assets/minimalist-blocks/content-v4.js" />
          </Helmet> */}

      <Modal_detail
        show={modal.detail}
        onHide={() => setModal((modal) => ({ ...modal, detail: false }))}
        template_id={template_id}
      />

      <Modal_create
        show={modal.create}
        onHide={() => setModal((modal) => ({ ...modal, create: false }))}
        get_data1={get_data}
      />

      <Modal_clone
        show={modal.clone}
        onHide={() => setModal((modal) => ({ ...modal, clone: false }))}
        get_data1={get_data}
        nama_template={
          data.find((id) => id.template_id === template_id)
            ? data.find((id) => id.template_id === template_id).template_name
            : "null"
        }
        channel={
          data.find((id) => id.template_id === template_id)
            ? data.find((id) => id.template_id === template_id).ms_inventory
            : "null"
        }
      />

      <Modal_edit
        show={modal.edit}
        onHide={() => setModal((modal) => ({ ...modal, edit: false }))}
        get_data1={get_data}
        template_id1={template_id}
      />

      <section>
        <Form>
          <section className="d-flex mb-3">
            <ButtonPrimary
              onClick={() => setModal((modal) => ({ ...modal, create: true }))}
            >
              Create Template
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
                    //   btnMore({ name: "Lihat Detail", id: item.template_id })
                    // }
                  >
                    <Td>{Numeric({ idx: idx, page: page.page })}</Td>
                    <Td>{item.template_name}</Td>
                    <Td>{item.company && item.company.company_name}</Td>
                    <Td>
                      {item.ms_inventory &&
                        item.ms_inventory.ms_inventory_identifier}
                    </Td>
                    <Td>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: displayStatus(
                            item.template_approve_status_name
                          ),
                        }}
                      />
                    </Td>
                    <Td>
                      <DropDown_More
                        data_more={data_more}
                        id={item.template_id}
                        title={
                          <MoreCircle
                            style={{
                              width: "25px",
                              color: "#ccc",
                              cursor: "pointer",
                            }}
                          />
                        }
                        onClick={btnMore}
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
        </Form>
      </section>
    </ContainerContent>
  );
};
