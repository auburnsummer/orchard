/**
 * A switch component that renders ONE child component based off the result
 * of a test.
 */
import {useMemo} from "preact/hooks";
import {stubFalse} from "utils/functions";

export default function Switch(props) {
    const {args, children, ...rest} = props;

    const index = useMemo( () => {
        return children.findIndex(child => (child.props?.test ?? stubFalse)(...args));
    }, [...args])

    return children[index];
}