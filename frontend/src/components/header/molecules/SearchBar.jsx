import {useState} from "preact/hooks";
import cm from "classnames";
import {Link, route} from "preact-router";
import {paramsLink, stubFalse} from "utils/functions";

import "./SearchBar.css";

function MagnifyingGlass({_class}) {
    return (
        <svg class={_class} aria-hidden="true" data-icon="search" data-prefix="far" viewBox="0 0 512 512">
            <defs/>
            <path fill="currentColor" d="M509 469L387 348c-2-3-5-4-8-4h-14A207 207 0 00208 0a208 208 0 10136 365v14c0 3 1 6 4 8l121 121c5 5 12 5 17 1l22-23c5-5 5-12 1-17zM208 368a160 160 0 110-320 160 160 0 010 320z"/>
        </svg>

    )
}

export default function SearchBar({_class}) {

    const [query, setQuery] = useState("");
    
    return (
        <form class={cm("search-bar", _class)} onsubmit={evt => evt.preventDefault()}>
            <input
            class="search-bar_box"
            placeholder="What do you feel like playing today?"
            onChange={evt => setQuery(evt.target.value)}>
            </input>
            <button type="submit" onClick={() => route(paramsLink('/levels', {q: query}, {q: ""}))} class="search-bar_button">
                <MagnifyingGlass _class="search-bar_icon"/>
            </button>
        </form>
    )
}