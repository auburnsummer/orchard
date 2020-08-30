import cm from "classnames";
import {paramsLink} from "utils/functions";
import {Link} from "preact-router";


export default function LevelListHeaderInfo({nextOffset, currOffset, prevOffset, length, query, defaults, _class}) {

    const fontClass = "font-light tracking-wide text-white hover:underline hover:pointer"

    return (
        <div class={cm("flex flex-row justify-between text-sm", _class)}>
            <div>
                <Link
                 href={paramsLink('/levels', {start: Math.max(prevOffset, 0), q: query}, defaults)}
                 class={cm(fontClass, {hidden: currOffset === 0})}
                >
                    Previous
                </Link>
            </div>
            <div>
                <Link
                 href={paramsLink('/levels', {start: nextOffset, q: query}, defaults)}
                 class={cm(fontClass, {hidden: currOffset === nextOffset})}>
                    Next
                </Link>
            </div>
        </div>
    )
}