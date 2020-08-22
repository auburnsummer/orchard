import {useState, useEffect, useRef} from "preact/hooks";
import Axios from "../utils/red2";
import constants from "../utils/constants";

async function get (query, page, limit) {
    const q = query || null;
    const resp = await Axios({
        method: 'POST',
        url: `${constants.API_URL}/search`,
        data: {
            q,
            filters: "recycle_bin = false AND approval >= 10",
            limit: limit,
            offset: page * limit
        }
    });
    return resp.data.hits;
}

export default function useLevels({query, page, limit}) {
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
    }, [query, page, limit]);

    useEffect( () => {
        if (state === "LOADING") {
            get(query, page, limit)
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