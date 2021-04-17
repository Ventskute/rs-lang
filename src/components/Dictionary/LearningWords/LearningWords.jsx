import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Accordion, Button, Card, Container } from "react-bootstrap";
import Cards from "../../Card/Card";

export const DictionaryWords = ({ incomingWords, restoreHandler, deleteHandler, wordType }) => {
  const { translations, buttons } = useSelector((state) => state.settings);
  const [words, setWords] = useState(incomingWords);
  const { user } = useSelector((state) => state);
  useEffect(() => {
    if (incomingWords) {
      setWords(incomingWords);
    }
  }, [incomingWords]);

  return (
    <Container>
      <Accordion>
        {words &&
          words.map((el, i) => {
            const isHard = el.userWord && el.userWord.difficulty !== "normal";
            const isDeleted = el.userWord && el.userWord.optional.wordStatus === "deleted";
            return (
              <Card key={i} className="card-collapsed" bg={isHard ? "danger" : "light"}>
                <Accordion.Toggle as={Card.Header} eventKey={i + 1} className="wordlist-item">
                  <p>{el.word}</p>
                  <p>{el.transcription}</p>
                  {translations && <p>{el.wordTranslate}</p>}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={i + 1}>
                  <div className="content">
                    <Card.Body>{Cards(el)}</Card.Body>
                    {buttons && (
                      <div className="buttons-wrapper">
                        <Button
                          onClick={() => restoreHandler(user.userId, el._id, wordType)}
                          className="button-action"
                        >
                          Восстановить
                        </Button>
                        {!isDeleted && (
                          <Button
                            onClick={() => deleteHandler(user.userId, el._id, wordType)}
                            className="button-action"
                          >
                            Удалить
                          </Button>
                        )}
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
};

const LearningWords = ({
  incomingWords,
  restoreHandler,
  deleteHandler,
  addToHardHandler,
  wordType,
}) => {
  const { user } = useSelector((state) => state);
  const { translations, buttons } = useSelector((state) => state.settings);
  const [words, setWords] = useState(incomingWords);
  useEffect(() => {
    if (incomingWords) {
      setWords(incomingWords);
    }
  }, [incomingWords]);

  return (
    <Container>
      <Accordion>
        {words &&
          words.map((el, i) => {
            const isHard = el.userWord && el.userWord.difficulty !== "normal";
            return (
              <Card key={i} className="card-collapsed" bg={isHard ? "danger" : "light"}>
                <Accordion.Toggle as={Card.Header} eventKey={i + 1} className="wordlist-item">
                  <p>{el.word}</p>
                  <p>{el.transcription}</p>
                  {translations && <p>{el.wordTranslate}</p>}
                  <p className="correct-answer">{el.userWord.optional.rightAnswersCount}</p>
                  <p className="wrong-answer">{el.userWord.optional.wrongAnswersCount}</p>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={i + 1}>
                  <div className="content">
                    <Card.Body>{Cards(el)}</Card.Body>
                    {buttons && (
                      <div className="buttons-wrapper">
                        <Button
                          onClick={() => restoreHandler(user.userId, el._id, wordType)}
                          className="button-action"
                        >
                          Восстановить
                        </Button>
                        {!isHard && (
                          <Button
                            onClick={() => addToHardHandler(user.userId, el._id, wordType)}
                            className="button-action"
                          >
                            Добавить в раздел "Сложные слова"
                          </Button>
                        )}
                        <Button
                          onClick={() => deleteHandler(user.userId, el._id, wordType)}
                          className="button-action"
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
};

export default LearningWords;
