import React, { useState } from "react";
import {
  Modal_Component,
  AlertSuccess,
  AlertError,
  LoadingIcon,
} from "component";
import { SelectPerusahaan } from "component/select";
import { Label, COLOR_HOVER_PRIMARY } from "component/style/content/default";
import { ApiCustomer as api } from "../../../../service/api";
import PropTypes from "prop-types";

const DownloadCsv = (props) => {
  const { show, onHide } = props;
  const [perusahaan, setPerusahaan] = useState(null);
  const [loading, setLoading] = useState(false);

  const btnSubmit = () => {
    try {
      setLoading(true);
      api.getDownloadfile(perusahaan?.value).then((res) => {
        if (
          res.type === "application/json" &&
          Object.entries(res).length === 0
        ) {
          AlertError({ title: "ERROR", text: "File Not Found" });
        } else {
          //download file
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(res);
          link.setAttribute(
            "download",
            `customer_company_#${perusahaan?.value}.csv`
          );
          document.body.appendChild(link);
          link.click();
          AlertSuccess({
            title: "SUCCESS",
            text: "File has been downloaded successfully",
          });
          onHide();
        }
      });
    } catch (error) {
      AlertError({ title: "ERROR", text: error });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal_Component
      show={show}
      onHide={onHide}
      title="Download Csv"
      size="sm"
      btnSubmit
      btnName={loading ? <LoadingIcon /> : "Submit"}
      onClick={loading ? null : btnSubmit}
    >
      <div className="container">
        <div className="mb-3">
          <Label color={COLOR_HOVER_PRIMARY}>Perusahaan</Label>
          <SelectPerusahaan
            value={perusahaan}
            onChange={(e) => setPerusahaan(e)}
          />
        </div>
      </div>
    </Modal_Component>
  );
};

export default DownloadCsv;

DownloadCsv.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};
