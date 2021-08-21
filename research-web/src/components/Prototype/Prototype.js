import styled from "styled-components/macro";
function Player() {}
const object = {};
const numbersA = [1, 2, 3];
const numbersB = [4, 5, 6];

function Prototype() {
  const consoleMethod = (num, title, method, content) =>
    console.log(`${num}.${title}`, method || "", `(${content})`);

  console.log("－－－－－－－－－－　protoType研究開始　－－－－－－－－－－");
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

  const messages = informations.map((information, index) =>
    consoleMethod(
      index + 1,
      information.title,
      information.method,
      information.content
    )
  );

  numbersA.__proto__.getLast = function () {
    return this[this.length - 1]; // this指向呼叫的那個人
  }; // numbersA.__proto__指向 原生Array物件

  return (
    <section style={{ fontSize: "20px" }}>
      check the console first plz.{messages.map((message) => message)}
      <div>
        *呼叫 numbersB.getLast(): {numbersB.getLast()}
        <br />
        1.numbersB繼承來自numbersA.__proto__(即原生Array物件)
        <br />
        2.this指向B
      </div>
    </section>
  );
}

export default Prototype;
