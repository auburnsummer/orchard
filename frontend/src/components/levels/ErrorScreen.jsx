export default function ErrorScreen({error}) {
    return (
        <div class="text-white">
            <p>Error loading the API!!!! ping auburn now!!</p>
            <code>{JSON.stringify(error)}</code>
        </div>
    )
}