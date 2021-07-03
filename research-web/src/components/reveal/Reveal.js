// npm i react-reveal --save (如有版本問題使用 npm i react-reveal --save --force)
// yarn add react-reveal
// https://www.react-reveal.com/

import "components/reveal/Reveal.css";
import logo from "assets/logo.png";
import Zoom from "react-reveal/Zoom";
import Fade from "react-reveal/Fade";
import Slide from "react-reveal/Slide";

function Reveal() {
  return (
      <section>
        <header className="App-header">
          <h1 className="App-title">01</h1>
          <Zoom>
            <img src={logo} className="App-logo" alt="logo" />
          </Zoom>
          <h1 className="App-title">02</h1>
          <Slide bottom>
            <div>
              <img src={logo} className="App-logo" alt="logo" />
            </div>
          </Slide>
          <h1 className="App-title">03</h1>
          <Fade left>
            <img src={logo} className="App-logo" alt="logo" />
          </Fade>
          <h1 className="App-title">04</h1>
          <Fade top big cascade>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <img src={logo} className="App-logo" alt="logo" />
              <img src={logo} className="App-logo" alt="logo" />
              <img src={logo} className="App-logo" alt="logo" />
            </div>
          </Fade>
        </header>
      </section>
  );
}

export default Reveal;
