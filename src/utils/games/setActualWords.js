import { getAggregatedWords, getWords } from "../api/api";
import { getRand } from "./getRand";

const nullable = (data, init) => (data === null ? init : data);

export const setActualWords = async (
  userId,
  setWords = () => {
    throw new Error("you should provide setWords func to setActualWords");
  },
  difficulty = 0,
  words = [],
  page = 0,
  wordsNum = 10,
  ansOptions = 1
) => {
  const wordsPerPage = nullable(wordsNum, 10) * nullable(ansOptions, 1);
  const fetchedWords = userId
    ? await getAggregatedWords(userId, difficulty, page, wordsPerPage)
    : await getWords(difficulty, page);

  const promiseAnswers = [];
  if (ansOptions > 1) {
    for (let i = 0; i < ansOptions; i++) {
      promiseAnswers.push(getWords(difficulty, getRand(29, [page])));
    }
  }

  // if (ansOptions > 1) {
  // const wordsWithoutFakeTranslates = fetchedWords.slice(0, wordsNum);
  // const wordsWithFakeTranslates = wordsWithoutFakeTranslates.map((word, i) => {
  //   const start = wordsNum + i * (ansOptions - 1);
  //   const end = start + ansOptions - 1;
  //   word.fakeTranslates = fetchedWords.slice(start, end).map((word) => word.wordTranslate);
  //   return word;
  // });

  const fetchedAnswers = await Promise.all(promiseAnswers);

  const wordsWithAnsOptions = fetchedWords.map((word, i) => {
    const start = i * ansOptions;
    const end = start + ansOptions;
    // console.log("fetchedData", fetchedWords);
    // console.log("fetchedAnswers", fetchedAnswers);
    // console.log("start", start, "end", end);
    // console.log(
    //   "fakeTranslates",
    //   fetchedAnswers.slice(start, end).map((word) => word.wordTranslate)
    // );

    const fakeTranslates = [];

    for (let k = 0; k < ansOptions - 1; k++) {
      fakeTranslates.push(fetchedAnswers[k][i].wordTranslate);
    }

    // word.fakeTranslates = fetchedAnswers.slice(start, end).map((word) => word.wordTranslate);
    word.fakeTranslates = fakeTranslates;
    return word;
  });

  // setWords(wordsWithFakeTranslates);
  // } else {
  setWords(wordsWithAnsOptions);
  // }
};
