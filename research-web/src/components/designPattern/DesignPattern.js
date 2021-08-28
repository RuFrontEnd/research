import styled from "styled-components/macro";

function DesignPattern() {
  // 三種建立物件的方式
  const object1 = {};
  const object2 = Object.create(Object.prototype);
  const object3 = new Object();
  console.log(object1, object2, object3);

  return <section></section>;
}

export default DesignPattern;
