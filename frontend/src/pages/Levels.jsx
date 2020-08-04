import LevelHorizontal from "../components/levels/LevelHorizontal";
import Switch from "../components/generic/Switch";
import useLevels from "../hooks/useLevels";
import _, { max } from "lodash";
import LevelDetail from "../components/levels/LevelDetail";
import cm from "classnames";
import {trap} from "../utils/functions.js";

import {useState} from "preact/hooks";

function LoadingScreen() {
    return (
        <p>Loading...</p>
    )
}

function LevelList({levels, _class, callback}) {
    return (
        <div class={cm("flex flex-col justify-center max-w-3xl p-8", _class)} onClick={trap(() => callback(prev => -1))}>
            {levels.map((level, idx) => {
                const _class = idx > 0 ? "mt-8" : "";
                return <LevelHorizontal level={level} _class={_class} callback={trap(() => callback(prev => idx))} />
            })}
        </div>
    )
}

function ErrorScreen() {
    return (
        <p>Error!</p>
    )
}

export default function Levels () {

    const {levels, state, error} = useLevels();

    const [selectedIndex, setSelectedIndex] = useState(-1);
    
    const equals = _.curry(_.eq);

    return (
        <main class="container">
            <div class="fixed top-0 z-50 w-screen h-16 bg-blue-300">
                Header
            </div>
            <div class="flex flex-row justify-center mt-16">
                
                <div class="w-3/5">
                <Switch args={[state]}>
                    <LoadingScreen test={equals("LOADING")} />

                    <LevelList test={equals("LOADED")} levels={levels} _class="bg-gray-300" callback={setSelectedIndex}/>
                    
                    <ErrorScreen test={equals("ERROR")} />
                </Switch>
                </div>
                
                <div class="w-2/5">
                    <Switch args={[selectedIndex]}>
                        <p test={equals(-1)}>Select a level...</p>
                        <LevelDetail test={_.stubTrue} level={levels[selectedIndex]} />
                    </Switch>
                </div>

            </div>
        </main>
    )
}