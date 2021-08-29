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


  return (
    <section style={{ fontSize: "20px" }}>check the console first plz.</section>
  );
}

export default Objector;
