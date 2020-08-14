import Router from "preact-router";
import Home from "./pages/Home";
import Levels from "./pages/Levels";
import NotFound from "./pages/404";

export default function App () {
    return (
      <div class="font-sans leading-normal">
        
        <Router>
          <Home exact path="/" />
          <Levels path="/levels/:_selectedLevel?" />
          <NotFound exact default />
        </Router>

      </div>
    )
}