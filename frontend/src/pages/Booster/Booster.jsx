import Canvas from "components/boosters/molecules/BoosterCanvas";

import LevelHorizontal from "components/levels/organisms/LevelHorizontal";
import LevelDetail from "components/levels/organisms/LevelDetail";

import {useState, useEffect} from "preact/hooks";

import {nullOrUndef} from "utils/functions";

import "./Booster.css";
import useBoosterCanvas from "../../hooks/useBoosterCanvas";

export default function Booster() {

    const tempLevel = {"id":"DGWYzWfvZ5BziwN47phhdd","artist":"jjdf ft. Alice Leonz","song":"Song of the Sea","difficulty":0,"seizure_warning":false,"description":"","max_bpm":60,"min_bpm":60,"last_updated":"2020-06-27T17:45:30.000Z","single_player":true,"two_player":false,"image_ipfs":"bafkreihmrjmzhaotpqhw5oy55fzo63g3kv4c7l3kfz6b4q6z7abtaqnifi","rdzip_ipfs":"bafybeif5wpt6ad2x2ttwyxmsk34d3wk2urey35pg7pygnmyjmaqujieini","hue":0.43,"has_classics":false,"has_oneshots":false,"has_squareshots":false,"has_swing":false,"has_freetimes":false,"has_holds":false,"icon_ipfs":null,"group_id":"4a69bed8-76e5-4144-b5af-d87a6ba2bc51","group_iid":"1f_VxcF1Eh5KEaIIsln9FNWLOiHjFXHRT/2020-06-27T07:46:08.569Z","aux":{"id":"1f_VxcF1Eh5KEaIIsln9FNWLOiHjFXHRT","name":"jjdf_ft._Alice_Leonz_-_Song_of_the_Sea.rdzip","size":"4780546","mimeType":"application/x-zip","webViewLink":"https://drive.google.com/file/d/1f_VxcF1Eh5KEaIIsln9FNWLOiHjFXHRT/view?usp=drivesdk","modifiedTime":"2020-06-27T07:46:08.569Z","fileExtension":"rdzip","webContentLink":"https://drive.google.com/uc?id=1f_VxcF1Eh5KEaIIsln9FNWLOiHjFXHRT&export=download"},"uploaded":"2020-08-15T09:25:48.494Z","approval":0,"approval_message":null,"recycle_bin":false,"group":"Mock Google Drive","tags":[""],"authors":["auburnsummer"]};

    const {draw, up, down, over, exit, sentinel} = useBoosterCanvas()

    // const [image, setImage] = useState(null);

    // // 0 - 1
    // const [drag, setDrag] = useState(null);
    // // point where the drag starts
    // const [waypoint, setWaypoint] = useState(null);

    // // position it's rendered in.
    // const [pos, setPos] = useState({x: 1400, y: 1400});

    // useEffect(() => {
    //     const img = new Image();
    //     img.src = "https://i.redd.it/osuf1vt8w0uz.png";
    //     const onLoad = () => {
    //         console.log("yoyoyoyoo")
    //         setImage(img);
    //     }
    //     img.addEventListener('load', onLoad);
    //     // cleanup function
    //     return () => {
    //         img.removeEventListener('load', onLoad);
    //     }
    // }, []);

    // const draw = (ctx, frameCount, s) => {
    //     // clear
    //     ctx.clearRect(0, 0, s, s);
    //     if (!nullOrUndef(image)) {
    //         ctx.drawImage(image, pos.x, pos.y, 480, 480, 0, 0, s, s);
    //     }
    // }

    // const down = (sx, sy, s) => {
    //     setDrag({x: sx, y: sy});
    //     setWaypoint({x: pos.x, y: pos.y});
    // }

    // const over = (sx, sy, s) => {
    //     if (!nullOrUndef(drag)) {
    //         const {x, y} = drag;
    //         const dx = sx - x;
    //         const dy = sy - y;
    //         setPos({
    //             x: waypoint.x - dx * s,
    //             y: waypoint.y - dy * s
    //         });
    //     }
    // }

    // const up = (sx, sy, s) => {
    //     setDrag(null);
    // }

    // const exit = (sx, sy, s) => {
    //     up(sx, sy, s);
    // }

    return (
        <main class="-mt-16">
            <div class="flex flex-row min-h-screen pt-16">
                <div class="flex items-center justify-center w-3/5 booster_left">
                    <div class="w-full booster_left-wrapper1">
                        <div class="relative pb-1/1">
                            <div class="absolute top-0 w-full h-full p-4">
                                <div class="w-full h-full bg-white shadow-lg">
                                    <div class="grid w-full h-full grid-cols-1 grid-rows-1 p-4">
                                        <Canvas {...{draw, down, over, up, exit, sentinel}} _class="w-full h-full col-start-1 row-start-1"/>
                                        <div class="w-full h-full col-start-1 row-start-1 pointer-events-none booster_shadow" onMouseDown={console.log}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    {/* <div class="pb-1/2">
                        <div class="p-4">
                            
                            <div class="border-8 border-gray-100 shadow-lg">
                                

                            </div>

                        </div> 
                    </div> */}
                </div>
                <div class="flex flex-col items-stretch justify-center w-2/5 px-8">
                    <LevelHorizontal level={tempLevel} selected={false} />
                    <LevelDetail level={tempLevel} />
                </div>
            </div>
        </main>
    )
}