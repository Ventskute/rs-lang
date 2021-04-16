import React, { useEffect, useState } from "react";
import { Button, Container, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import Card from "../../components/Card/Card";
import Difficulty from "../../components/Difficulty/Difficulty";
import GameStats from "../../components/GameStats/GameStats";
import { getStaticURL, getWords } from "../../utils/api";
import { submitGameResult, submitRightAnswer, submitWrongAnswer } from "../../utils/api/api";
import { Filler } from "../../utils/fillWords";
import { useFullScreen } from "../../utils/games/useFullScreen";

import "./Fillwords.scss";

export default function Fillwords() {
  const { user } = useSelector((state) => state);
  const [words, setWords] = useState([]);
  const [matrix, setMatrix] = useState(null);
  const [colour, setColour] = useState(null);
  const [selection, setSelection] = useState([]);
  const [mouseDown, setMouseDown] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [foundWords, setFoundWords] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [winStreak, setWinStreak] = useState(0);
  const [finalWinStreak, setFinalWinStreak] = useState(0);
  const { group, page = 0 } = useParams();
  const [difficulty, setDifficulty] = useState(group && +group);
  const size = 5 + difficulty;

  const isDifficulty = () => typeof difficulty === "number";

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
            help++;
          }
        }
      }

      if (error > 50) {
        console.error("ERROR");
        break;
      }
    }

    const a = Filler.FillField(
      selected.map((el) => el.word),
      size,
      size * size
    );

    if (a.some((row) => row.includes(null))) {
      selected = findWords(array.sort(() => 0.5 - Math.random()));
    } else {
      setMatrix(a);
    }
    return selected;
  };

  const refToGameRoot = useFullScreen();

  useEffect(() => {
    if (isDifficulty()) {
      getWords(difficulty, page || Math.round(Math.random() * 29)).then((data) =>
        setWords(findWords(data.sort(() => 0.5 - Math.random())))
      );
    }
  }, [difficulty]);

  useEffect(() => {
    selection.forEach((el) => {
      if (!el.classList.contains("found")) {
        el.style.backgroundColor = colour;
      }
    });
  }, [selection]);

  const handleMouseDown = (e) => {
    setMouseDown(true);
    if (!e.target.classList.contains("found")) {
      setColour("#" + (Math.random().toString(16) + "000000").substring(2, 8).toUpperCase());
      setSelection((state) => [...state, e.target]);
    }
  };

  const handleMouseEnter = (e) => {
    if (mouseDown && !e.target.classList.contains("found")) {
      setSelection((state) => [...state, e.target]);
    }
  };

  const buildWord = () => {
    return selection.map((el) => el.textContent).join("");
  };

  const ModalWarn = (props) => {
    return (
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Внимание!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Такое слово есть. Попробуйте составить его иначе.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Закрыть</Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const handleMouseUp = () => {
    if (
      words.some((el) => el.word === buildWord()) &&
      selection.every((el) => el.dataset.word === selection[0].dataset.word)
    ) {
      selection.forEach((el) => el.classList.add("found"));
      const foundWord = words.find((el) => el.word === buildWord());
      setFoundWords([foundWord, ...foundWords]);
      setWinStreak((winStreak) => winStreak + 1);
      // user&&submitRightAnswer(user.userId, foundWord.id)
    } else if (
      words.some((el) => el.word === buildWord()) &&
      !selection.every((el) => el.dataset.word === selection[0].dataset.word)
    ) {
      console.log("Составьте слово иначе");
      selection.forEach((el) => (el.style.backgroundColor = ""));
      setShowModal(true);
    } else {
      selection.forEach((el) => (el.style.backgroundColor = ""));
    }
    setMouseDown(false);
    setSelection([]);
    if (
      Array.from(document.querySelectorAll(".word-card")).every((el) =>
        el.classList.contains("found")
      ) &&
      !isWin &&
      words[0]
    ) {
      user &&
        submitGameResult(
          user.userId,
          "fillWords",
          finalWinStreak,
          foundWords.length - wrongAnswers.length,
          wrongAnswers.length
        );
      setIsWin(true);
    }
  };

  const playAudio = (audio) => {
    new Audio(getStaticURL(audio)).play();
  };

  const handleHelpButton = () => {
    const helpWord = words.find((el) => !foundWords.includes(el));
    playAudio(helpWord.audio);
    user && submitWrongAnswer(user.userId, helpWord.id);
    setFinalWinStreak((finalWinStreak) => {
      const streak = winStreak > finalWinStreak ? winStreak : finalWinStreak;
      setWinStreak(0);
      return streak;
    });
    if (!wrongAnswers.find((wrongAns) => wrongAns.id === helpWord.id)) {
      setWrongAnswers([...wrongAnswers, helpWord]);
    }
  };

  return (
    <>
      <div className="game game-fillwords" ref={refToGameRoot}>
        <Container className="description">
          <h1>Филворды</h1>
          <p>
            Ищите слова в поле. Нажмите на квадрат, перетягивайте мышку от буквы к букве. По
            диагонали составить слово нельзя.
          </p>
        </Container>
        {!isDifficulty() && <Difficulty setDifficulty={setDifficulty} />}
        {isDifficulty() && (
          <Container>
            {!isWin && (
              <div
                className="game-field"
                style={{ gridTemplate: `repeat(${size}, 50px) / repeat(${size}, 50px)` }}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                {matrix &&
                  matrix.map((el) => {
                    return el.map((letter, i) => (
                      <div
                        className="word-card"
                        key={i}
                        data-word={letter[1]}
                        onMouseEnter={handleMouseEnter}
                      >
                        {letter[0]}
                      </div>
                    ));
                  })}
              </div>
            )}
            {!isWin && (
              <Button onClick={() => handleHelpButton()} className="button-hint">
                Подсказка
              </Button>
            )}
            {isWin && (
              <>
                <GameStats
                  rightAnswers={words.filter((word) => {
                    const rightAnss = !wrongAnswers.includes(word);
                    return rightAnss;
                  })}
                  wrongAnswers={wrongAnswers}
                  rightAnswersStreak={finalWinStreak}
                />
                <Button onClick={() => window.location.reload()} className="button-hint">
                  Начать заново
                </Button>
              </>
            )}
            <div className="found-cards-wrapper">
              {foundWords.map((el, i) => (
                <Card {...el} key={i}></Card>
              ))}
            </div>
          </Container>
        )}
      </div>
      <ModalWarn show={showModal} onHide={() => setShowModal(false)} />
    </>
  );
}
