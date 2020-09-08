import LevelDetail from "components/levels/organisms/LevelDetail";
import GroupDetail from "components/levels/organisms/GroupDetail";

import {useState, useEffect} from "preact/hooks";

import cm from "classnames";


export default function LevelBox({level, globalSettings, index, ...args}) {

    const [tab, setTab] = useState("level");

    // reset tab to level on change.
    useEffect(() => {
        setTab("level");
    }, [level, index]);

    return (
    <div class="flex flex-col-reverse" {...args}>
        <div class="grid grid-cols-1 grid-rows-1">
            <div class={cm("col-start-1 row-start-1 origin-top transform transition duration-500 scale-y-0 opacity-50", {"scale-y-100 opacity-100" : tab === "level"})}>
                <LevelDetail _class="p-2 bg-gray-300" level={level} useIPFSLink={globalSettings.useIPFSLinks} showAutoimporter={globalSettings.showAutoimporter} />
            </div>

            <div class={cm("col-start-1 row-start-1 origin-top transform transition duration-500 scale-y-0 opacity-50", {"scale-y-100 opacity-100" : tab === "group"})}>
                <GroupDetail _class="p-4 bg-blue-300" />
            </div>
        {/* <div class="relative">
            <LevelDetail _class={cm("shadow-lg origin-top absolute top-0 left-0 w-full h-full p-8 bg-gray-300 transition duration-300 transform scale-y-0 opacity-75", {"scale-y-100 opacity-100" : tab === "level"})} level={level} useIPFSLink={globalSettings.useIPFSLinks} showAutoimporter={globalSettings.showAutoimporter}/>
            <div class={cm("shadow-lg origin-top absolute top-0 left-0 w-full h-full transition duration-300 transform scale-y-0 opacity-75", {"scale-y-100 opacity-100": tab === "group"})}>
                <div class="p-4 bg-gray-300">
                    <p>Freak human out make funny noise mow mow mow mow mow mow success now attack human destroy house in 5 seconds, lick butt and make a weird face and gimme attention gimme attention gimme attention gimme attention gimme attention gimme attention just kidding i don't want it anymore meow bye. Cat mojo purr as loud as possible, be the most annoying cat that you can, and, knock everything off the table. Ooh, are those your $250 dollar sandals? lemme use that as my litter box</p>

                    <p>Munchkin. Balinese himalayan turkish angora puma. Manx russian blue. Savannah devonshire rex manx russian blue egyptian mau havana brown for american shorthair. Bombay manx himalayan himalayan burmese. Himalayan american shorthair persian yet ocicat. Donskoy munchkin or lynx kitten himalayan puma. Russian blue egyptian mau. Russian blue cornish rex mouser devonshire rex. Egyptian mau norwegian forest tom. Munchkin ocicat for mouser for grimalkin. Manx russian blue for malkin.</p>

                </div>
            </div>
        </div> */}

        </div>
        <div class="flex flex-row text-sm font-thin text-gray-800">
            <div class="flex-grow"></div>
            <button onClick={() => setTab("level")} class="px-2 text-left bg-gray-300">Level</button>
            <button onClick={() => setTab("group")} class="px-2 text-left bg-gray-400 hover:bg-gray-300 hover:cursor-pointer">Group</button>
            <button onClick={() => setTab("comments")} class="px-2 text-left bg-gray-400 hover:bg-gray-300 hover:cursor-pointer">Comments</button>
        </div>
    </div>
    )
}