import styled from "styled-components/macro";

function OOP(props) {
  const { className } = props;

  const elf = {
    name: "Addy",
    weapon: "bow",
    attack: () => `${elf.name} attack with ${elf.weapon}`,
  };

  const elf2 = {
    name: "Biddy",
    weapon: "knife",
    attack: () => `${elf2.name} attack with ${elf2.weapon}`,
  };

  elf.attack(); // 此時會發現, 如果要創建多個elf, 會不斷的重複複製相同的code
  elf2.attack();

  // 所以改成以下, 這個函式是一個factory function
  const createElf = (name, weapon) => {
    return {
      name: name,
      weapon: weapon,
      attack: () => `${name} attack with ${weapon}`,
    };
  };

  const caddy = createElf("Caddy", "ax");
  // console.log("caddy.attack()", caddy.attack());
  const duddy = createElf("Duddy", "stones");
  // console.log("duddy.attack()", duddy.attack());
  // 但是使用factory function, 仍會導致每創建一個elf, 就要將attack方法重複的放到記憶體內

  // 所以改成以下, 這個函式是一個constructor function(建構函式)
  const Elf = function (name, weapon) {
    this.name = name;
    this.weapon = weapon;
  };

  Elf.prototype.attack = function () {
    return `${this.name} attack with ${this.weapon}`;
  }; // 注意不要用arrow function, 因為arrow function對於this的指向是lexical scope, 在創建的時候就被定義, regular function是dynamic scope, 在呼叫的時候才被定義
  // 利用prototype的寫法, 才不會造成函式重複被放入記憶體內

  const efy = new Elf("Efy", "sword");
  // console.log("efy.attack()", efy.attack());
  // console.log("efy", efy);

  // console.log(
  //   "efy.__proto__ === Elf.prototype)",
  //   efy.__proto__ === Elf.prototype
  // ); // new步驟2讓此式成立

  // new 在做的事情
  // 1. 創建一個空物件{}
  // 2. 將建構子的this指向空物件obj, 並帶入參數
  // 3. 該空物件的__proto__ = 建構子的prototype
  // 4. 回傳這個處理過的物件
  // ex:
  function Stuff(name, job) {
    this.name = name;
    this.job = job;
  }

  Stuff.prototype.sayJob = function () {
    return this.job;
  };

  function newFake(name, object) {
    let obj = {}; // 創建一個空物件{}
    Stuff.call(obj, name, object); // 將建構子的this指向空物件obj, 並帶入參數
    obj.__proto__ = Stuff.prototype; // 該空物件的__proto__ = 建構子的prototype
    return obj; // 回傳這個處理過的物件
  }

  let charles = newFake("charles", "student");
  console.log("charles", charles);
  console.log("charles.sayJob()", charles.sayJob());
  console.log("charles.__proto__", charles.__proto__);

  return <Container className={className}>check console.</Container>;
}

const Container = styled.section``;

export default OOP;
