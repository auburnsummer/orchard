import useBoosters from "hooks/useBoosters";
import Switch from "components/generic/Switch";

import BoosterCard from "components/boosters/molecules/BoosterCard";

import {eq} from "utils/functions";

export default function BoosterIndex() {

    const {boosters, state, error} = useBoosters();

    return (
        <main>
            <div>
                <Switch args={[state]}>
                    <div test={eq("LOADING")}>
                        <p>Loading...</p>
                    </div>
                    <div test={eq("LOADED")} class="grid grid-flow-col">
                        {
                            boosters.map(booster => {
                                return (
                                    <a class="mt-4" href="/boosters/efaiwfhaiohefioaw">
                                        <BoosterCard booster={booster} />
                                    </a>
                                )
                            })
                        }
                    </div>
                </Switch>
            </div>
        </main>
    )
}