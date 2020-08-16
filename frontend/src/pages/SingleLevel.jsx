/*
Displaying a single level nicely (rhythm.cafe/levels/<id>)
*/
import useSingleLevel from "hooks/useSingleLevel";
import Switch from "components/generic/Switch";
import LoadingIcon from "components/levels/LoadingIcon";
import LevelHorizontal from "components/levels/LevelHorizontal";
import LevelDetail from "components/levels/LevelDetail";

import ErrorScreen from "components/levels/ErrorScreen";

import {eq} from "utils/functions";
import { Link } from "preact-router";

export default function SingleLevel({id}) {

    const {level, state, error} = useSingleLevel({id});

    return (
        <main class="p-4 mx-12 bg-gray-700">  
            <h1 class="text-gray-100">WIP direct level screen! This screen only appears on a direct link. Here is the level you requested:</h1>
            <Link href="/levels" class="text-gray-100 hover:underline">(Go back to the main level screen)</Link>
            <Switch args={[state]}>
                <div test={eq("LOADING")}>
                    <LoadingIcon />
                </div>
                <div test={eq("LOADED")} class="p-6">
                    <LevelHorizontal level={level} /> 
                    <LevelDetail level={level} _class="p-6 mt-8 bg-gray-200" />
                </div>
                <div test={eq("ERROR")}>
                    <ErrorScreen error={error} />
                </div>
            </Switch>
            <p class="tracking-widest text-2xs">{id}</p>
        </main>
    )
}

/*
rtttr
*/