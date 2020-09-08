/**
 * Most levels are ranked (since the user will need to change settings to view unranked levels)
 * so ranked levels don't have any special mark on them.
 * 
 * only unranked levels have messages. 
 */
import cm from "classnames";
import {cond, constant, stubTrue, geq} from "utils/functions";

import "./UnrankedMessage.css";

export default function UnrankedMessage ({approval, _class}) {

    const message = cond([
        [geq(10),  constant('')],
        [geq(0),   constant('Awaiting validation...')],
        [geq(-1),  constant('Needs gameplay changes')],
        [geq(-2),  constant('Needs metadata changes')],
        [geq(-3),  constant('Artist blacklist')],
        [stubTrue, constant('Needs changes')]
    ]);

    return (
        <span class={cm("unranked-message", _class)}>{message(approval)}</span>
    )
}