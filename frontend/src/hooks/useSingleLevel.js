import {useState, useEffect} from "preact/hooks";
import Axios from "../utils/red2";
import constants from "../utils/constants";

async function get (id) {
    const resp = await Axios({
        method: 'GET',
        url: `${constants.API_URL}/levels/${id}`
    });
    return resp.data;
}

export default function useSingleLevel({id}) {
    const [level, setLevel] = useState([]);

    /*
        [LOADING] -- data loaded ----> [LOADED]
                  |
                  -- error --> [ERROR]  
    */
    const [state, setState] = useState("LOADING");

    const [error, setError] = useState(null);

    useEffect( () => {
        setState("LOADING");
    }, [id]);

    useEffect( () => {
        if (state === "LOADING") {
            get(id)
            .then( (data) => {
                setLevel(data);
                setState("LOADED");
            })
            .catch( (err) => {
                console.log(err);
                setError(err);
                setState("ERROR");
            })
        }
    }, [state]);

    return {level, state, error};
}