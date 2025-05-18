import { Link, useLocation } from "react-router-dom";
import Logo from "../../public/logo.jpg";

function Sidebar() {
    const location = useLocation();

    return (
        <div className="bg-gray-800 text-white lg:w-80 w-full lg:h-screen h-fit flex flex-col items-center lg:items-start px-6 py-6 gap-8">
            
            {/* Logo + Title */}
            <Link
                to="/"
                className="flex items-center gap-3 text-2xl font-bold"
            >
                <img className="h-10 w-10 rounded-full" src={Logo} alt="Logo" />
                <span>CF Stalker</span>
            </Link>

            {/* Navigation Links */}
            <nav className="w-full">
                <ul className="flex flex-col gap-3 w-full">
                    <li>
                        <Link
                            to="/"
                            className={`block py-3 px-4 rounded-md text-base font-medium ${
                                location.pathname === "/" ? "bg-gray-700" : "hover:bg-gray-700"
                            }`}
                        >
                            HOME
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/plag"
                            className={`block py-3 px-4 rounded-md text-base font-medium ${
                                location.pathname === "/plag" ? "bg-gray-700" : "hover:bg-gray-700"
                            }`}
                        >
                            PLAG DETECTION
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/profile"
                            className={`block py-3 px-4 rounded-md text-base font-medium ${
                                location.pathname === "/profile" ? "bg-gray-700" : "hover:bg-gray-700"
                            }`}
                        >
                            PROFILE OVERVIEW
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/problems"
                            className={`block py-3 px-4 rounded-md text-base font-medium ${
                                location.pathname === "/problems" ? "bg-gray-700" : "hover:bg-gray-700"
                            }`}
                        >
                            PROBLEM INSIGHTS
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/compare"
                            className={`block py-3 px-4 rounded-md text-base font-medium ${
                                location.pathname === "/compare" ? "bg-gray-700" : "hover:bg-gray-700"
                            }`}
                        >
                            COMPARE
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;
