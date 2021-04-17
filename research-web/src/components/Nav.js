import React from "react";
import LinkTo from "components/LinkTo";
import "components/Nav.css";
import { Row, Col } from "antd";

function Nav(props) {
  const { style } = props;
  const uploadFile = <LinkTo address={"uploadFile"} name={"uploadFile"} />;
  const components = [uploadFile];
  const cols = [];

  components.forEach((component, componentIndex) => {
    cols.push(
      <Col key={componentIndex.toString()} span={4}>
        <div style={{ backgroundColor: "white" }}>
          <div
            style={{
              width: "100%",
              height: "100%",
              boxShadow: "10px 5px 5px #00000055",
            }}
          >
            {component}
          </div>
        </div>
      </Col>
    );
  });

  return (
    <div style={style}>
      <Row gutter={[16, 16]}>{cols}</Row>
    </div>
  );
}

export default Nav;
