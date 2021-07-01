import React from "react";
import LinkTo from "components/LinkTo";
import "components/Nav.css";
import { Row, Col } from "antd";

function Nav(props) {
  const { style } = props;
  const color = "#5ea6ee";
  const components = [
    <LinkTo address={"internation"} name={"Internation"} color={color} />,
    <LinkTo address={"pagination"} name={"Pagination"} color={color} />,
    <LinkTo address={"carouselB"} name={"CarouselB"} color={color} />,
    <LinkTo address={"carousel"} name={"Carousel"} color={color} />,
    <LinkTo address={"reveal"} name={"Reveal"} color={color} />,
    <LinkTo address={"uploadFile"} name={"UploadFile"} color={color} />,
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
