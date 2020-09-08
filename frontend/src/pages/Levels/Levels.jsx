import Switch from "components/generic/Switch";

import LoadingIcon from "components/levels/atoms/LoadingIcon";
import LevelList from "components/levels/templates/LevelList";

import LevelListHeaderInfo from "components/levels/organisms/LevelListHeaderInfo";
import ErrorScreen from "components/levels/organisms/ErrorScreen";
import SelectALevel from "components/levels/organisms/SelectALevel";
import LevelBox from "components/levels/templates/LevelBox";

import useLevels from "hooks/useLevels";
import useSearchResults from "hooks/useSearchResults";
import {useState, useEffect} from "preact/hooks";
import {trap, stubTrue, eq} from "utils/functions.js";
import cm from "classnames";

import "./Levels.css";

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
            <main class="levels" onMouseDown={trap(resetSelectedLevel)}>
                <div class="levels_left">
                    <Switch args={[state]}>
                        <div class="levels_loading-icon-wrapper" test={eq("LOADING")} >  
                            <LoadingIcon />
                        </div>

                        <div class="levels_level-list-wrapper" test={eq("LOADED")}>
                            <LevelListHeaderInfo defaults={defaults} query={query} currOffset={offset} nextOffset={offset + levels.length} prevOffset={offset - limit}/>
                            <Switch args={[levels.length]}>
                                <div test={eq(0)}>
                                    <p class="levels_no-more-levels">No more levels</p>
                                </div>
                                <LevelList
                                    test={stubTrue}
                                    levels={levels}
                                    state={[selectedIndex, setSelectedIndex]}
                                    _class="levels_level-list"
                                />
                            </Switch>
                            <LevelListHeaderInfo
                                defaults={defaults}
                                query={query}
                                currOffset={offset}
                                nextOffset={offset + levels.length}
                                prevOffset={offset - limit}
                                _class={cm("levels_level-list-header-info-bottom", levels.length < 6 ? "hidden\!levels_level-list-header-info-bottom" : "")}
                            />
                        </div>
                                        
                        <ErrorScreen test={eq("ERROR")} error={error}/>
                    </Switch>
                </div>
                
                <div class="levels_right">
                    <div class="levels_right-wrapper">
                        
                        <Switch args={[selectedIndex]}>
                            <SelectALevel _class="levels_select-a-level" test={eq(-1)} />

                            <LevelBox test={stubTrue} index={selectedIndex} level={levels[selectedIndex]} {...{globalSettings}} onMouseDown={trap(stubTrue)}/> 
                        </Switch>

                    </div>
                </div>
            </main>
    )
}