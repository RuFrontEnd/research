import React from "react";

const UseCallbackButton = ({ onClickButton, children, number }) => {
  console.log(`number${number} re render!`);
  return (
    <>
      <button onClick={onClickButton}>{children}</button>
      <span>{Math.random()}</span>
    </>
  );
};

export default UseCallbackButton;
