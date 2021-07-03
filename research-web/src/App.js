import { BrowserRouter, Switch, Route } from "react-router-dom"; // npm install react-router-dom
import UploadFile from "components/uploadFile/UploadFile";
import Reveal from "components/reveal/Reveal";
import Carousel from "components/carousel/Carousel";
import CarouselB from "components/carouselB/CarouselB";
import Pagination from "components/pagination/Pagination";
import Internationalization from "components/internationalization/Internationalization";
import Nav from "components/Nav";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Nav style={{ padding: "30px" }} />
          </Route>
          <Route exact path="/internation" component={Internationalization} />
          <Route exact path="/pagination" component={Pagination} />
          <Route exact path="/carouselB" component={CarouselB} />
          <Route exact path="/carousel" component={Carousel} />
          <Route exact path="/reveal" component={Reveal} />
          <Route exact path="/uploadFile" component={UploadFile} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
