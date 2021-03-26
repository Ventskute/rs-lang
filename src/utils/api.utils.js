const getTokenFromLS = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (user && user.token) || null;
};
const getRefreshTokenFromLS = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (user && user.refreshToken) || null;
};
const getUserIdFromLS = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (user && user.userId) || null;
};
const setNewTokenToLS = (user) => {
  const prevUser = JSON.parse(localStorage.getItem("user"));
  localStorage.setItem("user", JSON.stringify({ ...prevUser, ...user }));
};

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

export const fetchWrapper = (url, config = {}) => {
  const refreshRequest = (id, refreshToken) => {
    return fetch(`${baseUrl}users/${id}/tokens`, {
      headers: { Authorization: `Bearer ${refreshToken}` },
    })
      .then((res) => res.json().then((data) => data))
      .catch((e) => {
        throw new Error("refresh req", e);
      });
  };
  const newConfig = {
    headers: {},
    ...config,
  };
  newConfig.headers.Authorization = `Bearer ${getTokenFromLS()}`;
  return fetch(url, newConfig).catch((e) => {
    let refreshToken = getRefreshTokenFromLS();
    if (!refreshToken || response.status !== 401) {
      throw new Error("joski Error", e);
    }
    refreshRequest(getUserIdFromLS(), refreshToken)
      .then(setNewTokenToLS)
      .catch((e) => {
        throw new Error("error in 43");
      });
    newConfig.headers.Authorization = `Bearer ${getTokenFromLS()}`;
    return fetch(url, newConfig).catch((e) => Promise.reject);
  });
};
