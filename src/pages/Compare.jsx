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
      <div className="flex-grow p-4 md:p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Compare Two Codeforces Users</h1>

        <div className="flex flex-col md:flex-row justify-center gap-4 mb-6">
          <input
            type="text"
            value={handle1}
            onChange={(e) => setHandle1(e.target.value)}
            placeholder="Enter first handle"
            className="border p-2 rounded w-full md:w-1/3"
          />
          <input
            type="text"
            value={handle2}
            onChange={(e) => setHandle2(e.target.value)}
            placeholder="Enter second handle"
            className="border p-2 rounded w-full md:w-1/3"
          />
          <button
            onClick={handleCompare}
            className={`px-4 py-2 rounded text-white ${
              loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500"
            }`}
            disabled={loading}
          >
            {loading ? "Comparing..." : "Compare"}
          </button>
        </div>

        {loading && (
          <div className="text-center mb-4 text-lg font-medium text-gray-600">
            🔄 Please wait... Fetching data...
          </div>
        )}

        {handle1 && handle2 && Object.keys(difficultyData1).length > 0 && (
          <div className={loading ? "opacity-50 pointer-events-none" : ""}>
            {/* Account Info Section */}
            <div className="w-full mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-white px-4">
              {[userInfo1, userInfo2].map((user, index) => (
                <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-bold mb-4 text-center">
                    {index === 0 ? handle1 : handle2}'s Details
                  </h2>
                  <div>
                    {[
                      ["Rating", user.rating],
                      ["Max Rating", user.maxRating],
                      ["Rank", user.rank],
                      ["Max Rank", user.maxRank],
                      ["Contribution", user.contribution],
                      ["Friends Count", user.friendOfCount],
                      ["Organization", user.organization],
                    ].map(([label, value]) => (
                      <p
                        key={label}
                        className="flex justify-between py-2 border-b border-gray-600 last:border-0"
                      >
                        <span className="font-semibold w-40">{label}:</span>
                        <span>{value || "N/A"}</span>
                      </p>
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
