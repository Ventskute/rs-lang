import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link, useLocation, useHistory } from "react-router-dom";
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
import Textbook from "./components/Textbook/Textbook";
import Statistics from "./components/Statistics/Statistics";
import Dictionary from "./components/Dictionary/Dictionary";

import rootReducer from "./utils/rootReducer";
import sprintReducer from "./utils/reducerSprint";

import "./index.scss";
import Menu from "./components/Menu/Menu";
import Team from "./views/Team/Team";

export default function App() {
  const store = createStore(rootReducer, composeWithDevTools());
  const history = useHistory();

  const path = localStorage.getItem('page');
  if (history.location.pathname === '/') {
    path && history.replace(path);
  }


  return (
    <Provider store={store}>
      <UserUpdater>
        <Menu />
        <Switch>
          <Route path={"/savannaMenu"} exact component={SavannaMenu} />
          <Route path={"/savanna"} exact component={Savanna} />
          <Route path={"/savanna/:group/:page"} exact component={Savanna} />
          <Route path="/sprint" component={SprintGameMenu} />
          <Route path="/" exact component={Main} />
          <Route path="/fillwords" component={Fillwords} />
          <Route path="/textbook" exact component={Textbook} />
          <Route path="/wordslist" component={WordsList} />
          <Route path="/audioChallenge" exact component={AudioChallengeContainer} />
          <Route path="/team" component={Team} />
          <Route path="/statistics" component={Statistics} />
          <Route path="/dictionary" component={Dictionary} />
        </Switch>
      </UserUpdater>
    </Provider>
  );
}

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
