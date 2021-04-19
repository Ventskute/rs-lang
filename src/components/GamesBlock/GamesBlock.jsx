import "./GamesBlock.scss";
import React from "react";
import { Link } from "react-router-dom";
import { gamesArr } from "../../utils/games/blockArrays";
import { Button, Card } from "react-bootstrap";
import { getQuery } from "../../utils/api/api.utils";

function GamesBlock({ page, group }) {
  return (
    <div className="games">
      {gamesArr.map(({ name, className, link, description, img }, i) => (
        <Card className={`game-item games__${className}`} key={i}>
          <Card.Img variant="top" src={img} />
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>{description}</Card.Text>
            <Link to={`${link}/${group}/${page}`} key={i}>
              <Button variant="primary">Играть</Button>
            </Link>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default GamesBlock;
