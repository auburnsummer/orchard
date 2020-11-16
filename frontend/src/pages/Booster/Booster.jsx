import Canvas from "components/boosters/molecules/BoosterCanvas";

import LevelHorizontal from "components/levels/organisms/LevelHorizontal";
import LevelDetail from "components/levels/organisms/LevelDetail";

export default function Booster() {

    const tempLevel = {"id":"DGWYzWfvZ5BziwN47phhdd","artist":"jjdf ft. Alice Leonz","song":"Song of the Sea","difficulty":0,"seizure_warning":false,"description":"","max_bpm":60,"min_bpm":60,"last_updated":"2020-06-27T17:45:30.000Z","single_player":true,"two_player":false,"image_ipfs":"bafkreihmrjmzhaotpqhw5oy55fzo63g3kv4c7l3kfz6b4q6z7abtaqnifi","rdzip_ipfs":"bafybeif5wpt6ad2x2ttwyxmsk34d3wk2urey35pg7pygnmyjmaqujieini","hue":0.43,"has_classics":false,"has_oneshots":false,"has_squareshots":false,"has_swing":false,"has_freetimes":false,"has_holds":false,"icon_ipfs":null,"group_id":"4a69bed8-76e5-4144-b5af-d87a6ba2bc51","group_iid":"1f_VxcF1Eh5KEaIIsln9FNWLOiHjFXHRT/2020-06-27T07:46:08.569Z","aux":{"id":"1f_VxcF1Eh5KEaIIsln9FNWLOiHjFXHRT","name":"jjdf_ft._Alice_Leonz_-_Song_of_the_Sea.rdzip","size":"4780546","mimeType":"application/x-zip","webViewLink":"https://drive.google.com/file/d/1f_VxcF1Eh5KEaIIsln9FNWLOiHjFXHRT/view?usp=drivesdk","modifiedTime":"2020-06-27T07:46:08.569Z","fileExtension":"rdzip","webContentLink":"https://drive.google.com/uc?id=1f_VxcF1Eh5KEaIIsln9FNWLOiHjFXHRT&export=download"},"uploaded":"2020-08-15T09:25:48.494Z","approval":0,"approval_message":null,"recycle_bin":false,"group":"Mock Google Drive","tags":[""],"authors":["auburnsummer"]};

    const draw = (ctx, frameCount) => {
        const w = ctx.canvas.width;
        const h = ctx.canvas.height;
        const r = Math.min(w, h) / 2;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(w / 2, h / 2, r*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
        ctx.fill()
    }

    return (
        <main>
            <div class="flex flex-row min-h-screen">
                <div>
                    <Canvas draw={draw}/>
                </div>
                <div class="flex flex-col">
                    <LevelHorizontal level={tempLevel} selected={false} />
                    <LevelDetail level={tempLevel} />
                </div>
            </div>
        </main>
    )
}