/**
 * A switch component that renders ONE child component based off the result
 * of a test.
 */
import _ from "lodash";
import {useMemo} from "preact/hooks";

export default function Switch(props) {
    const {args, children, ...rest} = props;

    const index = useMemo( () => {
        return _.findIndex(children, child => (child.props?.test ?? _.stubFalse)(...args));
    }, [...args])

    return children[index];
}