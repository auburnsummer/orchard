import {useState, useEffect, useRef} from "preact/hooks";
import Axios from "../utils/red2";
import constants from "../utils/constants";

async function get (offset, limit) {
    const resp = await Axios({
        method: 'GET',
        url: `${constants.API_URL}/levels`,
        params: {
            order: "uploaded.desc,last_updated.desc",
            limit,
            offset
        }
    });
    return resp.data;
}

export default function useLevels({offset, limit}) {
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
    }, [offset, limit]);

    useEffect( () => {
        if (state === "LOADING") {
            get(offset, limit)
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