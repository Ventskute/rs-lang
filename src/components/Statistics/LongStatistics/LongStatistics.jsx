import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { getLongTermStats } from "../../../utils/api/api";

import "./LongStatistics.scss";

export default function LongStatistics() {
  const { user } = useSelector((state) => state);
  const [wordsCount, setWordsCount] = useState({
    labels: [],
    datasets: [
      {
        label: "Количество слов",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: [],
      },
    ],
  });
  const [increaseWordsCount, setIncreaseWordsCount] = useState({
    labels: [],
    datasets: [
      {
        label: "Количество слов",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "#FF6384",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: [],
      },
    ],
  });

  function getDayAndCount() {
    if (user) {
      return getLongTermStats(user.userId).then((data) => {
        let dataUser = data.map((el) => {
          return `${new Date(el).getDate()}.${
            new Date(el).getMonth() + 1
          }.${new Date(el).getFullYear()}`;
        });
        let count = dataUser.reduce(function (acc, el) {
          acc[el] = (acc[el] || 0) + 1;

          return acc;
        }, {});

        return count;
      });
    } else return Promise.resolve(0)
  }

  getDayAndCount().then((data) => {
    wordsCount.labels = Object.keys(data);
    wordsCount.datasets[0].data = Object.values(data);

    let increase = [];
    let sum = 0;
    for (let i = 0; i < Object.values(data).length; i++) {
      sum = sum + Object.values(data)[i];
      increase.push(sum);
    }
    increaseWordsCount.labels = Object.keys(data);
    increaseWordsCount.datasets[0].data = increase;

    setIncreaseWordsCount(increaseWordsCount);
    setWordsCount(wordsCount);
  });

  return (
    <div className="longStatistics">
      <div className="countWords">
        <h2>Количество изученных слов за каждый день изучения</h2>
        <Line
          data={wordsCount}
          options={{
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          }}
        />
      </div>
      <div className="countWordsLearned">
        <h2>
          Увеличение общего количества изученных слов за весь период изучения
          по дням
        </h2>
        <Line
          data={increaseWordsCount}
          options={{
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          }}
        />
      </div>
    </div>
  );
}
