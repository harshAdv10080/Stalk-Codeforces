import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const [userHandle, setUserHandle] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setUserHandle(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userHandle.trim() !== '') {
            navigate(`/profile/${userHandle}`);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-8">
            <div className="w-full max-w-2xl">
                {/* Header Section */}
                <div className="text-center mb-12 animate-fade-in">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl mb-6 shadow-large">
                        <span className="text-3xl">👤</span>
                    </div>
                    <h1 className="text-5xl lg:text-6xl font-extrabold mb-4 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                        Profile Overview
                    </h1>
                    <p className="text-lg text-secondary-600 max-w-lg mx-auto leading-relaxed">
                        Enter a Codeforces username to explore detailed analytics, statistics, and insights
                    </p>
                </div>

                {/* Form Section */}
                <div className="bg-card-gradient rounded-2xl p-8 lg:p-12 shadow-large border border-secondary-200 animate-slide-up">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-3">
                            <label
                                htmlFor="user-handle"
                                className="block text-lg font-semibold text-secondary-700 text-center"
                            >
                                Enter Codeforces User Handle
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="user-handle"
                                    value={userHandle}
                                    onChange={handleInputChange}
                                    className="w-full text-center px-6 py-4 text-lg border-2 border-secondary-200 rounded-xl shadow-soft focus:outline-none focus:ring-4 focus:ring-primary-200 focus:border-primary-500 transition-all duration-300 bg-white placeholder-secondary-400"
                                    placeholder="Example: tourist, jiangly, Benq"
                                />
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 opacity-0 hover:opacity-5 transition-opacity duration-300 pointer-events-none"></div>
                            </div>
                        </div>

                        <div className="text-center">
                            <button
                                type="submit"
                                disabled={!userHandle.trim()}
                                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white text-lg font-semibold rounded-xl shadow-large hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-200 transition-all duration-300 transform hover:scale-105 hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                <span>Analyze Profile</span>
                                <span className="text-xl">🚀</span>
                            </button>
                        </div>
                    </form>

                    {/* Additional Info */}
                    <div className="mt-8 pt-8 border-t border-secondary-200">
                        <div className="text-center text-sm text-secondary-500">
                            <p className="mb-2">✨ Get comprehensive insights including:</p>
                            <div className="flex flex-wrap justify-center gap-4 text-xs">
                                <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full">Rating History</span>
                                <span className="px-3 py-1 bg-accent-100 text-accent-700 rounded-full">Problem Statistics</span>
                                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full">Contest Performance</span>
                                <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full">Tag Analysis</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
