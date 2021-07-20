import { BrowserRouter, Switch, Route } from "react-router-dom"; // npm install react-router-dom
import { CSSTransition } from "react-transition-group";
import UploadFile from "components/uploadFile/UploadFile";
import Reveal from "components/reveal/Reveal";
import Carousel from "components/carousel/Carousel";
import CarouselB from "components/carouselB/CarouselB";
import Pagination from "components/pagination/Pagination";
import Internationalization from "components/internationalization/Internationalization";
import SetStateInUseEffect from 'components/setStateInUseEffect/SetStateInUseEffect'
import Nav from "components/Nav";
import CssTranstion from "components/cssTranstion/CssTranstion";
import "App.css";

const routes = [
  { path: "/", component: <Nav style={{ padding: "30px" }} /> },
  { path: "/setStateInUseEffect", component: <SetStateInUseEffect /> },
  { path: "/internation", component: <Internationalization /> },
  { path: "/pagination", component: <Pagination /> },
  { path: "/carouselB", component: <CarouselB /> },
  { path: "/carousel", component: <Carousel /> },
  { path: "/reveal", component: <Reveal /> },
  { path: "/uploadFile", component: <UploadFile /> },
  { path: "/cssTranstion", component: <CssTranstion /> },
];

function App() {
  return (
    <div style={{ position: "relative" }}>
      <BrowserRouter>
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
