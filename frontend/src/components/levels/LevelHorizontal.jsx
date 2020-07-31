/**
 * A component which renders a level preview in a horizontal style.
 */

import {getRandomGateway} from "../../utils/ipfsGateways";

import {Authors} from "./MetadataPieces";

import cm from "classnames";

export default function LevelHorizontal ({level, _class=""}) {
    const imgUrl = getRandomGateway() + level.image_ipfs;

    return (
        <div class={cm("flex flex-row bg-white _levelBox", _class)}>
            <div class="flex-none w-2/5 max-w-md bg-red-500 _imageBox">
                <div class="relative h-full bg-blue-500 pb-9/16">
                    <img class="absolute top-0 object-cover w-full h-full" src={imgUrl}></img>
                </div>
            </div>
            <div class="p-4 bg-white _levelBox">
                <h5 class="text-xs leading-none text-gray-700">{level.artist}</h5>
                <h4 class="font-semibold">{level.song}</h4>

                <Authors {...level} _class="mt-1" />
            </div>

        </div>
    )
}