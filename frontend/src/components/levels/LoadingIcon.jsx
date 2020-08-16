export default function LoadingIcon() {
    return (
        <div class="flex flex-col items-center">
            <svg class="w-12 h-12 text-white motion-safe:animate-spin motion-reduce:hidden" viewBox="0 0 512 512">
                <path class="fa-secondary" fill="currentColor" d="M479 365zm-22 6l-28-16a16 16 0 01-7-19A184 184 0 11256 72l17 1h-2c-8-1-15-8-15-16V25a16 16 0 0115-16l-15-1a248 248 0 10223 357c-4 7-15 10-22 6z" opacity=".4"/><path class="fa-primary" fill="currentColor" d="M271 73c-8-1-15-8-15-16V25c0-9 8-17 17-16 129 8 231 116 231 247a246 246 0 01-25 108c-4 8-14 11-22 7l-28-16c-8-4-10-14-6-21a183 183 0 0017-78c0-96-74-176-169-183z"/>
            </svg>
            <p class="pl-2 mt-6 text-lg font-semibold tracking-wide text-white lowercase">Loading...</p>
        </div>
    )
}