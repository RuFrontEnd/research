// https://jsonplaceholder.typicode.com/ 假API供應
// https://jsonplaceholder.typicode.com/todos 假todo資料
// https://www.youtube.com/watch?v=6DtBw3PaeHs tutorial
import { useCallback, useEffect, useState } from "react";
import "components/pagination/Pagination.css";

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
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const pages = []; // 總頁數
  for (let i = 1; i < Math.ceil(todos.length / itemsPerPage); i++) {
    pages.push(i);
  } // 總共幾頁

  const handleCurrentPage = useCallback((e) => {
    setCurrentPage(Number(e.target.id));
  }, []);

  const handlePrevButton = useCallback(
    (e) => {
      setCurrentPage((currentPage) => currentPage - 1);
      if (currentPage - 1 === minPageNumberLimit) {
        setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
        setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
      }
    },
    [currentPage]
  );

  const handleNextButton = useCallback(
    (e) => {
      setCurrentPage((currentPage) => currentPage + 1);
      if (currentPage + 1 > maxPageNumberLimit) {
        setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
        setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
      }
    },
    [currentPage]
  ); // dependecy表示該state改變時才會影響到useCallback內的state值(所有)

  const renderPageNumbers = pages.map((number) => {
    if (number > minPageNumberLimit && number < maxPageNumberLimit + 1) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleCurrentPage}
          className={`page ${currentPage === number ? "active" : null}`}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
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


  return (
    <section>
      <h1>Todo List</h1>
      {renderData(currentItems)}
      <ul id="pages">
        <li className="page-button" onClick={handlePrevButton}>
          <button disabled={currentPage === pages[0] ? true : false}>
            PREV
          </button>
        </li>
        {renderPageNumbers}
        <li className="page-button" onClick={handleNextButton}>
          <button
            disabled={currentPage === pages[pages.length - 1] ? true : false}
          >
            NEXT
          </button>
        </li>
      </ul>
    </section>
  );
}

export default Pagination;
