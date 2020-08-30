import { Link } from "preact-router";
import cm from "classnames";

import SearchBar from "./SearchBar";

import useEbooks from "hooks/useEbooks";

const Logo = ({_class}) => {
    return (
        <svg class={_class} xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" clip-rule="evenodd" viewBox="0 0 376 32">
            <g fill-rule="nonzero" clip-path="url(#a)">
                <path fill="currentColor" d="M0 .054v31.14h5.634V21.006h4.675l4.991 9.981v.207h5.652v-.54h-.099l-5.04-10.039-.423-.833c3.308-1.764 5.562-5.247 5.562-9.252C20.952 4.824 16.4.207 10.746.063V.054H0zm5.634 5.634h4.842c2.661 0 4.824 2.162 4.824 4.842 0 2.661-2.163 4.824-4.824 4.824H5.634V5.688zM38.88.036v31.158h5.634V18.45h9.666v12.744h5.652V.036H54.18v12.762h-9.666V.036H38.88zM76.08.036v.54h.103l7.547 15.107v15.511h5.634V15.691L96.915.576h.099v-.54H91.38v.211l-.553 1.108-4.271 8.55L81.714.239V.036H76.08zM112.128 0v5.652h7.65v25.506h5.634V5.652h7.668V0h-20.952zM150.288.036v31.158h5.634V18.45h9.666v12.744h5.652V.036h-5.652v12.762h-9.666V.036h-5.634zM189.648.036v31.158h5.634V8.784l7.11 9.468v.18h.135l.081.108.144-.108h4.932l.144.108.081-.108h.135v-.18l7.11-9.468v22.41h5.652V.036h-5.652v.171l-9.936 12.429L195.282.211V.036h-5.634zM262.902.036v.005c-8.481.144-15.318 7.068-15.318 15.583 0 8.498 6.837 15.421 15.318 15.565v.005h5.634V25.56h-5.364c-5.488 0-9.936-4.448-9.936-9.936 0-5.488 4.448-9.936 9.936-9.936h5.364V.036h-5.634zM297.163 8.895l3.034 9.09h-6.062l3.028-9.09zM294.441.039l-.022.072h-.077v.225l-10.134 30.393h-.072v.211l-.072.23.072.022v.077h.225l.216.072.027-.072h4.869l.216.072.022-.072h.077v-.243l2.471-7.407h9.814l2.475 7.42v.23h.077l.022.072.216-.072h4.856l.022.072.22-.072h.221v-.072l.072-.023-.072-.22v-.225h-.077L299.976.323V.111h-.072l-.027-.072-.216.072h-5.004l-.216-.072zM326.304.036v31.158h5.634V18.45h10.206v-5.652h-10.206v-7.11h10.206V.036h-15.84zM360 .036v31.158h15.84V25.56h-10.206v-7.11h7.65v-5.652h-7.65v-7.11h10.206V.036H360z"/>
            </g>
        </svg>
    )
}

export default function Header({_class}) {
    const ebook = useEbooks();

    return (
        <div class={cm(_class)}>
            <div class="flex flex-row justify-between h-full">
                
                <div class="flex items-center">
                    {/* todo: link back to the home page when the home page exists */}
                    <Link class="h-8 ml-2 text-gray-300" title={ebook}>
                        < Logo _class="h-8" />
                    </Link>
                </div>
                <div class="flex items-center flex-grow ml-12">
                    <SearchBar _class="flex-grow" />
                </div>
                <div class="flex items-center justify-end ml-12">
                    <a 
                    native 
                    class="mr-6 text-sm text-yellow-300 hover:text-yellow-100"
                    href="https://fizzd.itch.io/rhythm-doctor-preorder"
                    title="The password is samurai">
                        Get RD
                    </a>
                    <Link class="mr-6 text-sm text-yellow-300 hover:text-yellow-100" href="/settings">
                        Settings
                    </Link>
                    <Link class="mr-6 text-sm text-yellow-300 hover:text-yellow-100" href="https://chorus.fightthe.pw">
                        Set Background
                    </Link>
                    <a native class="mr-6 text-sm text-yellow-300 hover:text-yellow-100" href="https://chorus.fightthe.pw">
                        chorus
                    </a>
                </div>

            </div>
        </div>
    )
}