import React, { useState, useEffect } from "react";
import {
  Modal_Component,
  TableData,
  AlertError,
  AlertSuccess,
} from "component";
import { SelectPerusahaan } from "component/select";
import { Label, COLOR_PRIMARY } from "component/style/content/default";
import PropTypes from "prop-types";
import { ApiCustomer as api } from "../../../../service/api";
import { displayStatus } from "../../../../util";
import moment from "moment";

const formatDate = "YYYY-MM-DD HH:mm:ss";

const header = [
  "No.",
  "Tanggal Upload",
  "Kode Upload",
  "Total Baris",
  "Status",
  "Note",
];

const UploadCsv = (props) => {
  const { show, onHide } = props;
  const [input, setInput] = useState({
    perusahaan: null,
    dokumen: null,
  });
  const [data, setData] = useState({
    data: [],
  });

  const getHistory = async () => {
    if (input?.perusahaan?.value) {
      await api.getHistory(input.perusahaan?.value).then((res) => {
        if (res?.success) {
          setData((state) => ({
            ...state,
            data: res?.data,
          }));
        }
      });
    }
  };

  useEffect(() => {
    if (show) {
      getHistory();
    }
  }, [input?.perusahaan, show]);

  const onChangeInput = (e) => {
    setInput((state) => ({
      ...state,
      perusahaan: e,
    }));
  };

  const btnSubmit = async () => {
    if (input.dokumen && input.perusahaan) {
      const formData = new FormData();
      if (input?.dokumen?.type === "text/csv") {
        formData.append("file_upload", input.dokumen);
        await api
          .postUploadDokumen(formData, input?.perusahaan?.value)
          .then((res) => {
            if (res?.success) {
              AlertSuccess({ title: "SUCCESS", text: res?.success });
              onHide();
              setInput({
                perusahaan: null,
                dokumen: null,
              });
            }
          });
      } else {
        AlertError({
          title: "ERROR",
          text: "Please upload file with type .csv",
        });
      }
    } else {
      AlertError({ title: "ERROR", text: "Please Check your Input" });
    }
  };
  return (
    <Modal_Component
      show={show}
      onHide={onHide}
      title="Upload CSV"
      size="xl"
      btnSubmit
      btnName="Submit"
      onClick={btnSubmit}
    >
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <h3 style={{ color: COLOR_PRIMARY }}>
              Riwayat Upload {input?.perusahaan?.label}
            </h3>
            {input?.perusahaan?.value && (
              <section className="table-data">
                <TableData header={header}>
                  {data?.data?.length > 0 ? (
                    data?.data?.map((item, idx) => (
                      <tr key={idx}>
                        <td data-label={header[0]}>{idx + 1}</td>
                        <td data-label={header[1]}>
                          {moment(item.customer_upload_created_datetime).format(
                            formatDate
                          )}
                        </td>
                        <td data-label={header[2]}>
                          {item.customer_upload_number}
                        </td>
                        <td data-label={header[3]}>
                          {item.customer_upload_file_row}
                        </td>
                        <td data-label={header[4]}>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: displayStatus(
                                item.customer_upload_verified_status_name
                              ),
                            }}
                          />
                        </td>
                        <td data-label={header[5]}>
                          {item.customer_upload_note || "-"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <td>Tidak Ada Data</td>
                  )}
                </TableData>
              </section>
            )}
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-12">
            <div className="mb-3">
              <Label color={COLOR_PRIMARY} htmlFor="Perusahaan">
                Perusahaan
              </Label>
              <SelectPerusahaan
                value={input.perusahaan}
                onChange={onChangeInput}
              />
            </div>
          </div>
          <div className="col-12">
            <div className="mb-3">
              <Label color={COLOR_PRIMARY} htmlFor="Upload CSV">
                Upload CSV
              </Label>
              <input
                type="file"
                name=""
                id=""
                accept=".csv"
                className="form-control"
                onChange={(e) =>
                  setInput((state) => ({
                    ...state,
                    dokumen: e.target.files[0],
                  }))
                }
              />
            </div>
          </div>
        </div>
      </div>
    </Modal_Component>
  );
};

export default UploadCsv;

UploadCsv.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};
