import { getQuery, fetchWrapper } from "./api.utils";
import { BASE_URL } from "./api";

export const getAggregatedWords = (userId, group, pageNum, wordsPerPage, filter) => {
  if (!userId) {
    throw new Error('you should pass "userId" to "getAggregatedWords"');
  }
  const query = getQuery({
    group,
    pageNum,
    wordsPerPage,
  });
  if (filter) {
    const param = new URLSearchParams();
    param.set("filter", JSON.stringify(filter));
    query.concat("&", param.toString());
  }
  return fetchWrapper(`${BASE_URL}users/${userId}/aggregatedWords${query}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((e) => {
      console.log("cant get aggregated words with error", e);
    });
};
