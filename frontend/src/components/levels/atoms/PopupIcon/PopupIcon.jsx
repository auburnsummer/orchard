import cm from "classnames";

import style from "./PopupIcon.css";

export default function PopupIcon({img, hoverText, _class}) {

    return (
        <div class={cm("popup-icon", _class)}>
            <div class="popup-icon_wrapper">
                <div class="popup-icon_wrapper^2">
                    <p class="popup-icon_text">{hoverText}</p>
                </div>
            </div>
            <img class="popup-icon_image" src={img}></img>
        </div>
    )
}