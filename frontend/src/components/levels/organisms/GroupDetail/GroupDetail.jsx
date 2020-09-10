import cm from "classnames";

import useGroups from "hooks/useGroups";
import Switch from "components/generic/Switch";

import {eq} from "utils/functions";
import { useMemo } from "preact/hooks";

import groupTEMP from "assets/groupTEMP.png";


export default function GroupDetail({group_id, groups, _class, ...args}) {

    const group = useMemo(() => {
        return groups.find(g => g.id === group_id) || "";
    }, [group_id, groups]);

    return (
        <div class={cm("p-2 text-md", _class)} {...args}>
            <img src={groupTEMP} class="h-40 bg-gray-100"></img>
            <h1 class="mt-4 font-semibold">{group.name}</h1>
            <h2 class="text-sm italic text-blue-700 hover:underline"><a href={group.website}>{group.website}</a></h2>
            <p class="mt-2">{group.description}</p>
        </div>
    )
}