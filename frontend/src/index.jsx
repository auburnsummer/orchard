import preact, {h} from 'preact';

import style from "./style.css";

import LevelHorizontal from "./components/levels/LevelHorizontal";

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
    const level2 = {"sha256":"4BMBjAikT6EM4aHFSVrfH5gQR1d8brwAWWixjCiDRZvA","artist":"dull machine","song":"september","difficulty":0,"seizure_warning":false,"description":"just like that, summer falls into september.","max_bpm":94,"min_bpm":94,"last_updated":"2019-08-31T21:20:30.000Z","single_player":true,"two_player":false,"image_ipfs":"bafkreibdedbdjeo3qsbkccqq5hkwhcfrwmdez2oasxhyjjkoiaxgo7j6fy","rdzip_ipfs":"bafybeiakx4u3x27bnlqev2ycusesnh5luar27hraw5ycaxp4n4avhwbf7a","hue":0.8,"has_classics":true,"has_oneshots":false,"has_squareshots":false,"has_swing":true,"has_freetimes":true,"has_holds":false,"icon_ipfs":"bafkreibimjaqpuze3z2ext2myw5iubbjzpgt3y26rkj65laa4rxozbaica","group_id":"c4552920-7dcd-4f2e-b343-ec9c4411cdd4","group_iid":"d67af58d07acf6903f1e5bfd457f0fcc4d05d7f7","aux":{"oid":"d67af58d07acf6903f1e5bfd457f0fcc4d05d7f7","filepath":"rdzips/dull machine - september.rdzip"},"group":"Lugi's Levels","approval":0,"tags":["slow","indie","1p"],"authors":["lugi"]};
    
    return (
        <div class="flex flex-col justify-center max-w-3xl min-h-screen p-8 bg-gray-200">
            <h1>Hello, World!</h1>
            <LevelHorizontal level={level}/>
            <LevelHorizontal level={level2} _class="mt-8" />
        </div>
    )
}