import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import App from "../src/App";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
      </Switch>
    </Router>
  );
}

export default App;
