/**
 * A component which renders a level preview in a horizontal style.
 */

import {ipfsUrl} from "utils/ipfsGateways";
import cm from "classnames";

import Group from "./Group";
import Authors from "./Authors";
import BPM from "./BPM";
import Players from "./Players";
import Tags from "./Tags";

import DifficultyDecoration from "./DifficultyDecoration";
import UnrankedMessage from "./UnrankedMessage";

// callback should be a function that RETURNS a function
export default function LevelHorizontal ({level, selected, _class="", callback}) {
    const imgUrl = ipfsUrl(level.image_ipfs, "preview.png");

    const hasCallback = !!callback;

    return (
        <div
        class={cm(
            "flex flex-row group transform duration-200 motion-reduce:transition-none motion-safe:transition-transform ease-in-out",
            {"scale-105" : selected},
            {"hover:shadow-lg" : hasCallback},
            _class,)}
        onMouseDown={callback}
        >
            
            {/* image on the left */}
            <div class="flex-none w-2/5 max-w-md bg-red-500">
                <div class="relative h-full bg-blue-500 pb-9/16">
                    <img class="absolute top-0 z-10 object-cover w-full h-full" src={imgUrl}></img>
                    <UnrankedMessage {...level} _class="absolute z-20" />
                </div>
            </div>
            
            {/* level info */}
            <div
            class={cm(
                "relative w-3/5 bg-gray-100", 
                {"bg-teal-100" : selected},
                {"group-hover:bg-white" : !selected && hasCallback})}
            >
                {/* difficulty */}
                <DifficultyDecoration {...level} _class="absolute right-0"/>
                <div class="flex flex-col h-full p-4">
                    {/* artist, song */}
                    <h5 class="text-xs leading-none text-gray-700">{level.artist}</h5>
                    <h4 class="font-semibold">{level.song}</h4>
                    
                    {/* icon + text metadata */}
                    <div class="mt-1 overflow-hidden c-gap-wrapper">
                        <div class="flex flex-wrap c-gap c-gap-x-4 c-gap-y-1">
                            <Authors {...level} />
                            <Group {...level} />
                            <BPM {...level} />
                            <Players {...level} />
                        </div>
                    </div>

                    {/* spacer */}
                    <div class="flex-grow">

                    </div>

                    <Tags {...level} />
                </div>
            </div>

        </div>
    )
}