import Switch from "../components/generic/Switch";
import useLevels from "../hooks/useLevels";
import useSearchResults from "../hooks/useSearchResults";
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
import Header from "components/header/Header";

// default values for query parameters.
const defaults = {
    start: 0,
    q: ""
}

export default function Levels ({start, q, settings}) {
    const offset = parseInt(start || defaults.start);
    const query = q || defaults.q;

    const [globalSettings, ] = settings;

    const limit = globalSettings.levelsPerPage;

    // const {levels, state, error} = useLevels({page, limit});
    const {levels, state, error} = query.length ? useSearchResults({query, offset, limit}) : useLevels({offset, limit});

    const [selectedIndex, setSelectedIndex] = useState(-1);

    // deselect any level if we changed the page.
    useEffect(() => {
        setSelectedIndex(-1);
    }, [offset, limit]);

    const resetSelectedLevel = () => {
        setSelectedIndex(prev => -1);
    }
    
    return (
            <main class="flex flex-row items-start justify-center flex-grow w-full mx-auto -mt-16 max-w-screen-2xl" onMouseDown={trap(resetSelectedLevel)}>
                <div class="flex flex-row items-stretch justify-center w-3/5 min-h-screen p-8 pt-20 bg-gray-700 bg-opacity-50">
                    <Switch args={[state]}>
                        <div class="flex flex-col justify-center" test={eq("LOADING")} >  
                            <LoadingIcon />
                        </div>

                        <div class="flex-grow" test={eq("LOADED")}>
                            <LevelListHeaderInfo defaults={defaults} query={query} currOffset={offset} nextOffset={offset + levels.length} prevOffset={offset - limit}/>
                            <Switch args={[levels.length]}>
                                <div test={eq(0)}>
                                    <p class="mt-8 text-lg font-semibold tracking-wide text-white lowercase">No more levels</p>
                                </div>
                                <LevelList
                                    test={stubTrue}
                                    levels={levels}
                                    state={[selectedIndex, setSelectedIndex]}
                                    _class="mt-4"
                                />
                            </Switch>
                            <LevelListHeaderInfo defaults={defaults} query={query} currOffset={offset} nextOffset={offset + levels.length} prevOffset={offset - limit} _class={cm("mt-4", levels.length < 6 ? "hidden" : "")}/>
                        </div>
                                        
                        <ErrorScreen test={eq("ERROR")} error={error}/>
                    </Switch>
                </div>
                
                <div class="sticky top-0 w-2/5">
                    <div class="flex items-center justify-center h-screen mx-4">
                        <div class="w-full bg-gray-300 shadow-lg" onMouseDown={trap(stubTrue)}>
                            <Switch args={[selectedIndex]}>
                                <SelectALevel _class="p-8" test={eq(-1)} />
                                <LevelDetail _class="p-8" test={stubTrue} level={levels[selectedIndex]} />
                            </Switch>
                        </div>
                    </div>
                </div>
            </main>
    )
}