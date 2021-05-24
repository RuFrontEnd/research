import React, { useState, useEffect, useRef } from "react";
import "components/carouselB/CarouselB.scss";
import Radium from "radium"; // 可以使inline-style有media-qurey功能
import { ReactComponent as Arrow } from "assets/arrow.svg";

function CarouselModuleB(props) {
  const { CarouselItems, width, height, buttonSize, breakpoints } = props;
  const $slider = useRef();
  const $carousel = useRef();

  const [direction, setDirection] = useState(-1);
  const [items, setItems] = useState(CarouselItems);
  const [carouselBWidth, setCarouselBWidth] = useState(width);
  const [carouselBHeight, setCarouselBHeight] = useState(height);
  const carouselItemWidth = carouselBWidth / 3;
  const [carouselBSliderWidth, setCarouselBSliderWidth] = useState(
    carouselItemWidth * items.length
  );
  const [carouselBSliderLeft, setCarouselBSliderLeft] = useState(
    carouselItemWidth * ((items.length - 3) / 2)
  );
  const [btnSize, setBtnSize] = useState(buttonSize);

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1200) {
      setCarouselBWidth(1170);
    }
    if (window.innerWidth < 1200) {
      setCarouselBWidth(960);
    }
  });

  useEffect(() => {
    if (carouselBWidth) {
      console.log("a");
      setCarouselBSliderWidth(carouselItemWidth * items.length);
      setCarouselBSliderLeft(carouselItemWidth * ((items.length - 3) / 2));
      // $slider.current.style.transition = "0.3s";
    }
  }, [carouselBWidth]);

  // inline style
  const carouselBContainerStyle = {
    width: `${carouselBWidth}px`,
    height: `${carouselBHeight}px`,
    // "@media (max-width: 1200px)": {
    //   width: A,
    // },
  };
  const carouselBSliderStyle = {
    width: `${carouselBSliderWidth}px`,
    left: `-${carouselBSliderLeft}px`,
  };

  const handlePrev = () => {
    setDirection(1);
    $slider.current.style.transition = "0.3s";
    $slider.current.style.transform = `translate(${carouselItemWidth}px)`;
  };

  const handleNext = () => {
    setDirection(-1);
    $slider.current.style.transition = "0.3s";
    $slider.current.style.transform = `translate(-${carouselItemWidth}px)`;
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
    $slider.current.style.transform = `translate(0px)`;
    // setTimeout(() => {
    //   $slider.current.style.transition = "0.3s";
    // }, 4);
  };

  useEffect(() => {
    console.log(carouselItemWidth);
  }, [carouselItemWidth]);

  useEffect(() => {
    console.log(items);
  }, [items]);

  return (
    <>
      {/* carousel */}
      <div id="carouselB-container" style={carouselBContainerStyle}>
        <div id="carouselB-wrap" ref={$carousel}>
          <ul
            id="carouselB-slider"
            // className={sliderClassName}
            onTransitionEnd={shiftItem}
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
            style={{ top: `calc(50% - ${btnSize / 2}px)` }}
          >
            <Arrow
              style={{
                width: btnSize,
                height: btnSize,
              }}
            ></Arrow>
          </div>
          <div
            id="carouselB-next"
            className="carouselB-btn"
            onClick={handleNext}
            style={{ top: `calc(50% - ${btnSize / 2}px)` }}
          >
            <Arrow
              style={{
                width: btnSize,
                height: btnSize,
                transform: "scaleX(-1)",
              }}
            ></Arrow>
          </div>
        </div>
      </div>
      {/* carousel */}
    </>
  );
}

export default Radium(CarouselModuleB);
