import LevelHorizontal from "../components/levels/LevelHorizontal";
import Switch from "../components/generic/Switch";
import useLevels from "../hooks/useLevels";
import LevelDetail from "../components/levels/LevelDetail";
import cm from "classnames";
import {trap, stubTrue, paramsLink} from "../utils/functions.js";

import {_, it, lift as L} from "param.macro";

import {Link} from "preact-router";


import {useState, useEffect} from "preact/hooks";

function LoadingScreen() {
    return (
        <p>Loading...</p>
    )
}

function LevelList({levels, _class, state}) {
    const [selectedIndex, setSelectedIndex] = state;
    return (
        <div class={cm("flex flex-col justify-center p-8", _class)} >
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
        console.log("it changed!");
        console.log(p);
        console.log(no);
    }, [p, no]);
    
    return (
        <main class="mx-auto">
            <div class="fixed top-0 z-50 w-full h-16 bg-blue-300">
                Header {selectedIndex} page {p}
                <Link href={paramsLink('/levels', {p: parseInt(page) + 1}, defaults)}>Click me!!</Link>
            </div>
            <div class="flex flex-row items-start justify-center mt-16" onMouseDown={trap(() => setSelectedIndex(prev => -1))}>
                
                <div class="w-3/5 max-w-3xl">
                <Switch args={[state]}>
                    <LoadingScreen test={L(it === "LOADING")} />

                    <LevelList test={L(it === "LOADED")}
                        levels={levels}
                        state={[selectedIndex, setSelectedIndex]}
                        _class="bg-gray-300"/>
                                    
                    <ErrorScreen test={L(it === "ERROR")} error={error}/>
                </Switch>
                </div>
                
                <div class="sticky top-0 w-2/5 -mt-16">
                    <div class="flex items-center justify-center h-screen mx-4">
                        
                        <div class="w-full p-8 bg-gray-300" onMouseDown={trap(stubTrue)}>
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