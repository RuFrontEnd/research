// tutorial http://reactcommunity.org/react-transition-group/css-transition
// npm i react-transition-group
// 用於當dom結構消失與產生時的過渡

import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import "components/cssTranstion/CssTranstion.css";

// dom生成時 給與

function CssTranstion() {
  const [showHello, setShowHello] = useState(true);

  return (
    <section>
      <button
        onClick={() => {
          setShowHello(!showHello);
        }}
      >
        switchMessage
      </button>
      <div style={{ position: "relative" }}>
        <CSSTransition
          in={showHello}
          timeout={1 * 1000} // 持續多久 => 通常跟css transtion屬性同時間
          classNames="cssTransition"
          unmountOnExit
        >
          <div className="cssTransition-text">hello</div>
        </CSSTransition>
        <CSSTransition
          in={!showHello}
          timeout={1 * 1000} // 持續多久 => 通常跟css transtion屬性同時間
          classNames="cssTransition"
          unmountOnExit
        >
          <div className="cssTransition-text">world</div>
        </CSSTransition>
      </div>
    </section>
  );
}

export default CssTranstion;
