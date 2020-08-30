import Router from "preact-router";
import Home from "./pages/Home";
import Levels from "./pages/Levels";
import SingleLevel from "./pages/SingleLevel";
import NotFound from "./pages/404";

import Header from "./components/header/Header";
import KinBackgroundTemp from "assets/KinBackAlleyPaint2.png";

export default function App () {

    const style = {
        backgroundImage: `url(${KinBackgroundTemp})`
    }

    return (
        <div class="font-sans leading-normal">

            <header class="fixed top-0 z-50 w-full h-16 bg-gray-700">
                <Header _class="w-full h-full p-2 mx-auto max-w-screen-2xl" />
            </header>

            <div class="mt-16 bg-fixed bg-cover" style={style}>
                <Router>
                    <Home exact path="/" />
                    <Levels exact path="/levels" />
                    <SingleLevel exact path="/:id" />
                    <NotFound exact default />
                </Router>
            </div>

        </div>
    )
}