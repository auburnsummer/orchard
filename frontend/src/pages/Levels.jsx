import LevelHorizontal from "../components/levels/LevelHorizontal";
import Switch from "../components/generic/Switch";
import useLevels from "../hooks/useLevels";
import _ from "lodash";

function LoadingScreen() {
    return (
        <p>Loading...</p>
    )
}

function LevelList({levels}) {
    return (
        <div class="flex flex-col justify-center max-w-3xl min-h-screen p-8 bg-gray-200">
            {levels.map((level, idx) => {
                const _class = idx > 0 ? "mt-8" : "";
                return <LevelHorizontal level={level} _class={_class} />
            })}
        </div>
    )
}

export default function Levels () {

    const {levels, state, error} = useLevels();

    const equals = _.curry(_.eq);

    return (
        <Switch args={[state]}>
            <LoadingScreen test={equals("LOADING")} />
            <LevelList test={equals("LOADED")} levels={levels} />
            <div test={equals("ERROR")}>
                <p>Error...</p>
            </div>
        </Switch>
    )

    // return (
    //     <div class="flex flex-col justify-center max-w-3xl min-h-screen p-8 bg-gray-200">
    //         <h1>This is the levels page!</h1>
    //         <h2>Note: This is <span class="italic">test</span> data for display and is inaccurate.</h2>
    //         <LevelHorizontal level={level}/>
    //         <LevelHorizontal level={level2} _class="mt-8" />
    //         <LevelHorizontal level={level3} _class="mt-8" />
    //         <LevelHorizontal level={level4} _class="mt-8" />
    //     </div>
    // )
}