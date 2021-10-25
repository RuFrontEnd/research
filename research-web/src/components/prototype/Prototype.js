import styled from "styled-components/macro";
import { handleConsoles } from "utils/methods";

function Prototype() {
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

  let human = {
    mortal: true,
  };

  let socrates = Object.create(human); // Object.create(繼承對象) 用來創建一個物件並繼承其參數
  // console.log("socrates", socrates);
  socrates.age = 45;
  // console.log("socrates", socrates);
  // console.log("socrates.isPrototypeOf(human)", human.isPrototypeOf(socrates));

  // console.log("Date", Date);
  Date.prototype.lastYear = function () {
    console.log("this", this.getFullYear());
    // return this.
  };
  const day = new Date("1900-10-10");
  // console.log("day", day);

  function Player() {}
  const object = {};
  function Dog(name, color, size) {
    this.name = name; // this指向呼叫的對象
    this.color = color;
    this.size = size;
    this.bark = function () {
      // console.log("bark");
    };
  } // 建構函式

  const newSring = new String("字串");

  const informations = [
    {
      title: "Player",
      method: Player,
      content: "創建出來的一個函式",
    },
    { title: "object", method: object, content: "創建出來的一個物件" },
    {
      title: "Player.prototype",
      method: Player.prototype,
      content: "Player.prototype指向一個特殊的prototype物件",
    },
    {
      title: "object.prototype",
      method: object.prototype,
      content: "物件沒有prototype屬性",
    },
    {
      title: "Player.prototype.constructor",
      method: Player.prototype.constructor,
      content: "Player.prototype.constructor指回player",
    },
    {
      title: "Player.__proto__",
      method: Player.__proto__,
      content:
        "Player.__proto__向上指向父層, proto是每個「物件」都有的屬性, 代表該物件繼承而來的源頭",
    },
    {
      title: "Player.prototype.__proto__",
      method: Player.prototype.__proto__,
      content: "指回原生Object物件",
    },
    {
      title: "Object.prototype.__proto__",
      method: Object.prototype.__proto__,
      content: "Object為最頂層, __proto__為null值",
    },
    {
      title: "***整理***",
      // method: Object.prototype.__proto__,
      content:
        "(1)每個「函式」中都會有prototype屬性, 指向一個prototype物件, (2)每個函式的prototype物件, 會有一個constructor屬性, 指回到這個函式, (3)每個物件都有一個__proto__內部屬性，指向它的繼承而來的原型prototype物件, (4)由__proto__指向連接起來的結構, 稱之為原型鏈(prototype chain)",
    },
  ];
  // console.log("－－－－－－－－－－　protoType研究開始　－－－－－－－－－－");

  // const messages = handleConsoles(informations);

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
    <section style={{ fontSize: "20px" }}>
      check the console first plz.
      {/* {messages.map((message) => message)} */}
    </section>
  );
}

export default Prototype;
