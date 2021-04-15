import React, { useState, useEffect } from "react";
import { Pie, Bar, Doughnut } from "react-chartjs-2";
import { Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getShortTermStats } from "../../../utils/api/api";

import "./ShortStatistics.scss";

const nameGame = {
  audioChallenge: "Аудиовызов",
  fillWords: "Филвордс",
  savanna: "Саванна",
  sprint: "Спринт",
};
export default function ShortStatistics() {
  const { user } = useSelector((state) => state);
  const [dataCountWord, setDataCountWord] = useState({
    labels: [
      nameGame.audioChallenge,
      nameGame.fillWords,
      nameGame.savanna,
      nameGame.sprint,
    ],
    datasets: [
      {
        data: [],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#00A6B4"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#003350"],
      },
    ],
  });

  const [dataMaxAnswers, setDataMaxAnswers] = useState({
    labels: [
      nameGame.audioChallenge,
      nameGame.fillWords,
      nameGame.savanna,
      nameGame.sprint,
    ],
    datasets: [
      {
        type: "bar",
        label: "Количество ответов",
        backgroundColor: "#36A2EB",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 1,

        data: [],
      },
    ],
  });
  const [dataPercentCorrectAnswers, setDataPercentCorrectAnswers] = useState({
    labels: [
      nameGame.audioChallenge,
      nameGame.fillWords,
      nameGame.savanna,
      nameGame.sprint,
    ],
    datasets: [
      {
        data: [],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#00A6B4"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#003350"],
      },
    ],
  });
  const [totalWordsCount, setTotalWordsCount] = useState(0);
  const [totalPercentCorrectAnswers, setTotalPercentCorrectAnswers] = useState(0);

  useEffect(() => {
    getShortTermStats(user.userId).then((data) => {
      let totalCount =
        data.optional.audioChallenge.learnedWords +
        data.optional.fillWords.learnedWords +
        data.optional.savanna.learnedWords +
        data.optional.sprint.learnedWords;

      setTotalWordsCount(totalCount);

      let totalRightAnswers =
        data.optional.audioChallenge.rightAnswers.length +
        data.optional.fillWords.rightAnswers.length +
        data.optional.savanna.rightAnswers.length +
        data.optional.sprint.rightAnswers.length;

      let totalWrongAnswers =
        data.optional.audioChallenge.wrongAnswers.length +
        data.optional.fillWords.wrongAnswers.length +
        data.optional.savanna.wrongAnswers.length +
        data.optional.sprint.wrongAnswers.length;
      setTotalPercentCorrectAnswers(
        percentCorrectAnswers(totalRightAnswers, totalWrongAnswers)
      );

      setDataCountWord({
        labels: [
          nameGame.audioChallenge,
          nameGame.fillWords,
          nameGame.savanna,
          nameGame.sprint,
        ],
        datasets: [
          {
            data: [
              data.optional.audioChallenge.learnedWords,
              data.optional.fillWords.learnedWords,
              data.optional.savanna.learnedWords,
              data.optional.sprint.learnedWords,
            ],
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#00A6B4"],
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#003350"],
          },
        ],
      });
      setDataMaxAnswers({
        labels: [
          nameGame.audioChallenge,
          nameGame.fillWords,
          nameGame.savanna,
          nameGame.sprint,
        ],
        datasets: [
          {
            type: "bar",
            label: "Количество ответов",
            backgroundColor: "#36A2EB",
            borderColor: "rgba(0,0,0,1)",
            borderWidth: 1,
            data: [
              data.optional.audioChallenge.winStreak,
              data.optional.fillWords.winStreak,
              data.optional.savanna.winStreak,
              data.optional.sprint.winStreak,
            ],
          },
        ],
      });
      setDataPercentCorrectAnswers({
        labels: [
          nameGame.audioChallenge,
          nameGame.fillWords,
          nameGame.savanna,
          nameGame.sprint,
        ],
        datasets: [
          {
            data: [
              percentCorrectAnswers(
                data.optional.audioChallenge.rightAnswers.length,
                data.optional.audioChallenge.wrongAnswers.length
              ),
              percentCorrectAnswers(
                data.optional.fillWords.rightAnswers.length,
                data.optional.fillWords.wrongAnswers.length
              ),
              percentCorrectAnswers(
                data.optional.savanna.rightAnswers.length,
                data.optional.savanna.wrongAnswers.length
              ),
              percentCorrectAnswers(
                data.optional.sprint.rightAnswers.length,
                data.optional.sprint.wrongAnswers.length
              ),
            ],
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#00A6B4"],
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#003350"],
          },
        ],
      });
    });
  }, []);

  function percentCorrectAnswers(right, wrong) {
    let sum = right + wrong;
    let percent = right / sum * 100;
    let roundPercent = Math.round(percent * 1000) / 1000;
    return roundPercent;
  }

  return (
    <div className="shortStatistics">
      <Alert variant="primary">
        <Alert.Heading>
          Общее количество изученных слов: {totalWordsCount}
        </Alert.Heading>
        <hr />
        <Alert.Heading>
          Правильных ответов: {totalPercentCorrectAnswers}%
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
  );
}
