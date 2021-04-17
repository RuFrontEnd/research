import React from "react";
import { Link } from "react-router-dom";

function LinkTo(props, children) {
  const { address, name } = props;
  return (
    <Link to={address}>
      <div
        style={{
          width: "100%",
          height: "100%",
          boxShadow: "5px 2px 5px #00000055",
          display: "flex",
          justifyContent: "center",
          borderLeft: "10px solid #FF4D00",
          borderRadius: "5px",
          fontSize: "20px",
          fontFamily: "sans-serif",
          color: "#FF4D00",
          letterSpacing: "0.5px",
        }}
      >
        {name}
      </div>
    </Link>
  );
}

export default LinkTo;
