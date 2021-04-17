import React from "react";
import { Link } from "react-router-dom";
import "components/LinkTo.css";

function LinkTo(props, children) {
  const { address, name, color } = props;
  return (
    <Link to={address}>
      <div id={"LinkToContainer"} style={{ color: color, borderColor: color }}>
        {name}
      </div>
    </Link>
  );
}

export default LinkTo;
