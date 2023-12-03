import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { Container } from "./styled";

const CategoryBarChart = ({ output }) => {
  const barData = {
    labels: Object.keys(output), // ['Selfcare', 'Home', 'Leisure', 'Community']
    datasets: [
      {
        label: "No, cannot do",
        data: Object.values(output).map((val) => val[0]),
      },
      {
        label: "Has not tried",
        data: Object.values(output).map((val) => val[1]),
      },
      {
        label: "Yes",
        data: Object.values(output).map((val) => val[2]),
      },
    ],
  };
  const options = {
    scales: {
      y: {
        stacked: true,
        beginAtZero: true,
        ticks: {
          font: {
            size: 14, // Set the font size for the x-axis ticks
          },
        },
      },
      x: {
        stacked: true,
        ticks: {
          font: {
            size: 14, // Set the font size for the x-axis ticks
          },
        },
      },
    },
    legend: {
      position: "bottom",
      labels: {
        font: {
          size: 14, // Set the font size for the legend labels
        },
      },
    },
    responsive: true,
    plugins: {
      datalabels: {
        formatter: function (value) {
          return value > 0 ? value : ""; //hide the label if it's 0
        },
        font: {
          size: 12,
          weight: "bold",
        },
      },
    },
  };

  return (
    <Container>
      <h2>Does the child do the activity?</h2>
      <Bar data={barData} options={options} />
    </Container>
  );
};

export default CategoryBarChart;
