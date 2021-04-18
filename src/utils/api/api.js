import { createStatistics, fetchWrapper, getQuery, userWordOptions } from "./api.utils";
import { userLS } from "../localStore";

export const BASE_URL = "https://rs-lang-team-52.herokuapp.com/";

export const getWords = (group, page) => {
  const query = getQuery({ group, page });
  return fetch(`${BASE_URL}words${query}`)
    .then((response) => response.json())
    .catch((e) => {
      console.log("cant get words with error", e);
    });
};

export const signin = (body) => {
  let temp = {};
  return fetchWrapper(`${BASE_URL}signin`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(body),
  })
    .then((res) => {
      if (res.status === 200) {
        res
          .json()
          .then((data) => {
            if ("message" in data) {
              delete data.message;
            }
            temp = data;
            return data;
          })
          .then((data) => {
            return fetchWrapper(`${BASE_URL}users/${data.userId}`, {
              Authorization: `Bearer ${data.token}`,
            });
          })
          .then((res) => res.json())
          .then((r) => userLS.setUser({ ...temp, ...r }));
      }
      return res;
    })
    .catch((e) => console.log("cant signin with error", e));
};

export const signup = (body) => {
  return fetchWrapper(`${BASE_URL}users`, { method: "POST", body: body })
    .then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          if ("message" in data) {
            delete data.message;
          }
          signin({ password: body.get("password"), email: body.get("email") });
          // console.log(data);
          // userLS.setUser(data);
        });
      }
      return res;
    })
    .catch((e) => console.log("cant signup with error", e));
};

export const getAggregatedWords = async (userId, group, page, wordsPerPage = 3600, filter) => {
  if (!userId) {
    throw new Error('you should pass "userId" to "getAggregatedWords"');
  }
  let query = getQuery({
    group,
    page,
    wordsPerPage,
    filter: JSON.stringify(filter),
  });

  const fetchedData = await fetchWrapper(`${BASE_URL}users/${userId}/aggregatedWords${query}`)
    .then((response) => {
      if (response.status === 404) {
        return [{ paginatedResults: null }];
      }
      return response.json().then((data) => {
        return data;
      });
    })
    .catch((e) => {
      console.log("cant get aggregated words with error", e);
    });
  return fetchedData[0].paginatedResults;
};

export const getUserWord = async (userId, wordId) => {
  if (!wordId) {
    throw new Error('you should pass "wordId" to "getUserWord"');
  }
  if (!userId) {
    throw new Error('you should pass "userId" to "getUserWord"');
  }
  const response = await fetchWrapper(`${BASE_URL}users/${userId}/words/${wordId}`)
    .then((res) => {
      if (res.status === 404) {
        return Promise.resolve("word not found");
      }
      return res.json();
    })
    .then((data) => data)
    .catch((e) => {
      throw new Error("unexpected err in getUser Word", e);
    });
  return response;
};

export const getUserWords = async (userId) => {
  if (!userId) {
    throw new Error('you should pass "userId" to "getUserWord"');
  }
  const response = await fetchWrapper(`${BASE_URL}users/${userId}/words`)
    .then((res) => {
      if (res.status === 404) {
        throw new Error("word not found");
      }
      return res.json();
    })
    .then((data) => data);
  return response;
};

export const createUserWord = (userId, wordId, wordStatus, wordsDifficulty, isAnsRight) => {
  if (!wordId) {
    throw new Error('you should pass "wordId" to "createUserWord"');
  }
  if (!userId) {
    throw new Error('you should pass "userId" to "createUserWord"');
  }
  let rightAnswersCount = 0,
    wrongAnswersCount = 0;

  isAnsRight !== null && isAnsRight ? rightAnswersCount++ : wrongAnswersCount++;

  fetchWrapper(`${BASE_URL}users/${userId}/words/${wordId}`, {
    method: "POST",
    body: userWordOptions(wordStatus, wordsDifficulty, null, rightAnswersCount, wrongAnswersCount),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.status === 400) {
        throw new Error("bad request");
      }
    })
    .catch((e) => {
      throw new Error('unexpected err in "createUserWord"', e);
    });
};

export const updateUserWord = (
  userId,
  wordId,
  wordStatus,
  wordsDifficulty,
  date,
  rightAnswersCount,
  wrongAnswersCount
) => {
  if (!wordId) {
    throw new Error('you should pass "wordId" to "updateUserWord"');
  }
  if (!userId) {
    throw new Error('you should pass "userId" to "updateUserWord"');
  }
  fetchWrapper(`${BASE_URL}users/${userId}/words/${wordId}`, {
    method: "PUT",
    body: userWordOptions(wordStatus, wordsDifficulty, date, rightAnswersCount, wrongAnswersCount),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.status === 400) {
        throw new Error("bad request");
      }
    })
    .catch((e) => {
      throw new Error('unexpected err in "updateUserWord"', e);
    });
};

export const deleteUserWord = (userId, wordId) => {
  if (!wordId) {
    throw new Error('you should pass "wordId" to "deleteUserWord"');
  }
  if (!userId) {
    throw new Error('you should pass "userId" to "deleteUserWord"');
  }
  fetchWrapper(`${BASE_URL}users/${userId}/words/${wordId}`, {
    method: "DELETE",
  }).catch((e) => {
    throw new Error('unexpected err in "deleteUserWord"', e);
  });
};

export const checkIfUserWordExist = async (userId, wordId) => {
  const word = await getUserWord(userId, wordId);
  if (word === "word not found") {
    return false;
  } else if (word) {
    return word;
  }
};

