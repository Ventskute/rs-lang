import { getDeletedWords, getLearningWords, getWords } from "../api/api";
import { getRand } from "./getRand";

const getPrevPage = (group, page) => {
  const prevPage = [group, page];
  if (page > 0) {
    prevPage[1]--;
    return prevPage;
  }
  if (page === 0 && group > 0) {
    prevPage[0]--;
    return prevPage;
  }
  if (page === 0 && group === 0) {
    return null;
  }
  throw new Error("invalid group or page in getPrevPage");
};

const deleteDeletedWords = async (userId, words = []) => {
  const deletedWords = await getDeletedWords(userId);
  const wordsWithoutDeletedWords = words.filter((word) => {
    return deletedWords.every((deletedWord) => deletedWord._id !== word.id);
  });

  return wordsWithoutDeletedWords;
};

const addLearningWords = async (userId, words = []) => {
  const learningWords = await getLearningWords(userId);
  const wordsWithLearning = words.map((word) => {
    const userWord = learningWords.find((userWord) => word.id === userWord._id);
    if (userWord) word.userWord = userWord.userWord;
    return word;
  });
  return wordsWithLearning;
};

const supWords = async (userId, group, page, wordsToSup = [], wordsNum = 20) => {
  const prevPage = getPrevPage(group, page);

  let supWords = prevPage ? await getWords(prevPage[0], prevPage[1]) : [];

  supWords = await deleteDeletedWords(userId, supWords);

  return wordsToSup.concat(supWords.slice(0, wordsNum - wordsToSup.length));
};

export const setActualWords = async (
  userId,
  setWords = () => {
    throw new Error("you should provide setWords func to setActualWords");
  },
  difficulty,
  page,
  wordsNum = 20,
  ansOptions = 1,
  learning = false
) => {
  let fetchedWords = await getWords(difficulty, page);

  if (userId) {
    fetchedWords = await deleteDeletedWords(userId, fetchedWords);
    if (wordsNum) fetchedWords = await supWords(userId, difficulty, page, fetchedWords, wordsNum);
    if (learning) fetchedWords = await addLearningWords(userId, fetchedWords);
  }

  if (ansOptions > 1) {
    const promiseAnswers = [];
    for (let i = 0; i < ansOptions; i++) {
      promiseAnswers.push(getWords(difficulty, getRand(29, [page])));
    }

    const fetchedAnswers = await Promise.all(promiseAnswers);

    fetchedWords = fetchedWords.map((word, i) => {
      const fakeTranslates = [];

      for (let k = 0; k < ansOptions - 1; k++) {
        fakeTranslates.push(fetchedAnswers[k][i].wordTranslate);
      }

      word.fakeTranslates = fakeTranslates;
      return word;
    });
  }

  setWords(fetchedWords);
};
