import useTwineSelect from "hooks/useTwineSelect";
import {useState} from "preact/hooks";

export default function Settings({settings}) {

    const [globalSettings, setGlobalSettings] = settings;

    const [test, setTest] = useState("hello");

    const rotateValue = useTwineSelect(["hello", "goodbye"], test, setTest);

    const set = (param) => (evt) => {
        setGlobalSettings({
            ...globalSettings,
            [param]: parseInt(evt.target.value)
        });
    }

    const SelectLevelsPerPage = () => (
        <select value={globalSettings.levelsPerPage} onChange={set("levelsPerPage")}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={40}>40</option>
            <option value={50}>50</option>
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
            </ul>
        </div>
    )
}