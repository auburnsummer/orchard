import "./ErrorScreen.css";

export default function ErrorScreen({error}) {
    return (
        <div class="error-screen">
            <p>Error loading the API!!!! ping auburn now!!</p>
            <code>{JSON.stringify(error)}</code>
        </div>
    )
}