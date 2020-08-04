/**
 * A switch component that renders ONE child component based off the result
 * of a test.
 */
import _ from "lodash";
import {useMemo} from "preact/hooks";

export default function Switch(props) {
    const {args, children, ...rest} = props;

    // const Found = _.find(children, (child) => _.get(child, "props.test", _.stubFalse)(...args));
    const Found = _.find(children, child => (child.props?.test ?? _.stubFalse)(...args));

    return Found;
}