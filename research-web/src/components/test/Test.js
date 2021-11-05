import styled from "styled-components/macro";

const googleDatabase = [
  "cats.com",
  "souprecipes.com",
  "flowers.com",
  "animals.com",
  "catpictures.com",
  "myfavouritecats.com",
]; // 這個是真實資料, 一般來說會非常的大

export const googleSearch = (searchInput) => {
  const matches = googleDatabase.filter((website) => {
    return website.includes(searchInput);
  });
  return matches.length > 3 ? matches.slice(0, 3) : matches;
}; // 被測函式

function Test(props) {
  const { className } = props;

  return <Container className={className}>using yarn test</Container>;
}

const Container = styled.section``;

export default Test;
