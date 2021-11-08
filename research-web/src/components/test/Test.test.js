import { googleSearch, getPeople } from "components/test/Test";

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

it("getPeople returns count results", () => {
  expect.assertions(1); // 確保expect被執行的次數
  return getPeople("https://swapi.dev/api/people").then((data) => {
    expect(data.count).toBe(82);
  }); // 測試Promise的後要return出去
});

// it("getPeople returns count results", () => {
//   const mockFetch = jest.fn().mockReturnValue(
//     Promise.resolve({
//       json: () => Promise.resolve({ count: 87, results: [0, 1, 2, 3, 4, 5] }),
//     })
//   );
//   // expect.assertions(1);
//   getPeople("https://swapi.dev/api/people").then(data=>{
//     expect(()=>{return 1}).toBe(1)
//   })
// });

// getPeople("https://swapi.dev/api/people").then((data) => {
//   expect(data).toEqual(82);
// });
// }); // 非同步測試
