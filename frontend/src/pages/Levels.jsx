import Switch from "../components/generic/Switch";
import useLevels from "../hooks/useLevels";
import useSearchResults from "../hooks/useSearchResults";
import LevelDetail from "../components/levels/LevelDetail";
import cm from "classnames";
import {trap, leftClick, stubTrue, paramsLink, eq, geq, stubFalse} from "../utils/functions.js";

import KinBackgroundTemp from "assets/KinBackAlleyPaint2.png";
import {useState, useEffect} from "preact/hooks";
import LoadingIcon from "components/levels/LoadingIcon";
import LevelList from "components/levels/LevelList";

import LevelListHeaderInfo from "components/levels/LevelListHeaderInfo";
import ErrorScreen from "components/levels/ErrorScreen";
import SelectALevel from "components/levels/SelectALevel";
import Header from "components/header/Header";
import LevelBox from "../components/levels/LevelBox";

// default values for query parameters.
const defaults = {
    start: 0,
    q: ""
}

export default function Levels ({start, q, globalSettings}) {
    const offset = parseInt(start || defaults.start);
    const query = q || defaults.q;

    const limit = globalSettings.levelsPerPage;
    const sortDirection = globalSettings.sortDirection;
    const showUnranked = globalSettings.showUnranked;

    const searchResults = useSearchResults({query, offset, limit, showUnranked});

    const levelResults = useLevels({query, offset, limit, sortDirection, showUnranked});

    const {levels, state, error} = query ? searchResults : levelResults;

    const [selectedIndex, setSelectedIndex] = useState(-1);

    // deselect any level if we changed the page.
    useEffect(() => {
        setSelectedIndex(-1);
    }, [offset, limit, showUnranked, sortDirection]);

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
                    <div class="flex flex-col items-stretch justify-center h-screen mx-4">
                        <div class="flex flex-col justify-center flex-grow mt-16">
                            
                            <div class="w-full shadow-lg" onMouseDown={trap(stubTrue)}>

                                <Switch args={[selectedIndex]}>
                                    <SelectALevel _class="p-8 bg-gray-300" test={eq(-1)} />

                                    <LevelBox level={levels[selectedIndex]} globalSettings={globalSettings} test={stubTrue}/>
                                    
                                    {/* <div class="relative" test={geq(0)} >
                                        <LevelDetail _class="p-8"level={levels[selectedIndex]} useIPFSLink={globalSettings.useIPFSLinks} showAutoimporter={globalSettings.showAutoimporter}/>
                                        <div class="absolute top-0 right-0 transform translate-x-full shadow-lg">
                                            <div class="flex flex-col text-sm font-thin text-gray-800">
                                                <button class="px-2 text-left bg-gray-300">Level</button>
                                                <button class="px-2 text-left bg-gray-400 hover:bg-gray-300 hover:cursor-pointer">Group</button>
                                                <button class="px-2 text-left bg-gray-400 hover:bg-gray-300 hover:cursor-pointer">Comments</button>
                                            </div>
                                        </div>
                                    </div> */}
                                </Switch>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
    )
}