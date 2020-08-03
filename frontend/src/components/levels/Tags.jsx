
import Tag from "./Tag";
import cm from "classnames";

export default function Tags({has_classics, has_oneshots, has_squareshots, has_swing, has_freetimes, has_holds, tags, _class}) {

    const tempClass = "text-2xs text-gray-500 mr-1"

    return (
        <div class={cm("flex flex-row flex-wrap c-gap c-gap-x-2 c-gap-y-1 mt-1 overflow-hidden", _class)}>
            {
                tags.map( (tag, idx, arr) => {
                    const margin = idx > 0 ? "ml-1" : "";
                    return <Tag tag={tag} _class={margin} />
                })
            }
        </div>
    )
}