import { useEffect, useState, useRef } from "react";
import "components/carousel/Carousel.scss";

function Carousel() {
  useEffect(() => {}, []);

  return (
    <div id="carousel" className="noselect">
      <div className="arrow arrow-left">
        <i className="fi-arrow-left"></i>
      </div>
      {/* <ReactCSSTransitionGroup transitionName={this.state.direction}>
        {this.generateItems()}
      </ReactCSSTransitionGroup> */}
      <div className="arrow arrow-right">
        <i className="fi-arrow-right"></i>
      </div>
    </div>
  );
}

export default Carousel;
