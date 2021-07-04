// tutorial http://reactcommunity.org/react-transition-group/css-transition
// npm i react-transition-group
// 用於當dom結構消失與產生時的過渡

import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import "components/cssTranstion/CssTranstion.css";

// DOM生成時 同時給予 cssTransition-enter 和 cssTransition-enter-active 作過渡動畫
// DOM消失時 同時給予 cssTransition-exit 和 cssTransition-enter-exit-active 作過渡動畫

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
          in={showHello} // 是否生成這個DOM並觸發過渡動畫
          timeout={1 * 1000} // 持續多久 => 通常跟 css transtion 屬性同時間
          classNames="cssTransition" // 對應 cssTransition-enter / cssTransition-enter-active / cssTransition-exit / cssTransition-exit-active
          unmountOnExit // 過渡動畫執行完時是否還存在這個DOM
        >
          <div className="cssTransition-text">hello</div>
        </CSSTransition>
        <CSSTransition
          in={!showHello}
          timeout={1 * 1000}
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
