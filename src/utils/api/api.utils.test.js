import { fetchWrapper, getQuery } from "./api.utils";
import "@babel/polyfill";
import * as localStore from "../localStore";

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

  describe("Test fetch wrapper", () => {
    it("Should response correctly when status 200", async () => {
      const res = await fetchWrapper("test/url");
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data).toEqual(testData);
    });

    it("Should refreshToken on 401", async () => {
      const testUser = {
        name: "testName",
        id: "testId",
        token: "testToken",
        refreshToken: "testRefreshToken",
      };
      global.fetch = jest
        .fn()
        .mockImplementationOnce(() => Promise.resolve({ status: 401 }))
        .mockImplementationOnce(() => Promise.resolve(testRes))
        .mockImplementationOnce(() => Promise.resolve(testRes));
      const getRefreshTokenSpy = jest.spyOn(localStore.userLS, "getRefreshTokenFromLS");
      getRefreshTokenSpy.mockReturnValue(testUser.refreshToken);

      const res = await fetchWrapper("test/url");
      expect(getRefreshTokenSpy).toBeCalledTimes(1);
      expect(res.status).toBe(200);
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
