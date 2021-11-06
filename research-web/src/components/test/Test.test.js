import { googleSearch } from "components/test/Test";

const dbMock = ["dog.com", "cheesepuff.com", "disney.com", "dogpicture.com"]; // 模擬db資料結構

it("is searching google", () => {
  expect(googleSearch("沒有這個關鍵字", dbMock)).toEqual([]);
  expect(googleSearch("dog", dbMock)).toEqual(["dog.com", "dogpicture.com"]);
});

it("work with undefined and null input", () => {
  expect(googleSearch(undefined, dbMock)).toEqual([]);
  expect(googleSearch(null, dbMock)).toEqual([]);
});

it("does not return more than 3 matches", () => {
  expect(googleSearch(".com", dbMock).length).toEqual(3);
});
