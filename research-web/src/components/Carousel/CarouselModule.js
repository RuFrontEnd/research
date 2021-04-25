import React from "react";
import { useEffect, useState, useRef } from "react";
import { CSSTransitionGroup } from "react-transition-group"; // npm install react-transition-group@1.x --save / yarn add react-transition-group@1.x
import CarouselItem from "components/carousel/CarouselItem";
import "components/carousel/Carousel.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function Carousel(props) {
  const { activation, cards } = props;
  const [active, setActive] = useState(activation);
  const [items, setItems] = useState(cards);
  const [direction, setDirection] = useState("");

  const generateItems = () => {
    let components = [];
    let level;
    let index;
    for (let i = active - 2; i < active + 3; i++) {
      index = i;
      if (i < 0) {
        index = items.length + i;
      } else if (i >= items.length) {
        index = i % items.length;
      }
      level = active - i;
      components.push(
        <CarouselItem key={index} id={items[index]} level={level} />
      );
    }
    return components;
  };

  const moveLeft = () => {
    let newActive = active;
    newActive--;
    setActive(newActive < 0 ? items.length - 1 : newActive);
    setDirection("left");
  };

  const moveRight = () => {
    let newActive = active;
    newActive++;
    setActive(newActive < 0 ? items.length - 1 : newActive);
    setDirection("right");
  };
  
  return (
    <div id="carousel" className="noselect">
      <div
        className="arrow arrow-left"
        onClick={() => {
          moveLeft();
        }}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </div>
      <CSSTransitionGroup transitionName={direction}>
        {generateItems()}
      </CSSTransitionGroup>
      <div
        className="arrow arrow-right"
        onClick={() => {
          moveRight();
        }}
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </div>
    </div>
  );
}

export default Carousel;
