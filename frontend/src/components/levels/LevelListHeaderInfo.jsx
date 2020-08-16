import cm from "classnames";
import {paramsLink} from "utils/functions";
import {Link} from "preact-router";


export default function LevelListHeaderInfo({page, defaults, length, _class}) {

    const fontClass = "font-light tracking-wide text-white hover:underline hover:pointer"

    return (
        <div class={cm("flex flex-row justify-between text-sm", _class)}>
            <div>
                <Link
                 href={paramsLink('/levels', {p: parseInt(page) - 1}, defaults)}
                 class={cm(fontClass, page === 0 ? "hidden" : "")}
                >
                    Previous
                </Link>
            </div>
            <div>
                <Link
                 href={paramsLink('/levels', {p: parseInt(page) + 1}, defaults)}
                 class={cm(fontClass, length === 0 ? "hidden" : "")}>
                    Next
                </Link>
            </div>
        </div>
    )
}