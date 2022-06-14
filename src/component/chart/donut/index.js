import React from "react"
import { Doughnut } from 'react-chartjs-2';




export const DonutBar = ({
  labels = [22, 3, 4, 5, 6, 7],
  label = "default",
  data_single = [2, 3, 5, 6, 7, 8],
  color = 'rgb(226,226,226)',
  isMulti = false,
  label_multi_1 = "default 1",
  data_multi_1 = [2, 3, 2, 1, 3, 4, 5],
  color_multi_1 = "rgb(175,176,176)",
  label_multi_2 = "default 2",
  data_multi_2 = [2, 3, 4, 5, 6, 33, 2],
  color_multi_2 = "rgb(226,226,226)",
  title = "default"
}) => {

  let data

  if (isMulti) {
    data = {
      labels: labels,
      datasets: [
        {
          label: label_multi_1,
          data: data_multi_1,
          fill: false,
          backgroundColor: color_multi_1,
          borderColor: color_multi_1,
        },
        {
          label: label_multi_2,
          data: data_multi_2,
          fill: false,
          backgroundColor: color_multi_2,
          borderColor: color_multi_2,
        },
      ],
    };

  }
  else {
    data = {
      labels: labels,
      datasets: [
        {
          label: label,
          data: data_single,
          fill: false,
          backgroundColor: color,
        },
      ],
    };
  }


  const options =  {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title
      }
    }
  }



  return <Doughnut data={data} options={options} />
}