import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import SprintGameMenu from './components/SprintGameMenu/SprintGameMenu'
// import AudioChallenge from "./components/AudioChallenge/AudioChallenge";
import { UserUpdater } from "./components/UserUpdater/UserUpdater";
import Main from "./views/Main/Main";

import rootReducer from "./utils/rootReducer";
import sprintReducer from './utils/reducerSprint'
import './index.scss'
import Fillwords from "./views/Fillwords/Fillwords";

import "./index.scss";
import WordsList from "./components/WordsList/WordsList";

export default function App() {
  const store = createStore(rootReducer, composeWithDevTools());

  return (
    <Provider store={store}>
      <UserUpdater>
        <Router>
          <Switch>
            <Route path="/sprint" component={SprintGameMenu} />
            <Route path="/" exact component={Main} />
            {/* <Route path="/audioChallenge" component={AudioChallenge} /> */}
            <Route path="/fillwords" component={Fillwords} />
            <Route path="/cards" component={WordsList} />
          </Switch>
        </Router>
      </UserUpdater>
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
