import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import SprintGameMenu from "./components/SprintGameMenu/SprintGameMenu";
import AudioChallengeContainer from "./components/AudioChallenge/AudioChallengeContainer";
import { UserUpdater } from "./components/UserUpdater/UserUpdater";
import Main from "./views/Main/Main";
import Fillwords from "./views/Fillwords/Fillwords";
import WordsList from "./components/WordsList/WordsList";
import SavannaMenu from "./components/Savanna/SavannaMenu/SavannaMenu";
import Savanna from "./components/Savanna/Savanna";

import rootReducer from "./utils/rootReducer";
import sprintReducer from "./utils/reducerSprint";

import "./index.scss";

export default function App() {
  const store = createStore(rootReducer, composeWithDevTools());

  return (
    <Provider store={store}>
      <UserUpdater>
        <Router>
          <Switch>
            <Route path={"/savannaMenu"} exact component={SavannaMenu} />
            <Route path={"/savanna"} exact component={Savanna} />
            <Route path={"/savanna/:group/:page"} exact component={Savanna} />
            <Route path="/sprint" component={SprintGameMenu} />
            <Route path="/" exact component={Main} />
            <Route path="/fillwords" component={Fillwords} />
            <Route path="/textbook" exact component={Textbook} />
            <Route path="/wordslist" component={WordsList} />
            <Route path="/audioChallenge" component={AudioChallengeContainer} />
          </Switch>
        </Router>
      </UserUpdater>
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
