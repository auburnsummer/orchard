import Router from "preact-router";
import Home from "./pages/Home";
import Levels from "./pages/Levels";
import SingleLevel from "./pages/SingleLevel";
import NotFound from "./pages/404";

export default function App () {
    return (
      <div class="font-sans leading-normal">
        
        <Router>
          <Home exact path="/" />
          <Levels exact path="/levels" />
          <SingleLevel exact path="/levels/:id" />
          <NotFound exact default />
        </Router>

      </div>
    )
}