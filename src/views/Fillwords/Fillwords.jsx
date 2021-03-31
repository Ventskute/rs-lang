import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Card from "../../components/Card/Card";
import { getWords } from "../../utils/api";
import { Filler } from "../../utils/fillWords";

import "./Fillwords.scss";

export default function Fillwords({ difficulty = 0 }) {
  const [words, setWords] = useState([]);
  const [matrix, setMatrix] = useState(null);
  const [colour, setColour] = useState(null);
  const [selection, setSelection] = useState([]);
  const [mouseDown, setMouseDown] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [foundWords, setFoundWords] = useState([]);

  const size = 5 + difficulty;

  const findWords = (array) => {
    const newArray = [...array];
    let wordsLength = size * size;
    let selected = [];
    let i = 0;
    let error = 0;

    while (wordsLength > 0) {
      if (newArray[i].word.length <= wordsLength) {
        selected.push(newArray[i]);
        selected.sort((a, b) => b.word.length - a.word.length);
        wordsLength -= newArray.splice(i, 1)[0].word.length;
      } else if (i < newArray.length - 1) {
        i++;
      } else {
        let help = 0;

        while (true) {
          const l = selected[0].word.length;
          const newEl = newArray.find((el) => el.word.length === l - 1 - help);

          if (newEl) {
            selected[0] = newEl;
            wordsLength += 1 + help;
            i = 0;
            error++;
            break;
          } else {
            help++
          }
        }
      }

      if (error > 50) {
        console.error('ERROR')
        break;
      }
    }

    const a =  Filler.FillField(selected.map((el) => el.word), size, size * size);

    if (a.some(row => row.includes(null))) {
      selected = findWords(array.sort(() => 0.5 - Math.random()))
    } else {
      setMatrix(a)
    }

    console.log(selected)
    return selected;
  };

  useEffect(() => {
    getWords(difficulty, Math.round(Math.random() * 29)).then((data) =>
      setWords(findWords(data.sort(() => 0.5 - Math.random())))
    );
  }, []);

  useEffect(() => {
    selection.forEach((el) => {
      if (!el.classList.contains('found')) {
        el.style.backgroundColor = colour;
      }
    });
  }, [selection]);

  const handleMouseDown = (e) => {
    setMouseDown(true)
    if (!e.target.classList.contains('found')) {
      setColour('#' + (Math.random().toString(16) + '000000').substring(2,8).toUpperCase());
      setSelection(state => [...state, e.target]);
    }
  }

  const handleMouseEnter = (e) => {
    if (mouseDown && !e.target.classList.contains('found')) {
      setSelection(state => [...state, e.target]);
    }
  }

  const buildWord = () => {
    return selection.map((el) => el.textContent).join('')
  }

  const handleMouseUp = () => {
    if (words.some(el => el.word === buildWord()) &&
        selection.every(el => el.dataset.word === selection[0].dataset.word)) {
      selection.forEach((el) => el.classList.add('found'));
      setFoundWords([words.find(el => el.word === buildWord()), ...foundWords]);
    } else {
      selection.forEach((el) => el.style.backgroundColor = '')
    }
    setMouseDown(false);
    setSelection([]);
    if (Array.from(document.querySelectorAll('.word-card')).every(el => el.classList.contains('found'))&&!isWin){
      setIsWin(true);
    }
  }

  return (
    <div className="game game-fillwords">
      <Container>
        <div className="game-field" style={{gridTemplate: `repeat(${size}, 50px) / repeat(${size}, 50px)`}} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
          {matrix && matrix.map((el) => {
            return el.map((letter, i) => (
              <div className="word-card" key={i} data-word={letter[1]} onMouseEnter={handleMouseEnter}>{letter[0]}</div>
            ))}
          )}
        </div>
        <div className="found-cards-wrapper">
          {foundWords.map((el,i) => <Card {...el} key={i}></Card>)}
        </div>
      </Container>
    </div>
  );
}
