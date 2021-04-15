import { DatePicker } from "antd"; // npm install antd 或 yarn add antd
import "antd/dist/antd.css";
import { useEffect, useState, useRef } from "react";

function Nav() {
  return (
    <div>
      <DatePicker></DatePicker>
    </div>
  );
}

export default Nav;
