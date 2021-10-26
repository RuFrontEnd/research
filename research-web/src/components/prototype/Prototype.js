import styled from "styled-components/macro";
import { handleConsoles } from "utils/methods";

function Prototype() {
  console.log("Object", Object);
  console.log("Object.prototype", Object.prototype);
  console.log("Array", Array);
  console.log("Array.prototype", Array.prototype);
  console.log("Function", Function);
  // __proto__為繼承父層
  const arr = [];
  // console.log("arr.__proto__", arr.__proto__); // arr的繼承父層為Array constructor(建構子)
  const func = function () {};
  // console.log("func.__proto__", func.__proto__); // obj為繼承父層為Function constructor(建構子)
  const obj = {};
  // console.log("obj.__proto__", obj.__proto__); // obj為繼承父層為Object constructor(建構子)
  // Array constructor 和 Function constructor 都繼承於 Object constructor, 即 Object constructor 為最頂層
  const dragon = {
    name: "追耿",
    isFire: true,
    fire() {
      return `this is ${this.name} fire !!!`;
    },
  };
  const lizard = {
    name: "栗色",
  };
  lizard.__proto__ = dragon; // 繼承, 但之後不要用這樣的方式, 而是要使用Object.create()

  // console.log("lizard.isPrototypeOf(dragon)", dragon.isPrototypeOf(lizard)); // isPrototypeOf()查看是否為繼承關係
  // console.log("lizard.fire()", lizard.fire()); // 此時lizard繼承dragon後, 就可以使用dragon的屬性
  // console.log("lizard.hasOwnProperty('name')", lizard.hasOwnProperty("name")); // hasOwnProperty()判斷該屬性是否為非繼承而來的屬性
  // console.log("lizard.hasOwnProperty('name')", lizard.hasOwnProperty("isFire"));

  function funcA() {}
  // console.log(
  //   "funcA.__proto__ === Function.prototype",
  //   funcA.__proto__ === Function.prototype
  // ); // prototype為function獨有的屬性, 實例的__proto__就是建構子的prototype

  let human = {
    mortal: true,
  };

  let socrates = Object.create(human); // Object.create(繼承對象) 用來創建一個物件並繼承其參數
  // console.log("socrates", socrates);
  socrates.age = 45;
  // console.log("socrates", socrates);
  // console.log("socrates.isPrototypeOf(human)", human.isPrototypeOf(socrates));
  function Dog(name, color, size) {
    this.name = name; // this指向呼叫的對象
    this.color = color;
    this.size = size;
    this.bark = function () {
      // console.log("bark");
    };
  } // 建構函式

  const newSring = new String("字串");

  // 建構函式研究
  let Bibi = new Dog("逼逼", "紅色", "小");
  // new 在做的事情
  // 1. 創造一個空物件(即{})
  // 2. 將 constructor 鏈結到所創造的空物件上
  // 3. 第一個步驟創造的物件作為 this 傳遞給 constructor
  // 4. 如果該 constructor 沒有回傳物件，則回傳所創造的物件
  Bibi.bark();
  Dog.prototype.eat = function () {
    // console.log("好吃");
  }; // 利用原型新增建構函式的方法
  Bibi.eat();

  // 觀察字串__proto__
  // console.log("newSring", newSring);
  // console.dir(newSring);

  // 研究date物件
  const date = new Date();
  // console.log("date", date);
  // console.dir(date); // console.dir打印出該物件所有屬性

  Date.prototype.getFullDate = function () {
    let dd = String(this.getDate());
    let mm = String(this.getMonth() + 1);
    let yyyy = String(this.getFullYear());
    let today = `${yyyy}/${mm}/${dd}`;
    return today;
  };
  // console.log("date.getFullDate()", date.getFullDate());

  return (
    <section style={{ fontSize: "20px" }}>check the console first plz.</section>
  );
}

export default Prototype;
