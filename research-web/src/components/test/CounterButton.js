import { useState, useEffect } from "react";

import styled from "styled-components/macro";

function CounterButton(props) {
  const { style, className, color } = props;
  const [count, setCount] = useState(0);

  return (
    <button
      id="counter"
      color={color}
      onClick={() => {
        setCount((count) => count + 1);
      }}
    >
      {count}
    </button>
  );
}

const Container = styled.section``;

export default CounterButton;
