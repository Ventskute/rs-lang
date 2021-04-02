import React, { useEffect, useState } from 'react';
import { Accordion, Button, Card, Container } from 'react-bootstrap';
import { getWords } from '../../utils/api/api';
import Cards from '../Card/Card';

import './WordsList.scss';

export default function WordsList({ incomingWords }) {
  const [words, setWords] = useState(incomingWords);
  useEffect(() => {
    if (!incomingWords) {{
      getWords(0, 0)
      .then((arr) => {
        console.log(arr);
        setWords(arr);
      })
    }}
  }, [])

  return (
    <Container >
      <Accordion>
        {words && words.map((el, i) => {
          return (
            <Card key={i} className='card-collapsed' bg={false ? 'danger' : 'light'}>
              <Accordion.Toggle as={Card.Header} eventKey={i + 1} className='wordlist-item'>
                <p>{el.word}</p>
                <p>{el.transcription}</p>
                <p>{el.wordTranslate}</p>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={i + 1}>
                <div className='content'>
                  <Card.Body>{Cards(el)}</Card.Body>
                  <div className='buttons-wrapper'>
                    <Button className='button-action'>Добавить в раздел "Сложные слова"</Button>
                    <Button className='button-action'>Удалить</Button>
                  </div>
                </div>
              </Accordion.Collapse>
            </Card>)
          }
        )}
      </Accordion>
    </Container>
  )
}