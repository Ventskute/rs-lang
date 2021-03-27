import { BASE_URL } from "./api";
import { user } from "../localStor";
import "@babel/polyfill";

export const getQuery = (params) => {
  if (params) {
    let query = "?";
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
      console.log(res.status);
    })
    .then((data) => data)
    .catch((e) => {
      throw new Error("refresh req", e);
    });
};

export const fetchWrapper = async (url, config = {}) => {
  const newConfig = {
    headers: {},
    ...config,
  };

  newConfig.headers.Authorization = `Bearer ${user.getTokenFromLS()}`;

  let res = await fetch(url, newConfig);

  let refreshToken = user.getRefreshTokenFromLS();
  if (!refreshToken && res.status === 401) {
    throw new Error("Should signin");
  }

  if (res.status === 200) {
    return res;
  }

  if (res.status === 401) {
    return refreshRequest(user.getUserIdFromLS(), refreshToken)
      .then(async (tokens) => {
        user.set(tokens);
        newConfig.headers.Authorization = `Bearer ${user.getTokenFromLS()}`;
        res = await fetch(url, newConfig);
        return res;
      })
      .catch((e) => {
        throw new Error("error in 43", e);
      });
  }
};
