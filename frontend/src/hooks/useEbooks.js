import {sample} from "utils/functions";

const EBOOKS = [
    "plastermaster: the angle I was approaching this from was if users wanted to put usernames on a forum have to comply with Xx_420pussyslayer_xX",
    "Klyzx: CV why are you streaming a green line for the entire day",
    "fizzd: banana detection",
    "SpikedJackson: First it was vegetables, now all out war",
    "Nocallia: the macarena is syncopation",
    "giacomo: ok, that's good news\ngiacomo: i have no idea whats going on",
    "fizzd: gamedev is like: we announce game, sleep for 1 year and then wake up and press the release button"
];

export default function useEbooks() {
    return sample(EBOOKS);
}