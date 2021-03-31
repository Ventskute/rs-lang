export const url = "https://rs-lang-team-52.herokuapp.com/";

export const getWords = (group, page) => {
  return fetch(`${url}words?group=${group}&page=${page}`)
    .then((response) => response.json())
    .catch((e) => {
      console.log("cant get words with error", e);
    });
};

export const getStaticURL = (route) => {
  return `${url}${route}`;
}