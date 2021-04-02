import './GamesBlock.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { gamesArr } from '../../utils/games/blockArrays';

function GamesBlock(onClick) {
  return (
    <div className="games">
      {gamesArr.map(({ name, className, link }, i) => (
        <Link to={`${link}`} key={i}>
          <div key={i} className={`game-item games__${className}`} onClick={(e) => console.log(e)}>
            {name}
          </div>
        </Link>
      ))}
    </div>
  );
}

export default GamesBlock;
