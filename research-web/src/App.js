import { BrowserRouter, Switch, Route } from "react-router-dom"; // npm install react-router-dom
import UploadFile from "components/uploadFile/UploadFile";
import Reveal from "components/reveal/Reveal";
import Carousel from "components/carousel/Carousel";
import CarouselB from "components/carouselB/CarouselB";
import Pagination from "components/pagination/Pagination";
import Internationalization from "components/internationalization/Internationalization";
import Nav from "components/Nav";
// import CSSTransition from "react-transition-group/CSSTransition"
import { CSSTransition } from "react-transition-group";
import 'App.css'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Route exact path="/">
          {/* <Switch> */}
          {({ match }) => (
            <CSSTransition
              in={match != null}
              timeout={300}
              classNames="transition"
              unmountOnExit
            >
              <Nav style={{ padding: "30px" }} />
            </CSSTransition>
          )}
        </Route>
        <Route exact path="/internation">
          {({ match }) => (
            <CSSTransition
              in={match != null}
              timeout={300}
              classNames="transition"
              unmountOnExit
            >
              <Internationalization />
            </CSSTransition>
          )}
        </Route>
        <Route exact path="/pagination" component={Pagination} />
        <Route exact path="/carouselB" component={CarouselB} />
        <Route exact path="/carousel" component={Carousel} />
        <Route exact path="/reveal" component={Reveal} />
        <Route exact path="/uploadFile" component={UploadFile} />
        {/* </Switch> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
