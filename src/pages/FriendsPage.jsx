import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { sha512 } from "js-sha512"; // Importing the SHA-512 function

const KEY = "548d1a716d0cae721c1d72a578878ddb2cbd4762";  // Your API Key
const SECRET = "3c83188a03c0677f23bdb1d895c76b08caf7a5e1";  // Your API Secret

const FriendsPage = () => {
    const { userHandle } = useParams();  // Get user handle from URL
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFriends = async () => {
            const time = Math.floor(Date.now() / 1000);  // Current time in UNIX format
            var code = "936854/user.friends?apiKey=" + KEY + "&onlyOnline=false&time=" + time + "#" + SECRET;
            code = sha512(code);

            var url = "https://codeforces.com/api/user.friends?apiKey=" + KEY + "&onlyOnline=false&time=" + time + "&apiSig=936854" + code;
            try {
                const response = await fetch(url);
                const data = await response.json();

                console.log(data.result);
                console.log(userHandle);

                if (data.status === "OK") {
                    setFriends(data.result);  // Set the list of friends
                } else {
                    setError(data.comment);  // Set error if any
                }
            } catch (err) {
                setError("Failed to fetch friends.", err);  // Corrected error handling
            } finally {
                setLoading(false);
            }
        };

        fetchFriends();
    }, [userHandle]);

    return (
        <div className="px-4">
            <h1 className="text-4xl font-semibold mb-8">Friends of {userHandle}</h1>
            {loading && <p>Loading friends...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {friends.length === 0 && !loading && <p>No friends found.</p>}
            <ul>
                {friends.map((friend, index) => (
                    <li key={index} className="flex justify-between items-center mb-3 p-3 border-b border-gray-300">
                        <div>
                            <h2 className="text-xl font-medium">{friend}</h2>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FriendsPage;
