import DetailIcons from "./DetailIcons";
import DownloadButton from "./DownloadButton";
import {ipfsUrl} from "utils/ipfsGateways";

export default function LevelDetail({level, _class}) {

    return (
        <div>
            <p>{level.description ?? ""}</p>
            <DetailIcons level={level} />

            <DownloadButton download_link={ipfsUrl(level.rdzip_ipfs, "level.rdzip")}>
                Download
            </DownloadButton>
        </div>
    )
}