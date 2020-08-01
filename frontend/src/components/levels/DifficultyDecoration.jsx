/**
 * A difficulty decoration. Intended for the top corner of the levelbox typically
 */

import cm from "classnames";

const DIFFICULTIES = ["Easy", "Medium", "Tough", "Very Tough"];

const DIFFICULTY_CLASSES = [
    "bg-green-200 text-green-800",
    "bg-orange-200 text-orange-800",
    "bg-red-300 text-red-800",
    "bg-purple-300 text-purple-800"
];

export default function DifficultyDecoration ({difficulty, _class}) {

    const difficultyText = DIFFICULTIES[difficulty];

    const colour = DIFFICULTY_CLASSES[difficulty];

    return (
        <div class={cm("flex flex-row items-stretch justify-end", _class)}>
            <span class={cm("w-6", colour)} style="clip-path: polygon(0 0, 100% 100%, 100% 0);"></span>
            <span class={cm("pr-2 h-full text-sm font-thin tracking-widest uppercase", colour)}>{difficultyText}</span>
        </div>
    )
}