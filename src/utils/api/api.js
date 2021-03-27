import { fetchWrapper, getQuery } from "./api.utils";
import { userLS } from "../localStor";

export const BASE_URL = "http://localhost:3000/";
// export const BASE_URL = "https://rs-lang-team-52.herokuapp.com/";

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
