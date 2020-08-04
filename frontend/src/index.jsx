import "preact/debug";

import preact, {h} from 'preact';


import style from "./style.css";

import Router from "preact-router";
import Home from "./pages/Home";
import Levels from "./pages/Levels";
import NotFound from "./pages/404";

export default function App () {
    return (
      <Router>
        <Home exact path="/" />
        <Levels exact path="/levels" />
        <NotFound exact default />
      </Router>
    )
}