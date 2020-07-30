/**
 * A component which renders a level preview in a horizontal style.
 */

import {getRandomGateway} from "../utils/ipfsGateways";

export default function LevelHorizontal ({level}) {
    const imgUrl = getRandomGateway() + level.image_ipfs;

    return (
        <div class="flex flex-row bg-gray-200">
            <img src={imgUrl}></img>
            <h1>{level.song}</h1>
            <h2>{level.artist}</h2>
        </div>
    )
}