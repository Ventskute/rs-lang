import React from "react";
import "./Textbook.scss";
import video from "../../assets/images/background-video6.mp4";
import { Tabs, Tab, Button } from "react-bootstrap";
import PaginationWordList from "../Pagination/Pagination";

import SettingsBlock from "./SettingsBlock/SettingsBlock";
import GamesBlock from "../GamesBlock/GamesBlock";
import WordsList from "../WordsList/WordsList";
import { Container } from "react-bootstrap";
import Footer from "../Footer/Footer";
import { textBookLS } from "../../utils/localStore";
import Header from "../Header/Header";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";

function Textbook() {
  const { user } = useSelector((state) => state);
  const textBookSections = Array(6).fill(null);

  const [difficulty, setDifficulty] = React.useState(
    textBookLS.getTextBookLS() ? textBookLS.getTextBookLS()[0] : 0
  );

  const [page, setPage] = React.useState(
    textBookLS.getTextBookLS() ? textBookLS.getTextBookLS()[1] : { currentPage: 1 }
  );

  React.useEffect(() => {
    textBookLS.setTextBook(page, difficulty);
  }, [page, difficulty]);

  const onClickCategory = (e) => {
    setDifficulty(Number.parseInt(e));
  };

  return (
    <div className="textbook">
      <Header />
      <Container className="textbook-content">
        { user &&
          <Link to="/dictionary" className="dict-link">
          <Button variant="primary" className="dict-link--button">
            Перейти в словарь
          </Button>
        </Link>
        }
        <SettingsBlock />
        <h1 className="textbook__title">Электронный учебник</h1>
        <div className="sections textbook__sections">
          <h2 className="sections__title">Секции сложности</h2>
          <div className="sections__content">
            <Tabs id="controlled-tab" activeKey={difficulty} onSelect={onClickCategory}>
              {textBookSections.map((el, i) => (
                <Tab key={i} eventKey={i} title={i + 1}></Tab>
              ))}
            </Tabs>
          </div>
        </div>
        <WordsList page={page.currentPage - 1} difficulty={difficulty} />
        <PaginationWordList state={page} setState={setPage} />
        <h2>Мини-игры</h2>
        <GamesBlock page={page.currentPage - 1} group={difficulty} />
      </Container>
      <Footer />
    </div>
  );
}

export default Textbook;
