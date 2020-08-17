import {useState, useEffect} from "preact/hooks";
import {blobToBase64URL} from "utils/functions";
import Axios from "utils/red2";

import {getDefaultImage} from "apng-default-image";


export default function useAnimatedPNG({url}) {
    // is it an APNG in the first place?
    const [isAnimated, setIsAnimated] = useState(false);

    // if it's an APNG, this is a static image of it
    const [staticImage, setStaticImage] = useState("");

    // this is the image.
    const [image, setImage] = useState("");

    const [state, setState] = useState("LOADING");

    const [error, setError] = useState(null);

    useEffect( () => {
        setState("LOADING");
    }, [url]);

    useEffect( () => {
        if (state === "LOADING") {
            Axios.get(url, {responseType: 'blob'})
            .then( resp => {
                return resp.data;
            })
            .then( blob => {
                const url1 = blobToBase64URL(blob);
                const still = blob.arrayBuffer()
                    .then( buf => {
                        return getDefaultImage(buf);
                    })
                    .then( buf => {
                        return new Blob([buf]);
                    })
                    .then( blob => {
                        return blobToBase64URL(blob);
                    });
                return Promise.all([url1, still]);
            })
            .then( ([url1, url2]) => {
                setImage(url2);
            })
            .catch( err => {
                setState("ERROR");
                setError(err);
            });
        }
    }, [state]);

    return {image, staticImage, state, error};
}