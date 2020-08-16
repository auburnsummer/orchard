/*
Displaying a single level nicely (rhythm.cafe/levels/<id>)
*/

export default function SingleLevel({id}) {

    return (
        <main>  
            <h1>You came here directly from a URL link!</h1>
            <h2>This screen is still wip, but it's meant to allow for direct links to levels in dontevideos, etc.</h2>
            <p>{id}</p>
        </main>
    )
}