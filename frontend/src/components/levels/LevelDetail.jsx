import DetailIcons from "./DetailIcons";
import DownloadButton from "./DownloadButton";
import {ipfsUrl} from "utils/ipfsGateways";

export default function LevelDetail({level, _class}) {

    const constructedFilename = `${level.artist} - ${level.song}.rdzip`

    return (
        <div class="flex flex-col">
            <p>{level.description ?? ""}</p>
            <DetailIcons level={level} />

            <DownloadButton _class="mt-4 text-center" download_link={ipfsUrl(level.rdzip_ipfs, constructedFilename)}>
                Download
            </DownloadButton>
        </div>
    )
}