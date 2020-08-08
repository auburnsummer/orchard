import DetailIcons from "./DetailIcons";
import DownloadButton from "./DownloadButton";
import {ipfsUrl} from "utils/ipfsGateways";
import {cond, isHttpUrl, stubTrue} from "utils/functions";
import {_, it, lift as L} from "param.macro";

export default function LevelDetail({level, _class}) {

    const constructedFilename = `${level.artist} - ${level.song}.rdzip`;

    const downloadUrl = cond([
        [L(isHttpUrl(_.aux?.iid)),           L(_.aux.iid)],
        [L(isHttpUrl(_.aux?.download_url)),  L(_.aux.download_url)],
        [stubTrue,                           L(ipfsUrl(_.rdzip_ipfs, constructedFilename))]
    ])(level);

    return (
        <div class="flex flex-col">
            <DetailIcons level={level} />

            <div class="mt-6">
                <p class="px-3 py-2 text-base leading-relaxed break-words bg-white shadow-sm">{level.description ?? ""}</p>
            </div>


            <DownloadButton _class="mt-6 text-center" download_link={downloadUrl}>
                Download
            </DownloadButton>
        </div>
    )
}