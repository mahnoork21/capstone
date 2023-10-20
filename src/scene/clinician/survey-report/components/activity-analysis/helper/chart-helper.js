export const options = {
  plugins: {
    legend: {
      display: false,
    },
    datalabels: {
      align: "end",
      anchor: (context) => {
        const value = context.dataset.data[context.dataIndex];
        const total = context.dataset.data.reduce((a, b) => a + b, 0);
        const percentage = ((value / total) * 100).toFixed(0);
        return percentage < 5 ? "end" : "center";
      },
      display: (context) => {
        const value = context.dataset.data[context.dataIndex];
        const total = context.dataset.data.reduce((a, b) => a + b, 0);
        const percentage = ((value / total) * 100).toFixed(0);
        return percentage > 0;
      },
      formatter: (value, context) => {
        const total = context.dataset.data.reduce((a, b) => a + b, 0);
        const percentage = ((value / total) * 100).toFixed(0);
        return `${percentage}%`;
      },
      color: "black",
      font: {
        size: 18,
        weight: 600,
      },
    },
  },
  layout: {
    padding: {
      top: 40,
      bottom: 10,
      left: 10,
      right: 10,
    },
    margin: {
      top: 40,
      bottom: 10,
      left: 10,
      right: 10,
    },
  },
};

export const getData = (scores) => {
  const data = {
    labels: Object.keys(scores),
    datasets: [
      {
        data: Object.values(scores),
        backgroundColor: [
          "#6A99D0",
          "#DE8344",
          "#D9D9D9",
          "#A1BA66",
          "#7C659E",
          "#ee7272",
        ],
      },
    ],
  };

  return data;
};
