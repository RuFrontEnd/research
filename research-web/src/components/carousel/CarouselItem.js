import { useEffect, useState, useRef } from "react";
import "components/carousel/Carousel.scss";

function CarouselItem(props) {
  const { level, id } = props;
  const className = `item level${level}`;
  return <div className={className}>{id}</div>;
}

export default CarouselItem;
