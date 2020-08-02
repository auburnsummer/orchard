/**
 * Render a BPM icon and text
 */
import _ from "lodash";
import cm from "classnames";

export default function BPM({max_bpm, min_bpm, _class}) {

    const makeBPMText = (max_bpm, min_bpm) => max_bpm === min_bpm ? `${max_bpm} BPM` : `${min_bpm}-${max_bpm} BPM`;

    function Icon({_class}) {
        return (
            <svg class={_class} viewBox="0 0 512 512">
                <path fill="currentColor" d="M320 244l-50 99c-5 12-23 12-28 0l-57-127-30 72H61l182 187c7 7 19 7 26 0l182-187H342l-22-44zM474 74l-3-3c-51-52-135-52-187 0l-28 29-28-28C177 19 92 19 41 72l-3 2c-48 50-50 129-7 182h102l36-86c6-13 24-13 30-1l58 130 49-98c6-12 23-12 29 0l27 55h119c44-53 41-132-7-182z"/>
            </svg>
        )
    }

    return (
        <div class={cm("flex flex-row items-center", _class)}>
            <Icon _class="flex-none w-3 h-3 text-gray-700" />
            <span class="ml-1 text-xs text-gray-700">{makeBPMText(max_bpm, min_bpm)}</span>
        </div>
    )
}