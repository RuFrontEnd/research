import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import axios from "axios";
import { style } from "dom-helpers";

const Container = styled.section`
  display: block;
  padding: 50px;
`;

const Wrap = styled.div`
  display: block;
`;

const Loading = styled.section`
  display: block;
`;

const Item = styled.div`
  background-color: rgba(245, 245, 245);
  padding: 20px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
`;

const fetchData = (page) => {
  console.log("a");
  axios.post("/infiniteScroll", { body: { page: page } }).then((res) => {
    console.log("res", res);
  });
};

function InfiniteScroll() {
  const [items, setItmes] = useState([]);

  useEffect(() => {
    fetchData(1);
  }, []);

  // if (items.length === 0) {
  //   return <Loading>Loading...</Loading>;
  // }

  return (
    <Container>
      <Wrap>
        <Item>123</Item>
      </Wrap>
    </Container>
  );
}

export default InfiniteScroll;
