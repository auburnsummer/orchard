
import Tag from "components/levels/atoms/Tag";
import cm from "classnames";

import style from "./Tags.css";

export default function Tags({tags, _class}) {

    return (
        <div class={cm("tags", _class)}>
            {
                tags.map( tag => {
                    return <Tag tag={tag} />
                })
            }
        </div>
    )
}