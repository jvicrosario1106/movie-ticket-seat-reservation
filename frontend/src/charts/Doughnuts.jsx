import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
Chart.register(ArcElement, Tooltip, Legend);

const Doughnuts = () => {
  const data = {
    labels: ["Showing", "Coming Soon", "Ended"],
    datasets: [
      {
        label: "# of Votes",
        data: [3, 6, 9],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
        ],
      },
    ],
  };
  return (
    <div>
      <Doughnut data={data} title="Movie Status" />
    </div>
  );
};

export default Doughnuts;
