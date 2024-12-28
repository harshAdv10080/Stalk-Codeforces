import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProfileDetails() {
    const { userHandle } = useParams();
    const [userInfo, setUserInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [solvedCount, setSolvedCount] = useState(0);
    const [contestCount, setContestCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch user info
                const userResponse = await fetch(
                    `https://codeforces.com/api/user.info?handles=${userHandle}`
                );
                if (!userResponse.ok) throw new Error("Failed to fetch user info");
                const userData = (await userResponse.json()).result[0];

                console.log(userData);

                // Fetch submissions to calculate solved problems and contest count
                const submissionsResponse = await fetch(
                    `https://codeforces.com/api/user.status?handle=${userHandle}`
                );
                if (!submissionsResponse.ok) throw new Error("Failed to fetch submissions");
                const submissions = (await submissionsResponse.json()).result;

                // Calculate unique problems solved
                const solvedProblems = new Set(
                    submissions
                        .filter((sub) => sub.verdict === "OK") // Ignore practice/gym contests
                        .map((sub) => `${sub.problem.contestId}-${sub.problem.index}`) // Combine contestId and index to avoid duplicates
                );

                // console.log(solvedProblems.size)
                // Calculate total contests based on participant type
                const uniqueContests = new Set(
                    submissions
                        .filter(sub => sub.author.participantType === "CONTESTANT")
                        .map(sub => sub.problem.contestId)
                );

                setContestCount(uniqueContests.size);
                setSolvedCount(solvedProblems.size);
                setUserInfo(userData);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [userHandle]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const getRankColor = (rating) => {
        if (rating >= 3000) return "#CC0000"; // Legendary Grandmaster
        if (rating >= 2600) return "#FF0000"; // International Grandmaster
        if (rating >= 2400) return "#FF0000"; // Grandmaster
        if (rating >= 2300) return "#FF8C00"; // International Master
        if (rating >= 2100) return "#FF8C00"; // Master
        if (rating >= 1900) return "#AA00AA"; // Candidate Master
        if (rating >= 1600) return "#0000FF"; // Expert
        if (rating >= 1400) return "#03A89E"; // Specialist
        if (rating >= 1200) return "#008000"; // Pupil
        return "#808080"; // Newbie
    };

    return (
        <div>
            <div className="w-full flex h-fit">
                <div className="profile-photu bg-white w-1/3 flex flex-col items-center">
                    <img src={userInfo.titlePhoto} className="w-full max-w-[28rem] px-4 pt-12" alt="Profile_Img" />
                    <h1 style={{ color: getRankColor(userInfo.rating) }} className="text-[2rem] text-center font-bold pb-6">{userInfo.handle}</h1>
                </div>
                <div className="py-8 px-12 w-2/3 bg-white">
                    <h1 className="text-3xl m-2 font-semibold">Rank: {userInfo.rank ?
                        (<span style={{ color: getRankColor(userInfo.rating) }}>{userInfo.rank.charAt(0).toUpperCase() +
                            userInfo.rank.slice(1)}</span>) : (<span>Unrated</span>)}
                    </h1>
                    <h1 className="text-3xl m-2 font-semibold">Current Rating: {userInfo.rating ?
                        (<span style={{ color: getRankColor(userInfo.rating) }}>{userInfo.rating}</span>) :
                        (<span>Unrated</span>)}
                    </h1>
                    <h1 className="text-3xl m-2 font-semibold">Max Rank: {userInfo.maxRank ?
                        (<span style={{ color: getRankColor(userInfo.maxRating) }}>{userInfo.maxRank.charAt(0).toUpperCase() +
                            userInfo.maxRank.slice(1)}</span>) :
                        (<span>N/A</span>)}</h1>
                    <h1 className="text-3xl m-2 font-semibold">Max Rating: {userInfo.maxRating ?
                        (<span style={{ color: getRankColor(userInfo.maxRating) }}>
                            {userInfo.maxRating}</span>) : (<span>N/A</span>)}
                    </h1>
                    <h1 className="text-3xl m-2 font-semibold ">Registration Date: <span className="text-gray-600">{(new Date(userInfo.registrationTimeSeconds * 1000)).toLocaleDateString()}</span></h1>

                    <div className="text-3xl m-2 font-semibold">Friends of: <span className="text-gray-600">{userInfo.friendOfCount} users</span></div>
                    <h1 className="text-3xl m-2 font-semibold ">Contributions: <span className="text-gray-600">{userInfo.contributions ? (<span>{userInfo.contributions}</span>) : (<span>0</span>)}</span></h1>

                    <div className="my-4 flex flex-wrap gap-4">
                        <div className="p-4 border rounded-lg shadow-md w-fit flex items-center">
                            <span className="text-gray-600 text-2xl mr-4">Problems Solved</span>
                            <span className="text-3xl font-bold">{solvedCount}</span>
                        </div>
                        <div className="p-4 border rounded-lg shadow-md w-fit flex items-center">
                            <span className="text-gray-600 text-2xl mr-4 ">Contests Joined</span>
                            <span className="text-3xl font-bold">{contestCount}</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ProfileDetails