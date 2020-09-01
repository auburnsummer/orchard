/**
 * A twine game style selector where you click to change a value inline.
 */

import {useMemo} from "preact/hooks";
import { eq } from "../utils/functions";

export default function useTwineSelect(options, value, setValue) {

    const index = useMemo(() => {
        return options.findIndex(eq(value));
    }, [value]);

    const rotate = (dir = 1) => (evt) => {
        const newValue = options[(index + dir) % options.length];
        setValue(newValue);
    }

    return rotate;
}