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
  caddy.attack();
  const duddy = createElf("Duddy", "stones");
  duddy.attack();
  // 但是使用factory function, 仍會導致每創建一個elf, 就要將attack方法重複的放到記憶體內

  // 所以改成以下, 這個函式是一個constructor function(建構函式)
  const Elf = function (name, weapon) {
    this.name = name;
    this.weapon = weapon;
  };

  Elf.prototype.attack = function () {
    console.log(`${this.name} attack with ${this.weapon}`);
  }; // 注意不要用arrow function, 因為arrow function對於this的指向是lexical scope, 在創建的時候就被定義, regular function是dynamic scope, 在呼叫的時候才被定義
  // 利用prototype的寫法, 才不會造成函式重複被放入記憶體內

  const efy = new Elf("Efy", "sword");
  efy.attack();
  // console.log("efy", efy);
  // new 在做的事情:
  // 1. 創建一個空物件{}
  // 2. 該空物件的__proto__ = 繼承對象的prototype
  // 3. 將創建的物件藉由this的指向創造屬性與值
  console.log("efy.__proto__ === Elf.prototype)", efy.__proto__ === Elf.prototype); // new步驟2讓此式成立

  


  return <Container className={className}>check console.</Container>;
}

const Container = styled.section``;

export default OOP;
