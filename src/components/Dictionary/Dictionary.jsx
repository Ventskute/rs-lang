import React, { useCallback, useEffect, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  deleteUserWord,
  getDeletedWords,
  getHardWords,
  getLearningWords,
  deleteWord,
  addWordToHard,
} from "../../utils/api/api";
import TabPages from "./TabPages/TabPages";
import LearningWords, { DictionaryWords } from "./LearningWords/LearningWords";

import "./Dictionary.scss";
import Header from "../Header/Header";
import { useLocation } from "react-router";

const Dictionary = () => {
  const { user } = useSelector((state) => state);
  const location = useLocation();

  const initialWords = {
    learning: [],
    hard: [],
    deleted: [],
  };

  localStorage.setItem("page", location.pathname);

  const [words, setWords] = useState(initialWords);
  useEffect(async () => {
    const learning = await getLearningWords(user.userId);
    const hard = await getHardWords(user.userId);
    const deleted = await getDeletedWords(user.userId);

    setWords({ deleted, hard, learning });
  }, []);

  const deleteWordHandler = useCallback(
    (userId, wordId, wordType) => {
      deleteWord(userId, wordId);
      setWords((words) => {
        return { ...words, [wordType]: words[wordType].filter((word) => word._id !== wordId) };
      });
      setWords((words) => {
        getDeletedWords(user.userId).then((deleted) => setWords({ ...words, deleted }));
      });
    },
    [setWords]
  );

  const addToHardHandler = useCallback(
    (userId, wordId, wordType) => {
      addWordToHard(userId, wordId);
      setWords((words) => {
        return {
          ...words,
          [wordType]: words[wordType].map((word) => {
            if (word._id === wordId) word.userWord.difficulty = "hard";
            return word;
          }),
        };
      });
      setWords((words) => {
        getHardWords(user.userId).then((hard) => setWords({ ...words, hard }));
      });
    },
    [setWords]
  );

  const restoreHandler = useCallback(
    (userId, wordId, wordType) => {
      deleteUserWord(userId, wordId);
      setWords((words) => {
        return { ...words, [wordType]: words[wordType].filter((word) => word._id !== wordId) };
      });
    },
    [setWords]
  );

  return (
    <div className="dictionary">
      <Header />
      <Tabs className="dictionary-tabs">
        <Tab eventKey="learning" title="learning">
          {words && words.learning[0] && (
            <TabPages
              words={words.learning}
              WordsListImplementation={({ incomingWords }) => (
                <LearningWords
                  incomingWords={incomingWords}
                  restoreHandler={restoreHandler}
                  deleteHandler={deleteWordHandler}
                  addToHardHandler={addToHardHandler}
                  wordType="learning"
                />
              )}
            />
          )}
        </Tab>
        <Tab eventKey="hard" title="hard">
          {words && words.hard[0] && (
            <TabPages
              words={words.hard}
              WordsListImplementation={({ incomingWords }) => (
                <DictionaryWords
                  incomingWords={incomingWords}
                  restoreHandler={restoreHandler}
                  deleteHandler={deleteWordHandler}
                  wordType="hard"
                />
              )}
            />
          )}
        </Tab>
        <Tab eventKey="deleted" title="deleted">
          {words && words.deleted[0] && (
            <TabPages
              words={words.deleted}
              WordsListImplementation={({ incomingWords }) => (
                <DictionaryWords
                  incomingWords={incomingWords}
                  restoreHandler={restoreHandler}
                  wordType="deleted"
                />
              )}
            />
          )}
        </Tab>
      </Tabs>
    </div>
  );
};

export default Dictionary;
