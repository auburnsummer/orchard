/*
Displaying a single level nicely (rhythm.cafe/levels/<id>)
*/
import useSingleLevel from "hooks/useSingleLevel";
import Switch from "components/generic/Switch";
import LoadingIcon from "components/levels/atoms/LoadingIcon";
import LevelHorizontal from "components/levels/organisms/LevelHorizontal";
import LevelDetail from "components/levels/organisms/LevelDetail";

import ErrorScreen from "components/levels/organisms/ErrorScreen";

import {eq} from "utils/functions";
import { Link } from "preact-router";

export default function SingleLevel({id}) {

    const {level, state, error} = useSingleLevel({id});

    return (
        <main class="flex flex-col justify-center min-h-screen bg-gray-400">  
            <div class="flex-grow p-4 m-12 bg-gray-700">
                    
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
            </div>
        </main>
    )
}