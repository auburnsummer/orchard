/**
 * A switch component that renders ONE child component based off the result
 * of a test.
 */
import _ from "lodash";
import {useMemo} from "preact/hooks";

export default function Switch(props) {
    const {args, children, ...rest} = props;

    const Found = useMemo( () => {
        return _.find(children, (child) => child.props.test(...args))
    }, [...args]);

    return Found;
}