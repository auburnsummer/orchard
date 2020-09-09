import cm from "classnames";
import LevelHorizontal from "components/levels/organisms/LevelHorizontal";
import {trap} from "utils/functions";

import "./LevelList.css";

export default function LevelList({levels, _class, state}) {
    const [selectedIndex, setSelectedIndex] = state;

    const callback = (level, idx) => () => {
        setSelectedIndex(prev => idx);
    }

    return (
        <div class={cm("level-list", _class)} >
            {levels.map((level, idx) => {
                return <LevelHorizontal
                        level={level}
                        selected={selectedIndex === idx}
                        _class="level-list_level-horizontal"
                        callback={trap(callback(level, idx))}
                       />
            })}
        </div>
    )
}