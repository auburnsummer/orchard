

export default function DownloadButton({download_link, children}) {
    return (
        <a href={download_link}>{children}</a>
    )
}