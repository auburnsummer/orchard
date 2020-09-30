import cm from "classnames";

import useGroups from "hooks/useGroups";
import Switch from "components/generic/Switch";

import {eq} from "utils/functions";
import { useMemo } from "preact/hooks";

import snarkdown from 'snarkdown';

import testImage from "assets/groupTEMP.png";

import "./GroupDetail.css";

const TEST_DESCRIPTION = `
![](${testImage})

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
        <div class={cm("group-detail", _class)} {...args}>
            <div class="group-detail_header">
                <h1 class="group-detail_name">{group.name}</h1>
                <h2 class="group-detail_website"><a href={group.website}>{group.website}</a></h2>
            </div>
            <div class="prose-sm prose group-detail_text" dangerouslySetInnerHTML={{__html: snarkdown(group.description)}} />
        </div>
    )
}