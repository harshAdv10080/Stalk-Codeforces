import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DifficultyChart from "../components/DifficultyChart";
import RecentContestPerformance from "../components/RecentContestPerformance";
import ProblemTypeDistribution from "../components/ProblemTypeDistribution";
import Loader from "../components/Loader/Loader";

function ProfileDetails() {
    const { userHandle } = useParams();
    const [userInfo, setUserInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [solvedCount, setSolvedCount] = useState(0);
    const [contestCount, setContestCount] = useState(0);
    const [difficultyData, setDifficultyData] = useState({});
    const [verdictData, setVerdictData] = useState({});
    const [problemTypeData, setProblemTypeData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await fetch(`https://codeforces.com/api/user.info?handles=${userHandle}`);
                if (!userResponse.ok) throw new Error("Failed to fetch user info");
                const userData = (await userResponse.json()).result[0];

                const submissionsResponse = await fetch(`https://codeforces.com/api/user.status?handle=${userHandle}`);
                if (!submissionsResponse.ok) throw new Error("Failed to fetch submissions");
                const submissions = (await submissionsResponse.json()).result;

                const solvedProblems = new Set();
                const difficultyMap = {};
                const verdictMap = {};
                const tagMap = {};

                submissions.forEach((sub) => {
                    verdictMap[sub.verdict] = (verdictMap[sub.verdict] || 0) + 1;

                    if (sub.verdict === "OK") {
                        const problemId = `${sub.problem.contestId}-${sub.problem.index}`;
                        solvedProblems.add(problemId);

                        const difficulty = sub.problem.rating || 1000;
                        difficultyMap[difficulty] = (difficultyMap[difficulty] || 0) + 1;

                        (sub.problem.tags || []).forEach(tag => {
                            tagMap[tag] = (tagMap[tag] || 0) + 1;
                        });
                    }
                });

                const uniqueContests = new Set(
                    submissions.filter(sub => sub.author.participantType === "CONTESTANT")
                        .map(sub => sub.problem.contestId)
                );

                setContestCount(uniqueContests.size);
                setSolvedCount(solvedProblems.size);
                setDifficultyData(difficultyMap);
                setVerdictData(verdictMap);
                setProblemTypeData(tagMap);
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
        return (
            <div className="h-screen flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Helper functions for colors
    const getRankColor = (rating) => {
        if (rating >= 4000) return "#000000";
        if (rating >= 3000) return "#CC0000";
        if (rating >= 2600) return "#FF0000";
        if (rating >= 2400) return "#FF0000";
        if (rating >= 2300) return "#FF8C00";
        if (rating >= 2100) return "#FF8C00";
        if (rating >= 1900) return "#AA00AA";
        if (rating >= 1600) return "#0000FF";
        if (rating >= 1400) return "#03A89E";
        if (rating >= 1200) return "#008000";
        return "#808080";
    };

    const getVerdictColor = (verdict) => {
        switch (verdict) {
            case "OK": return "#22c55e";
            case "WRONG_ANSWER": return "#ef4444";
            case "TIME_LIMIT_EXCEEDED": return "#facc15";
            case "RUNTIME_ERROR": return "#f97316";
            case "MEMORY_LIMIT_EXCEEDED": return "#8b5cf6";
            case "COMPILATION_ERROR": return "#3b82f6";
            case "CHALLENGED": return "#6b7280";
            default: return "#9ca3af";
        }
    };

    // Calculations for new stats:
    const difficulties = Object.entries(difficultyData).flatMap(([rating, count]) =>
        Array(count).fill(Number(rating))
    );
    const maxDifficulty = difficulties.length > 0 ? Math.max(...difficulties) : 0;
    const avgDifficulty = difficulties.length > 0 ? (difficulties.reduce((a, b) => a + b, 0) / difficulties.length).toFixed(2) : 0;

    // Total submissions count
    const totalSubmissions = Object.values(verdictData).reduce((a, b) => a + b, 0);

    // Accepted Rate
    const acceptedCount = verdictData["OK"] || 0;
    const acceptedRate = totalSubmissions > 0 ? ((acceptedCount / totalSubmissions) * 100).toFixed(2) : 0;

    // Best rank (from userInfo, fallback to 'N/A')
    const bestRank = userInfo.bestRank || "N/A";

    // Last contest date calculation (from userInfo)
    const lastContestDate = userInfo.lastOnlineTimeSeconds
        ? new Date(userInfo.lastOnlineTimeSeconds * 1000).toLocaleDateString()
        : "N/A";

    return (
        <div>
            <div className="w-full sm:flex h-fit">
                <div className="profile-photo bg-white sm:flex sm:flex-col sm:items-center sm:w-1/3 flex flex-col items-center">
                    <img src={userInfo.titlePhoto} className="w-full max-w-[28rem] px-4 pt-12" alt="Profile_Img" />
                    <h1
                        style={{ color: getRankColor(userInfo.rating) }}
                        className="text-3xl text-center font-bold pb-6"
                    >
                        {userInfo.handle}
                    </h1>
                </div>

                <div className="p-12 sm:w-full sm:px-4 bg-white">

                    {/* New 2x2 Grid Section */}
                    <div className="grid grid-cols-2 gap-6 p-12 bg-white">
                        {/* Rating Info */}
                        <div className="border border-gray-300 rounded-lg p-6 shadow-sm">
                            <h2 className="font-bold text-xl mb-4">Rating Info</h2>
                            <p>Current Rating: <span>{userInfo.rating ?? "Unrated"}</span></p>
                            <p>Max Rating: <span>{userInfo.maxRating ?? "N/A"}</span></p>
                            <p>Rating Rank: <span>{userInfo.rank ? userInfo.rank.charAt(0).toUpperCase() + userInfo.rank.slice(1) : "Unrated"}</span></p>
                        </div>

                        {/* Problem Solving Stats */}
                        <div className="border border-gray-300 rounded-lg p-6 shadow-sm">
                            <h2 className="font-bold text-xl mb-4">Problem Solving Stats</h2>
                            <p>Total Solved: <span>{solvedCount}</span></p>
                            <p>Max Difficulty: <span>{Math.max(...Object.keys(difficultyData).map(d => Number(d)), 0)}</span></p>
                            <p>Avg. Difficulty: <span>
                                {
                                    solvedCount > 0
                                        ? (Object.entries(difficultyData).reduce((sum, [diff, cnt]) => sum + Number(diff) * cnt, 0) / solvedCount).toFixed(2)
                                        : "N/A"
                                }
                            </span></p>
                        </div>

                        {/* Contest History */}
                        <div className="border border-gray-300 rounded-lg p-6 shadow-sm">
                            <h2 className="font-bold text-xl mb-4">Contest History</h2>
                            <p>Total Contests: <span>{contestCount}</span></p>
                            <p>Best Rank: <span>{userInfo.bestRank ?? "N/A"}</span></p>
                            <p>Last Contest Date: <span>{userInfo.lastContestDate ?? "N/A"}</span></p>
                        </div>

                        {/* Activity Stats */}
                        <div className="border border-gray-300 rounded-lg p-6 shadow-sm">
                            <h2 className="font-bold text-xl mb-4">Activity Stats</h2>
                            <p>Total Submissions: <span>{Object.values(verdictData).reduce((a, b) => a + b, 0)}</span></p>
                            <p>Accepted Rate: <span>
                                {Object.values(verdictData).reduce((a, b) => a + b, 0) > 0
                                    ? ((verdictData["OK"] || 0) / Object.values(verdictData).reduce((a, b) => a + b, 0) * 100).toFixed(2) + "%"
                                    : "N/A"}
                            </span></p>
                            <p>Friends: <span>{userInfo.friendOfCount ?? 0}</span></p>
                        </div>
                    </div>

                    {/* The older fields that were here (like registration, contributions) are removed as per your new layout */}

                </div>
            </div>

            <DifficultyChart difficultyData={difficultyData} />
            <RecentContestPerformance userHandle={userHandle} />

            {/* Verdict Chart */}
            <div className="bg-white p-6 rounded-lg shadow-lg mt-8 max-w-4xl mx-auto">
                <h2 className="text-2xl font-semibold mb-4 text-center">Submission Verdicts</h2>
                {Object.keys(verdictData).length === 0 ? (
                    <p className="text-center">No submissions found</p>
                ) : (
                    <div className="space-y-3">
                        {Object.entries(verdictData).map(([verdict, count]) => {
                            const maxCount = Math.max(...Object.values(verdictData));
                            return (
                                <div key={verdict} className="flex items-center gap-4">
                                    <span className="w-44 font-medium text-gray-700 select-none">
                                        {verdict.replace(/_/g, " ")}
                                    </span>
                                    <div className="flex items-center flex-grow gap-2">
                                        <div
                                            className="rounded h-6"
                                            style={{
                                                width: `${(count / maxCount) * 100}%`,
                                                backgroundColor: getVerdictColor(verdict),
                                                minWidth: "24px",
                                            }}
                                            title={`${count} submissions`}
                                        />
                                        <span className="font-semibold w-12 text-right select-none">{count}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Problem Type Chart */}
            <ProblemTypeDistribution data={problemTypeData} />
        </div>
    );
}

export default ProfileDetails;
