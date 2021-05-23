import React, { useState, useEffect, useRef } from "react";
import "components/carouselB/CarouselB.scss";
import { CSSTransitionGroup } from "react-transition-group"; // npm install react-transition-group@1.x --save / yarn add react-transition-group@1.x

function CarouselB(props) {
  // const [sliderClassName, setSlideClassName] = useState(
  //   "carouselB-slider-next"
  // );
  const [direction, setDirection] = useState(1);
  const $slider = useRef();
  const $carousel = useRef();
  const [items, setItems] = useState([
    "content 1",
    "content 2",
    "content 3",
    "content 4",
    "content 5",
  ]);

  const [index, setIndex] = useState(1);

  const handlePrev = () => {
    setDirection(-1);
    $carousel.current.style.justifyContent = "flex-end";
    $slider.current.style.transform = "translate(20%)";
  };

  const handleNext = () => {
    setDirection(1);
    $carousel.current.style.justifyContent = "flex-start";
    $slider.current.style.transform = "translate(-20%)";
  };

  const shiftItem = () => {
    const _items = [...items]; // 深拷貝(淺拷貝會影響到原陣列)
    if (direction === 1) {
      console.log(1);
      const shiftItem = _items.shift();
      _items.push(shiftItem);
      setItems(_items);
      console.log(_items);
      $slider.current.style.transition = "none";
      $slider.current.style.transform = "translate(0%)";
      setTimeout(() => {
        $slider.current.style.transition = "0.3s";
      }, 4);
    }
    if (direction === -1) {
      console.log(-1);
      const popItem = _items.shift();
      _items.push(popItem);
      console.log(_items);
      setItems(_items);
      $slider.current.style.transition = "none";
      $slider.current.style.transform = "translate(0%)";
      setTimeout(() => {
        $slider.current.style.transition = "0.3s";
      }, 4);
    }
  };

  useEffect(() => {
    console.log(items);
  }, [items]);

  // useEffect(() => {
  //   if (sliderClassName === "carouselB-slider-next-active") {
  //     changeItem();
  //   }
  // }, [sliderClassName]);

  return (
    <section
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ width: "1170px", height: "100px" }}>
        {/* carousel */}
        <div id="carouselB" ref={$carousel}>
          <ul
            id="carouselB-slider"
            // className={sliderClassName}
            onTransitionEnd={shiftItem}
            ref={$slider}
          >
            {items.map((item) => (
              <>
                <li>{item}</li>
              </>
            ))}
          </ul>
          <div
            id="carouselB-prev"
            className="carouselB-btn"
            onClick={handlePrev}
          >
            prev
          </div>
          <div
            id="carouselB-next"
            className="carouselB-btn"
            onClick={handleNext}
          >
            next
          </div>
        </div>

        {/* carousel */}
      </div>
    </section>
  );
}

export default CarouselB;
