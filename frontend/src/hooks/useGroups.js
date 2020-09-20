import Axios from "utils/red2";
import constants from "utils/constants";
import { useState, useEffect } from "preact/hooks";

export default function useGroups() {
    const [state, setState] = useState("LOADING");

    const [groups, setGroups] = useState([]);

    const [error, setError] = useState(null);

    useEffect(() => {
        Axios(`${constants.API_URL}/groups`)
        .then( resp => {
            setGroups(resp.data);
            setState("LOADED");
        })
        .catch( err => {
            setError(err);
            setState("ERROR");
        })
    }, []);

    return {groups, state, error};

}