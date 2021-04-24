import { useEffect, useState, useRef } from "react";
import CarouselItem from "components/carousel/CarouselItem";
import "components/carousel/Carousel.scss";

function Carousel(props) {
  const { activation, cards } = props;
  const [active, setActive] = useState(activation);
  const [items, setItems] = useState(cards);

  const generateItems = () => {
    let items = [];
    let level;
    let index;
    let tmp = active - 2;
    for (let i = active - 2; i < active + 3; i++) {
      index = i;
      if (i < 0) {
        index = items.length + i;
      } else if (i >= items.length) {
        index = i % items.length;
      }
    }
    level = active - tmp;
    items.push(<CarouselItem key={index} id={items[index]} level={level} />);
    return items;
  };

  useEffect(() => {
    // console.log(generateItems())
  }, []);

  return (
    <div id="carousel" className="noselect">
      <div className="arrow arrow-left">
        <i className="fi-arrow-left"></i>
      </div>
      {/* <ReactCSSTransitionGroup transitionName={this.state.direction}> */}
      {generateItems()}
      {/* </ReactCSSTransitionGroup> */}
      <div className="arrow arrow-right">
        <i className="fi-arrow-right"></i>
      </div>
    </div>
  );
}

export default Carousel;
