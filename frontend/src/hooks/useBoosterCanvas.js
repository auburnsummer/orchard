/*
A hook which implements the booster canvas stuff.
*/

import {useState, useEffect} from "preact/hooks"
import {nullOrUndef} from "utils/functions"

export default function useBoosterCanvas() {

    const [image, setImage] = useState(null);

    // 0 - 1
    const [drag, setDrag] = useState(null);
    // point where the drag starts
    const [waypoint, setWaypoint] = useState(null);
    
    // position it's rendered in.
    const [pos, setPos] = useState({x: 1400, y: 1400});

    // dummy value which is incremented when a rerender should occur.
    const [sentinel, setSentinel] = useState(0);

    const increment = (prev) => prev + 1

    useEffect(() => {
        const img = new Image();
        img.src = "https://i.redd.it/osuf1vt8w0uz.png";
        const onLoad = () => {
            console.log("yoyoyoyoo")
            setImage(img);
            setSentinel(increment)
        }
        img.addEventListener('load', onLoad);
        // cleanup function
        return () => {
            img.removeEventListener('load', onLoad);
        }
    }, []);

    const draw = (ctx, s) => {
        // clear
        ctx.clearRect(0, 0, s, s);
        if (!nullOrUndef(image)) {
            ctx.drawImage(image, pos.x, pos.y, 480, 480, 0, 0, s, s);
        }
    }


    const down = (sx, sy, s) => {
        setDrag({x: sx, y: sy});
        setWaypoint({x: pos.x, y: pos.y});
    }

    const over = (sx, sy, s) => {
        if (!nullOrUndef(drag)) {
            const {x, y} = drag;
            const dx = sx - x;
            const dy = sy - y;
            setPos({
                x: waypoint.x - dx * s,
                y: waypoint.y - dy * s
            });
            setSentinel(increment);
        }
    }

    const up = (sx, sy, s) => {
        setDrag(null);
    }

    const exit = (sx, sy, s) => {
        up(sx, sy, s);
    }

    return {draw, down, over, up, exit, sentinel}

}