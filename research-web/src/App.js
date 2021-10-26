import { BrowserRouter, Switch, Route } from "react-router-dom"; // npm install react-router-dom
import { CSSTransition } from "react-transition-group";
import UploadFile from "components/uploadFile/UploadFile";
import Reveal from "components/reveal/Reveal";
import Carousel from "components/carousel/Carousel";
import CarouselB from "components/carouselB/CarouselB";
import Pagination from "components/pagination/Pagination";
import Internationalization from "components/internationalization/Internationalization";
import SetStateInUseEffect from "components/setStateInUseEffect/SetStateInUseEffect";
import Objector from "components/objector/Objector";
import Nav from "components/Nav";
import CssTranstion from "components/cssTranstion/CssTranstion";
import InfiniteScroll from "components/infiniteScroll/infiniteScroll";
import ResizableTable from "components/resizableTable/ResizableTable";
import This from "components/this/This";
import Prototype from "components/prototype/Prototype";
import Class from "components/Class/Class";
import DesignPattern from "components/designPattern/DesignPattern";
import UseCallback from "components/useCallback/UseCallback";
import OOP from "components/oop/OOP";
import FP from "components/fp/FP";
import "App.css";
import axios from "axios";

export const routes = [
  { path: "/fp", component: <FP /> },
  { path: "/oop", component: <OOP /> },
  { path: "/useCallback", component: <UseCallback /> },
  { path: "/designPattern", component: <DesignPattern /> },
  { path: "/class", component: <Class /> },
  { path: "/prototype", component: <Prototype /> },
  { path: "/this", component: <This /> },
  { path: "/objector", component: <Objector /> },
  { path: "/setStateInUseEffect", component: <SetStateInUseEffect /> },
  { path: "/internation", component: <Internationalization /> },
  { path: "/pagination", component: <Pagination /> },
  { path: "/carouselB", component: <CarouselB /> },
  { path: "/carousel", component: <Carousel /> },
  { path: "/reveal", component: <Reveal /> },
  { path: "/uploadFile", component: <UploadFile /> },
  { path: "/cssTranstion", component: <CssTranstion /> },
  { path: "/infiniteScroll", component: <InfiniteScroll /> },
  { path: "/resizableTable", component: <ResizableTable /> },
];

axios.defaults.baseURL = "http://localhost:8000";

function App() {
  return (
    <div style={{ position: "relative" }}>
      <BrowserRouter>
        <Route exact path="/">
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
        {routes.map((route) => (
          <Route exact path={route.path}>
            {({ match }) => (
              <CSSTransition
                in={match != null}
                timeout={300}
                classNames="transition"
                unmountOnExit
              >
                {route.component}
              </CSSTransition>
            )}
          </Route>
        ))}
      </BrowserRouter>
    </div>
  );
}

export default App;
