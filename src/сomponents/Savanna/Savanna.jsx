import React, { useState } from "react";

import "./Savanna.scss";
let previousIndexes = [];

function RandomIndex(seed) {
  let index = Math.floor(Math.random() * seed);
  if (previousIndexes.includes(index)) {
    return RandomIndex(seed);
  }
  previousIndexes.push(index);
  return index;
}

function GetRandomAnswers(answer, words) {
  let answers = [answer];
  do {
    const rand = Math.floor(Math.random() * words.length);
    let t = answers.filter((v) => {
      return v === words[rand].translation;
    });
    if (t.length == 0) {
      answers.push(words[rand].translation);
    }
  } while (answers.length < 4);

  return shuffle(answers);
}

let livesCount = 5;

export default function Savanna(props) {
  let index;
  if (previousIndexes.length === 0) {
    index = RandomIndex(props.words.length);
  }
  const [word, setWord] = useState(props.words[index]);

  let answers = GetRandomAnswers(word.translation, props.words);

  return (
    <div className="savanna">
      <div className="lives-counter">{livesCount}</div>
      {livesCount == 0 ? (
        <div> YOU LOST!</div>
      ) : (
        <>
          <div className="word">
            <p>{word.word}</p>
          </div>
          <ul className="words-list">
            {answers.map((elem, i) => {
              return (
                <li
                  onClick={() => {
                    if (elem === word.translation) {
                      setWord(props.words[RandomIndex(props.words.length)]);
                    } else {
                      setWord(props.words[RandomIndex(props.words.length)]);
                      livesCount--;
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
      )}
    </div>
  );
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
