
import cm from "classnames";
import copy from "clipboard-copy";

import {useState} from "preact/hooks";

import style from "./DownloadButtons.css";

export default function DownloadButtons({download_link, _class, showAutoimporter}) {

    const [copyText, setCopyText] = useState("Copy link")

    const copyToClipboard = (text) => {
        copy(text)
        .then( () => {
            setCopyText("Copied!");
            setTimeout(() => {
                setCopyText("Copy link")
            }, 1000);
        })
        .catch( (err) => {
            console.log(err);
            // don't set the copy text
        });
    }

    return (
        <div class={cm("download-buttons", _class)}>
            <button class="download-buttons_copy" onClick={() => copyToClipboard(download_link)}>{copyText}</button>
            <a class={cm("download-buttons_import", {"hidden!download-buttons_import": !showAutoimporter})} href={`rhythmdr://${download_link}`}>Import</a>
            <a class="download-buttons_download" href={download_link}>Download</a>
        </div>
    )
}