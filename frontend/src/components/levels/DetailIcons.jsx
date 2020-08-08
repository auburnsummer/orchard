import HasClassics from "assets/classicDPS.png";
import HasOneshots from "assets/oneshotDPS.png";
import HasSquareshots from "assets/squareshotDPS.png";
import HasSwing from "assets/swingDPS.png";
import HasFreetimes from "assets/freetimeDPS.png";
import HasHolds from "assets/heldbeatsTEMP.png";

import cm from "classnames";

function Icon({img, hoverText, _class}) {

    const innerStyle = {
        width: "150%",
        left: "-25%",
        clipPath: "polygon(100% 0, 100% 60%, 60% 60%, 50% 100%, 40% 60%, 0 60%, 0 0)"
    }

    const outerStyle = {
        filter: "drop-shadow(0px 10px 5px rgba(0,0,0,0.1))"
    }

    return (
        <div class="relative group">
            <div style={outerStyle}>
                <div style={innerStyle} class="absolute top-0 z-10 invisible pb-4 -mt-6 bg-blue-400 group-hover:visible">
                    <p class="text-xs font-medium text-center text-white">{hoverText}</p>
                </div>
            </div>
            <img class={cm("h-16 w-16 shadow-sm border-2 border-white", _class)} src={img}></img>
        </div>
    )
}

export default function DetailIcons({level}) {
    const {has_classics, has_oneshots, has_squareshots, has_swing, has_freetimes, has_holds} = level;

    return (
        <div class="c-gap-wrapper">
            <div class="flex flex-wrap c-gap c-gap-x-2">
                {has_classics && <Icon img={HasClassics} hoverText="Classic beats" />}
                {has_oneshots && <Icon img={HasOneshots} hoverText="Oneshots" />}
                {has_swing && <Icon img={HasSwing} hoverText="Swing beats" />}
                {has_freetimes && <Icon img={HasFreetimes} hoverText="Freetime beats" />}
                {has_squareshots && <Icon img={HasSquareshots} hoverText="Squareshots" />}
                {has_holds && <Icon img={HasHolds} hoverText="Held beats" />}
            </div>
        </div>
    )
}