import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import drop from "../../assets/images/drop.png";
import "./Savanna.scss";

let interval;

export default function Savanna() {
  const [words, setWords] = useState([]);
  const [randomWords, setRandomWords] = useState([]);
  const [randomAnswers, setRandomAnswers] = useState([]);
  const [word, setWord] = useState();
  const [livesCount, setLivesCount] = useState(5);
  const [difficultyLevel, setDifficultyLevel] = useState(1);
  const [wordPosition, setWordPosition] = useState(0);
  const [dropSize, setDropSize] = useState(100);
  const [answersCount, setAnswersCount] = useState(1);
  let { group, page } = useParams();

  function nextWord(words) {
    clearInterval(interval);
    setAnswersCount(answersCount + 1);
    if (answersCount + 1 < words.length) {
      setWordPosition(0);
      let word;
      if (randomWords.length == 0) {
        let randWords = getRandomWords(words);
        word = randWords.pop();
        setWord(word);
        setRandomWords(randWords);
      } else {
        word = randomWords.pop();
        setWord(word);
        setRandomWords(randomWords);
      }
      setRandomAnswers(getRandomAnswers(word.wordTranslate, words));
      interval = setInterval(() => {
        setWordPosition((wordPosition) => {
          if (wordPosition < 70) {
            return wordPosition + 0.05;
          }

          setLivesCount((livesCount) => {
            if (livesCount - 1 > 0) {
              nextWord(words);
              return livesCount - 1;
            }

            clearInterval(interval);
            return 0;
          });
        });
      }, 1);
    } else {
      setLivesCount(0);
    }
  }

  function getWords() {
    return fetch(
      `http://localhost:3000/words?group=${
        group ? group : difficultyLevel
      }&page=${page ? page : randomPage()}`
    )
      .then((res) => res.json())
      .then((words) => {
        setWords(words);
        return words;
      });
  }

  const handleUserKeyPress = useCallback(({ key }) => {
    if (key > 0 && key <= 4) {
      var wordElement = document.querySelectorAll(`[data-key='${key}']`)[0];
      if (wordElement) {
        wordElement.dispatchEvent(
          new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: true,
          })
        );
      }
    }
  }, []);

  useEffect(() => {
    getWords().then((words) => {
      if (isExactPage()) {
        nextWord(words);
      }
    });

    window.addEventListener("keydown", handleUserKeyPress);

    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, []);

  function isExactPage() {
    return group && page;
  }

  let difficultySelector = "";
  if (!isExactPage()) {
    difficultySelector = (
      <div>
        <select
          className="form-control difficulty-level"
          onChange={(e) => {
            setDifficultyLevel(e.target.value);
            getWords().then(() => nextWord(words));
            clearInterval(interval);
          }}
        >
          <option>Choose level</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
        </select>
      </div>
    );
  }

  let gameField = "";
  let livesCounter = (
    <div className="lives-counter">
      <span>{livesCount}</span>
    </div>
  );
  if (answersCount + 1 == words.length) {
    gameField = (
      <div className="game-over">
        <p>YOU WON!</p>
      </div>
    );
    livesCounter = "";
  } else if (livesCount == 0) {
    gameField = (
      <div className="game-over">
        <p>YOU LOST!</p>
      </div>
    );
  } else if (word) {
    gameField = (
      <>
        <div className="word" style={{ top: wordPosition + "%" }}>
          <p>{word.word}</p>
        </div>
        <ul className="words-list">
          {randomAnswers.map((elem, i) => {
            return (
              <li
                onClick={() => {
                  clearInterval(interval);
                  if (elem === word.wordTranslate) {
                    setDropSize(dropSize + 10);
                  } else {
                    setLivesCount(livesCount - 1);
                  }
                  nextWord(words);
                }}
                key={i}
                data-key={i + 1}
              >
                {i + 1}. {elem}
              </li>
            );
          })}
        </ul>
      </>
    );
  }

  return (
    <div className="savanna">
      {difficultySelector}
      {livesCounter}
      {gameField}
      <div className="drop">
        <img src={drop} style={{ width: dropSize, height: dropSize }} />
      </div>
    </div>
  );
}

function randomPage() {
  let page = Math.floor(Math.random() * 30);
  return page;
}

function getRandomWords(words) {
  let previousIndexes = [];
  let randomWords = [];
  for (let i = 0; i < words.length; i++) {
    randomWords.push(words[randomIndex(previousIndexes, words.length)]);
  }
  return randomWords;
}

function randomIndex(previousIndexes, seed) {
  let index = Math.floor(Math.random() * seed);
  if (previousIndexes.includes(index)) {
    return randomIndex(previousIndexes, seed);
  }
  previousIndexes.push(index);
  return index;
}

function getRandomAnswers(answer, words) {
  let answers = [answer];
  do {
    const rand = Math.floor(Math.random() * words.length);
    let t = answers.filter((v) => {
      return v === words[rand].wordTranslate;
    });
    if (t.length == 0) {
      answers.push(words[rand].wordTranslate);
    }
  } while (answers.length < 4);

  return shuffle(answers);
}

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
