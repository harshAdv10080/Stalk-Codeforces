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
        if(userHandle.trim() !== ''){
            navigate(`/profile/${userHandle}`);
        }
    };

    return (
        <div>
            <h1 className="text-4xl font-bold mb-8">Profile Overview</h1>
            <form onSubmit={handleSubmit} className="mb-4 flex flex-col items-center">
                <label htmlFor="user-handle" className="block text-2xl font-medium mb-4">
                    Enter Codeforces User Handle:
                </label>

                <input
                    type="text"
                    id="user-handle"
                    value={userHandle}
                    onChange={handleInputChange}
                    className="w-[80%] text-center pl-4 pr-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Example - NihalRawat"
                />
                <button
                    type="submit"
                    className="mt-4 px-4 py-2 bg-[#394aa8] text-white rounded-md hover:bg-blue-700"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default Profile