/**
 * A component which renders a level preview in a horizontal style.
 */

import {ipfsUrl} from "utils/ipfsGateways";
import {useState, useMemo, useEffect} from "preact/hooks";

import useAnimatedPNG from "hooks/useAnimatedPNG";
import cm from "classnames";

import Group from "./Group";
import Authors from "components/levels/atoms/Authors";
import BPM from "components/levels/atoms/BPM";
import Players from "./Players";
import Tags from "./Tags";

import DifficultyDecoration from "components/levels/atoms/DifficultyDecoration";
import UnrankedMessage from "./UnrankedMessage";
import { stubTrue } from "../../utils/functions";

// callback should be a function that RETURNS a function
export default function LevelHorizontal ({level, selected, _class="", callback}) {
    const imgUrl = useMemo(() => {
        return ipfsUrl(level.image_ipfs, "preview.png");
    }, [level]);

    const {isAnimated, image, staticImage, state} = useAnimatedPNG({url: imgUrl});

    const hasCallback = !!callback;

    const [currentImage, setCurrentImage] = useState("");
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const useAnimations = isAnimated && !prefersReducedMotion;

    useEffect( () => {
        if (state === "LOADED") {
            setCurrentImage(isAnimated ? staticImage : image);
        }
    }, [state])

    return (
        <div
        class={cm(
            "flex flex-row group transform duration-200 motion-reduce:transition-none motion-safe:transition-transform ease-in-out",
            {"scale-105 shadow-lg" : selected},
            {"hover:shadow-lg" : hasCallback},
            _class,)}
        onMouseDown={callback}
        onMouseEnter={useAnimations ? () => setCurrentImage(image) : stubTrue}
        onMouseLeave={useAnimations ? () => setCurrentImage(staticImage) : stubTrue}
        >
            
            {/* image on the left */}
            <div class="flex-none w-2/5 max-w-md bg-red-500">
                <div class="relative h-full bg-gray-200 pb-9/16">
                    <img class="absolute top-0 z-10 object-cover w-full h-full" src={currentImage}></img>
                    <UnrankedMessage {...level} _class="absolute z-20" />
                </div>
            </div>
            
            {/* level info */}
            <div
            class={cm(
                "relative w-3/5",
                {"bg-gray-100" : !selected},
                {"bg-white" : selected},
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