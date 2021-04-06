import { BASE_URL } from './api';
import { userLS } from '../localStore';
import '@babel/polyfill';

export const getQuery = (params) => {
  if (params) {
    let query = '?';
    for (const param in params) {
      params[param] === undefined || params[param] === null
        ? null
        : (query = query.concat(`${param}=${params[param]}&`));
    }
    return query.slice(0, -1); //remove last &
  }
  return null;
};

const refreshRequest = (id, refreshToken) => {
  return fetch(`${BASE_URL}users/${id}/tokens`, {
    headers: { Authorization: `Bearer ${refreshToken}` },
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then((data) => data)
    .catch((e) => {
      throw new Error('refresh req', e);
    });
};

export const fetchWrapper = async (url, config = {}) => {
  const newConfig = {
    headers: {},
    ...config,
  };
  newConfig.headers.Authorization = `Bearer ${userLS.getTokenFromLS()}`;
  let res = await fetch(url, newConfig);

  let refreshToken = userLS.getRefreshTokenFromLS();
  if (!refreshToken && res.status === 401) {
    throw new Error('Should signin');
  }

  if (res.status === 200) {
    return res;
  }
  if (res.status === 401) {
    return refreshRequest(userLS.getUserIdFromLS(), refreshToken)
      .then(async (tokens) => {
        userLS.setUser(tokens);
        newConfig.headers.Authorization = `Bearer ${userLS.getTokenFromLS()}`;
        res = await fetch(url, newConfig);
        return res;
      })
      .catch((e) => {
        throw new Error('error in 43', e);
      });
  } else {
    return res;
  }
};

export const userWordOptions = (
  wordStatus = "learning",
  difficulty = "normal",
  date,
  rightAnswersCount,
  wrongAnswersCount
) => {
  date = date ? date : Date.now();
  return JSON.stringify({
    difficulty,
    optional: {
      wordStatus,
      date,
      rightAnswersCount,
      wrongAnswersCount,
    },
  });
};

export const createStatistics = (
  prevStats,
  gameName,
  newWinStreak,
  newLearnedWords,
  newRightAnswers,
  newWrongAnswers
) => {
  if (!prevStats) {
    prevStats = {
      optional: {
        savanna: {
          winStreak: 0,
          learnedWords: 0,
          rightAnswers: [],
          wrongAnswers: [],
        },
        audioChallenge: {
          winStreak: 0,
          learnedWords: 0,
          rightAnswers: [],
          wrongAnswers: [],
        },
        sprint: {
          winStreak: 0,
          learnedWords: 0,
          rightAnswers: [],
          wrongAnswers: [],
        },
        fillWords: {
          winStreak: 0,
          learnedWords: 0,
          rightAnswers: [],
          wrongAnswers: [],
        },
      },
    };
  }
  console.log(prevStats);
  let { learnedWords, winStreak, rightAnswers, wrongAnswers } = prevStats.optional[gameName];

  learnedWords += newLearnedWords;
  if (winStreak < newWinStreak) {
    winStreak = newWinStreak;
  }
  rightAnswers = rightAnswers.concat(newRightAnswers);
  wrongAnswers = wrongAnswers.concat(newWrongAnswers);

  const newStats = {
    ...prevStats,
    optional: {
      ...prevStats.optional,
      [gameName]: { learnedWords, winStreak, rightAnswers, wrongAnswers },
    },
  };

  return newStats;
};
