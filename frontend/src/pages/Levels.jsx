import LevelHorizontal from "../components/levels/LevelHorizontal";
import Switch from "../components/generic/Switch";
import useLevels from "../hooks/useLevels";
import _ from "lodash";
import LevelDetail from "../components/levels/LevelDetail";
import cm from "classnames";
import {trap} from "../utils/functions.js";

import {useState} from "preact/hooks";

function LoadingScreen() {
    return (
        <p>Loading...</p>
    )
}

function LevelList({levels, _class, state}) {
    const [selectedIndex, setSelectedIndex] = state;
    return (
        <div class={cm("flex flex-col justify-center p-8", _class)} onClick={trap(() => setSelectedIndex(prev => -1))}>
            {levels.map((level, idx) => {
                const _class = idx > 0 ? "mt-8" : "";
                return <LevelHorizontal level={level} selected={selectedIndex === idx} _class={_class} callback={trap(() => setSelectedIndex(prev => idx))} />
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
        <main class="mx-auto">
            <div class="fixed top-0 z-50 w-full h-16 bg-blue-300">
                Header {selectedIndex}
            </div>
            <div class="flex flex-row items-start justify-center mt-16">
                
                <div class="w-3/5 max-w-3xl">
                <Switch args={[state]}>
                    <LoadingScreen test={equals("LOADING")} />

                    <LevelList test={equals("LOADED")}
                        levels={levels}
                        state={[selectedIndex, setSelectedIndex]}
                        _class="bg-gray-300"/>
                                    
                    <ErrorScreen test={equals("ERROR")} />
                </Switch>
                </div>
                
                <div class="sticky top-0 w-2/5 -mt-16">
                    <div class="flex items-center justify-center h-screen mx-4 -mt-16">
                        
                        <div class="w-full p-8 bg-gray-300">
                            <Switch args={[selectedIndex]}>
                                <p test={equals(-1)}>Select a level...</p>
                                <LevelDetail test={_.stubTrue} level={levels[selectedIndex]} />
                            </Switch>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    )
}