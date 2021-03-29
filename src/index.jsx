import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./utils/rootReducer";
import AudioChallenge from "./components/AudioChallenge/AudioChallenge";
import Main from "./views/Main/Main";
import { UserUpdater } from "./components/UserUpdater/UserUpdater";

import "./index.scss";

export default function App() {
  const store = createStore(rootReducer, composeWithDevTools());

  return (
    <Provider store={store}>
      <UserUpdater>
        <Router>
          <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/audioChallenge" component={AudioChallenge} />
          </Switch>
        </Router>
      </UserUpdater>
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
