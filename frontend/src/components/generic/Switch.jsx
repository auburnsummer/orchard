/**
 * A switch component that renders ONE child component based off the result
 * of a test.
 */
import _ from "lodash";
import {useMemo} from "preact/hooks";

export default function Switch(props) {
    const {args, children, ...rest} = props;

    const Found = useMemo( () => {
        // if there isn't a test, substitute _.stubFalse
        return _.find(children, (child) => _.get(child, "props.test", _.stubFalse)(...args))
    }, [...args]);

    return Found;
}