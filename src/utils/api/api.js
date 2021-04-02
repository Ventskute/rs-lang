import { fetchWrapper, getQuery } from "./api.utils";
import { userLS } from "../localStore";

// export const BASE_URL = "http://localhost:3000/";
export const BASE_URL = "https://rs-lang-team-52.herokuapp.com/";

export const getWords = (group, pageNum) => {
  const query = getQuery({ group, pageNum });
  return fetch(`${BASE_URL}words${query}`)
    .then((response) => response.json())
    .catch((e) => {
      console.log("cant get words with error", e);
    });
};

export const signin = (body) => {
  return fetchWrapper(`${BASE_URL}signin`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(body),
  })
    .then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          if ("message" in data) {
            delete data.message;
          }
          userLS.setUser(data);
        });
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
          userLS.setUser(data);
        });
      }
      return res;
    })
    .catch((e) => console.log("cant signup with error", e));
};

export const getAggregatedWords = async (userId, group, page, wordsPerPage, filter) => {
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  if (!userId) {
    throw new Error('you should pass "userId" to "getAggregatedWords"');
  }
  const query = getQuery({
    group,
    page,
    wordsPerPage,
  });
  if (filter) {
    const param = new URLSearchParams();
    param.set("filter", JSON.stringify(filter));
    query.concat("&", param.toString());
  }
  const fetchedData = await fetchWrapper(`${BASE_URL}users/${userId}/aggregatedWords${query}`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((e) => {
      console.log("cant get aggregated words with error", e);
    });
  return fetchedData[0].paginatedResults;
};
