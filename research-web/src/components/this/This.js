import styled from "styled-components/macro";
import { handleConsoles } from "utils/methods";

const objA = {
  sayThis: function () {
    return this;
  },
};

const say = objA.sayThis;

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

document.querySelector(".btn").addEventListener("click", function () {
  console.log(this, "指向DOM本身");
});

const informations = [
  {
    title: "this",
    method: this,
    content: "this的值在嚴格模式下為undefiended, 一般模式為global",
  },
  {
    title: "objA.sayThis()",
    method: objA.sayThis(),
    content: "this指向呼叫者",
  },
  {
    title: "say",
    method: say(),
    content: "this指回全域",
  },
  {
    title: "test.call('who', 1, 2, 3)",
    method: test.call("指定的this值", 1, 2, 3),
    content: "call方法指定this的值",
  },
  {
    title: "test.apply('who', 1, 2, 3)",
    method: test.apply("指定的this值", [1, 2, 3]),
    content: "apply方法指定this的值, 傳入參數為陣列形式",
  },
  {
    title: "test.apply('who', 1, 2, 3)",
    method: bindSay(),
    content: "bind方法固定this的值, 不可再用apply或call去改變",
  },
];

function This() {
  const messages = handleConsoles(informations);

  return (
    <section style={{ fontSize: "20px" }}>
      check the console first plz.
      {messages.map((message) => message)}
      <button className="btn">我是按鈕</button>
    </section>
  );
}

export default This;
