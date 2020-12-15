
import {useRef, useEffect, useState, useLayoutEffect} from "preact/hooks";

export default function Canvas({draw, _class, down, over, exit, up, sentinel, ...rest}) {

    const canvasRef = useRef(null);

    const resizeCanvas = canvas => {
        const { width, height } = canvas.getBoundingClientRect();
        const { devicePixelRatio:ratio=1 } = window;
        const s = canvas.width / ratio;
        
        if (canvas.width !== width || canvas.height !== height) {
            const context = canvas.getContext('2d');
            canvas.width = width*ratio;
            canvas.height = height*ratio;
            context.scale(ratio, ratio);
        }

        return s;
    }

    const eventHandler = func => event => {
        const canvas = canvasRef.current;
        const { devicePixelRatio:ratio=1 } = window;
        const rect = canvas.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const offsetY = event.clientY - rect.top;
        const s = canvas.width / ratio;
        const sx = offsetX / s;
        const sy = offsetY / s;
        func(sx, sy, s);
    }

    const render = () => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        const w = resizeCanvas(canvas);
        draw(context, w);
    }

    useLayoutEffect(() => {
        let animationFrameId;
        animationFrameId = window.requestAnimationFrame(render);
        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [sentinel])

    return (
        <canvas
            {...rest}
            ref={canvasRef}
            class={_class}
            onMouseDown={eventHandler(down)}
            onMouseMove={eventHandler(over)}
            onMouseUp={eventHandler(up)}
            onMouseOut={eventHandler(exit)}>

        </canvas>
    )
}