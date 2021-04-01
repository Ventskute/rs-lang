import React from 'react';
import { Badge, Button, Card } from 'react-bootstrap';
import { getStaticURL } from '../../utils/api';

import './Card.scss';

const playAudio = (audio) => {
  new Audio(getStaticURL(audio)).play();
}

export default function Cards({word, image, textExample, transcription, wordTranslate, textMeaning, textMeaningTranslate, textExampleTranslate, audio, audioExample, audioMeaning}) {
  return (
    <Card>
      <Card.Img variant="top" src={getStaticURL(image)} />
      <Card.Body>
        <Card.Title>{word}</Card.Title>
        <div className='text-button'>
          <Card.Text>{transcription}</Card.Text>
          <Button variant="primary" className='play' onClick={() => playAudio(audio)}>▶</Button>
        </div>
        <Card.Text>{wordTranslate}</Card.Text>
        <div className='text-button'>
          <Card.Text dangerouslySetInnerHTML={{__html: textMeaning}}></Card.Text>
          <Button variant="primary" className='play' onClick={() => playAudio(audioMeaning)}>▶</Button>
        </div>
        <Card.Text>{textMeaningTranslate}</Card.Text>
        <div className='text-button'>
          <Card.Text dangerouslySetInnerHTML={{__html: textExample}}></Card.Text>
          <Button variant="primary" className='play' onClick={() => playAudio(audioExample)}>▶</Button>
        </div>
        <Card.Text>{textExampleTranslate}</Card.Text>
     </Card.Body>
    </Card>
  )
}