import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getDeletedWords, getNormalWords, getHardWords } from "../../utils/api/api";
import TabPages from "./TabPages/TabPages";
import LearningWords from "./LearningWords/LearningWords";

import "./Dictionary.scss";
import Header from '../Header/Header';

const Dictionary = () => {
  const { user } = useSelector((state) => state);
  const initialWords = {
    learning: [],
    hard: [],
    deleted: [],
  };
  const [words, setWords] = useState(initialWords);
  useEffect(async () => {
    const learning = await getNormalWords(user.userId);
    const hard = await getHardWords(user.userId);
    const deleted = await getDeletedWords(user.userId);

    setWords({ deleted, hard, learning });
  }, []);

  return (
    <div className="dictionary">
      <Header />
      <Tabs className="dictionary-tabs">
        <Tab eventKey="learning" title="learning">
          {words.learning[0] && (
            <TabPages words={words.learning} WordsListImplementation={LearningWords} />
          )}
        </Tab>
        <Tab eventKey="hard" title="hard">
          {words.hard[0] && <TabPages words={words.hard} />}
        </Tab>
        <Tab eventKey="deleted" title="deleted">
          {words.deleted[0] && <TabPages words={words.deleted} />}
        </Tab>
      </Tabs>
    </div>
  );
};

export default Dictionary;
