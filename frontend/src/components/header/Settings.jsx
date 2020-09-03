import useTwineSelect from "hooks/useTwineSelect";
import {useState} from "preact/hooks";
import cm from "classnames";

export default function Settings({settings, _class}) {

    const [globalSettings, setGlobalSettings] = settings;

    const withGlobalSetting = (param, func = x => x) => ({
        value: globalSettings[param].toString(),
        onChange: (evt) => {
            setGlobalSettings(prev => ({
                ...prev,
                [param]: func(evt.target.value)
            }));
        }
    });

    const SelectLevelsPerPage = () => (
        <select {...withGlobalSetting("levelsPerPage", parseInt)}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
        </select>
    )

    const SelectSortDirection = () => (
        <select {...withGlobalSetting("sortDirection")} >
            <option value="uploaded.desc,last_updated.desc">Newest</option>
            <option value="uploaded.asc,last_updated.asc">Oldest</option>
            <option value="song.asc">Song title, A-Z</option>
            <option value="song.desc">Song title, Z-A</option>
        </select>
    )

    const SelectUseIPFSLinks = () => (
        <select {...withGlobalSetting("useIPFSLinks", x => x === "true")} >
            <option value="true">Use</option>
            <option value="false">Don't use</option>
        </select>
    )

    const SelectShowAutoimporter = () => (
        <select {...withGlobalSetting("showAutoimporter", x => x === "true")} >
            <option value="true">Show</option>
            <option value="false">Hide</option>
        </select>
    )


    return (
        <div class={cm("bg-red-500", _class)}>
            <h1>I'm the settings box!</h1>
            <ul>
                <li>
                    <span>Show</span>
                    <SelectLevelsPerPage />
                    <span>levels per page</span>
                </li>
                <li>
                    <span>Sort levels by </span>
                    <SelectSortDirection />
                </li>
                <li>
                    <SelectUseIPFSLinks />
                    <span>IPFS links for downloads</span>
                </li>
                <li>
                    <SelectShowAutoimporter />
                    <span>the autoimporter links</span>
                </li>
            </ul>
        </div>
    )
}