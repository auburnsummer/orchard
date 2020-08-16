import Switch from "../components/generic/Switch";
import useLevels from "../hooks/useLevels";
import LevelDetail from "../components/levels/LevelDetail";
import cm from "classnames";
import {trap, leftClick, stubTrue, paramsLink, eq} from "../utils/functions.js";

import KinBackgroundTemp from "assets/KinBackAlleyPaint2.png";
import {useState, useEffect} from "preact/hooks";
import LoadingIcon from "components/levels/LoadingIcon";
import LevelList from "components/levels/LevelList";

import LevelListHeaderInfo from "components/levels/LevelListHeaderInfo";
import ErrorScreen from "components/levels/ErrorScreen";
import SelectALevel from "components/levels/SelectALevel";
import Header from "components/levels/Header";

const defaults = {
    p: 0,
    no: 20
}

export default function Levels ({p, no}) {
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

    const resetSelectedLevel = () => {
        setSelectedIndex(prev => -1);
        history.replaceState(null, '', paramsLink('/levels', {p: page}, defaults));
    }
    
    return (
        <main class="flex flex-col">
            <Header selectedIndex={selectedIndex} p={page} />
            <div class="flex flex-row items-start justify-center flex-grow mt-16 bg-fixed bg-cover" style={style} onMouseDown={trap(leftClick(resetSelectedLevel))}>
                
                <div class="flex flex-row items-stretch justify-center w-3/5 max-w-3xl min-h-screen p-8 pt-20 -mt-16 bg-gray-700 bg-opacity-50">
                    <Switch args={[state]}>
                        <div class="flex flex-col justify-center" test={eq("LOADING")} >  
                            <LoadingIcon />
                        </div>

                        <div class="flex-grow" test={eq("LOADED")}>
                            <LevelListHeaderInfo defaults={defaults} page={page} length={levels.length} />
                            <Switch args={[levels.length]}>
                                <div test={eq(0)}>
                                    <p class="mt-8 text-lg font-semibold tracking-wide text-white lowercase">No levels found</p>
                                </div>
                                <LevelList
                                    test={stubTrue}
                                    levels={levels}
                                    state={[selectedIndex, setSelectedIndex]}
                                    _class="mt-4"
                                />
                            </Switch>
                            <LevelListHeaderInfo defaults={defaults} page={page} length={levels.length} _class={cm("mt-4", levels.length < 5 ? "hidden" : "")}/>
                        </div>
                                        
                        <ErrorScreen test={eq("ERROR")} error={error}/>
                    </Switch>
                </div>
                
                <div class="sticky top-0 w-2/5 -mt-16">
                    <div class="flex items-center justify-center h-screen mx-4">
                        <div class="w-full p-8 bg-gray-300 shadow-lg" onMouseDown={trap(stubTrue)}>
                            <Switch args={[selectedIndex]}>
                                <SelectALevel test={eq(-1)} />
                                <LevelDetail test={stubTrue} level={levels[selectedIndex]} />
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}