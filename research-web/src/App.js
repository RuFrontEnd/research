import { BrowserRouter, Switch, Route } from "react-router-dom"; // npm install react-router-dom
import Reveal from "./components/reveal/Reveal";
import uploadFile from "./components/uploadFile/UploadFile";
import Nav from "components/Nav";
import { useEffect } from "react";

function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Nav style={{ padding: "20px" }} />
        </Route>
      </Switch>
      <Switch>
        <Route exact path="/uploadFile" component={uploadFile} />
      </Switch>
      <Switch>
        <Route exact path="/Reveal" component={Reveal} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
