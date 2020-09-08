import cm from "classnames";
import {paramsLink} from "utils/functions";
import {Link} from "preact-router";

import "./LevelListHeaderInfo.css";


export default function LevelListHeaderInfo({nextOffset, currOffset, prevOffset, length, query, defaults, _class}) {

    const fontClass = "level-list-header-info_text"

    return (
        <div class={cm("level-list-header-info", _class)}>
            <div>
                <Link
                 href={paramsLink('/levels', {start: Math.max(prevOffset, 0), q: query}, defaults)}
                 class={cm(fontClass, {"hidden\!level-list-header-info": currOffset === 0})}
                >
                    Previous
                </Link>
            </div>
            <div>
                <Link
                 href={paramsLink('/levels', {start: nextOffset, q: query}, defaults)}
                 class={cm(fontClass, {"hidden\!level-list-header-info": currOffset === nextOffset})}>
                    Next
                </Link>
            </div>
        </div>
    )
}