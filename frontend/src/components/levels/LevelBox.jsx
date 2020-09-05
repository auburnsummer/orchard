import LevelDetail from "./LevelDetail";

import {useState, useEffect} from "preact/hooks";

import cm from "classnames";


export default function LevelBox({level, globalSettings}) {

    const [tab, setTab] = useState("level");

    // reset tab to level on change.
    useEffect(() => {
        setTab("level");
    }, [level]);

    return (
    <div class="relative flex flex-col-reverse">
        <div class="relative">
            <LevelDetail _class={cm("absolute top-0 left-0 w-full h-full p-8 bg-gray-300 transition-transform duration-500 transform scale-x-0", {"scale-x-100" : tab === "level"})} level={level} useIPFSLink={globalSettings.useIPFSLinks} showAutoimporter={globalSettings.showAutoimporter}/>
            <div class={cm("absolute top-0 left-0 w-full h-full bg-gray-300 transition-transform duration-500 transform scale-x-0", {"scale-x-100": tab === "group"})}>
                <p>Group info!</p>
            </div>
        </div>
        <div class="flex flex-row text-sm font-thin text-gray-800">
            <div class="flex-grow"></div>
            <button onClick={() => setTab("level")} class="px-2 text-left bg-gray-300">Level</button>
            <button onClick={() => setTab("group")} class="px-2 text-left bg-gray-400 hover:bg-gray-300 hover:cursor-pointer">Group</button>
            <button class="px-2 text-left bg-gray-400 hover:bg-gray-300 hover:cursor-pointer">Comments</button>
        </div>
    </div>
    )
}