import React, { useEffect, useState } from "react";
import LinkTo from "components/LinkTo";
import "components/Nav.css";
import { Row, Col, Slider } from "antd";

function Nav(props) {
  const { style } = props;
  const uploadFile = <LinkTo address={"uploadFile"} name={"uploadFile"} />;
  const components = [uploadFile];
  const cols = [];

  components.forEach((component, componentIndex) => {
    cols.push(
      <Col key={componentIndex.toString()} span={4}>
        <div></div>
        {component}
      </Col>
    );
  });

  return (
    <div style={style}>
      <Row gutter={[16, 16]}>
        {cols}
        {cols}
      </Row>
    </div>
  );
}

export default Nav;
