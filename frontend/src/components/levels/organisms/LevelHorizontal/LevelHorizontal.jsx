/**
 * A component which renders a level preview in a horizontal style.
 */

import {ipfsUrl} from "utils/ipfsGateways";
import {useState, useMemo, useEffect} from "preact/hooks";

import useAnimatedPNG from "hooks/useAnimatedPNG";
import cm from "classnames";

import LevelGroup from "components/levels/atoms/LevelGroup";
import Authors from "components/levels/atoms/Authors";
import BPM from "components/levels/atoms/BPM";
import Players from "components/levels/atoms/Players";
import Tags from "components/levels/molecules/Tags";

import DifficultyDecoration from "components/levels/atoms/DifficultyDecoration";
import UnrankedMessage from "components/levels/atoms/UnrankedMessage";
import { stubTrue } from "utils/functions";

import style from "./LevelHorizontal.css";

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
    }, [state]);

    return (
        <div
        class={cm(
            "level-horizontal",
            {"selected!level-horizontal" : selected},
            {"has-callback!level-horizontal" : hasCallback},
            _class,)}
        onMouseDown={callback}
        onMouseEnter={useAnimations ? () => setCurrentImage(image) : stubTrue}
        onMouseLeave={useAnimations ? () => setCurrentImage(staticImage) : stubTrue}
        >
            
            {/* image on the left */}
            <div class="level-horizontal_left">
                <div class="level-horizontal_left_wrapper">
                    <img class="level-horizontal_left_image" src={currentImage}></img>
                    <UnrankedMessage {...level} _class="level-horizontal_left_unranked-message" />
                </div>
            </div>
            
            {/* level info */}
            <div
            class={cm(
                "level-horizontal_right",
                {"selected!level-horizontal_right" : selected},
                {"not-selected\!level-horizontal_right" : !selected && hasCallback})}
            >
                {/* difficulty */}
                <DifficultyDecoration {...level} _class="level-horizontal_decorator"/>
                <div class="level-horizontal_info">
                    {/* artist, song */}
                    <h5 class="level-horizontal_artist">{level.artist}</h5>
                    <h4 class="level-horizontal_song">{level.song}</h4>
                    
                    {/* icon + text metadata */}
                    <div class="level-horizontal_icon-wrapper">
                        <div class="level-horizontal_icon-wrapper^2">
                            <Authors {...level} />
                            <LevelGroup {...level} />
                            <BPM {...level} />
                            <Players {...level} />
                        </div>
                    </div>

                    {/* spacer */}
                    <div class="level-horizontal_spacer">

                    </div>

                    <Tags {...level} />
                </div>
            </div>

        </div>
    )
}