import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";
import moment from "moment";

// Register Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale
);

const LineChartt = ({ coinHistory, currentPrice, coinName }) => {
  const price = [];
  const timeStamp = [];

  coinHistory?.data?.history?.forEach((data) => {
    price.push(data.price);
    timeStamp.push(moment.unix(data.timestamp).format("DD/MM/YYYY"));
  });

  const data = {
    labels: timeStamp.reverse(), // oldest to newest
    datasets: [
      {
        label: "Price in USD",
        data: price.reverse(), // match order with labels
        fill: false,
        borderColor: "#3e95cd",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: {
        display: true,
        text: `${coinName} Price Chart`,
        font: {
          size: 20,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          callback: function (val, index) {
            return this.getLabelForValue(val);
          },
          maxRotation: 75,
          minRotation: 75,
        },
      },
      y: {
        ticks: {
          callback: function (value) {
            return `$${Number(value).toLocaleString()}`;
          },
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      <div style={{ marginTop: "1rem" }}>
        <h4>
          Current {coinName} Price: ${currentPrice}
        </h4>
        <p>Change: {coinHistory?.data?.change}%</p>
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChartt;
