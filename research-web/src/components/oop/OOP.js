import styled from "styled-components/macro";

function OOP(props) {
  const { className } = props;

  const elf = {
    name: "Addy",
    weapon: "bow",
    attack: () => console.log(`${elf.name} attack with ${elf.weapon}`),
  };

  const elf2 = {
    name: "Biddy",
    weapon: "knife",
    attack: () => console.log(`${elf2.name} attack with ${elf2.weapon}`),
  };

  elf.attack(); // 此時會發現, 如果要創建多個elf, 會不斷的重複複製相同的code
  elf2.attack();

  // 所以改成以下, 這個函式是一個factory function
  const createElf = (name, weapon) => {
    return {
      name: name,
      weapon: weapon,
      attack: () => console.log(`${name} attack with ${weapon}`),
    };
  };

  const caddy = createElf("Caddy", "ax");
  caddy.attack()
  const duddy = createElf("Duddy", "stones");
  duddy.attack()

  // 但是使用factory function, 仍會導致每創建一個elf, 就要將attack方法重複的放到記憶體內

  return <Container className={className}>check console.</Container>;
}

const Container = styled.section``;

export default OOP;
