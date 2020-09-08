import DetailIcons from "components/levels/molecules/DetailIcons";
import DownloadButtons from "components/levels/molecules/DownloadButtons";
import {ipfsUrl} from "utils/ipfsGateways";
import {isHttpUrl} from "utils/functions";

import {useMemo} from "preact/hooks";
import {Link} from "preact-router";

import cm from "classnames";

import "./LevelDetail.css";

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
        <div class={cm("level-detail", _class)}>
            <DetailIcons level={level} />

            <p class="level-detail_description">{level.description ?? ""}</p>

            <DownloadButtons _class="level-detail_download-buttons" download_link={downloadUrl} showAutoimporter={showAutoimporter} />

            <Link
            class="level-detail_direct-link"
            href={`/${level.id}`}
            title="Direct link to this level"
            >
                {level.id}
            </Link>
        </div>
    )
}