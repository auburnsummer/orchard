import Canvas from "components/boosters/molecules/BoosterCanvas";

import LevelHorizontal from "components/levels/organisms/LevelHorizontal";
import LevelDetail from "components/levels/organisms/LevelDetail";

import "./Booster.css";

export default function Booster() {

    const tempLevel = {"id":"DGWYzWfvZ5BziwN47phhdd","artist":"jjdf ft. Alice Leonz","song":"Song of the Sea","difficulty":0,"seizure_warning":false,"description":"","max_bpm":60,"min_bpm":60,"last_updated":"2020-06-27T17:45:30.000Z","single_player":true,"two_player":false,"image_ipfs":"bafkreihmrjmzhaotpqhw5oy55fzo63g3kv4c7l3kfz6b4q6z7abtaqnifi","rdzip_ipfs":"bafybeif5wpt6ad2x2ttwyxmsk34d3wk2urey35pg7pygnmyjmaqujieini","hue":0.43,"has_classics":false,"has_oneshots":false,"has_squareshots":false,"has_swing":false,"has_freetimes":false,"has_holds":false,"icon_ipfs":null,"group_id":"4a69bed8-76e5-4144-b5af-d87a6ba2bc51","group_iid":"1f_VxcF1Eh5KEaIIsln9FNWLOiHjFXHRT/2020-06-27T07:46:08.569Z","aux":{"id":"1f_VxcF1Eh5KEaIIsln9FNWLOiHjFXHRT","name":"jjdf_ft._Alice_Leonz_-_Song_of_the_Sea.rdzip","size":"4780546","mimeType":"application/x-zip","webViewLink":"https://drive.google.com/file/d/1f_VxcF1Eh5KEaIIsln9FNWLOiHjFXHRT/view?usp=drivesdk","modifiedTime":"2020-06-27T07:46:08.569Z","fileExtension":"rdzip","webContentLink":"https://drive.google.com/uc?id=1f_VxcF1Eh5KEaIIsln9FNWLOiHjFXHRT&export=download"},"uploaded":"2020-08-15T09:25:48.494Z","approval":0,"approval_message":null,"recycle_bin":false,"group":"Mock Google Drive","tags":[""],"authors":["auburnsummer"]};

    const draw = (ctx, frameCount) => {
        const { devicePixelRatio:ratio=1 } = window;
        const w = ctx.canvas.width / ratio;
        const h = ctx.canvas.height / ratio;
        // clear
        ctx.clearRect(0, 0, w, h);
        // background
        ctx.fillStyle = `hsl(
            ${(Math.sin(frameCount*0.005)**2)*360},
            50%,
            50%
        )
        `;
        ctx.fillRect(0, 0, w, h);
        // vibing circle
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.arc(Math.floor(w / 2), Math.floor(h / 2), 50*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
        ctx.fill()
    }

    return (
        <main class="-mt-16">
            <div class="flex flex-row min-h-screen pt-16">
                <div class="w-3/5 booster_left">
                    <div class="booster_left-wrapper1">
                        <div class="relative bg-red-500 pb-1/1">
                            <div class="absolute top-0 w-full h-full p-4">
                                <div class="w-full h-full bg-blue-500">
                                    
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
                <div class="flex flex-col">
                    <LevelHorizontal level={tempLevel} selected={false} />
                    <LevelDetail level={tempLevel} />
                </div>
            </div>
        </main>
    )
}