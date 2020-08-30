import {useState, useEffect, useRef} from "preact/hooks";
import Axios from "../utils/red2";
import constants from "../utils/constants";

async function get (query, offset, limit) {
    const q = query || null;
    const resp = await Axios({
        method: 'POST',
        url: `${constants.API_URL}/search`,
        data: {
            q,
            showUnapproved: false,
            limit,
            offset
        }
    });
    return resp.data.levels;
}

export default function useLevels({query, offset, limit}) {
    const [levels, setLevels] = useState([]);

    /*
        [LOADING] -- data loaded ----> [LOADED]
                  |
                  -- error --> [ERROR]  
    */
    const [state, setState] = useState("LOADING");

    const [error, setError] = useState(null);

    useEffect( () => {
        setState("LOADING");
    }, [query, offset, limit]);

    useEffect( () => {
        if (state === "LOADING") {
            get(query, offset, limit)
            .then( (data) => {
                setLevels(data);
                setState("LOADED");
            })
            .catch( (err) => {
                console.log(err);
                setError(err);
                setState("ERROR");
            })
        }
    }, [state]);

    return {levels, state, error};
}