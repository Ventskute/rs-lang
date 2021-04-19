import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import WordsList from "../../WordsList/WordsList";

const separateWords = (words, wordsNum) => {
  const wordsArr = [];
  let i = 0;
  let startIndex = 0;
  while (words.length > i * wordsNum) {
    i++;
    wordsArr.push(words.slice(startIndex, wordsNum * i));
    startIndex += wordsNum;
  }
  return wordsArr;
};

const PageSeparator = ({ words, wordsNum, activePage, handleClick }) => {
  const wordsArr = separateWords(words, wordsNum);

  return (
    <Pagination>
      {wordsArr.map((words, i) => (
        <Pagination.Item key={i} active={i + 1 === activePage} onClick={() => handleClick(i + 1)}>
          {i + 1}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};

const GroupSeparator = ({ words, WordsListImplementation }) => {
  const [activePage, setActivePage] = useState(1);

  const handleClick = (pageNum) => {
    setActivePage(pageNum);
  };
  const wordsList = words.slice((activePage - 1) * 20, activePage * 20);
  return (
    <>
      {WordsListImplementation ? (
        <WordsListImplementation incomingWords={wordsList} />
      ) : (
        <WordsList incomingWords={wordsList} />
      )}
      <PageSeparator
        words={words}
        wordsNum={20}
        activePage={activePage}
        handleClick={handleClick}
      />
    </>
  );
};

const TabPages = ({ words, WordsListImplementation }) => {
  const wordsByGroups = [[], [], [], [], [], []];
  words.forEach((word) => {
    wordsByGroups[word.group].push(word);
  });
  return (
    <>
      <Tabs>
        {wordsByGroups.map((wordsArr, i) => (
          <Tab key={i} eventKey={i + 1} title={i + 1}>
            <GroupSeparator words={wordsArr} WordsListImplementation={WordsListImplementation} />
          </Tab>
        ))}
      </Tabs>
    </>
  );
};

export default TabPages;
