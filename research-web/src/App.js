import { BrowserRouter, Switch, Route } from "react-router-dom"; // npm install react-router-dom
import UploadFile from "components/uploadFile/UploadFile";
import Reveal from "components/reveal/Reveal";
import Carousel from "components/carousel/Carousel ";
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
