import styled from "styled-components/macro";

function Class() {
  // JS中類別仍是函式, 是原型繼承的語法糖, 記得class名稱要大寫
  class Polygon {
    // constructor 只能有一個
    constructor(height, weight) {
      this.height = height;
      this.weight = weight;
    }

    // Getter
    get area() {
      return this.calcArea();
    }

    calcArea() {
      return this.height * this.weight;
    }
  } // 類別宣告式(class declarations)
  const square = new Polygon(10, 10);
  // console.log(square); // { height:10, weight:10 }
  // console.log(square.area);

  const NamedClass = class namedClass {
    constructor(message) {
      this.message = message;
    }
  }; // class expressions類別敘述(表達)可以有名稱
  const UnNamedClass = class {
    constructor(message) {
      this.message = message;
    }
  }; // 也可以無名稱
  const NamedInstance = new NamedClass("有命名的");
  const UnNamedInstance = new UnNamedClass("有命名的");
  // console.log(NamedInstance, UnNamedInstance);

  // let apple = new Apple();
  // class Apple {} // 函式宣告具有hoisted, 類別宣告則無
  // console.log(apple); // Error
  // let banana = new Banana();
  // const Banana = class {} // 類別表達也無hoisted
  // console.log(banana); // Error

  return (
    <section style={{ fontSize: "20px" }}>check the console first plz.</section>
  );
}

export default Class;
