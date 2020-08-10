import { useEffect, useRef } from 'preact/hooks';

/**
 * Like useEffect, but does not proc on the initial mount.
 */
const useDeferredEffect = (func, deps) => {
    const didMount = useRef(false);

    useEffect(() => {
        if (didMount.current) func();
        else didMount.current = true;
    }, deps);
};

export default useDeferredEffect;