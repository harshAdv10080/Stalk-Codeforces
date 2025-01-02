import { Link, useLocation } from "react-router-dom";

function Sidebar() {
    const location = useLocation(); // Get the current route

    return (
        <div className="w-96 bg-gray-800 text-white flex flex-col h-full">
            <Link to='/' className="text-4xl px-12 py-6 font-bold border-b border-gray-700">
                CF User Insights
            </Link>
            <nav className="flex-grow">
                <ul className="mx-6 mt-4 space-y-4">
                    <li>
                        <Link
                            to='/'
                            className={`block py-4 px-8 text-xl rounded-md ${location.pathname === '/' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                        >
                            HOME
                        </Link>
                    </li>
                    <li>
                        <Link
                            to='/plag'
                            className={`block py-4 px-8 text-xl rounded-md ${location.pathname === '/plag' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                        >
                            PLAG DETECTION
                        </Link>
                    </li>
                    <li>
                        <Link
                            to='/profile'
                            className={`block py-4 px-8 text-xl rounded-md ${location.pathname === '/profile' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                        >
                            PROFILE OVERVIEW
                        </Link>
                    </li>
                    <li>
                        <Link
                            to='/problems'
                            className={`block py-4 px-8 text-xl rounded-md ${location.pathname === '/problems' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                        >
                            PROBLEM INSIGHTS
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;
