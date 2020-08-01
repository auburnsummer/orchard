import preact, {h} from 'preact';

import style from "./style.css";

import LevelHorizontal from "./components/levels/LevelHorizontal";

export default function App () {
    const level = {"sha256":"3cKs7G687sGS6rDCBYecw62KJh9KuS2Bn75RKoCm5m3a","artist":"Carpenter Brut","song":"Le Perv (Community Remix)","difficulty":3,"seizure_warning":true,"description":"Looks like it's going to be a long night... Are you feeling nostalgic?\n\n3rd community remix, featuring 72 different community levels.","max_bpm":120,"min_bpm":110,"last_updated":"2019-08-31T22:20:08.000Z","single_player":true,"two_player":false,"image_ipfs":"bafkreielyfvall7uffqumteukmxu32ioid5z256jim6sjmxff325dj4gq4","rdzip_ipfs":"bafybeid4ulmpefrf5w57jpgdwcyoh7cwcriopvswtegsynzb2oxxofeila","hue":0.03,"has_classics":true,"has_oneshots":true,"has_squareshots":true,"has_swing":true,"has_freetimes":true,"has_holds":false,"icon_ipfs":"bafkreihkpw2bfroikse5so7wixs63eywn62nhto53r2jwgqf3pdtkacsym","group_id":"40b06174-7b5a-4fe4-a8df-c3a91fd1ebba","group_iid":"https://cdn.discordapp.com/attachments/611380148431749151/617560420202577940/Carpenter_Brut_-_Le_Perv_Community_Remix.rdzip","aux":{"iid":"https://cdn.discordapp.com/attachments/611380148431749151/617560420202577940/Carpenter_Brut_-_Le_Perv_Community_Remix.rdzip","approved":true},"group":"Rhythm Doctor Lounge","approval":10,"tags":["community remix","hotline miami"],"authors":["notDonte","Kneeckoh","noche","Samario","Ladybug","Fancybread"]};
    const level2 = {"sha256":"4BMBjAikT6EM4aHFSVrfH5gQR1d8brwAWWixjCiDRZvA","artist":"dull machine","song":"september","difficulty":0,"seizure_warning":false,"description":"just like that, summer falls into september.","max_bpm":94,"min_bpm":94,"last_updated":"2019-08-31T21:20:30.000Z","single_player":true,"two_player":false,"image_ipfs":"bafkreibdedbdjeo3qsbkccqq5hkwhcfrwmdez2oasxhyjjkoiaxgo7j6fy","rdzip_ipfs":"bafybeiakx4u3x27bnlqev2ycusesnh5luar27hraw5ycaxp4n4avhwbf7a","hue":0.8,"has_classics":true,"has_oneshots":false,"has_squareshots":false,"has_swing":true,"has_freetimes":true,"has_holds":false,"icon_ipfs":"bafkreibimjaqpuze3z2ext2myw5iubbjzpgt3y26rkj65laa4rxozbaica","group_id":"c4552920-7dcd-4f2e-b343-ec9c4411cdd4","group_iid":"d67af58d07acf6903f1e5bfd457f0fcc4d05d7f7","aux":{"oid":"d67af58d07acf6903f1e5bfd457f0fcc4d05d7f7","filepath":"rdzips/dull machine - september.rdzip"},"group":"Test Group","approval":0,"tags":["slow","indie","1p"],"authors":["lugi"]};
    const level3 = {"sha256":"6sF4fijUsEC8Kk1ADJo3feXwz9yH78T6G827ivQpK8Dw","artist":"wiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiitch's slave","song":"diiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiisperagioia","difficulty":1,"seizure_warning":false,"description":"Oh deeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeear.","max_bpm":180,"min_bpm":180,"last_updated":"2019-09-01T23:44:10.000Z","single_player":true,"two_player":false,"image_ipfs":"bafkreiacuwzlk2qzyjxm5hviruecuqwdznm2aijth6klyi2wmgxg4luzuq","rdzip_ipfs":"bafybeidcrrpqqjfc7pewke3q3xbp74qnky2sas4sy4ycx72x7anenpwaqu","hue":0,"has_classics":false,"has_oneshots":false,"has_squareshots":false,"has_swing":false,"has_freetimes":true,"has_holds":false,"icon_ipfs":"bafkreibniyjmbs73ho5fm6utgs64osw6c3ziuvx66de2ygujotpvrefxpe","group_id":"40b06174-7b5a-4fe4-a8df-c3a91fd1ebba","group_iid":"https://cdn.discordapp.com/attachments/611380148431749151/617856283701411860/diiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiisperagioia.rdzip","aux":{"iid":"https://cdn.discordapp.com/attachments/611380148431749151/617856283701411860/diiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiisperagioia.rdzip","approved":false},"group":"Level Maker Group","approval":0,"tags":["hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiigh diiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiifficulty"],"authors":["Samaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaario"]};

    return (
        <div class="flex flex-col justify-center max-w-3xl min-h-screen p-8 bg-gray-200">
            <h1>Hello, World!</h1>
            <LevelHorizontal level={level}/>
            <LevelHorizontal level={level2} _class="mt-8" />
            <LevelHorizontal level={level3} _class="mt-8" />
        </div>
    )
}