import { Link, useLocation } from "react-router-dom";

function Sidebar() {
    const location = useLocation();

    const navigationItems = [
        { path: "/", label: "Home", icon: "🏠" },
        { path: "/plag", label: "Plag Detection", icon: "🔍" },
        { path: "/profile", label: "Profile Overview", icon: "👤" },
        { path: "/problems", label: "Problem Insights", icon: "📊" },
        { path: "/compare", label: "Compare", icon: "⚖️" },
    ];

    return (
        <div className="bg-secondary-900 bg-opacity-95 backdrop-blur-sm text-white lg:w-80 w-full lg:h-screen h-fit flex flex-col items-center lg:items-start px-6 py-8 gap-8 shadow-large">

            {/* Logo + Title */}
            <Link
                to="/"
                className="flex items-center gap-4 text-2xl font-bold group transition-all duration-300 hover:scale-105"
            >
                <div className="relative">
                    <img
                        className="h-12 w-12 rounded-full ring-2 ring-primary-400 ring-opacity-50 group-hover:ring-opacity-100 transition-all duration-300"
                        src="/logo.jpg"
                        alt="Logo"
                    />
                    <div className="absolute inset-0 rounded-full bg-primary-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </div>
                <span className="bg-gradient-to-r from-primary-300 to-accent-300 bg-clip-text text-transparent font-extrabold">
                    CF Stalker
                </span>
            </Link>

            {/* Navigation Links */}
            <nav className="w-full">
                <ul className="flex flex-col gap-2 w-full">
                    {navigationItems.map((item) => {
                        const isActive = location.pathname === item.path ||
                                       (item.path !== "/" && location.pathname.startsWith(item.path));

                        return (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`group flex items-center gap-3 py-4 px-5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                                        isActive
                                            ? "bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-glow transform scale-105"
                                            : "hover:bg-secondary-800 hover:bg-opacity-70 hover:transform hover:scale-105 text-secondary-200 hover:text-white"
                                    }`}
                                >
                                    <span className={`text-lg transition-transform duration-300 ${
                                        isActive ? "animate-bounce-gentle" : "group-hover:scale-110"
                                    }`}>
                                        {item.icon}
                                    </span>
                                    <span className="tracking-wide">{item.label}</span>
                                    {isActive && (
                                        <div className="ml-auto w-2 h-2 bg-accent-400 rounded-full animate-pulse"></div>
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Bottom Decoration */}
            <div className="mt-auto w-full">
                <div className="h-px bg-gradient-to-r from-transparent via-secondary-600 to-transparent"></div>
                <div className="text-center mt-4 text-xs text-secondary-400">
                    <p>Analytics & Insights</p>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
