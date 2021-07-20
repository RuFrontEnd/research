import React, { useState, useEffect } from "react";
import "components/template/Template.css";

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
          setState("1");
        }}
      >
        setState
      </button>
      <div>{state}</div>
    </section>
  );
}

export default SetStateInUseEffect;
