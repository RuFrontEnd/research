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

  const pages = []; // 總頁數
  for (let i = 1; i < Math.ceil(todos.length / itemsPerPage); i++) {
    pages.push(i);
  } // 總共幾頁

  const handleCurrentPage = useCallback((e) => {
    setCurrentPage(e.target.id);
  }, []);

  const renderPageNumbers = pages.map((number) => {
    return (
      <li
        key={number}
        id={number}
        className={"page"}
        onClick={handleCurrentPage}
      >
        {number}
      </li>
    );
  }); // 頁數元件

  const indexOfLastItem = currentPage * itemsPerPage; // 每頁最後一筆資料索引
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; // 每頁第一筆資料索引
  const currentItems = todos.slice(indexOfFirstItem, indexOfLastItem); // 每頁第一筆到最後一筆資料

  const getData = useCallback(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => {
        setTodos(json);
      });
  }, []); // 接資料方法

  useEffect(() => {
    getData();
  }, [getData]); // 接資料

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  return (
    <>
      <h1>Todo List</h1>
      {renderData(currentItems)}
      <ul id="pages">{renderPageNumbers}</ul>
    </>
  );
}

export default Pagination;
