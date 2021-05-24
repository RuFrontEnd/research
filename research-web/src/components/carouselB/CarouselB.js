import React, { useState, useEffect, useRef } from "react";
import "components/carouselB/CarouselB.scss";

function CarouselB(props) {
  const [direction, setDirection] = useState(-1);
  const $slider = useRef();
  const $carousel = useRef();
  const [items, setItems] = useState(["4", "5", "1", "2", "3"]);

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
      <div id="carouselB-container">
        <div id="carouselB-wrap" ref={$carousel}>
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
      </div>
      {/* carousel */}
    </section>
  );
}

export default CarouselB;
