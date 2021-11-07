import {
  googleSearch,
  getPeoplePromise,
  // getPeople,
} from "components/test/Test";

jest.setTimeout(12 * 1000);

const dbMock = ["dog.com", "cheesepuff.com", "disney.com", "dogpicture.com"]; // 模擬db資料結構

// it() === describe()
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

it("calls swapi to get people with promise", (done) => {
  getPeoplePromise("https://swapi.dev/api/people").then((data) => {
    expect(data).toEqual(82);
  });
}); // 非同步測試

// it("calls swapi to get people", (done) => {
//   getPeople("https://swapi.dev/api/people").then((data) => {
//     expect(data.count).toEqual(82);
//   });
// }); // 非同步測試
