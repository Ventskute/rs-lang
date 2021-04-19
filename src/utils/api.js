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

export const sectionsColor = {
  0: 'aquamarine',
  1: 'rgba(0, 123, 255, 0.5)',
  2: '#cf004542',
  3: '#28a74594',
  4: '#fbc97e',
  5: '#17a2b8a6'
}