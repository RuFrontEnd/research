import { shallow, mount, render } from "enzyme";
import { googleSearch, getPeople } from "components/test/Test";
import Test from "components/test/Test";
import MapTest from "components/test/MapTest";
import StyledComp from "components/test/StyledComp";

// enzyme需要初始化 => (CRA專案中)在src/setUpTests.js做設定

jest.setTimeout(20 * 1000);

const dbMock = ["dog.com", "cheesepuff.com", "disney.com", "dogpicture.com"]; // 模擬db資料結構

// it() === describe()W
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
  }); // 測試Promise的話要return出去
});

// shallow 只 render 一層 component(不會有子/孫層)
it("expect to render Test component", () => {
  const $test = shallow(<Test />);
  expect($test.length).toEqual(1);
  expect($test).toMatchSnapshot(); // 自動生成__snapshots__資料夾
});

// snapshot為紀錄上一次DOM結構, 這樣可以避免一個一個去抓DOM來測試
// 解決 snapshot為`Shallow Wrapper {}` https://backbencher.dev/articles/empty-shallowwrapper-snapshot-jest-enzyme
// yarn test -- --coverage => 顯示測試覆蓋率

it("expect to render MapTest component", () => {
  const mockItems = ["A", "B", "C"];
  const $mapTest = shallow(<MapTest items={mockItems} />);
  expect($mapTest).toMatchSnapshot();
});

it("expect to render StyledComponent", () => {
  const $StyledComp = shallow(<StyledComp />);
  expect($StyledComp.find("StyledBox").length).toBe(1);
});
