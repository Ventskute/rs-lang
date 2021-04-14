import { getWords, BASE_URL } from "./api";
import "@babel/polyfill";

describe("API tests", () => {
  const testValue = [
    {
      testField: "test_value",
    },
  ];

  const toJson = (value) => () => Promise.resolve(value);
  const setFetch = (params) => {
    global.fetch = jest.fn(() => {
      return Promise.resolve({ ...params });
    });
  };

  beforeEach(() => {
    setFetch({ json: toJson(testValue) });
  });
  afterEach(() => {
    fetch.mockRestore();
  });
  //
  describe("Get words", () => {
    it("Should use proper url", () => {
      const queries = [
        `${BASE_URL}words?group=1&page=5`,
        `${BASE_URL}words?group=2`,
        `${BASE_URL}words`,
      ];

      getWords(1, 5);
      getWords(2);
      getWords();

      expect(fetch.mock.calls[0][0]).toBe(queries[0]);
      expect(fetch.mock.calls[1][0]).toBe(queries[1]);
      expect(fetch.mock.calls[2][0]).toBe(queries[2]);
    });
  });
});
