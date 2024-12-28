import { Link } from "react-router-dom"
function Sidebar() {
    return (
        // {/* <!-- Sidebar --> */ }
        <div className="w-96 bg-gray-800 text-white flex flex-col h-full">
            <Link to='/' className="text-4xl px-12 py-6 font-bold border-b border-gray-700">
                CP User Insights
            </Link>
            <nav className="flex-grow">
                <ul className="mx-6 mt-4 space-y-4">
                    <li >
                        <Link to='/' className="block py-4 px-8 text-xl rounded-md hover:bg-gray-700" >HOME</Link>
                    </li>
                    <li>
                        <Link to='/plag' className="block py-4 px-8 text-xl rounded-md hover:bg-gray-700" >PLAG DETECTION</Link>
                    </li>
                    <li>
                        <Link to='/profile' className="block py-4 px-8 text-xl rounded-md hover:bg-gray-700" >PROFILE OVERVIEW</Link>
                    </li>
                    <li>
                        <Link to='/stats' className="block py-4 px-8 text-xl rounded-md hover:bg-gray-700" >RECENT STATS</Link>
                    </li>
                </ul>
            </nav>
            <div className="p-4 text-center text-sm border-t border-gray-700">
                © CP User Insights 2024
            </div>
        </div >
    )
}

export default Sidebar
