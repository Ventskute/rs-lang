import { fetchWrapper, getQuery } from "./api.utils";

// export const baseUrl = "http://localhost:3000/";
export const baseUrl = "https://rs-lang-team-52.herokuapp.com/";

export const getWords = (group, pageNum) => {
  const query = getQuery({ group, pageNum });
  return fetch(`${url}words${query}`)
    .then((response) => response.json())
    .catch((e) => {
      console.log("cant get words with error", e);
    });
};

export const signin = (body) => {
  return fetchWrapper(`${baseUrl}signin`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(body),
  })
    .then((res) => {
      const response = res.status === 200 ? { status: res.status, user: res.json() } : res;
      return response;
    })
    .catch((e) => console.log("cant signin with error", e));
};

export const signup = (body) => {
  return fetchWrapper(`${baseUrl}users`, { method: "POST", body: body })
    .then((res) => {
      const response = res.status === 200 ? { status: res.status, user: res.json() } : res;
      return response;
    })
    .catch((e) => console.log("cant signup with error", e));
};
