import Router from "preact-router";
import Home from "./pages/Home";
import Levels from "pages/Levels";
import SingleLevel from "./pages/SingleLevel";
import NotFound from "./pages/404";

import Header from "components/header/organisms/Header";
import KinBackgroundTemp from "assets/KinBackAlleyPaint2.png";

import useLocalStorage from "hooks/useLocalStorage";

import {useState} from "preact/hooks";

import "./App.css";

export default function App () {

    const defaultSettings = {
        background: KinBackgroundTemp,
        levelsPerPage: 10,
        potatoChip: "yay",
        sortDirection: "uploaded.desc,last_updated.desc",
        useIPFSLinks: false,
        showAutoimporter: false,
        showUnranked: false
    }

    const settings = useLocalStorage("orchard_globalSettings", defaultSettings);
    const [globalSettings, setGlobalSettings] = settings;

    const [showSettings, setShowSettings] = useState(false);

    const style = {
        backgroundImage: `url(${globalSettings.background || defaultSettings.background})`,
    };

    return (
        <div class="app">

            <header class="app_header-wrapper">
                <Header _class="app_header" settings={settings} showState={[showSettings, setShowSettings]}/>
            </header>

            <div class="app_main-wrapper" style={style} onClick={() => setShowSettings(false)}>
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