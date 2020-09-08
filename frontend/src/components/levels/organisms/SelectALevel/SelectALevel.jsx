import cm from "classnames";

import "./SelectALevel.css";

export default function SelectALevel({_class}) {
    return (
        <p class={cm("select-a-level", _class)}>Select a level...</p>
    )
}