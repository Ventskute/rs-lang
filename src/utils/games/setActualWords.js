import { getAggregatedWords, getWords } from "../api/api";

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

  if (ansOptions > 1) {
    const wordsWithoutFakeTranslates = fetchedWords.slice(0, wordsNum);
    const wordsWithFakeTranslates = wordsWithoutFakeTranslates.map((word, i) => {
      const start = wordsNum + i * (ansOptions - 1);
      const end = start + ansOptions - 1;
      word.fakeTranslates = fetchedWords.slice(start, end).map((word) => word.wordTranslate);
      return word;
    });

    setWords(wordsWithFakeTranslates);
  } else {
    setWords(fetchedWords);
  }
};
