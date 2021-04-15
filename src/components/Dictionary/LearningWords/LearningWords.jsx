import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Accordion, Button, Card, Container } from "react-bootstrap";
import Cards from "../../Card/Card";

const LearningWords = ({ incomingWords }) => {
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
                  <p>{el.userWord.optional.rightAnswersCount}</p>
                  <p>{el.userWord.optional.wrongAnswersCount}</p>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={i + 1}>
                  <div className="content">
                    <Card.Body>{Cards(el)}</Card.Body>
                    {buttons && (
                      <div className="buttons-wrapper">
                        {isHard && <Button className="button-action">Восстановить</Button>}
                        {!isHard && (
                          <Button className="button-action">
                            Добавить в раздел "Сложные слова"
                          </Button>
                        )}
                        <Button className="button-action">Удалить</Button>
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
