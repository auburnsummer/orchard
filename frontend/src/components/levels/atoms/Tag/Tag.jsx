import cn from "classnames";

import style from "./Tag.css";

export default function Tag({tag, _class}) {
    return (
        <span class={cn("tag", _class)}>{tag}</span>
    )
}