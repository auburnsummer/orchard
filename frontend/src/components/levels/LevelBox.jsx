import LevelDetail from "./LevelDetail";


export default function LevelBox({level, globalSettings}) {

    return (
    <div class="relative flex flex-col-reverse">
        <LevelDetail _class="p-8 bg-gray-300"level={level} useIPFSLink={globalSettings.useIPFSLinks} showAutoimporter={globalSettings.showAutoimporter}/>
        <div class="flex flex-row text-sm font-thin text-gray-800">
            <div class="flex-grow"></div>
            <button class="px-2 text-left bg-gray-300">Level</button>
            <button class="px-2 text-left bg-gray-400 hover:bg-gray-300 hover:cursor-pointer">Group</button>
            <button class="px-2 text-left bg-gray-400 hover:bg-gray-300 hover:cursor-pointer">Comments</button>
        </div>
    </div>
    )
}