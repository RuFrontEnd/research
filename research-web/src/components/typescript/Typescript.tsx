// yarn add typescript
// tsconfig.js 和 jsconfig.js 不能共存
// tsc Typescript.tsx 執行編譯 typescript
import styled from "styled-components/macro";

// function sayHello(person: string) {
//   return "Hello, " + person;
// }
// let user = [0, 1, 2];
// console.log(sayHello(user));

function Typescript(props: any) {
  const { className } = props;

  return <Container className={className}></Container>;
}

const Container = styled.section``;

export default Typescript;
