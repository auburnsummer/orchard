import LevelHorizontal from "../components/levels/LevelHorizontal";
import Switch from "../components/generic/Switch";
import useLevels from "../hooks/useLevels";
import _ from "lodash";
import LevelDetail from "../components/levels/LevelDetail";
import cm from "classnames";

import {useState} from "preact/hooks";

function LoadingScreen() {
    return (
        <p>Loading...</p>
    )
}

function LevelList({levels, _class}) {
    return (
        <div class={cm("flex flex-col justify-center max-w-3xl p-8", _class)}>
            {levels.map((level, idx) => {
                const _class = idx > 0 ? "mt-8" : "";
                return <LevelHorizontal level={level} _class={_class} />
            })}
        </div>
    )
}

function LevelScreen({levels, _class}) {

    return (
        <div class="flex flex-row">
            <LevelList levels={levels} _class="bg-gray-300" />
        </div>
    )
}

function ErrorScreen() {
    return (
        <p>Error!</p>
    )
}

export default function Levels () {

    const {levels, state, error} = useLevels();

    const [count, setCount] = useState(0);
    
    const equals = _.curry(_.eq);

    return (
        <Switch args={[state]}>
            <LoadingScreen test={equals("LOADING")} />

            <LevelScreen test={equals("LOADED")} levels={levels} />
            
            <ErrorScreen test={equals("ERROR")} />
        </Switch>
    )
}