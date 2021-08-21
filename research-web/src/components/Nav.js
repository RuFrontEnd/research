import React from "react";
import LinkTo from "components/LinkTo";
import "components/Nav.css";
import { Row, Col } from "antd";
import { routes } from "App";

function Nav(props) {
  const { style } = props;
  const color = "#5ea6ee";

  const components = routes.map((route) => {
    const _address = route.path.replace("/", "");
    const _name = `${_address.slice(0, 1).toUpperCase()}${_address.slice(
      1,
      _address.length
    )}`;

    return <LinkTo address={_address} name={_name} color={color} />;
  });


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
