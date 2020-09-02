import useTwineSelect from "hooks/useTwineSelect";
import {useState} from "preact/hooks";

export default function Settings({settings}) {

    const [globalSettings, setGlobalSettings] = settings;

    const [test, setTest] = useState("hello");

    const rotateValue = useTwineSelect(["hello", "goodbye"], test, setTest);

    const set = (param, func = x => x) => (evt) => {
        setGlobalSettings({
            ...globalSettings,
            [param]: evt.target.value
        });
    }

    const SelectLevelsPerPage = () => (
        <select value={globalSettings.levelsPerPage} onChange={set("levelsPerPage", parseInt)}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={40}>40</option>
            <option value={50}>50</option>
        </select>
    )

    const SelectSortDirection = () => (
        <select value={globalSettings.sortDirection} onChange={set("sortDirection")}>
            <option value="uploaded.desc,last_updated.desc">Newest</option>
            <option value="uploaded.asc,last_updated.asc">Oldest</option>
            <option value="song.asc">Song title, A-Z</option>
            <option value="song.desc">Song title, Z-A</option>
        </select>
    )


    return (
        <div class="bg-red-500">
            <h1>I'm the settings box!</h1>
            <ul>
                <li>
                    <span>Show</span>
                    <SelectLevelsPerPage />
                    <span>levels per page</span>
                </li>
                <li>Potato Chip: {globalSettings.potatoChip}</li>
                <li>
                    <button onClick={rotateValue(1)}>{test}</button>
                </li>
                <li>
                    <span>Sort levels by </span>
                    <SelectSortDirection />
                </li>
            </ul>
        </div>
    )
}