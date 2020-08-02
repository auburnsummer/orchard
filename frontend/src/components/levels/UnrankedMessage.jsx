/**
 * Most levels are ranked (since the user will need to change settings to view unranked levels)
 * so ranked levels don't have any special mark on them.
 * 
 * only unranked levels have messages. 
 */
import cm from "classnames";
import _ from "lodash";

export default function UnrankedMessage ({approval, _class}) {
    const geq = x => y => y >= x; // greater or equal to
    const message = _.cond([
        [geq(10), _.constant('')],
        [geq(0), _.constant('Awaiting validation...')],
        [geq(-1), _.constant('Needs gameplay changes')],
        [geq(-2), _.constant('Needs metadata changes')],
        [geq(-3), _.constant('Artist blacklist')],
        [_.stubTrue, _.constant('Needs changes')]
    ]);

    return (
        <span class={cm("px-2 tracking-wide font-thin text-xs bg-gray-400 text-gray-800 opacity-75", _class)}>{message(approval)}</span>
    )
}