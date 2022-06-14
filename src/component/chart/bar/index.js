import React from "react";
import { Bar } from "react-chartjs-2";

export const ChartBar = ({
  labels = [22, 3, 4, 5, 6, 7],
  label = "default",
  data_single = [2, 3, 5, 6, 7, 8],
  color = "rgb(226,226,226)",
  isMulti = false,
  label_multi_1 = "default 1",
  data_multi_1 = [2, 3, 2, 1, 3, 4, 5],
  color_multi_1 = "rgb(175,176,176)",
  label_multi_2 = "default 2",
  data_multi_2 = [2, 3, 4, 5, 6, 33, 2],
  color_multi_2 = "rgb(226,226,226)",
  datasets,
}) => {
  let data;

  if (isMulti) {
    data = {
      labels: labels,
      datasets: datasets,
    };
  } else {
    data = {
      labels: labels,
      datasets: [
        {
          label: label,
          data: data_single,
          fill: false,
          backgroundColor: color,
          borderColor: color,
        },
      ],
    };
  }

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    maintainAspectRatio: false,
  };

  return <Bar data={data} options={options} />;
};
