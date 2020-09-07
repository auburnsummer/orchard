/**
 * A difficulty decoration. Intended for the top corner of the levelbox typically
 */

import cm from "classnames";

import style from "./DifficultyDecoration.css";

const DIFFICULTIES = ["Easy", "Medium", "Tough", "Very Tough"];

const DIFFICULTY_CLASSES = [
    "easy!difficulty-decoration",
    "medium!difficulty-decoration",
    "tough!difficulty-decoration",
    "very-tough!difficulty-decoration"
];

export default function DifficultyDecoration ({difficulty, _class}) {

    const difficultyText = DIFFICULTIES[difficulty];

    const colour = DIFFICULTY_CLASSES[difficulty];

    return (
        <div class={cm("difficulty-decoration", _class)}>
            <span class={cm("difficulty-decoration_bg", colour)}></span>
            <span class={cm("difficulty-decoration_text", colour)}>{difficultyText}</span>
        </div>
    )
}