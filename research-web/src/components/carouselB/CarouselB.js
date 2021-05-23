import React, { useState, useEffect, useRef } from "react";
import "components/carouselB/CarouselB.scss";
import { CSSTransitionGroup } from "react-transition-group"; // npm install react-transition-group@1.x --save / yarn add react-transition-group@1.x

function CarouselB(props) {
  const [sliderClassName, setSlideClassName] = useState(
    "carouselB-slider-next"
  );
  const [items, setItems] = useState([
    "content 1",
    "content 2",
    "content 3",
    "content 4",
    "content 5",
  ]);
  // const items = [
  //   <li id="li-01">1</li>,
  //   <li id="li-02">2</li>,
  //   <li id="li-03">3</li>,
  //   <li id="li-04">4</li>,
  //   <li id="li-05">5</li>,
  // ];
  const [index, setIndex] = useState(1);

  const handleLeft = () => {
    setSlideClassName("");
  };

  const handleRight = () => {
    changeItem();
    // setSlideClassName("carouselB-slider-next-active");
  };

  // const renderItem = (index) => {
  //   let renderItem = [];
  //   console.log("index", index);

  //   for (let i = index - 1; i < index + 2; i++) {
  //     renderItem.push(items[i]);
  //   }
  //   return renderItem;
  // };

  const changeItem = () => {
    // const _items = [...items];
    const _items = items;
    console.log("_items", _items);
    console.log("items", items);
    const shiftItem = _items.shift();
    // console.log("shiftItem", shiftItem);
    _items.push(shiftItem);
    setItems(_items);

    // setSlideClassName("carouselB-slider-next-deActive");
    // setTimeout(() => {
    //   setSlideClassName("carouselB-slider-next");
    // }, 3 * 1000);
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
        <div id="carouselB">
          <ul
            id="carouselB-slider"
            className={sliderClassName}
            // onTransitionEnd={changeItem}
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
            onClick={handleLeft}
          >
            prev
          </div>
          <div
            id="carouselB-next"
            className="carouselB-btn"
            onClick={handleRight}
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
