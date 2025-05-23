import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Problem() {
    const [userHandle, setUserHandle] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setUserHandle(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userHandle.trim() !== '') {
            navigate(`/problems/${userHandle}`);
        }
    };

    return (
        <div className="p-8 min-h-screen bg-white">
            <h1 className="text-5xl font-extrabold text-center mb-10 text-gray-700">Problem Insights</h1>
            <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4 mb-8">
                <label htmlFor="user-handle" className="block text-xl font-medium">Enter Codeforces User Handle:</label>

                <input
                    type="text"
                    id="user-handle"
                    value={userHandle}
                    onChange={handleInputChange}
                    className="w-[80%] max-w-md text-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Example - ilove_sundarKanya"
                />
                <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-transform transform hover:scale-105"
                >
                    Submit
                </button>
            </form>
            
        </div>
    )
}

export default Problem;
