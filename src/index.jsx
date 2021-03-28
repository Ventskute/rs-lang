import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./utils/rootReducer";

import "./index.scss";
import Savanna from "./сomponents/Savanna/Savanna";

export default function App() {
  const store = createStore(rootReducer, composeWithDevTools());

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/savanna" component={Savanna}>
            <Savanna
              words={[
                { word: "baker's", translation: "булочная" },
                { word: "bookshop", translation: "книжный магазин" },
                { word: "butcher's", translation: "мясной магазин" },
                { word: "clothes shop", translation: "магазин одежды" },
                { word: "dry-cleaner's", translation: "химчистка" },

                { word: "electronics shop", translation: "магазин элетроники" },

                { word: "greengrocer's", translation: "овощной магазин" },
                { word: "hairdresser's", translation: "парикмахерская" },
                { word: "internet cafe", translation: "интернет кафе" },
                { word: "pharmacy", translation: "аптека" },

                { word: "newsagent's", translation: "газетный киоск" },
                { word: "shoe shop", translation: "обувной магазин" },
                { word: "sports shop", translation: "спортивный магазин" },
                { word: "supermarket", translation: "супермаркет" },
              ]}
            />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
