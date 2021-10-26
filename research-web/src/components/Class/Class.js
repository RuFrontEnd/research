import styled from "styled-components/macro";

function Class() {
  // JS中類別仍是函式, 是原型繼承的語法糖
  // class名稱要大寫
  class Polygon {
    // constructor 在使用new關鍵字時會執行, 只能有一個
    constructor(height, width) {
      this.height = height;
      this.width = width;
    }

    static calcDifferenceOfTwoArea(area1, area2) {
      return Math.abs(area1.calcArea() - area2.calcArea());
    } // 靜態方法(static method) => 是這個類別的method, 並不是提供給instance實例用的

    static getWhoAmI() {
      return this;
    }

    get area() {
      return this.calcArea();
    } // getter

    calcArea() {
      return this.height * this.width;
    } // 原型方法(method) 等同於Polygon.prototype.calcArea = function(){ return this.height * this.width; }

    getWhoAmI() {
      return this;
    }
  } // 類別宣告式(class declarations)
  const square = new Polygon(10, 10);
  const square2 = new Polygon(5, 5);
  // console.log(square); // { height:10, weight:10 }
  // console.log(square.calcArea());
  // console.log(square.area);
  // console.log(Polygon.calcDifferenceOfTwoArea(square, square2));
  // console.log(square.calcDifferenceOfTwoArea(square, square2)); // error
  const square3 = square.getWhoAmI;
  // console.log(square3()); // undefiened

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

  class Square extends Polygon {
    constructor(height, width, id) {
      super(height, width); // 繼承中的constructor要使用this前必須呼叫super() => super(參數)回傳的值為母層中constructor的值, 參數個數對照母層中constructor值的個數
      // console.log("super()", super());
      this.id = id;
    }

    getInformation() {
      return `Id ${this.id} square, width "${
        this.width
      }", area "${this.calcArea()}"`;
    }

    calcArea() {
      return Math.pow(this.width, 2);
    } // 覆蓋原方法
  } // extends 繼承

  const square4 = new Square(10, 10, 4);
  console.log("square4", square4);
  console.log(square4.getInformation());
  // console.log(square4.calcArea());

  // 皇后範例
  class Character {
    constructor(name, weapon) {
      this.name = name;
      this.weapon = weapon;
    }
    attack() {
      return "atack with " + this.weapon;
    }
  }

  class Queen extends Character {
    constructor(name, weapon, type) {
      super(name, weapon);
      this.type = type;
    }
    attack() {
      console.log(super.attack());
      return `I am the ${this.name} of ${this.type}, now bow down to me! `;
    }
  }

  const victoria = new Queen("Victoria", "army", "hearts");
  victoria.attack();

  return (
    <section style={{ fontSize: "20px" }}>check the console first plz.</section>
  );
}

export default Class;
