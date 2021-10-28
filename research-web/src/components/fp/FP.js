import Item from "antd/lib/list/Item";
import styled from "styled-components/macro";

function FP(props) {
  const { className } = props;

  // FP
  // 函式應該要符合:
  // 1. predictable 可預測的
  // 2. composable 可組合的
  // 3. immutable state 不變性(不可改變原值)
  // 4. 1 task 一次只做一件事
  // 5. return statement 要有回傳值
  // 6. pure 必須是pure function
  // 7. no shared state 無共享狀態(函式內的方法改變相同值)

  // pure function(純粹函式)
  // 1.  不可以改變本身以外的任何東西(沒有任何side effects)
  // 2. 一個function給予一個input, 必定出現同一個的output(referential transparency 參照透明性)

  // ex1.
  const array = [1, 2, 3];
  const arrayB = [1, 2, 3];
  function popOutItem(arr) {
    arr.pop();
  }
  popOutItem(array);
  // console.log("array", array); // [1, 2], 改變了函式外的陣列, 出現了side effect

  // 改變成沒有side effect
  function removeLastItem(arr) {
    const newArray = [].concat(arr);
    newArray.pop();
    return newArray;
  }
  const mutatedArrayB = removeLastItem(arrayB);
  // console.log("arrayB", arrayB); // [1, 2], 重新輸出新的陣列, 解決了side effect
  // console.log("mutatedArrayB", mutatedArrayB); // 得到新的陣列

  // ex2.
  function sum(num1, num2) {
    return num1 + num2;
  }
  function multiplyBy2(num) {
    return num;
  }

  const firstTime = multiplyBy2(sum(3, 5)); // 16
  const secondTime = multiplyBy2(sum(3, 5)); // 16
  const thirdTime = multiplyBy2(sum(3, 5)); // 16
  // console.log(
  //   "firstTime / secondTime / thirdTime",
  //   firstTime,
  //   secondTime,
  //   thirdTime
  // ); // 不論多少次input相同的值, output都只會有一個

  // Idempotence 冪等 => 指可以使用相同參數重復執行，並能獲得相同結果的函式, 這樣的函式具有predictable可預測的特性
  function getRandomMath(num) {
    return Math.random(num);
  }
  getRandomMath(5); // 不符合 Idempotence

  function multipleBy3(num) {
    return num * 3;
  }
  multipleBy3(5); // 不符合 Idempotence

  // imperative vs declarative 具命令的 vs 具宣告性的
  for (let i = 0; i < 4; i++) {
    // console.log(i);
  } // 宣告變數i為0, 並且i小於4, 每執行一次i+1, console.log出i => 具命令性

  // [1, 2, 3].forEach((item) => console.log(item)); // 將陣列[1,2,3]的每一項console.log出來 => 具宣告性

  // immutability => 所有吃進來的原值都不該是屬於函式的(所以要複製一份出來)
  const obj = { name: "Andrei" }; // 原值
  obj.name = "Nana"; // mutable的做法
  function clone(obj) {
    return { ...obj };
  }

  const objB = { name: "Andrei" };
  function updateName(obj) {
    const clonedObj = clone(obj);
    obj.name = "Nana";
    return clonedObj;
  }
  const upadatedObj = updateName(objB); // immutable的做法

  // FP中也可以使用closure
  const closure = function () {
    let count = 55;
    return function getCounter() {
      return count;
    };
  };
  const getCounter = closure();
  getCounter();
  getCounter();
  getCounter();

  // currying(柯里化) 又稱partial application
  const multiply = (a, b) => a * b; // 非curry化
  const curriedMultiply = (a) => (b) => a * b; // curry化
  const curriedMultiply5 = curriedMultiply(5);
  curriedMultiply5(4);

  const multiplyB = (a, b, c) => a * b * c;
  const partialMultiplyBy5 = multiplyB.bind(null, 5);
  partialMultiplyBy5(4 * 10);

  // compose 與 pipe
  // compose 與 pipe 都是要解決 function hell 的問題 fn1(fn2(fn3(fn...)))
  // compose 與 pipe 執行結果完全一樣, 只是程式碼閱讀順序的差異
  const multipleBy5 = (num) => num * 5;
  const makePositive = (num) => Math.abs(num);
  // const compose = (f, g) => (data) => f(g(data)); // compose 由g執行完再執行f(由右至左執行)
  const pipe = (f, g) => (data) => g(f(data)); // pipe 由f執行完再執行g(由左至右執行)
  // const multipleBy5AndAbsoluteNumber = compose(multipleBy5, makePositive)(-50);
  const multipleBy5AndAbsoluteNumber = pipe(multipleBy5, makePositive)(-50);
  // console.log("multipleBy5AndAbsoluteNumber", multipleBy5AndAbsoluteNumber);

  // FP example - Amazon shopping
  // implement a cart feature(done with these actions called "purchaseItem"):
  // 1. Add items to cart
  // 2. Add 3% tax to item in cart
  // 3. Buy item: cart --> purchase
  // 4. Empty cart
  let user = {
    name: "Kim",
    active: true,
    cart: [],
    purchases: [],
  };
  let userHistory = [];

  // const purchaseItem = (a, b, c, d) => (user, item) => d(c(b(a(user, item))));
  const piper =
    (f, g) =>
    (...args) =>
      g(f(...args));
  const purchaseItem = (...fns) => fns.reduce(piper);

  function addItemToCart(user, item) {
    const upadatedCart = user.cart.concat(item);
    userHistory.push(user);
    return Object.assign({}, user, { cart: upadatedCart });
  }

  function appyTaxToItems(user) {
    const { cart } = user;
    const taxRate = 1.3;
    const upadatedCart = cart.map((item) => {
      return {
        name: item.name,
        price: item.price * taxRate,
      };
    });
    userHistory.push(user);
    return Object.assign({}, user, { cart: upadatedCart });
  }

  function buyItem(user) {
    userHistory.push(user);
    return Object.assign({}, user, { purchases: user.cart });
  }

  function emptyCart(user) {
    userHistory.push(user);
    return Object.assign({}, user, { cart: [] });
  }

  const buyedUser = purchaseItem(
    addItemToCart,
    appyTaxToItems,
    buyItem,
    emptyCart
  )(user, { name: "laptop", price: 200 });

  console.log("buyedUser", buyedUser);
  console.log("userHistory", userHistory);

  return <Container className={className}>check console</Container>;
}

const Container = styled.section``;

export default FP;
