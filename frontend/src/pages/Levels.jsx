import LevelHorizontal from "../components/levels/LevelHorizontal";
import Switch from "../components/generic/Switch";
import useLevels from "../hooks/useLevels";
import LevelDetail from "../components/levels/LevelDetail";
import cm from "classnames";
import {trap, stubTrue, paramsLink} from "../utils/functions.js";

import {_, it, lift as L} from "param.macro";

import {Link} from "preact-router";

import KinBackgroundTemp from "assets/KinBackAlleyPaint2.png";


import {useState, useEffect} from "preact/hooks";

function LoadingScreen() {
    return (
        <div class="flex flex-col items-center justify-center">
            <svg class="w-12 h-12 text-white animate-spin" viewBox="0 0 512 512">
                <path class="fa-secondary" fill="currentColor" d="M479 365zm-22 6l-28-16a16 16 0 01-7-19A184 184 0 11256 72l17 1h-2c-8-1-15-8-15-16V25a16 16 0 0115-16l-15-1a248 248 0 10223 357c-4 7-15 10-22 6z" opacity=".4"/><path class="fa-primary" fill="currentColor" d="M271 73c-8-1-15-8-15-16V25c0-9 8-17 17-16 129 8 231 116 231 247a246 246 0 01-25 108c-4 8-14 11-22 7l-28-16c-8-4-10-14-6-21a183 183 0 0017-78c0-96-74-176-169-183z"/>
            </svg>
            <p class="pl-2 mt-6 text-lg font-semibold tracking-wide text-white lowercase">Loading...</p>
        </div>
    )
}

function LevelList({levels, _class, state}) {
    const [selectedIndex, setSelectedIndex] = state;
    return (
        <div class={cm("flex flex-col justify-center", _class)} >
            {levels.map((level, idx) => {
                const _class = idx > 0 ? "mt-8" : "";
                return <LevelHorizontal level={level} selected={selectedIndex === idx} _class={_class} callback={trap(() => setSelectedIndex(prev => idx))} />
            })}
        </div>
    )
}

function ErrorScreen({error}) {
    return (
        <div>
            <p>Error!</p>
            <code>{error.toString()}</code>
        </div>
    )
}

export default function Levels ({p, no}) {
    const defaults = {
        p: 0,
        no: 20
    }
    const page = p || defaults.p;
    const limit = no || defaults.no;

    const {levels, state, error} = useLevels({page, limit});

    const [selectedIndex, setSelectedIndex] = useState(-1);

    useEffect(() => {
        setSelectedIndex(-1);
    }, [p, no]);

    const style = {
        backgroundImage: `url(${KinBackgroundTemp})`
    }
    
    return (
        <main class="flex flex-col mx-auto bg-fixed bg-cover" style={style}>
            <div class="fixed top-0 z-50 w-full h-16 bg-blue-300">
                Header {selectedIndex} page {p}
                <Link href={paramsLink('/levels', {p: parseInt(page) + 1}, defaults)}>Click me!!</Link>
            </div>
            <div class="flex flex-row items-start justify-center flex-grow mt-16" onMouseDown={trap(() => setSelectedIndex(prev => -1))}>
                
                <div class="flex flex-col justify-center w-3/5 max-w-3xl min-h-screen p-8 pt-24 -mt-16 bg-gray-700 bg-opacity-50">
                    <Switch args={[state]}>
                        <LoadingScreen test={L(it === "LOADING")} />

                        <LevelList test={L(it === "LOADED")}
                            levels={levels}
                            state={[selectedIndex, setSelectedIndex]}
                        />
                                        
                        <ErrorScreen test={L(it === "ERROR")} error={error}/>
                    </Switch>
                </div>
                
                <div class="sticky top-0 w-2/5 -mt-16">
                    <div class="flex items-center justify-center h-screen mx-4">
                        
                        <div class="w-full p-8 bg-gray-300 shadow-lg" onMouseDown={trap(stubTrue)}>
                            <Switch args={[selectedIndex]}>
                                <p test={L(it === -1)}>Select a level...</p>
                                <LevelDetail test={stubTrue} level={levels[selectedIndex]} />
                            </Switch>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    )
}