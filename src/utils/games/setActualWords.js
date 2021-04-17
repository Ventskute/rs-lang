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
  const fetchedWords = userId
    ? await getAggregatedWords(userId, difficulty, page)
    : await getWords(difficulty, page);

  const promiseAnswers = [];
  if (ansOptions > 1) {
    for (let i = 0; i < ansOptions; i++) {
      promiseAnswers.push(getWords(difficulty, getRand(29, [page])));
    }
  }

  const fetchedAnswers = await Promise.all(promiseAnswers);

  const wordsWithAnsOptions = fetchedWords.map((word, i) => {
    const fakeTranslates = [];

    for (let k = 0; k < ansOptions - 1; k++) {
      fakeTranslates.push(fetchedAnswers[k][i].wordTranslate);
    }

    word.fakeTranslates = fakeTranslates;
    return word;
  });

  setWords(wordsWithAnsOptions);
};
