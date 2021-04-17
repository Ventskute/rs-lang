import React, { useCallback, useEffect, useState } from "react";
import { Accordion, Button, Card, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { addWordToHard, deleteWord } from "../../utils/api/api";
import { setActualWords } from "../../utils/games/setActualWords";
import Cards from "../Card/Card";

import "./WordsList.scss";

export default function WordsList({ incomingWords, difficulty, page }) {
  const { translations, buttons } = useSelector((state) => state.settings);
  const [words, setWords] = useState(incomingWords);
  const { user } = useSelector((state) => state);

  const handleDeleteClick = useCallback(
    (userId, elId) => {
      deleteWord(userId, elId);
      setWords((words) => {
        return words.filter((word) => word.id !== elId);
      });
    },
    [setWords]
  );
  const handleToHardClick = useCallback(
    (userId, elId) => {
      addWordToHard(userId, elId);
      setWords((words) => {
        return words.map((word) => {
          if (word.id === elId) word.userWord.difficulty = "hard";
          return word;
        });
      });
    },
    [setWords]
  );

  useEffect(() => {
    if (!incomingWords) {
      setActualWords(user && user.userId, setWords, difficulty, page, false, 1, true);
    } else {
      setWords(incomingWords);
    }
  }, [difficulty, page, incomingWords]);
  return (
    <Container>
      <Accordion>
        {words &&
          words.map((el, i) => {
            return (
              <Card
                key={i}
                className="card-collapsed"
                bg={el.userWord && el.userWord.difficulty !== "normal" ? "danger" : "light"}
                text={el.userWord && el.userWord.difficulty !== "normal" ? "light" : "dark"}
              >
                <Accordion.Toggle as={Card.Header} eventKey={i + 1} className="wordlist-item">
                  <p>{el.word}</p>
                  <p>{el.transcription}</p>
                  {translations && <p>{el.wordTranslate}</p>}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={i + 1}>
                  <div className="content">
                    <Card.Body>{Cards(el)}</Card.Body>
                    {buttons && user && (
                      <div className="buttons-wrapper">
                        <Button
                          onClick={() => handleToHardClick(user.userId, el.id)}
                          className="button-action"
                        >
                          Добавить в раздел "Сложные слова"
                        </Button>
                        <Button
                          className="button-action"
                          onClick={() => handleDeleteClick(user.userId, el.id)}
                        >
                          Удалить
                        </Button>
                      </div>
                    )}
                  </div>
                </Accordion.Collapse>
              </Card>
            );
          })}
      </Accordion>
    </Container>
  );
}
