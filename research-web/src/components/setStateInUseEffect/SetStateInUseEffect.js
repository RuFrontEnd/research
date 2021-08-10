import React, { useState, useEffect } from "react";

function SetStateInUseEffect() {
  const [state, setState] = useState("0");

  useEffect(() => {
    if (state !== "0") {
      setState("2");
    }
  }, [state]);

  return (
    <section>
      <button
        onClick={() => {
          setState("111111111111111111111111111111111111111111111111111111111111111111111111111111111111");
        }}
      >
        setState
      </button>
      <div>{state}</div>
    </section>
  );
}

export default SetStateInUseEffect;
