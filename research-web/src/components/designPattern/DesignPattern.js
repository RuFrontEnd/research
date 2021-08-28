import styled from "styled-components/macro";

function DesignPattern() {
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

  // SOLID 原則
  // Open/Closed Principle (開閉原則)
  const pay = ()=>{
    
  }

  // constructor pattern 建構子模式
  function Student(name, year, grade) {
    this.name = name;
    this.year = year;
    this.grade = grade;
  }
  Student.prototype.toString = function () {
    return `Name:${this.name} Year:${this.year} Grade:${this.grade}`;
  }; // 利用prototype的方式可避免浪費記憶體空間
  const student1 = new Student("小明", 19, "大一");
  // console.log(student1);

  // Module Pattern 模組模式

  return (
    <section style={{ fontSize: "20px" }}>check the console first plz.</section>
  );
}

export default DesignPattern;
