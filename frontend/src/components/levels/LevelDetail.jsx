import DetailIcons from "./DetailIcons";

export default function LevelDetail({level, _class}) {

    return (
        <div>
            <p>{level.description ?? ""}</p>
            <DetailIcons level={level} />
        </div>
    )
}