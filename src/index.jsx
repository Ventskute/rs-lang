import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./utils/rootReducer";
import AudioChallenge from "./components/AudioChallenge/AudioChallenge";
import Main from "./views/Main/Main";

import "./index.scss";

export default function App() {
  const store = createStore(rootReducer, composeWithDevTools());

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/audioChallenge" component={AudioChallenge} />
        </Switch>
      </Router>
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
