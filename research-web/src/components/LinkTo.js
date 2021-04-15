import React from "react";
import { Link } from "react-router-dom";

function LinkTo(props, children) {
  const { address, name } = props;
  return (
    <Link to={address}>
      <div>{name}</div>
    </Link>
  );
}

export default LinkTo;
