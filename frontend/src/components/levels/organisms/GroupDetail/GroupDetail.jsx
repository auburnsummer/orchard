import cm from "classnames";

import useGroups from "hooks/useGroups";
import Switch from "components/generic/Switch";

import {eq} from "utils/functions";
import { useMemo } from "preact/hooks";

import snarkdown from 'snarkdown';

const TEST_DESCRIPTION = `
This is a paragraph.

This is another paragraph.

**Bold**

_italic_
`


export default function GroupDetail({group_id, groups, _class, ...args}) {

    const group = useMemo(() => {
        return groups.find(g => g.id === group_id) || "";
    }, [group_id, groups]);

    return (
        <div class={cm("p-2 text-md", _class)} {...args}>
            <div class="flex flex-row items-baseline justify-between">
                <h1 class="text-sm italic font-semibold">{group.name}</h1>
                <h2 class="text-sm italic text-blue-700 hover:underline"><a href={group.website}>{group.website}</a></h2>
            </div>
            <div class="mt-2" dangerouslySetInnerHTML={{__html: snarkdown(TEST_DESCRIPTION)}} />
        </div>
    )
}