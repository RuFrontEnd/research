import React, { useEffect } from "react";
import styled from "styled-components/macro";
import { handleConsoles } from "utils/methods";

// this 就是指當物件中包有函式者, 其所代表的指向

const objA = {
  sayThis: function () {
    console.log("objA, this", this);
  },
};

objA.sayThis(); // this代表的值在被呼叫的當下決定

function sayThis() {
  console.log('global this', this);
}

sayThis(); // 嚴格模式下, this為undefiend, 非嚴格模式下, this指向全域window, 因為等同於window.sayThis()

const objC = {
  sayThis: function () {
    function anotherFunction() {
      console.log("objC, this", this);
    }
    anotherFunction();
  },
};

objC.sayThis(); // 嚴格模式下, this為undefiend, 因為呼叫anotherFunction者不是objC, 而是sayThis函式

const objD = {
  sayThis: function () {
    function anotherFunction() {
      console.log("objD, this", this); // 這邊的this是被bind住指向的this
    }
    return anotherFunction.bind(this); // 這邊的this是sayThis中的this
  },
};

objD.sayThis()(); // 利用bind的方式可以鎖住this的指向

const objE = {
  sayThis: function () {
    const anotherFunction = () => {
      console.log("objE, this", this);
    };
    anotherFunction();
  },
};

objE.sayThis(); //也可以利用箭頭函式bind住指向

function test(a, b, c) {
  return [this, a, b, c];
}

const objB = {
  sayThis: function () {
    return this;
  },
};

const bindSay = objB.sayThis.bind("hello");
bindSay.call("改變的值");
// bindSay.apply('改變的值');

const informations = [
  {
    title: "this",
    method: this,
    content: "this的值在嚴格模式下為undefiended, 一般模式為global",
  },
  {
    title: "objA.sayThis()",
    // method: objA.sayThis(),
    content: "this指向呼叫者",
  },
  {
    title: "say",
    // method: say(),
    content: "this指回全域",
  },
  {
    title: "test.call('who', 1, 2, 3)",
    // method: test.call("指定的this值", 1, 2, 3),
    content: "call方法指定this的值",
  },
  {
    title: "test.apply('who', 1, 2, 3)",
    // method: test.apply("指定的this值", [1, 2, 3]),
    content: "apply方法指定this的值, 傳入參數為陣列形式",
  },
  {
    title: "test.apply('who', 1, 2, 3)",
    // method: bindSay(),
    content: "bind方法固定this的值, 不可再用apply或call去改變",
  },
];

function This() {
  // const messages = handleConsoles(informations);

  useEffect(() => {
    document.querySelector(".btn").addEventListener("click", function () {
      // console.log(this, "指向DOM本身");
    });
  }, []);

  return (
    <section style={{ fontSize: "20px" }}>
      check the console first plz.
      {/* {messages.map((message) => message)} */}
      <button className="btn">我是按鈕</button>
    </section>
  );
}

export default This;
