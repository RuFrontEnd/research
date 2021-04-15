import React, { useEffect, useState } from "react";

import "components/Nav.css";
import { Row, Col, Slider } from "antd";

const gutters = {};
const vgutters = {};
const colCounts = {};

[8, 16, 24, 32, 40, 48].forEach((value, i) => {
  gutters[i] = value;
});
[8, 16, 24, 32, 40, 48].forEach((value, i) => {
  vgutters[i] = value;
});
[2, 3, 4, 6, 8, 12].forEach((value, i) => {
  colCounts[i] = value;
});

function Nav() {
  const [gutterKey, setGutterKey] = useState(1);
  const [vgutterKey, setVgutterKey] = useState(1);
  const [colCountKey, setColCountKey] = useState(2);

  const cols = [];
  const colCount = colCounts[colCountKey];
  let colCode = "";
  for (let i = 0; i < colCount; i++) {
    cols.push(
      <Col key={i.toString()} span={24 / colCount}>
        <div>Column</div>
      </Col>
    );
    colCode += `<Col span={${24 / colCount}} />\n`;
  }
  return (
    <div>
      <Row gutter={[gutters[gutterKey], vgutters[vgutterKey]]}>
        {cols}
        {cols}
      </Row>
    </div>
  );
}

export default Nav;
