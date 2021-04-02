import React from 'react';
import './Textbook.scss';
import video from '../../assets/images/background-video6.mp4';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Sonnet from 'react-bootstrap/Tabs';

import SettingsBlock from './SettingsBlock/SettingsBlock';
import GamesBlock from '../GamesBlock/GamesBlock';
import WordsList from '../WordsList/WordsList';

function Textbook() {
  const textBookSections = Array(6).fill(null);
  const [key, setKey] = React.useState('0');

  const onClickCategory = (e) => {
    setKey(e);
    console.log(e);
  };

  return (
    <div id="video-bg">
      <video id="background-video" loop autoPlay>
        <source src={video} type="video/mp4" />
      </video>
      <div className="textbook textbook-content">
        <h1 className="textbook__title">Электронный учебник</h1>
        <div className="sections textbook__sections">
          <h2 className="sections__title">Секции сложности</h2>
          <div className="sections__content">
            <Tabs id="controlled-tab-example" activeKey={key} onSelect={(e) => onClickCategory(e)}>
              {textBookSections.map((el, i) => (
                <Tab key={i} eventKey={i} title={i + 1}>
                  <Sonnet />
                </Tab>
              ))}
            </Tabs>
          </div>
        </div>
        <SettingsBlock />
        <WordsList />
        <GamesBlock />
      </div>
    </div>
  );
}

export default Textbook;
