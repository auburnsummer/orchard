
import {useRef, useEffect} from "preact/hooks";

export default function Canvas({draw, _class, ...rest}) {

    const canvasRef = useRef(null);

    function resizeCanvas(canvas) {
        const { width, height } = canvas.getBoundingClientRect()
        
        if (canvas.width !== width || canvas.height !== height) {
            const { devicePixelRatio:ratio=1 } = window
            const context = canvas.getContext('2d')
            canvas.width = width*ratio
            canvas.height = height*ratio
            context.scale(ratio, ratio)
            return true
        }

        return false
    }

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        let frameCount = 0;
        let animationFrameId;

        const render = () => {
            frameCount++;
            resizeCanvas(canvas);
            draw(context, frameCount);
            animationFrameId = window.requestAnimationFrame(render);
        }

        render();

        return () => {
            window.cancelAnimationFrame(animationFrameId);
        }
      }, [draw])

    return (
        <canvas ref={canvasRef} {...rest} class={_class}>

        </canvas>
    )
}