import React, { useState, useEffect, useRef } from "react";
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
  display: flex;
  background-color: rgba(245, 245, 245);
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
`;

const Id = styled.div`
  display: block;
`;

const Title = styled.div`
  display: block;
`;

const fetchData = (page) => axios.post("/infiniteScroll", { page: page });

function InfiniteScroll() {
  const [todos, setTodos] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const $target = useRef();
  const $imageContainer = useRef();

  // console.log("$target", $target);
  // console.log("$imageContainer", $imageContainer);

  let options = {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  };

  const loadMore = () => {
    setPage((page) => page + 1);
  };

  useEffect(() => {
    if (isLoading) {
      const observer = new IntersectionObserver((entries, observer) => {
        console.log("entries[0].isIntersecting", entries[0].isIntersecting);
        if (entries[0].isIntersecting) {
          loadMore();
        }
      }, options);
      observer.observe($target.current);
    }
  }, [isLoading]);

  useEffect(() => {
    fetchData(page).then((res) => {
      setTodos(res.data);
      setIsLoading(true);
    });
  }, [page]);

  if (todos.length === 0) {
    return <Loading>Loading...</Loading>;
  }

  return (
    <div id="image-container" ref={$imageContainer}>
      <Wrap>
        {todos.map((todo, index) => (
          <Item key={index} id={`item-${index}`}>
            <Id>{todo.id}．</Id>
            <Title>{todo.title}</Title>
          </Item>
        ))}
      </Wrap>
      <div
        ref={$target}
        style={{ width: "100px", height: "500px", backgroundColor: "red" }}
      >
        {todos.length}
      </div>
    </div>
  );
}

export default InfiniteScroll;
