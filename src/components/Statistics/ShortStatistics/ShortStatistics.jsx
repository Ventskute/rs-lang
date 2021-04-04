import React from "react";
import { Pie } from "react-chartjs-2";

import "./ShortStatistics.scss";
const games = {
  savanna: { countWord: 10, maxAnswers: 11, percentCorrectAnswers: 9 },
  sprint: { countWord: 11, maxAnswers: 12, percentCorrectAnswers: 8 },
  audioChallenge: { countWord: 12, maxAnswers: 13, percentCorrectAnswers: 7 },
  fillWords: { countWord: 13, maxAnswers: 14, percentCorrectAnswers: 6 },
  total: { countWord: 35, percentCorrectAnswers: 10 },
};

const state = {
  labels: ["January", "February", "March", "April", "May"],
  datasets: [
    {
      label: "Rainfall",
      backgroundColor: ["#B21F00", "#C9DE00", "#2FDE00", "#00A6B4", "#6800B4"],
      hoverBackgroundColor: [
        "#501800",
        "#4B5000",
        "#175000",
        "#003350",
        "#35014F",
      ],
      data: [65, 59, 80, 81, 56],
    },
  ],
};
export default function ShortStatistics(props) {
  return (
    <div className="shortStatistics">
      <div className="countWord">
        <Pie
          data={state}
          options={{
            title: {
              display: true,
              text: "Average Rainfall per month",
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "right",
            },
          }}
        />
      </div>
      <div className="maxAnswers"></div>
      <div className="percentCorrectAnswers"></div>
    </div>
  );
}
