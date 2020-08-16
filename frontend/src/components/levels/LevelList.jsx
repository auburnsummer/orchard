import cm from "classnames";
import LevelHorizontal from "./LevelHorizontal";
import {trap} from "utils/functions";

export default function LevelList({levels, _class, state}) {
    const [selectedIndex, setSelectedIndex] = state;

    const callback = (level, idx) => () => {
        setSelectedIndex(prev => idx);
    }

    return (
        <div class={cm("flex flex-col justify-center", _class)} >
            {levels.map((level, idx) => {
                const _class = idx > 0 ? "mt-8" : "";
                return <LevelHorizontal
                        level={level}
                        selected={selectedIndex === idx}
                        _class={_class}
                        callback={trap(callback(level, idx))}
                       />
            })}
        </div>
    )
}