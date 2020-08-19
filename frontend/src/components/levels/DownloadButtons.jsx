
import cm from "classnames";
import copy from "clipboard-copy";

import {useState} from "preact/hooks";

export default function DownloadButtons({download_link, _class}) {

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
        <div class={cm("flex flex-row space-x-4", _class)}>
            <a class="w-32 px-6 py-4 text-white bg-pink-500 hover:cursor-pointer hover:bg-pink-600" onClick={() => copyToClipboard(download_link)}>{copyText}</a>
            <a class="p-4 font-light text-gray-600 hover:text-gray-700 hover:underline" href={download_link}>Download</a>
        </div>
    )
}