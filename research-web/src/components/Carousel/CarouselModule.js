import { useEffect, useState, useRef } from "react";
import CarouselItem from "components/carousel/CarouselItem";
import "components/carousel/Carousel.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

// let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

function Carousel(props) {
  console.log("props", props);
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
      level = active - tmp;
      items.push(<CarouselItem key={index} id={items[index]} level={level} />);
    }
    return items;
  };

  useEffect(() => {
    // console.log(generateItems());
  }, []);

  return (
    <div id="carousel" className="noselect">
      <div className="arrow arrow-left">
        <FontAwesomeIcon icon={faArrowLeft} />
      </div>
      {/* <ReactCSSTransitionGroup transitionName={this.state.direction}> */}
      {/* {generateItems()} */}
      <CarouselItem key={1} id={1} level={0} />
      <CarouselItem key={2} id={2} level={1} />
      <CarouselItem key={3} id={3} level={2} />
      <CarouselItem key={4} id={4} level={-1} />
      <CarouselItem key={4} id={5} level={-2} />
      {/* </ReactCSSTransitionGroup> */}
      <div className="arrow arrow-right">
        <i className="fi-arrow-right">
          <FontAwesomeIcon icon={faArrowRight} />
        </i>
      </div>
    </div>
  );
}

export default Carousel;
