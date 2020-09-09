import LevelDetail from "components/levels/organisms/LevelDetail";
import GroupDetail from "components/levels/organisms/GroupDetail";

import {useState, useEffect} from "preact/hooks";

import cm from "classnames";

import "./LevelBox.css";

export default function LevelBox({level, globalSettings, index, ...args}) {

    const [tab, setTab] = useState("level");

    // reset tab to level on change.
    useEffect(() => {
        setTab("level");
    }, [level, index]);

    return (
    <div class="level-box" {...args}>
        <div class="level-box_wrapper">
            <div class={cm("level-box_content", {"visible!level-box_content" : tab === "level"})}>
                <LevelDetail _class="p-2 bg-gray-300" level={level} useIPFSLink={globalSettings.useIPFSLinks} showAutoimporter={globalSettings.showAutoimporter} />
            </div>

            <div class={cm("level-box_content", {"visible!level-box_content" : tab === "group"})}>
                <GroupDetail _class="p-4 bg-blue-300" />
            </div>
        </div>
        <div class="level-box_buttons">
            <div class="level-box_buttons-spacer"></div>
            <button onClick={() => setTab("level")} class={cm("level-box_button", {"selected!level-box_button" : tab === "level"})}>Level</button>
            <button onClick={() => setTab("group")} class={cm("level-box_button", {"selected!level-box_button" : tab === "group"})}>Group</button>
            <button onClick={() => setTab("comments")} class={cm("level-box_button", {"selected!level-box_button" : tab === "comments"})}>Comments</button>
        </div>
    </div>
    )
}