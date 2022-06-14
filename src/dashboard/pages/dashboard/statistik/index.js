import React, { useState } from "react";
import { Title } from "../style";
import { ChartBar } from "../../../../component/index";
import PropTypes from "prop-types";

export const IdxStatistik = (props) => {
  const { data } = props;
  const { list } = data;

  const datasets_campaign = [
    {
      label: "Delivered",
      data: list?.campaign_delivered,
      fill: false,
      backgroundColor: "#43BD15",
      borderColor: "#43BD15",
    },
    {
      label: "Processed",
      data: list?.campaign_processed,
      borderColor: "#2DBDED",
      backgroundColor: "#2DBDED",
    },
    {
      label: "Error",
      data: list?.campaign_error,
      borderColor: "#E73B11",
      backgroundColor: "#E73B11",
    },
  ];

  const datasets_event = [
    {
      label: "Issued Tickets",
      data: list?.event_total_issued,
      borderColor: "#2DBDED",
      backgroundColor: "#2DBDED",
    },
    {
      label: "Used Tickets",
      data: list?.event_total_used,
      borderColor: "#43BD15",
      backgroundColor: "#43BD15",
    },
  ];

  console.log("ini data", list);
  return (
    <section>
      <div className="row justify-content-between mb-2 mb-md-2">
        <div className="col-lg-6 col-md-6 col-sm-6">
          <Title className="mb-2">Statistik Iklan</Title>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12 col-lg-12 col-sm-12">
          <div style={{ width: "100%", maxHeight: "400px" }}>
            <div style={{ height: "400px" }}>
              <ChartBar
                isMulti
                datasets={datasets_campaign}
                labels={list?.campaign_date?.map((item) => item)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-between mt-5 mb-2 mb-md-2">
        <div className="col-lg-6 col-md-6 col-sm-6">
          <Title className="mb-2">Statistik Event</Title>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12 col-lg-12 col-sm-12">
          <div style={{ maxHeight: "400px", width: "100%" }}>
            <div style={{ height: "400px" }}>
              <ChartBar
                isMulti
                datasets={datasets_event}
                labels={list?.event_date}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

IdxStatistik.propTypes = {
  data: PropTypes.object,
};
