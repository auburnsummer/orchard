
import cm from "classnames";

export default function DownloadButton({download_link, children, _class}) {
    return (
        <a class={cm("p-4 text-white bg-blue-400", _class)} href={download_link}>{children}</a>
    )
}