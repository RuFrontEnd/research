import styled from "styled-components/macro";

function Objector() {
  // 三種建立物件的方式
  const object1 = {};
  const object2 = Object.create(Object.prototype);
  const object3 = new Object();
  // console.log(object1, object2, object3);

  const myObject = {};
  myObject.key1 = "Hello World";
  myObject["key2"] = "Hi World";
  Object.defineProperty(myObject, "key3", {
    value: "Hey, World",
    writable: true,
    enumberalbe: true,
    configurable: true,
  });
  Object.defineProperties(myObject, {
    key3: {
      value: "Ha World",
      writable: true,
    },
    key4: {
      value: "Hoooo World",
      writable: false,
    },
  });
  // console.log(myObject);

  const myObject2 = {
    log: ["a", "b", "c"],
    get latest() {
      return this.log.length === 0 ? undefined : this.log[this.log.length - 1];
    },

    get concat() {
      return this.log.join("");
    },
  }; // getter 方法用於物件動態取值
  // console.log(myObject2.latest, myObject2.concat);

  // primative type 原始型別(即nuumber / string / boolean / undefined / null)為call by value
  // non - primative type 非原始型別(即物件型別)為call by reference
  // call by value 和 call by reference 在於是否會在記憶體當中產生新的位置
  const objA = { a: "a", b: "b", c: "c" };
  const objB = objA;
  objB.a = "changed a";
  // console.log("objA", objA); // 此時改變objB但objA也會改變
  const objC = Object.assign({}, objA); // Object.assign 用於淺拷貝物件, 也可以使用{ ...objA }
  objC.b = "changed b";
  // console.log("objA", objA); // 此時改變objC就不會影響到objA

  const objD = { d: "d", e: { deep: "e" }, f: { deep: "f" } };
  const objE = { ...objD }; // 淺拷貝
  objE.e.deep = "changed e";
  console.log("objD", objD); // 淺拷貝會造成子物件依然是call by reference
  const objF = JSON.parse(JSON.stringify(objD)); // 深拷貝
  objF.f.deep = "changed f";
  console.log("objD", objD); // 此時深拷貝就不會影響到原物件

  return (
    <section style={{ fontSize: "20px" }}>check the console first plz.</section>
  );
}

export default Objector;
