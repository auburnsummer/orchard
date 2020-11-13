
import {useRef, useEffect} from "preact/hooks";

export default function Canvas(props) {

    const canvasRef = useRef(null);

    const draw = ctx => {
        ctx.fillStyle = '#000000'
        ctx.beginPath()
        ctx.arc(50, 100, 20, 0, 2*Math.PI)
        ctx.fill()
    }

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        //Our first draw
        draw(context);
      }, [])

    return (
        <canvas ref={canvasRef} {...props}>

        </canvas>
    )
}