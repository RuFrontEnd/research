import { useState, useEffect } from "react";

import styled from "styled-components/macro";

const googleDatabase = [
  "cats.com",
  "souprecipes.com",
  "flowers.com",
  "animals.com",
  "catpictures.com",
  "myfavouritecats.com",
]; // 這個是真實資料, 一般來說會非常的大

// 從googleSearch可以看出要測兩個邏輯
export const googleSearch = (searchInput, db) => {
  const matches = db.filter((website) => {
    return website.includes(searchInput);
  }); // 第一個是篩選出來的值是不是正確的
  return matches.length > 3 ? matches.slice(0, 3) : matches; // 第二個是篩出來值的數量是不是小於3個
}; // 被測函式要維持pure function

export const getPeople = (url) => {
  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      return { count: data.count, results: data.results };
    });
};

function Test(props) {
  const { className } = props;
  const [state, setState] = useState(0);

  return <div className="test">Hello World</div>;
}

const Container = styled.section``;

export default Test;
