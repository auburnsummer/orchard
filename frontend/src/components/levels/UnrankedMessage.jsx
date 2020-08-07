/**
 * Most levels are ranked (since the user will need to change settings to view unranked levels)
 * so ranked levels don't have any special mark on them.
 * 
 * only unranked levels have messages. 
 */
import cm from "classnames";
import {cond, constant, stubTrue} from "utils/functions";
import {_, it, lift as L} from "param.macro";

export default function UnrankedMessage ({approval, _class}) {
    const message = cond([
        [L(it >= 10),  constant('')],
        [L(it >= 0 ),  constant('Awaiting validation...')],
        [L(it >= -1),  constant('Needs gameplay changes')],
        [L(it >= -2),  constant('Needs metadata changes')],
        [L(it >= -3),  constant('Artist blacklist')],
        [stubTrue,     constant('Needs changes')]
    ]);

    return (
        <span class={cm("px-2 tracking-wide font-thin text-xs bg-gray-400 text-gray-800 opacity-75", _class)}>{message(approval)}</span>
    )
}