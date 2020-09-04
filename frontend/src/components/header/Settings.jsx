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

    const selectClasses = "text-center appearance-none bg-gray-400 hover:bg-gray-300 hover:cursor-pointer rounded-lg font-semibold ml-2 mr-2 px-1 first:ml-0 text-gray-800"

    const SelectLevelsPerPage = () => (
        <select class={selectClasses} {...withGlobalSetting("levelsPerPage", parseInt)}>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
        </select>
    )

    const SelectSortDirection = () => (
        <select class={selectClasses} {...withGlobalSetting("sortDirection")} >
            <option value="uploaded.desc,last_updated.desc">Newest</option>
            <option value="uploaded.asc,last_updated.asc">Oldest</option>
            <option value="song.asc">Song title, A-Z</option>
            <option value="song.desc">Song title, Z-A</option>
        </select>
    )

    const SelectUseIPFSLinks = () => (
        <select class={selectClasses} {...withGlobalSetting("useIPFSLinks", x => x === "true")} >
            <option value="true">IPFS links</option>
            <option value="false">Direct links</option>
        </select>
    )

    const SelectShowAutoimporter = () => (
        <select class={selectClasses} {...withGlobalSetting("showAutoimporter", x => x === "true")} >
            <option value="true">Enable</option>
            <option value="false">Disable</option>
        </select>
    )

    const SelectShowUnranked = () => (
        <select class={selectClasses} {...withGlobalSetting("showUnranked", x => x === "true")} >
            <option value="true">Show</option>
            <option value="false">Hide</option>
        </select>
    )


    return (
        <div class={cm("bg-gray-700 p-6 shadow-lg", _class)}>
            <ul class="space-y-2 text-gray-100">
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
                    <span>Use</span>
                    <SelectUseIPFSLinks />
                    <span>to download levels</span>
                </li>
                <li>
                    <SelectShowAutoimporter />
                    <span>the autoimporter links</span>
                </li>
                <li>
                    <SelectShowUnranked />
                    <span>unapproved levels</span>
                </li>
            </ul>
        </div>
    )
}