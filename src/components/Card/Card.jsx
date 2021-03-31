import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { getStaticURL } from '../../utils/api';

import './Card.scss';

export default function Cards({word, image, textExample}) {
  return (
    <Card>
      <Card.Img variant="top" src={getStaticURL(image)} />
      <Card.Body>
        <Card.Title>{word}</Card.Title>
        <Card.Text dangerouslySetInnerHTML={{__html: textExample}}></Card.Text>
        <Button variant="primary">There will be an audio</Button>
     </Card.Body>
    </Card>
  )
}