import { fetchWrapper, getQuery } from "./api.utils";
import "@babel/polyfill";

describe("Utils API tests", () => {
  const testData = { value: true };
  const json = () => Promise.resolve(testData);
  const testRes = { status: 200, json };
  const setFetch = (params) => {
    global.fetch = jest.fn(() => {
      return Promise.resolve({ ...params });
    });
  };

  beforeEach(() => {
    setFetch(testRes);
  });
  afterEach(() => {
    fetch.mockRestore();
  });

  describe("test fetch wrapper", () => {
    it("Should response correctly when status 200", async () => {
      const res = await fetchWrapper("test/url");
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data).toEqual(testData);
    });

    it("Should response correctly when status 401", async () => {
      global.fetch = jest
        .fn()
        .mockImplementationOnce(() => Promise.resolve({ status: 401 }))
        .mockImplementationOnce(() => Promise.resolve({ status: 200 }))
        .mockImplementationOnce(() => Promise.resolve({ status: 200 }));

      const res1 = await fetchWrapper("test/url");
      //   const data = await res.json();

      expect(res1.status).toBe(200);
      //   expect(res2.status).toBe(200);
      //   expect(data).toEqual(testData);
    });
  });

  describe("test get query", () => {
    it("Should return proper query", () => {
      const testQueryParams = { testValue: "test77", testValue2: "test88" };
      const testQuery = "?testValue=test77&testValue2=test88";

      expect(getQuery()).toBeNull();
      expect(getQuery(testQueryParams)).toBe(testQuery);
    });
  });
});
