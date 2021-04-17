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
        const word = words[wordType].find((word) => word._id === wordId);
        return {
          ...words,
          [wordType]: words[wordType].filter((word) => word._id !== wordId),
          deleted: [...words.deleted, word],
        };
      });
    },
    [setWords]
  );

  const addToHardHandler = useCallback(
    (userId, wordId, wordType) => {
      addWordToHard(userId, wordId);
      setWords((words) => {
        const word = words[wordType].find((word) => word._id === wordId);
        return {
          ...words,
          [wordType]: words[wordType].map((word) => {
            if (word._id === wordId) word.userWord.difficulty = "hard";
            return word;
          }),
          hard: [...words.hard, word],
        };
      });
    },
    [setWords]
  );

  const restoreHandler = useCallback(
    (userId, wordId) => {
      deleteUserWord(userId, wordId);
      setWords((words) => {
        return {
          learning: words.learning.filter((word) => word._id !== wordId),
          deleted: words.deleted.filter((word) => word._id !== wordId),
          hard: words.hard.filter((word) => word._id !== wordId),
        };
      });
    },
    [setWords]
  );

  return (
    <div className="dictionary">
      <Header />
      <Tabs className="dictionary-tabs">
        <Tab eventKey="learning" title="изучаемые">
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
        <Tab eventKey="hard" title="трудные">
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
        <Tab eventKey="deleted" title="удаленные">
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
