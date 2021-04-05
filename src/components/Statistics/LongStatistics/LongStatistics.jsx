import React from "react";
import { Line } from "react-chartjs-2";

import "./LongStatistics.scss";

const countDays = {
  day: ["01.04.2021", "03.04.2021", "04.04.2021"],
  countWords: [10, 15, 20],
  countWordsLearned: [5, 2, 6],
};
const stateCountWords = {
  labels: countDays.day,
  datasets: [
    {
      label: "Количество слов",
      fill: false,
      lineTension: 0.5,
      backgroundColor: "rgba(75,192,192,1)",
      borderColor: "rgba(0,0,0,1)",
      borderWidth: 2,
      data: countDays.countWords,
    },
  ],
};
const stateCountWordsLearned = {
  labels: countDays.day,
  datasets: [
    {
      label: "Количество слов",
      fill: false,
      lineTension: 0.5,
      backgroundColor: "#FF6384",
      borderColor: "rgba(0,0,0,1)",
      borderWidth: 2,
      data: countDays.countWordsLearned,
    },
  ],
};
export default function LongStatistics(props) {
  return (
    <div className="container">
      <div className="longStatistics">
        <div className="countWords">
          <h2>Количество изученных слов за каждый день изучения</h2>
          <Line data={stateCountWords} />
        </div>
        <div className="countWordsLearned">
          <h2>
            Увеличение общего количества изученных слов за весь период изучения
            по дням
          </h2>
          <Line data={stateCountWordsLearned} />
        </div>
      </div>
    </div>
  );
}
