import React, { useState, useEffect } from "react";
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
  const [difficLevel, setDifficLevel] = useState(1);
  const [wordPosition, setWordPosition] = useState(0);
  const [dropSize, setDropSize] = useState(100);
  let { group, page } = useParams();

  function nextWord(words) {
    clearInterval(interval);
    setWords(words);
    setWordPosition(0);
    let randWords = getRandomWords(words);
    let word = randWords.pop();
    setWord(word);
    setRandomWords(randWords);
    setRandomAnswers(getRandomAnswers(word.wordTranslate, words));
    interval = setInterval(() => {
      setWordPosition((wordPosition) => {
        return wordPosition < 90
          ? wordPosition + 0.05
          : clearInterval(interval);
      });
    }, 1);
  }
  function randomPage() {
    let page = Math.floor(Math.random() * 30);
    return page;
  }

  function getWords() {
    fetch(
      `http://localhost:3000/words?group=${group ? group : difficLevel}&page=${
        page ? page : randomPage()
      }`
    )
      .then((res) => res.json())
      .then((words) => {
        nextWord(words);
      });
  }

  useEffect(() => {
    getWords();
  }, []);

  return (
    <div className="savanna">
      {group && page ? (
        ""
      ) : (
        <div>
          <select
            className="form-control"
            id="exampleSelect1"
            onChange={(e) => {
              setDifficLevel(e.target.value);
              getWords();
            }}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
          </select>
        </div>
      )}
      <div className="lives-counter">{livesCount}</div>
      {livesCount == 0 ? (
        <div> YOU LOST!</div>
      ) : (
        <>
          {word ? (
            <>
              <div className="word" style={{ top: wordPosition + "%" }}>
                <p>{word.word}</p>
              </div>
              <ul className="words-list">
                {randomAnswers.map((elem, i) => {
                  return (
                    <li
                      onClick={() => {
                        if (elem === word.wordTranslate) {
                          setDropSize(dropSize + 10);
                        } else {
                          setLivesCount(livesCount - 1);
                        }
                        nextWord(words);
                      }}
                      key={i}
                    >
                      {i + 1}. {elem}
                    </li>
                  );
                })}
              </ul>
            </>
          ) : (
            ""
          )}
        </>
      )}
      <div className="drop">
        <img src={drop} style={{ width: dropSize, height: dropSize }} />
      </div>
    </div>
  );
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
