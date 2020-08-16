import cn from "classnames";

export default function Tag({tag, _class}) {
    return (
        <span class={cn("text-2xs italic text-gray-700 bg-gray-200 px-1", _class)}>{tag}</span>
    )
}