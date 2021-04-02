import React from 'react';
import './Textbook.scss';
import video from '../../assets/images/background-video6.mp4';

function Textbook() {
  const textBookSections = Array(6).fill(null);
  return (
    <div id="video-bg">
      <video id="background-video" loop autoPlay>
        <source src={video} type="video/mp4" />
      </video>
      <div className="textbook textbook-content">
        <h1 className="textbook__title">Digital Textbook</h1>
        <div className="sections textbook__sections">
          <h2 className="sections__title">Sections difficulty</h2>
          <div className="sections__content">
            {textBookSections.map((el, index) => (
              <div className={` button button__section button__section_${index + 1}`}>
                {index + 1}
              </div>
            ))}
          </div>
        </div>
        <div className="textbook__settings">
          <div className="translation-settings">
            <input className="translation-settings__checkbox" type="checkbox" />
            <span className="translation-settings__checkbox_description">
              Display translations of words/sentences
            </span>
          </div>
          <div className="translation-settings">
            <input className="translation-settings__checkbox" type="checkbox" />
            <span className="translation-settings__checkbox_description">
              Display words options
            </span>
          </div>
        </div>
        <div className="table"></div>
        <div className="textbook__games games">
            <div className="game-item games__savanna">Savanna</div>
            <div className="game-item games__sprint">Sprint</div>
            <div className="game-item games__puzzle">Puzzle</div>
            <div className="game-item games__self-made">Self-made</div>
        </div>
      </div>
    </div>
  );
}

export default Textbook;
