import Router from "preact-router";
import Home from "./pages/Home";
import Levels from "./pages/Levels";
import SingleLevel from "./pages/SingleLevel";
import NotFound from "./pages/404";

import Header from "./components/header/Header";
import KinBackgroundTemp from "assets/KinBackAlleyPaint2.png";

import useLocalStorage from "hooks/useLocalStorage";

import {useState} from "preact/hooks";

export default function App () {

    const defaultSettings = {
        background: KinBackgroundTemp,
        levelsPerPage: 10,
        potatoChip: "yay",
        sortDirection: "uploaded.desc,last_updated.desc",
        useIPFSLinks: false,
        showAutoimporter: false
    }

    const settings = useLocalStorage("orchard_globalSettings", defaultSettings);
    const [globalSettings, setGlobalSettings] = settings;

    const [showSettings, setShowSettings] = useState(false);

    const style = {
        backgroundImage: `url(${globalSettings.background || defaultSettings.background})`,
        backgroundPosition: "100% calc(100% + 4rem)",
        imageRendering: "crisp-edges"
    };

    return (
        <div class="font-sans leading-normal">

            <header class="fixed top-0 z-50 w-full h-16 bg-gray-700">
                <Header _class="w-full h-full mx-auto max-w-screen-2xl" settings={settings} showState={[showSettings, setShowSettings]}/>
            </header>

            <div class="mt-16 bg-fixed bg-cover" style={style} onClick={() => setShowSettings(false)}>
                <Router>
                    <Home exact path="/" />
                    <Levels exact path="/levels" globalSettings={globalSettings}/>
                    <SingleLevel exact path="/:id" />
                    <NotFound exact default />
                </Router>
            </div>

        </div>
    )
}