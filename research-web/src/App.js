import { BrowserRouter, Switch, Route } from "react-router-dom"; // npm install react-router-dom
import UploadFile from "components/uploadFile/UploadFile";
import Reveal from "components/reveal/Reveal";
import Carousel from "components/carousel/Carousel";
import CarouselB from "components/carouselB/CarouselB";
import Pagination from "components/pagination/Pagination";
import Internation from "components/internation/Internation";
import Nav from "components/Nav";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Nav style={{ padding: "30px" }} />
          </Route>
        </Switch>
        <Switch>
          <Route exact path="/internation" component={Internation} />
        </Switch>
        <Switch>
          <Route exact path="/pagination" component={Pagination} />
        </Switch>
        <Switch>
          <Route exact path="/carouselB" component={CarouselB} />
        </Switch>
        <Switch>
          <Route exact path="/carousel" component={Carousel} />
        </Switch>
        <Switch>
          <Route exact path="/reveal" component={Reveal} />
        </Switch>
        <Switch>
          <Route exact path="/uploadFile" component={UploadFile} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
