import {useState, useEffect, useRef} from "preact/hooks";
import Axios from "../utils/red2";
import constants from "../utils/constants";

async function get (offset, limit, sortDirection, showUnranked) {
    const resp = await Axios({
        method: 'GET',
        url: `${constants.API_URL}/levels`,
        params: {
            order: sortDirection,
            limit,
            offset,
            filters: showUnranked ? "recycle_bin.eq.false" : "recycle_bin.eq.false,approval.gte.10"
        }
    });
    return resp.data;
}

export default function useLevels({query, offset, limit, sortDirection, showUnranked}) {
    const [levels, setLevels] = useState([]);

    /*
        [LOADING] -- data loaded ----> [LOADED]
                  |
                  -- error --> [ERROR]  
    */
    const [state, setState] = useState("INITIAL");

    const [error, setError] = useState(null);

    useEffect( () => {
        if (!query) {
            setState("LOADING");
        }
    }, [query, offset, limit, sortDirection, showUnranked]);

    useEffect( () => {
        if (state === "LOADING") {
            get(offset, limit, sortDirection, showUnranked)
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