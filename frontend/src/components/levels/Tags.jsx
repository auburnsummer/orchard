
import Tag from "./Tag";
import cm from "classnames";

export default function Tags({tags, _class}) {

    return (
        <div class={cm("flex flex-row flex-wrap c-gap c-gap-x-2 c-gap-y-1 mt-1 overflow-hidden", _class)}>
            {
                tags.map( tag => {
                    return <Tag tag={tag} />
                })
            }
        </div>
    )
}