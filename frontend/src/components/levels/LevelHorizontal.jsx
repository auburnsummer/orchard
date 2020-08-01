/**
 * A component which renders a level preview in a horizontal style.
 */

import {getRandomGateway} from "../../utils/ipfsGateways";
import cm from "classnames";

import Group from "./Group";
import Authors from "./Authors";
import BPM from "./BPM";

import DifficultyDecoration from "./DifficultyDecoration";

export default function LevelHorizontal ({level, _class=""}) {
    const imgUrl = getRandomGateway() + level.image_ipfs;

    return (
        <div class={cm("flex flex-row bg-white _levelBox", _class)}>
            
            {/* image on the left */}
            <div class="flex-none w-2/5 max-w-md bg-red-500 _imageBox">
                <div class="relative h-full bg-blue-500 pb-9/16">
                    <img class="absolute top-0 object-cover w-full h-full" src={imgUrl}></img>
                </div>
            </div>
            
            {/* level info */}
            <div class="relative w-3/5 bg-white _levelBox">
                {/* difficulty */}
                <DifficultyDecoration {...level} _class="absolute right-0"/>
                <div class="p-4 _levelInfo">
                    {/* artist, song */}
                    <h5 class="text-xs leading-none text-gray-700">{level.artist}</h5>
                    <h4 class="font-semibold">{level.song}</h4>
                    
                    {/* other metadata */}
                    <div class="mt-1 overflow-hidden c-gap-wrapper">
                        <div class="flex flex-wrap c-gap c-gap-x-4 c-gap-y-1">
                            <Authors {...level} />
                            <Group {...level} />
                            <BPM {...level} />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}