export const submitRightAnswer = async (userId, wordId) => {
  if (!wordId) {
    throw new Error('you should pass "wordId" to "submitRightAnswer"');
  }
  if (!userId) {
    throw new Error('you should pass "userId" to "submitRightAnswer"');
  }

  const word = await checkIfUserWordExist(userId, wordId);

  if (word) {
    const { difficulty, optional } = word;
    let { wordStatus, date, rightAnswersCount, wrongAnswersCount } = optional;
    updateUserWord(
      userId,
      wordId,
      wordStatus,
      difficulty,
      date,
      ++rightAnswersCount,
      wrongAnswersCount
    );
  } //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  if (!word) {
    createUserWord(userId, wordId, "learning", "normal", true);
  }
};

export const submitWrongAnswer = async (userId, wordId) => {
  if (!wordId) {
    throw new Error('you should pass "wordId" to "submitWrongAnswer"');
  }
  if (!userId) {
    throw new Error('you should pass "userId" to "submitWrongAnswer"');
  }

  const word = await checkIfUserWordExist(userId, wordId);

  if (word) {
    const { difficulty, optional } = word;
    let { wordStatus, date, rightAnswersCount, wrongAnswersCount } = optional;
    updateUserWord(
      userId,
      wordId,
      wordStatus,
      difficulty,
      date,
      rightAnswersCount,
      ++wrongAnswersCount
    );
  } //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  if (!word) {
    createUserWord(userId, wordId, "learning", "normal", false);
  }
};

export const getDeletedWords = async (userId, group = null, page = null, wordsPerPage) => {
  const deletedWords = await getAggregatedWords(userId, group, page, wordsPerPage, {
    "userWord.optional.wordStatus": "deleted",
  });
  return deletedWords ? deletedWords : [];
};

export const getLearningWords = async (userId) => {
  const learningWords = await getAggregatedWords(userId, null, null, 3600, {
    "userWord.optional.wordStatus": "learning",
  });
  return learningWords ? learningWords : [];
};

export const getHardWords = async (userId) => {
  const hardWords = await getAggregatedWords(userId, null, null, 3600, {
    "userWord.difficulty": "hard",
  });
  return hardWords ? hardWords : [];
};

export const getNormalWords = async (userId) => {
  const normalWords = await getAggregatedWords(userId, null, null, 3600, {
    "userWord.difficulty": "normal",
  });
  return normalWords ? normalWords : [];
};

export const getLongTermStats = async (userId) => {
  const words = await getUserWords(userId);
  return words ? words.map((word) => word.optional.date) : [];
};

export const setUserStatistics = (userId, statistics) => {
  fetchWrapper(`${BASE_URL}users/${userId}/statistics`, {
    method: "PUT",
    body: statistics,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.status === 400) {
        throw new Error("bad request");
      }
    })
    .catch((e) => {
      throw new Error('unexpected err in "setUserStatistics"', e);
    });
};

export const getUserStatistics = async (userId) => {
  const response = await fetchWrapper(`${BASE_URL}users/${userId}/statistics`).then((res) => {
    if (res.status === 404) {
      return null;
    }
    return res.json().then((data) => data);
  });
  return response;
};

export const getShortTermStats = async (userId) => {
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const stats = await getUserStatistics(userId);
  return stats;
};

export const submitGameResult = async (
  userId,
  gameName,
  winStreak,
  rightAnswersNum,
  wrongAnswersNum
) => {
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  let learnedWords = rightAnswersNum + wrongAnswersNum;
  const prevStats = await getUserStatistics(userId);
  const rightAnswers = new Array(rightAnswersNum).fill(Date.now());
  const wrongAnswers = new Array(wrongAnswersNum).fill(Date.now());
  const userStatistics = JSON.stringify(
    createStatistics(prevStats, gameName, winStreak, learnedWords, rightAnswers, wrongAnswers)
  );
  setUserStatistics(userId, userStatistics);
};

export const deleteWord = async (userId, wordId) => {
  if (!wordId) {
    throw new Error('you should pass "wordId" to "deleteWord"');
  }
  if (!userId) {
    throw new Error('you should pass "userId" to "deleteWord"');
  }

  const word = await checkIfUserWordExist(userId, wordId);

  if (word) {
    const { difficulty, optional } = word;
    let { date, rightAnswersCount, wrongAnswersCount } = optional;
    updateUserWord(
      userId,
      wordId,
      "deleted",
      difficulty,
      date,
      rightAnswersCount,
      wrongAnswersCount
    );
  } //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  if (!word) {
    createUserWord(userId, wordId, "deleted", "normal", null);
  }
};

export const addWordToHard = async (userId, wordId) => {
  if (!wordId) {
    throw new Error('you should pass "wordId" to "addWordToHard"');
  }
  if (!userId) {
    throw new Error('you should pass "userId" to "addWordToHard"');
  }

  const word = await checkIfUserWordExist(userId, wordId);

  if (word) {
    const { optional } = word;
    let { wordStatus, date, rightAnswersCount, wrongAnswersCount } = optional;
    updateUserWord(userId, wordId, wordStatus, "hard", date, rightAnswersCount, wrongAnswersCount);
  } //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  if (!word) {
    createUserWord(userId, wordId, "learning", "hard", null);
  }
};

export const removeWordFromHard = async (userId, wordId) => {
  if (!wordId) {
    throw new Error('you should pass "wordId" to "addWordToHard"');
  }
  if (!userId) {
    throw new Error('you should pass "userId" to "addWordToHard"');
  }

  const word = await checkIfUserWordExist(userId, wordId);

  if (word) {
    const { optional } = word;
    let { wordStatus, date, rightAnswersCount, wrongAnswersCount } = optional;
    updateUserWord(
      userId,
      wordId,
      wordStatus,
      "normal",
      date,
      rightAnswersCount,
      wrongAnswersCount
    );
  } //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  if (!word) {
    createUserWord(userId, wordId, "learning", "normal", null);
  }
};
