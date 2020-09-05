/**
 * A switch component that renders ONE child component based off the result
 * of a test.
 */
import {useMemo} from "preact/hooks";
import {stubFalse} from "utils/functions";
import { toChildArray } from 'preact';

export default function Switch(props) {
    const {args, children, ...rest} = props;

    const index = useMemo( () => {
        const kids = toChildArray(children);
        console.log(kids.length);
        return kids.findIndex(child => (child.props?.test ?? stubFalse)(...args));
    }, [...args])

    return index !== -1 ? children[index] : null;
}