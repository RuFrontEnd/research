import { BrowserRouter, Switch, Route } from "react-router-dom"; // npm install react-router-dom
import uploadFile from "./components/uploadFile/UploadFile";
import Reveal from "./components/reveal/Reveal";
import Nav from "components/Nav";
import Carousel from "components/carousel/CarouselModule";

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
          <Route exact path="/carousel" component={Carousel} />
        </Switch>
        <Switch>
          <Route exact path="/reveal" component={Reveal} />
        </Switch>
        <Switch>
          <Route exact path="/uploadFile" component={uploadFile} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
