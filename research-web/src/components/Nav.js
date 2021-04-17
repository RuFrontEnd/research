import React from "react";
import LinkTo from "components/LinkTo";
import "components/Nav.css";
import { Row, Col } from "antd";

function Nav(props) {
  const { style } = props;
  const components = [
    <LinkTo address={"uploadFile"} name={"uploadFile"} />,
    <LinkTo address={"uploadFile"} name={"uploadFile"} />,
  ];
  const cols = [];

  components.forEach((component, componentIndex) => {
    cols.push(
      <Col key={componentIndex.toString()} span={4}>
        <div style={{ backgroundColor: "white" }}>{component}</div>
      </Col>
    );
  });

  return (
    <div style={style}>
      <Row gutter={[40, 40]}>{cols}</Row>
    </div>
  );
}

export default Nav;
