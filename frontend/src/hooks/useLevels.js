import {useState, useEffect} from "preact/hooks";
import Axios from "axios";
import constants from "../utils/constants";


export default function useLevels() {
    const [levels, setLevels] = useState([]);

    /*
        [LOADING] -- data loaded ----> [LOADED]
                  |
                  -- error --> [ERROR]  
    */
    const [state, setState] = useState("LOADING");

    const [error, setError] = useState(null);

    useEffect( () => {
        Axios({
            method: 'GET',
            url: `${constants.API_URL}/levels`,
            params: {
                order: "uploaded.desc,last_updated.desc",
                limit: 20,
                offset: 0
            }
        })
        .then( (resp) => {
            return resp.data;
        })
        .then( (data) => {
            setLevels(data);
            setState("LOADED");
        })
        .catch( (err) => {
            setError(err);
            setState("ERROR");
        })
    }, [])

    return {levels, state, error};
}