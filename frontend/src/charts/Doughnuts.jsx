import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);

const Doughnuts = () => {
  const data = {
    labels: ["Showing", "Coming Soon", "Ended"],
    datasets: [
      {
        data: [3, 6, 9],
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
