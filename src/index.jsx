import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import SprintGameMenu from './components/SprintGameMenu/SprintGameMenu'
import AudioChallenge from "./components/AudioChallenge/AudioChallenge";
import { UserUpdater } from "./components/UserUpdater/UserUpdater";
import Main from "./views/Main/Main";

import rootReducer from "./utils/rootReducer";
import sprintReducer from './utils/reducerSprint'
import "./index.scss";
import Savanna from "./сomponents/Savanna/Savanna";

import "./index.scss";

export default function App() {
  const store = createStore(rootReducer, composeWithDevTools());

  return (
    <>
      <Provider store={store}>
      <UserUpdater>
        <Router>
          <Switch>
            <Route path={"/savanna"} exact component={Savanna} />
            <Route path={"/savanna/:group/:page"} exact component={Savanna} />
            <Route path="/sprint" component={SprintGameMenu} />
            <Route path="/" exact component={Main} />
            <Route path="/audioChallenge" component={AudioChallenge} />
          </Switch>
          <ul>
            <li>
              <Link to="/savanna">Component</Link>
            </li>
            <li>
              <Link to="/savanna/1/2">From page</Link>
            </li>
          </ul>
        </Router>
      </UserUpdater>
      </Provider>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
