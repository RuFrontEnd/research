import React, { useState, useEffect } from "react";
import "components/template/Template.css";

function SetStateInUseEffect() {
  const [state, setState] = useState("");

  return (
    <section>
      <button>setState</button>
      <div>{state}</div>
    </section>
  );
}

export default SetStateInUseEffect;
