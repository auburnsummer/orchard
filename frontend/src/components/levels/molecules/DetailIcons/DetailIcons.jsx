import HasClassics from "assets/classicDPS.png";
import HasOneshots from "assets/oneshotDPS.png";
import HasSquareshots from "assets/squareshotDPS.png";
import HasSwing from "assets/swingDPS.png";
import HasFreetimes from "assets/freetimeDPS.png";
import HasHolds from "assets/heldbeatsTEMP.png";
import PopupIcon from "components/levels/atoms/PopupIcon";

import style from "./DetailIcons.css";

export default function DetailIcons({level}) {
    const {has_classics, has_oneshots, has_squareshots, has_swing, has_freetimes, has_holds} = level;

    return (
        <div class="detail-icons">
            <div class="detail-icons_wrapper">
                {has_classics && <PopupIcon img={HasClassics} hoverText="Classic beats" />}
                {has_oneshots && <PopupIcon img={HasOneshots} hoverText="Oneshots" />}
                {has_swing && <PopupIcon img={HasSwing} hoverText="Swing beats" />}
                {has_freetimes && <PopupIcon img={HasFreetimes} hoverText="Freetime beats" />}
                {has_squareshots && <PopupIcon img={HasSquareshots} hoverText="Squareshots" />}
                {has_holds && <PopupIcon img={HasHolds} hoverText="Held beats" />}
            </div>
        </div>
    )
}