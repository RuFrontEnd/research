import { useState, useEffect } from "react";

import styled from "styled-components/macro";

function MapTest(props) {
  const { className, items } = props;
  const [state, setState] = useState(0);

  return (
    <div className="test">
      {items.map((item) => (
        <p key={item}>{item}</p>
      ))}
    </div>
  );
}

const Container = styled.section``;

export default MapTest;
