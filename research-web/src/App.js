import { BrowserRouter, Switch, Route } from "react-router-dom"; // npm install react-router-dom
import Reveal from "./components/reveal/Reveal";
import uploadFile from "./components/uploadFile/UploadFile";
import Nav from "components/Nav";
import { useEffect } from "react";

function App() {
  // document.body.style = "background: 	#FFE4C4;";
  return (
    <div>
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
    </div>
  );
}

export default App;
