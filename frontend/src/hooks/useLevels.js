import {useState, useEffect, useRef} from "preact/hooks";
import Axios from "redaxios";
import constants from "../utils/constants";
import useDeferredEffect from "./useDeferredEffect";

async function get (page, limit) {
    const resp = await Axios({
        method: 'GET',
        url: `${constants.API_URL}/levels`,
        params: {
            order: "uploaded.desc,last_updated.desc",
            limit: limit,
            offset: page * limit
        }
    });
    return resp.data;
}

export default function useLevels(initialPage = 0, initialLimit = 20) {
    const [levels, setLevels] = useState([]);

    /*
        [LOADING] -- data loaded ----> [LOADED]
                  |
                  -- error --> [ERROR]  
    */
    const [state, setState] = useState("LOADING");

    const [error, setError] = useState(null);

    const [limit, setLimit] = useState(initialLimit);
    const [page, setPage] = useState(initialPage);

    useDeferredEffect( () => {
        setPage(0);
    }, [limit]);

    useEffect( () => {
        setState("LOADING");
    }, [page]);

    useEffect( () => {
        if (state === "LOADING") {
            get(page, limit)
            .then( (data) => {
                setLevels(data);
                setState("LOADED");
            })
            .catch( (err) => {
                setError(err);
                setState("ERROR");
            })
        }
    }, [state]);

    return {levels, state, error, page, setPage, limit, setLimit};
}