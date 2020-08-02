import cn from "classnames";


export default function Tag({tag, _class}) {
    return (
        <span class={cn("text-2xs italic text-gray-700 bg-gray-200 shadow-lg px-1", _class)}>{"#" + tag}</span>
    )
}

// export default function Tags({tags, _class}) {
//     return (
//         <div class="flex flex-row">
//             {
//                 tags.map( (tag, idx, arr) => {
//                     const margin = idx > 0 ? "ml-1" : "";
//                     return <Tag tag={"#" + tag} _class={margin} />;
//                 })
//             }
//         </div>
//     )
// }