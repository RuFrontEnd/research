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

  useEffect(() => {
    fetchData(page).then((res) => setTodos(res.data));
  }, []);

  useEffect(() => {
    console.log("todos", todos);
  }, [todos]);

  if (todos.length === 0) {
    return <Loading>Loading...</Loading>;
  }

  return (
    <Container>
      <Wrap>
        {todos.map((todo) => (
          <Item>
            <Id>{todo.id}．</Id>
            <Title>{todo.title}</Title>
          </Item>
        ))}
      </Wrap>
    </Container>
  );
}

export default InfiniteScroll;
