export default function Header({selectedIndex, p}) {
    return (
        <div class="fixed top-0 z-50 w-full h-16 bg-blue-300">
            Header {selectedIndex} page {p}
        </div>
    )
}