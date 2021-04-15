import { BrowserRouter, Switch, Route } from "react-router-dom"; // npm install react-router-dom
import Reveal from "./reveal/Reveal";

function App() {
  return (
    <BrowserRouter>
     <Switch>
        <Route exact path="/Reveal"></Route>
      </Switch>
      <Switch>
        <Route exact path="/Reveal"></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
