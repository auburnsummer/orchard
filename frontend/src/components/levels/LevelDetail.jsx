import DetailIcons from "./DetailIcons";
import DownloadButtons from "./DownloadButtons";
import {ipfsUrl} from "utils/ipfsGateways";
import {isHttpUrl} from "utils/functions";

import {useMemo} from "preact/hooks";
import {_, it, lift as L} from "param.macro";

export default function LevelDetail({level, _class}) {
    const downloadUrl = useMemo( () => {
        const constructedFilename = `${level.artist} - ${level.song}.rdzip`;
        if (isHttpUrl(level.aux?.iid)) {
            return level.aux.iid;
        }
        if (isHttpUrl(level.aux?.download_url)) {
            return level.aux.download_url;
        }

        return ipfsUrl(level.rdzip_ipfs, constructedFilename)
    }, [level]);

    return (
        <div class="flex flex-col">
            <DetailIcons level={level} />

            <div class="mt-6">
                <p class="px-3 py-2 text-base leading-relaxed break-words bg-white shadow-sm">{level.description ?? ""}</p>
            </div>


            <DownloadButtons _class="mt-6 text-center" download_link={downloadUrl} />
        </div>
    )
}