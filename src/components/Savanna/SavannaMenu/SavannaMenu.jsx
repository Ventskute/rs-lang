import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Savanna from "../Savanna";
export default function SavannaMenu() {
  return (
    <div className="savannaMenu">
      <>
        <Router>
          <Switch></Switch>
        </Router>
      </>
      <ul>
        <li>
          <Link to="/savanna/">Component</Link>
        </li>
        <li>
          <Link to="/savanna/1/1">From page</Link>
        </li>
      </ul>
    </div>
  );
}
