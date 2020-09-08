import Switch from "../components/generic/Switch";
import useLevels from "../hooks/useLevels";
import useSearchResults from "../hooks/useSearchResults";
import cm from "classnames";
import {trap, stubTrue, eq} from "../utils/functions.js";

import {useState, useEffect} from "preact/hooks";
import LoadingIcon from "components/levels/atoms/LoadingIcon";
import LevelList from "components/levels/templates/LevelList";

import LevelListHeaderInfo from "components/levels/organisms/LevelListHeaderInfo";
import ErrorScreen from "components/levels/organisms/ErrorScreen";
import SelectALevel from "components/levels/organisms/SelectALevel";
import LevelBox from "../components/levels/templates/LevelBox";

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
                
                <div class="sticky top-0 w-2/5 h-screen">
                    <div class="flex flex-col items-stretch justify-center h-full mx-4">
                        
                        <Switch args={[selectedIndex]}>
                            <SelectALevel _class="p-8 bg-gray-300 shadow-lg" test={eq(-1)} />

                            <LevelBox test={stubTrue} index={selectedIndex} level={levels[selectedIndex]} {...{globalSettings}} onMouseDown={trap(stubTrue)}/> 
                        </Switch>

                    </div>
                </div>
            </main>
    )
}