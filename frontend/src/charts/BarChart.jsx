import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend, registerables } from "chart.js";
Chart.register(ArcElement, Tooltip, Legend, ...registerables);

const BarChart = ({ ratings }) => {
  const movieLabel = [];
  const movieRating =
    ratings.length > 0 && ratings.map((rating) => rating.averageRatings);
  for (var i = 0; i < ratings.length; i++) {
    movieLabel.push(ratings[i]._id);
  }

  const data = {
    labels: movieLabel,
    datasets: [
      {
        label: "Top 5 Movie Ratings",
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 2,
        data: movieRating,
      },
    ],
  };
  return (
    <div>
      {" "}
      <Bar data={data} />;
    </div>
  );
};

export default BarChart;
