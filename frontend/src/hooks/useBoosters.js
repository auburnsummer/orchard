import Axios from "utils/red2";
import { useState, useEffect } from "preact/hooks";

export default function useGroups() {
    const [state, setState] = useState("LOADING");

    const [boosters, setBoosters] = useState([]);

    const [error, setError] = useState(null);

    useEffect(() => {
        Axios(`https://raw.githubusercontent.com/auburnsummer/rd-boosters2/master/boosters.json`)
        .then( resp => {
            setBoosters(resp.data);
            setState("LOADED");
        })
        .catch( err => {
            setError(err);
            setState("ERROR");
        })
    }, []);

    return {boosters, state, error};

}