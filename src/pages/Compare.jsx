import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import DifficultyCompareChart from "../components/DifficultyCompareChart";
import TagsCompareChart from "../components/TagsCompareChart";
import ContestRatingChart from "../components/ContestRatingChart";

function Compare() {
  const [handle1, setHandle1] = useState("");
  const [handle2, setHandle2] = useState("");
  const [difficultyData1, setDifficultyData1] = useState({});
  const [difficultyData2, setDifficultyData2] = useState({});
  const [tagData1, setTagData1] = useState({});
  const [tagData2, setTagData2] = useState({});
  const [userInfo1, setUserInfo1] = useState({});
  const [userInfo2, setUserInfo2] = useState({});
  const [ratingData1, setRatingData1] = useState([]);
  const [ratingData2, setRatingData2] = useState([]);
  const [loading, setLoading] = useState(false);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const fetchWithRetry = async (url, retries = 3, delay = 1000) => {
    for (let i = 0; i < retries; i++) {
      try {
        return await axios.get(url);
      } catch (err) {
        if (err.response?.status === 429 && i < retries - 1) {
          await sleep(delay * (i + 1));
        } else {
          throw err;
        }
      }
    }
  };

  const fetchUserData = async (
    handle,
    setDifficultyData,
    setTagData,
    setUserInfo,
    setRatingData
  ) => {
    try {
      const [subRes, infoRes, ratingRes] = await Promise.all([
        fetchWithRetry(`https://codeforces.com/api/user.status?handle=${handle}`),
        fetchWithRetry(`https://codeforces.com/api/user.info?handles=${handle}`),
        fetchWithRetry(`https://codeforces.com/api/user.rating?handle=${handle}`),
      ]);

      if (infoRes.data.status !== "OK") {
        toast.error(`User "${handle}" not found`);
        return;
      }

      const solvedProblems = new Set();
      const difficultyMap = {};
      const tagMap = {};

      subRes.data.result.forEach((sub) => {
        if (sub.verdict === "OK") {
          const key = `${sub.problem.contestId}-${sub.problem.index}`;
          if (!solvedProblems.has(key)) {
            solvedProblems.add(key);
            if (sub.problem.rating) {
              difficultyMap[sub.problem.rating] = (difficultyMap[sub.problem.rating] || 0) + 1;
            }
            sub.problem.tags.forEach((tag) => {
              tagMap[tag] = (tagMap[tag] || 0) + 1;
            });
          }
        }
      });

      setDifficultyData(difficultyMap);
      setTagData(tagMap);
      setUserInfo(infoRes.data.result[0]);

      const ratingHistory = ratingRes.data.result.map((entry) => ({
        newRating: entry.newRating,
        date: entry.ratingUpdateTimeSeconds * 1000,
      }));
      setRatingData(ratingHistory);
    } catch (error) {
      console.error(`Error fetching data for ${handle}:`, error);
      toast.error(`Error fetching data for ${handle}`);
    }
  };

  const handleCompare = async () => {
    if (!handle1 || !handle2) {
      toast.error("Both handles are required!");
      return;
    }

    setLoading(true);
    toast.loading("Comparing users...");
    await fetchUserData(handle1, setDifficultyData1, setTagData1, setUserInfo1, setRatingData1);
    await sleep(1500);
    await fetchUserData(handle2, setDifficultyData2, setTagData2, setUserInfo2, setRatingData2);
    toast.dismiss();
    toast.success("Comparison complete!");
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow p-4 md:p-8">
        {/* Header Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl mb-6 shadow-large">
            <span className="text-3xl">⚖️</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-extrabold mb-4 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
            Compare Users
          </h1>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto leading-relaxed">
            Compare two Codeforces users side-by-side with detailed analytics and insights
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-card-gradient rounded-2xl p-8 shadow-large border border-secondary-200 mb-8 animate-slide-up">
          <div className="flex flex-col lg:flex-row justify-center gap-4 items-end">
            <div className="flex-1 max-w-xs">
              <label className="block text-sm font-semibold text-secondary-700 mb-2">First User</label>
              <input
                type="text"
                value={handle1}
                onChange={(e) => setHandle1(e.target.value)}
                placeholder="Enter first handle"
                className="w-full px-4 py-3 border-2 border-secondary-200 rounded-xl shadow-soft focus:outline-none focus:ring-4 focus:ring-primary-200 focus:border-primary-500 transition-all duration-300 bg-white placeholder-secondary-400"
              />
            </div>

            <div className="flex-shrink-0 text-2xl text-secondary-400 hidden lg:block">
              VS
            </div>

            <div className="flex-1 max-w-xs">
              <label className="block text-sm font-semibold text-secondary-700 mb-2">Second User</label>
              <input
                type="text"
                value={handle2}
                onChange={(e) => setHandle2(e.target.value)}
                placeholder="Enter second handle"
                className="w-full px-4 py-3 border-2 border-secondary-200 rounded-xl shadow-soft focus:outline-none focus:ring-4 focus:ring-primary-200 focus:border-primary-500 transition-all duration-300 bg-white placeholder-secondary-400"
              />
            </div>

            <button
              onClick={handleCompare}
              disabled={loading || !handle1.trim() || !handle2.trim()}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform ${
                loading || !handle1.trim() || !handle2.trim()
                  ? "bg-secondary-300 text-secondary-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 hover:scale-105 shadow-large hover:shadow-glow"
              }`}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Comparing...</span>
                </div>
              ) : (
                "Compare"
              )}
            </button>
          </div>
        </div>

        {loading && (
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center gap-3 px-6 py-4 bg-primary-50 border border-primary-200 rounded-xl text-primary-700">
              <div className="w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="font-medium">Please wait... Fetching data...</span>
            </div>
          </div>
        )}

        {handle1 && handle2 && Object.keys(difficultyData1).length > 0 && (
          <div className={loading ? "opacity-50 pointer-events-none" : "animate-fade-in"}>
            {/* Account Info Section */}
            <div className="w-full mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {[userInfo1, userInfo2].map((user, index) => (
                <div key={index} className="bg-card-gradient rounded-2xl p-8 shadow-large border border-secondary-200">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl mb-3 shadow-medium">
                      <span className="text-xl">👤</span>
                    </div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                      {index === 0 ? handle1 : handle2}
                    </h2>
                    <div className="h-0.5 w-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mx-auto mt-2"></div>
                  </div>

                  <div className="space-y-3">
                    {[
                      ["Rating", user.rating, "⭐"],
                      ["Max Rating", user.maxRating, "🏆"],
                      ["Rank", user.rank, "🎯"],
                      ["Max Rank", user.maxRank, "👑"],
                      ["Contribution", user.contribution, "💡"],
                      ["Friends Count", user.friendOfCount, "👥"],
                      ["Organization", user.organization, "🏢"],
                    ].map(([label, value, icon]) => (
                      <div
                        key={label}
                        className="flex items-center justify-between py-3 px-4 bg-white bg-opacity-60 rounded-xl border border-secondary-100"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{icon}</span>
                          <span className="font-semibold text-secondary-700">{label}:</span>
                        </div>
                        <span className="font-bold text-secondary-800">{value || "N/A"}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <ContestRatingChart
              data1={ratingData1}
              data2={ratingData2}
              handle1={handle1}
              handle2={handle2}
            />

            <DifficultyCompareChart
              data1={difficultyData1}
              data2={difficultyData2}
              handle1={handle1}
              handle2={handle2}
            />

            <TagsCompareChart
              tagData1={tagData1}
              tagData2={tagData2}
              handle1={handle1}
              handle2={handle2}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Compare;
