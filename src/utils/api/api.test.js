import { getWords } from "./api";
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

  describe("Get words", () => {
    it("Should use proper url", () => {
      const queries = [
        "https://rs-lang-team-52.herokuapp.com/words?group=1&pageNum=5",
        "https://rs-lang-team-52.herokuapp.com/words?group=2",
        "https://rs-lang-team-52.herokuapp.com/words",
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
