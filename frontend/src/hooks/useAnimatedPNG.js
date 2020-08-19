import {useState, useEffect} from "preact/hooks";
import {blobToBase64URL} from "utils/functions";
import Axios from "utils/red2";

import worker from "workerize-loader!apng-default-image";

let instance = worker();


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

    useEffect( async () => {
        let imageDataURL;
        try {
            if (state === "LOADING") {
                const resp = await Axios.get(url, {responseType: 'blob'});
                const blob = resp.data;
    
                // the data URL of the image.
                imageDataURL = await blobToBase64URL(blob);
                
                const arrayBuf = await blob.arrayBuffer();
    
                const isAnimated = await instance.isAnimatedPNG(new Uint8Array(arrayBuf));
    
                if (isAnimated) {
                    const defaultBuffer = await instance.getDefaultImage(arrayBuf);
                    const defaultBlob = new Blob([defaultBuffer]);
                    const staticDataURL = await blobToBase64URL(defaultBlob);
                    setStaticImage(staticDataURL);
                    setIsAnimated(true);
                } else {
                    setStaticImage("");
                    setIsAnimated(false);
                }
    
                setImage(imageDataURL);
                setState("LOADED");
            }
        } catch (err) {
            // fallback.
            setIsAnimated(false);
            setImage(imageDataURL);
            setState("LOADED");
        }
    }, [state]);

    return {isAnimated, image, staticImage, state, error};
}