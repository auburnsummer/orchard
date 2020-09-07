/**
 * Render 1P / 2P icons
 */

 /**
 * Render the "group" of the level with an icon + text. 
 */
import {useMemo} from "preact/hooks";
import cm from "classnames";

import style from "./Players.css";

export default function Players({single_player, two_player, _class}) {
    const playerText = useMemo( () => {
        if (single_player && two_player) {
            return '1P & 2P';
        }
        if (single_player) {
            return '1P';
        }
        return '2P';
    }, [single_player, two_player]);

    function Icon({two_player, _class}) {
        const p1Icon =
        <svg class={_class} viewBox="0 0 384 512">
            <path fill="currentColor" d="M120 72a72 72 0 11144 0 72 72 0 01-144 0zm255 1a32 32 0 00-46 0l-86 87H141L55 73a32 32 0 10-46 46l95 94v267c0 18 14 32 32 32h16c18 0 32-14 32-32V368h16v112c0 18 14 32 32 32h16c18 0 32-14 32-32V213l95-94c12-13 12-33 0-46z"/>
        </svg>
        const p2Icon = 
        <svg class={_class} viewBox="0 0 580 512" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round">
            <path fill="currentColor" d="M316 72a72 72 0 11144 0 72 72 0 01-144 0zm255 1a32 32 0 00-46 0l-86 87H337s-22 8-28 17c-6 8-9 36-9 36v267c0 18 14 32 32 32h16c18 0 32-14 32-32V368h16v112c0 18 14 32 32 32h16c18 0 32-14 32-32V213l95-94c12-13 12-33 0-46zM264 72a72 72 0 10-144 0 72 72 0 00144 0zM9 73c13-12 33-12 46 0l86 87h102s22 8 28 17c6 8 9 36 9 36v267c0 18-14 32-32 32h-16c-18 0-32-14-32-32V368h-16v112c0 18-14 32-32 32h-16c-18 0-32-14-32-32V213L9 119a32 32 0 010-46z" fill-rule="nonzero"/>
        </svg>;
        return two_player ? p2Icon : p1Icon;
    }

    return (
        <div class={cm("players", _class)}>
            {/* if both, show the 2p icon */}
            <Icon _class="players_icon" two_player={two_player} />
            <span class="players_text">{playerText}</span>
        </div>
    )
}