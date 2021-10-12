import { useState, useCallback, useEffect } from "react";
import styled from "styled-components/macro";
import UseCallbackButton from "components/useCallback/UseCallbackButton";

function UseCallBack(props) {
  const { className } = props;
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  const handleClickButton1 = () => {
    console.log("useCallBack( X )", count1, count2);
    setCount1(count1 + 1);
  };

  const handleClickButton2 = useCallback(() => {
    setCount2(count2 + 1);
    console.log("useCallBack( O )", count1, count2);
  }, [count2]);

  useEffect(() => {
    console.log("useEffect", count1, count2);
  }, [count1, count1]);

  return (
    <Container className={className}>
      <div>
        <UseCallbackButton onClickButton={handleClickButton1} number={1}>
          Button1
        </UseCallbackButton>
      </div>
      <div>
        <UseCallbackButton onClickButton={handleClickButton2} number={2}>
          Button2
        </UseCallbackButton>
      </div>
    </Container>
  );
}

const Container = styled.section``;

export default UseCallBack;
