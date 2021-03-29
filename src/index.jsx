import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./utils/rootReducer";

import "./index.scss";
import Savanna from "./сomponents/Savanna/Savanna";

export default function App() {
  const store = createStore(rootReducer, composeWithDevTools());

  return (
    <>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path={"/savanna"} exact component={Savanna} />
            <Route path={"/savanna/:group/:page"} exact component={Savanna} />
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
      </Provider>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
