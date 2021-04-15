import { BrowserRouter, Switch, Route } from "react-router-dom"; // npm install react-router-dom
import Reveal from "./components/reveal/Reveal";
import uploadFile from "./components/uploadFile/UploadFile";
import Nav from "components/Nav";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Nav}></Route>
      </Switch>
      <Switch>
        <Route exact path="/uploadFile" component={uploadFile}></Route>
      </Switch>
      <Switch>
        <Route exact path="/Reveal" component={Reveal}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
