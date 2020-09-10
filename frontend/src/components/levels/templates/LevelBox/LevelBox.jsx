import LevelDetail from "components/levels/organisms/LevelDetail";
import GroupDetail from "components/levels/organisms/GroupDetail";

import {useState, useEffect} from "preact/hooks";

import cm from "classnames";

import "./LevelBox.css";
import { ltrap, stubTrue } from "../../../../utils/functions";

export default function LevelBox({level, globalSettings, groups, index, ...args}) {

    const defaultTab = "level";

    const [tab, setTab] = useState(defaultTab);

    // reset tab to level on change.
    useEffect(() => {
        setTab(defaultTab);
    }, [level, index]);

    return (
    <div class="level-box" {...args}>
        <div class="level-box_wrapper">
            <div class={cm("level-box_content", {"visible!level-box_content" : tab === "level"})}>
                <LevelDetail onMouseDown={ltrap(stubTrue)} _class="p-4 bg-gray-300" level={level} useIPFSLink={globalSettings.useIPFSLinks} showAutoimporter={globalSettings.showAutoimporter} />
            </div>

            <div class={cm("level-box_content", {"visible!level-box_content" : tab === "group"})}>
                <GroupDetail onMouseDown={ltrap(stubTrue)} groups={groups} group_id={level.group_id} _class="p-4 bg-gray-300" />
            </div>

            <div class={cm("level-box_content", {"visible!level-box_content" : tab === "comments"})}>
                <div class="p-4 bg-gray-300">
                    <p>i'm still working on adding comments, sorry!</p>
                </div>
            </div>
        </div>
        <div onMouseDown={ltrap(stubTrue)} class="level-box_buttons">
            <div class="level-box_buttons-spacer"></div>
            <button onClick={() => setTab("level")} class={cm("level-box_button", {"selected!level-box_button" : tab === "level"})}>Level</button>
            <button onClick={() => setTab("group")} class={cm("level-box_button", {"selected!level-box_button" : tab === "group"})}>Source</button>
            {/* <button onClick={() => setTab("comments")} class={cm("level-box_button", {"selected!level-box_button" : tab === "comments"})}>Comments</button> */}
        </div>
    </div>
    )
}