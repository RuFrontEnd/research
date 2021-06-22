// upload file tutorial https://pjchender.blogspot.com/2019/01/js-javascript-input-file-upload-file.html
// Cropper.js https://github.com/fengyuanchen/cropperjs
// Cropper.js tutorial https://www.youtube.com/watch?v=hM9uKmy-BQQ&ab_channel=ThePolyglotDeveloper
import { useCallback, useEffect, useState } from "react";
import "components/pagination/Pagination.css";
// https://jsonplaceholder.typicode.com/ 假API供應
// https://jsonplaceholder.typicode.com/todos 假todo資料
// https://www.youtube.com/watch?v=6DtBw3PaeHs tutorial

const renderData = (todos) => {
  return (
    <ul>
      {todos.map((todo, todoIndex) => {
        return <li key={todoIndex}>{todo.title}</li>;
      })}
    </ul>
  );
};

function Pagination() {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const pages = [];
  for (let i = 1; i < Math.ceil(todos.length / itemsPerPage); i++) {
    pages.push(i);
  } // 總共幾頁

  const renderPageNumbers = pages.map((number) => {
    return (
      <li key={number} id={number}>
        {number}
      </li>
    );
  });

  const getData = useCallback(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => {
        setTodos(json);
      });
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  return (
    <>
      <h1>Todo List</h1>
      {renderData(todos)}
      <ul>
        {renderPageNumbers}
      </ul>
    </>
  );
}

export default Pagination;
