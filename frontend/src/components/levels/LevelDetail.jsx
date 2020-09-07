import DetailIcons from "components/levels/molecules/DetailIcons";
import DownloadButtons from "./DownloadButtons";
import {ipfsUrl} from "utils/ipfsGateways";
import {isHttpUrl} from "utils/functions";

import {useMemo} from "preact/hooks";
import {Link} from "preact-router";

import cm from "classnames";

export default function LevelDetail({level, _class, useIPFSLink, showAutoimporter}) {
    const downloadUrl = useMemo( () => {
        // const constructedFilename = `${level.artist} - ${level.song}.rdzip`;
        const ipfsLink = ipfsUrl(level.rdzip_ipfs, null);

        if (useIPFSLink) {
            return ipfsLink;
        }

        if (isHttpUrl(level.aux?.iid)) {
            return level.aux.iid;
        }
        if (isHttpUrl(level.aux?.download_url)) {
            return level.aux.download_url;
        }

        return ipfsLink;
    }, [level, useIPFSLink]);

    return (
        <div class={cm("relative flex flex-col", _class)}>
            <DetailIcons level={level} />

            <div class="mt-6">
                <p class="px-3 py-2 text-base leading-relaxed break-words bg-white shadow-sm">{level.description ?? ""}</p>
            </div>


            <DownloadButtons _class="mt-6 text-center" download_link={downloadUrl} showAutoimporter={showAutoimporter} />

            <Link
            class="absolute bottom-0 right-0 mb-1 mr-1 tracking-widest text-gray-400 text-2xs hover:text-gray-600"
            href={`/${level.id}`}
            title="Direct link to this level"
            >
                {level.id}
            </Link>
        </div>
    )
}