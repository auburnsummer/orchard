import preact, {h} from 'preact';

import style from "./style.css";

import LevelHorizontal from "./components/LevelHorizontal";

export default function App () {
    const level = {
        "sha256": "3cKs7G687sGS6rDCBYecw62KJh9KuS2Bn75RKoCm5m3a",
        "artist": "Carpenter Brut",
        "song": "Le Perv (Community Remix)",
        "difficulty": 3,
        "seizure_warning": true,
        "description": "Looks like it's going to be a long night... Are you feeling nostalgic?\n\n3rd community remix, featuring 72 different community levels.",
        "max_bpm": 120,
        "min_bpm": 120,
        "last_updated": "2019-08-31T22:20:08.000Z",
        "single_player": true,
        "two_player": false,
        "image_ipfs": "bafkreielyfvall7uffqumteukmxu32ioid5z256jim6sjmxff325dj4gq4",
        "rdzip_ipfs": "bafybeid4ulmpefrf5w57jpgdwcyoh7cwcriopvswtegsynzb2oxxofeila",
        "hue": 0.03,
        "has_classics": true,
        "has_oneshots": true,
        "has_squareshots": true,
        "has_swing": true,
        "has_freetimes": true,
        "has_holds": false,
        "icon_ipfs": "bafkreihkpw2bfroikse5so7wixs63eywn62nhto53r2jwgqf3pdtkacsym",
        "group_id": "40b06174-7b5a-4fe4-a8df-c3a91fd1ebba",
        "group_iid": "https://cdn.discordapp.com/attachments/611380148431749151/617560420202577940/Carpenter_Brut_-_Le_Perv_Community_Remix.rdzip",
        "aux": {
          "iid": "https://cdn.discordapp.com/attachments/611380148431749151/617560420202577940/Carpenter_Brut_-_Le_Perv_Community_Remix.rdzip",
          "approved": true
        },
        "group": "Rhythm Doctor Lounge (old sheet)",
        "approval": 0,
        "tags": [
          "community remix",
          "hotline miami"
        ],
        "authors": [
          "notDonte",
          "Kneeckoh",
          "noche",
          "Samario",
          "Ladybug",
          "Fancybread"
        ]
      };
    
    return (
        <div>
            <h1>Hello, World!</h1>
            <LevelHorizontal level={level}/>
        </div>
    )
}