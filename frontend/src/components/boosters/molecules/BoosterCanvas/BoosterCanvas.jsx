
import {useRef, useEffect} from "preact/hooks";

export default function Canvas({draw, _class, down, ...rest}) {

    const canvasRef = useRef(null);

    function resizeCanvas(canvas) {
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

    function onMouseDown(event) {
        const canvas = canvasRef.current;
        const { devicePixelRatio:ratio=1 } = window;
        const rect = canvas.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const offsetY = event.clientY - rect.top;
        const s = canvas.width / ratio;
        const sx = offsetX / s;
        const sy = offsetY / s;
        down(sx, sy, s);
    }

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        let frameCount = 0;
        let animationFrameId;

        const render = () => {
            frameCount++;
            const w = resizeCanvas(canvas);
            draw(context, frameCount, w);
            animationFrameId = window.requestAnimationFrame(render);
        }

        render();

        return () => {
            window.cancelAnimationFrame(animationFrameId);
        }
      }, [draw])

    return (
        <canvas {...rest} ref={canvasRef} class={_class} onMouseDown={onMouseDown} >

        </canvas>
    )
}