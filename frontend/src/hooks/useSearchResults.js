import {useState, useEffect, useRef} from "preact/hooks";
import Axios from "../utils/red2";
import constants from "../utils/constants";

async function get (query, offset, limit, showUnranked) {
    const q = query || null;
    const resp = await Axios({
        method: 'POST',
        url: `${constants.API_URL}/search`,
        data: {
            q,
            showUnapproved: showUnranked,
            limit,
            offset
        }
    });
    return resp.data.levels;
}

export default function useLevels({query, offset, limit, showUnranked}) {
    const [levels, setLevels] = useState([]);

    /*
                                  /----------query changes------\
                                  v                             |
        [INITIAL] -- query -->[LOADING] -- data loaded ----> [LOADED]
            ^           |         |
            \--q blank--/         \- error --> [ERROR]  
    */
    const [state, setState] = useState("INITIAL");

    const [error, setError] = useState(null);

    useEffect( () => {
        if (typeof query === "string" && query.length > 0) {
            setState("LOADING");
        }
    }, [query, offset, limit, showUnranked]);

    useEffect( () => {
        if (state === "LOADING") {
            get(query, offset, limit, showUnranked)
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