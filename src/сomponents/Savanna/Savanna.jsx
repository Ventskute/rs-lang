import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./Savanna.scss";

export default function Savanna() {
  const [words, setWords] = useState([]);
  const [randomWords, setRandomWords] = useState([]);
  const [word, setWord] = useState();
  const [livesCount, setLivesCount] = useState(5);
  const [difficLevel, setDifficLevel] = useState(1);
  let { group, page } = useParams();

  useEffect(() => {
    fetch(
      `http://localhost:3000/words?group=${group ? group : difficLevel}&page=${
        page ? page : 1
      }`
    )
      .then((res) => res.json())
      .then((words) => {
        setWords(words);
        let randWords = GetRandomWords(words);
        setWord(randWords.pop());
        setRandomWords(randWords);
      });
  }, []);

  return (
    <div className="savanna">
      {group && page ? (
        ""
      ) : (
        <div>
          <select
            onChange={(e) => {
              setDifficLevel(e.target.value);
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
              <div className="word">
                <p>{word.word}</p>
              </div>
              <ul className="words-list">
                {GetRandomAnswers(word.wordTranslate, words).map((elem, i) => {
                  return (
                    <li
                      onClick={() => {
                        if (elem === word.wordTranslate) {
                          setWord(randomWords.pop());
                          setRandomWords(randomWords);
                        } else {
                          setWord(randomWords.pop());
                          setRandomWords(randomWords);
                          setLivesCount(livesCount - 1);
                        }
                      }}
                      key={i}
                    >
                      {elem}
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
    </div>
  );
}

function GetRandomWords(words) {
  let previousIndexes = [];
  let randomWords = [];
  for (let i = 0; i < words.length; i++) {
    randomWords.push(words[RandomIndex(previousIndexes, words.length)]);
  }
  return randomWords;
}

function RandomIndex(previousIndexes, seed) {
  let index = Math.floor(Math.random() * seed);
  if (previousIndexes.includes(index)) {
    return RandomIndex(previousIndexes, seed);
  }
  previousIndexes.push(index);
  return index;
}

function GetRandomAnswers(answer, words) {
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

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
