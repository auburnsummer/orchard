import {useState} from "preact/hooks";

export default function SearchBar({_class}) {
    
    return (
        <form _class={_class}>
            <input placeholder="Search"></input>
        </form>
    )
}