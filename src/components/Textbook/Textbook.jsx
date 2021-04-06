import React from 'react';
import './Textbook.scss';
import video from '../../assets/images/background-video6.mp4';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Sonnet from 'react-bootstrap/Tabs';
import PaginationWordList from '../Pagination/Pagination';

import SettingsBlock from './SettingsBlock/SettingsBlock';
import GamesBlock from '../GamesBlock/GamesBlock';
import WordsList from '../WordsList/WordsList';
import { Container } from 'react-bootstrap';
import Footer from '../Footer/Footer';
import { textBookLS } from '../../utils/localStore';

function Textbook() {
  const textBookSections = Array(6).fill(null);
  const [difficulty, setDifficulty] = React.useState(
    textBookLS.getTextBookLS() ? textBookLS.getTextBookLS()[0] : 0,
  );
  const [page, setPage] = React.useState(
    textBookLS.getTextBookLS() ? textBookLS.getTextBookLS()[1] : { currentPage: 1 },
  );

  React.useEffect(() => {
    textBookLS.setTextBook(page, difficulty);
  }, [page, difficulty]);
  const onClickCategory = (e) => {
    setDifficulty(e);
    console.log(e);
  };

  return (
    <div className="textbook">
      <video className="background-video" loop autoPlay>
        <source src={video} type="video/mp4" />
      </video>
      <Container className="textbook-content">
        <SettingsBlock />
        <h1 className="textbook__title">Электронный учебник</h1>
        <div className="sections textbook__sections">
          <h2 className="sections__title">Секции сложности</h2>
          <div className="sections__content">
            <Tabs
              id="controlled-tab-example"
              activeKey={difficulty}
              onSelect={(e) => onClickCategory(e)}>
              {textBookSections.map((el, i) => (
                <Tab key={i} eventKey={i} title={i + 1}>
                  <Sonnet />
                </Tab>
              ))}
            </Tabs>
          </div>
        </div>
        <WordsList page={page.currentPage - 1} difficulty={difficulty} />
        <PaginationWordList state={page} setState={setPage} />
        <GamesBlock />
      </Container>
      <Footer />
    </div>
  );
}

export default Textbook;
