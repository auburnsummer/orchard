import cm from "classnames";

export default function PopupIcon({img, hoverText, _class}) {

    const innerStyle = {
        width: "150%",
        left: "-25%",
        clipPath: "polygon(100% 0, 100% 60%, 60% 60%, 50% 100%, 40% 60%, 0 60%, 0 0)"
    }

    const outerStyle = {
        filter: "drop-shadow(0px 10px 5px rgba(0,0,0,0.1))"
    }

    return (
        <div class={cm("relative group", _class)}>
            <div style={outerStyle}>
                <div style={innerStyle} class="absolute top-0 z-10 pb-4 -mt-6 transition duration-75 ease-in-out transform bg-pink-400 opacity-0 motion-safe:translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
                    <p class="text-xs font-medium text-center text-white">{hoverText}</p>
                </div>
            </div>
            <img class="w-16 h-16 border-2 border-white shadow-sm" src={img}></img>
        </div>
    )
}