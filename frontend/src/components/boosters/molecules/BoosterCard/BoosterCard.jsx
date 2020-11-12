import cm from "classnames";

export default function BoosterCard({booster, _class}) {
    return (
        <div class={cm("w-full max-w-sm bg-gray-100 hover:bg-gray-50 hover:cursor-pointer", _class)}>
            <div class="relative pb-9/16">
                <img class="absolute object-cover w-full h-full" src={booster.image}></img>
            </div>
            <div class="p-4">
                <h1 class="text-lg font-bold">{booster.title}</h1>
                <p>{booster.description}</p>  
            </div>
        </div>
    )
}