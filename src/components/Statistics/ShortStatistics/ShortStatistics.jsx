import React from "react";
import { Pie, Bar, Doughnut } from "react-chartjs-2";
import { Alert } from "react-bootstrap";

import "./ShortStatistics.scss";
const games = {
  savanna: {
    nameGame: "Саванна",
    countWord: 10,
    maxAnswers: 11,
    percentCorrectAnswers: 9,
  },
  sprint: {
    nameGame: "Спринт",
    countWord: 11,
    maxAnswers: 12,
    percentCorrectAnswers: 8,
  },
  audioChallenge: {
    nameGame: "Аудио",
    countWord: 12,
    maxAnswers: 13,
    percentCorrectAnswers: 7,
  },
  fillWords: {
    nameGame: "Филвордс",
    countWord: 13,
    maxAnswers: 14,
    percentCorrectAnswers: 6,
  },
  total: { countWord: 35, percentCorrectAnswers: 40 },
};

const dataCountWord = {
  labels: [
    games.savanna.nameGame,
    games.sprint.nameGame,
    games.audioChallenge.nameGame,
    games.fillWords.nameGame,
  ],
  datasets: [
    {
      data: [
        games.savanna.countWord,
        games.sprint.countWord,
        games.audioChallenge.countWord,
        games.fillWords.countWord,
      ],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#00A6B4"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#003350"],
    },
  ],
};
const dataMaxAnswers = {
  labels: [
    games.savanna.nameGame,
    games.sprint.nameGame,
    games.audioChallenge.nameGame,
    games.fillWords.nameGame,
  ],
  datasets: [
    {
      type: "bar",
      label: "Количество ответов",
      backgroundColor: "#36A2EB",
      borderColor: "rgba(0,0,0,1)",
      borderWidth: 1,

      data: [
        games.savanna.maxAnswers,
        games.sprint.maxAnswers,
        games.audioChallenge.maxAnswers,
        games.fillWords.maxAnswers,
      ],
    },
  ],
};
const dataPercentCorrectAnswers = {
  labels: [
    games.savanna.nameGame,
    games.sprint.nameGame,
    games.audioChallenge.nameGame,
    games.fillWords.nameGame,
  ],
  datasets: [
    {
      data: [
        games.savanna.percentCorrectAnswers,
        games.sprint.percentCorrectAnswers,
        games.audioChallenge.percentCorrectAnswers,
        games.fillWords.percentCorrectAnswers,
      ],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#00A6B4"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#003350"],
    },
  ],
};
export default function ShortStatistics(props) {
  return (
    <div className="container">
      <div className="shortStatistics">
        <Alert variant="primary">
          <Alert.Heading>
            Общее количество изученных слов :{games.total.countWord}
          </Alert.Heading>
          <hr />
          <Alert.Heading>
            % правильных ответов:{games.total.percentCorrectAnswers}{" "}
          </Alert.Heading>
        </Alert>
        <div className="countWord ">
          <h2>Количество слов</h2>
          <Pie data={dataCountWord} />
        </div>
        <div className="maxAnswers">
          <h2> Самая длинная серия правильных ответов</h2>
          <Bar
            data={dataMaxAnswers}
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
        <div className="percentCorrectAnswers">
          <h2> % правильных ответов</h2>
          <Doughnut data={dataPercentCorrectAnswers} />
        </div>
      </div>
    </div>
  );
}
