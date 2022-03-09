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
          "rgba(235, 77, 75,0.6)",
          "rgba(255, 121, 121,0.6)",
          "rgba(214, 48, 49,0.6)",
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
