import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components/macro";
import axios from "axios";
import { style } from "dom-helpers";
import ReactLoadingRef from "react-loading";

const Container = styled.section`
  display: block;
  padding: 0px 50px;
`;

const Wrap = styled.div`
  display: block;
`;

const Loading = styled.section`
  display: block;
`;

const Item = styled.div`
  display: flex;
  background-color: rgba(245, 245, 245);
  padding: 20px;
  margin: 20px 0px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
`;

const Id = styled.div`
  display: block;
`;

const Title = styled.div`
  display: block;
`;

const ReactLoading = styled(ReactLoadingRef)`
  margin: 20px auto;
`;

const fetchData = (page) => axios.post("/infiniteScroll", { page: page });

function InfiniteScroll() {
  const [todos, setTodos] = useState([]);
  const [page, setPage] = useState(1);
  const [isPermitInfiniteLoad, setIsPermitInfiniteLoad] = useState(false);

  const $reactLoading = document.getElementById("reactLoading");

  // const $reactLoading = useRef(); // Todo 抓不到這個ref
  const $imageContainer = useRef();

  let options = {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  };

  const loadMore = () => {
    setPage((page) => page + 1);
  };

  useEffect(() => {
    if (isPermitInfiniteLoad) {
      const observer = new IntersectionObserver((entries, observer) => {
        console.log("entries[0].isIntersecting", entries[0].isIntersecting);
        if (entries[0].isIntersecting) {
          loadMore();
        }
      }, options);
      observer.observe($reactLoading);
    }
  }, [isPermitInfiniteLoad]);

  useEffect(() => {
    fetchData(page).then((res) => {
      setTodos(res.data);
      setIsPermitInfiniteLoad(true);
    });
  }, [page]);

  if (todos.length === 0) {
    return <Loading>Loading...</Loading>;
  }

  return (
    <Container ref={$imageContainer}>
      <Wrap>
        {todos.map((todo, index) => (
          <Item key={index}>
            <Id>{todo.id}．</Id>
            <Title>{todo.title}</Title>
          </Item>
        ))}
      </Wrap>
      <ReactLoading
        type={"spin"}
        color={"red"}
        height={50}
        width={50}
        id="reactLoading"
        // ref={$reactLoading}
      />
    </Container>
  );
}

export default InfiniteScroll;
