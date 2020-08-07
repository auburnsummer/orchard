/**
 * Render the "group" of the level with an icon + text. 
 */
import cm from "classnames";

export default function Group({group, _class}) {

    function Icon({_class}) {
        return (
            <svg class={_class} viewBox="0 0 576 512">
                <path fill="currentColor" d="M571 236l-59-52V48a16 16 0 00-16-16h-64a16 16 0 00-16 16v52L315 10c-7-5-18-10-27-10s-20 5-27 10L5 236a16 16 0 00-1 23l21 24a18 18 0 0012 5 19 19 0 0011-4l16-14v210a32 32 0 0032 32h384a32 32 0 0032-32V270l16 14a19 19 0 0011 4 18 18 0 0011-5l22-24a19 19 0 004-11 18 18 0 00-5-12zm-219 63a21 21 0 01-21 21h-86a21 21 0 01-21-21v-86a21 21 0 0121-21h86a21 21 0 0121 21z"/>
            </svg>
        )
    }

    return (
        <div class={cm("flex flex-row items-center", _class)}>
            <Icon _class="flex-none w-3 h-3 text-gray-700" />
            <span class="ml-1 text-xs text-gray-700">{group}</span>
        </div>
    )
}