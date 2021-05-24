import React, { useState, useEffect, useRef } from "react";
import "components/carouselB/CarouselB.scss";
import Radium from "radium"; // 可以使inline-style有media-qurey功能

function CarouselB(props) {
  const [direction, setDirection] = useState(-1);
  const $slider = useRef();
  const $carousel = useRef();
  const [items, setItems] = useState(["4", "5", "1", "2", "3"]);
  // const [items, setItems] = useState(["5", "6", "7", "1", "2", "3", "4"]);
  // const [items, setItems] = useState([
  //   "6",
  //   "7",
  //   "8",
  //   "9",
  //   "1",
  //   "2",
  //   "3",
  //   "4",
  //   "5",
  // ]);

  const [carouselBWidth, setCarouselBWidth] = useState(500);
  const [carouselBSliderWidth, setCarouselBSliderWidth] = useState(
    (carouselBWidth / 3) * items.length
  );
  const [carouselBSliderLeft, setCarouselBSliderLeft] = useState(
    (carouselBWidth / 3) * ((items.length - 3) / 2)
  );
  const carouselBContainerStyle = {
    width: `${carouselBWidth}px`,
  };
  const carouselBSliderStyle = {
    width: `${carouselBSliderWidth}px`,
    left: `-${carouselBSliderLeft}px`,
    "@media (max-width: 1800px)": {},
  };

  const handlePrev = () => {
    setDirection(1);
    $slider.current.style.transform = "translate(0%)";
  };

  const handleNext = () => {
    setDirection(-1);
    $slider.current.style.transform = "translate(-40%)";
  };

  const shiftItem = () => {
    const _items = [...items]; // 深拷貝(淺拷貝會影響到原陣列)
    if (direction === -1) {
      console.log(-1);
      const shiftItem = _items.shift();
      _items.push(shiftItem);
      setItems(_items);
    }
    if (direction === 1) {
      console.log(1);
      const popItem = _items.pop();
      _items.unshift(popItem);
      setItems(_items);
    }
    $slider.current.style.transition = "none";
    $slider.current.style.transform = "translate(-20%)";
    setTimeout(() => {
      $slider.current.style.transition = "0.3s";
    }, 4);
  };

  useEffect(() => {
    console.log(items);
  }, [items]);

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
      {/* carousel */}
      <div id="carouselB-container" style={carouselBContainerStyle}>
        <div id="carouselB-wrap" ref={$carousel}>
          <ul
            id="carouselB-slider"
            // className={sliderClassName}
            // onTransitionEnd={shiftItem}
            style={carouselBSliderStyle}
            ref={$slider}
          >
            {items.map((item, index) => (
              <>
                <li key={index}>{item}</li>
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
      </div>
      {/* carousel */}
    </section>
  );
}

export default Radium(CarouselB);
