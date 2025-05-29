import { useState } from "react";
import Loader from "../components/Loader/Loader";

const Plag = () => {
  const [userHandle, setUserHandle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [cheatedContests, setCheatedContests] = useState([]);
  const [lastUser, setLastUser] = useState('');
  const [isGenuine, setIsGenuine] = useState(null);
  const [userNotFound, setUserNotFound] = useState(false);
  const [contestListCache, setContestListCache] = useState(null);

  const handleInputChange = (e) => setUserHandle(e.target.value);

  const fetchContestList = async () => {
    if (contestListCache) return contestListCache;
    const response = await fetch('https://codeforces.com/api/contest.list');
    const data = await response.json();
    if (data.status !== "OK") throw new Error("Failed to fetch contest list");
    setContestListCache(data.result);
    return data.result;
  };

  const fetchUserData = async (handle) => {
    setIsLoading(true);
    setIsGenuine(null);
    setUserNotFound(false);

    try {
      if (!handle) return;

      const response = await fetch(`https://codeforces.com/api/user.status?handle=${handle}`);
      const data = await response.json();
      if (data.status !== "OK") {
        setUserNotFound(true);
        throw new Error("User not found");
      }

      // Organize submissions by contest
      const contests = data.result.reduce((acc, submission) => {
        const { contestId, verdict, author } = submission;
        if (author.participantType === 'CONTESTANT' || author.participantType === 'OUT_OF_COMPETITION') {
          if (!acc[contestId]) acc[contestId] = { contestId, totalProblems: 0, skippedProblems: 0 };
          acc[contestId].totalProblems++;
          if (verdict === 'SKIPPED') acc[contestId].skippedProblems++;
        }
        return acc;
      }, {});

      const filteredContests = Object.values(contests).filter(c => c.totalProblems > 0 && c.skippedProblems === c.totalProblems);

      const contestList = await fetchContestList();

      const contestsWithNames = filteredContests.map(contest => {
        const contestDetails = contestList.find(c => c.id === contest.contestId);
        return {
          ...contest,
          name: contestDetails ? contestDetails.name : `Unknown Contest (${contest.contestId})`
        };
      });

      setCheatedContests(contestsWithNames);

      setIsGenuine(contestsWithNames.length === 0);
    } catch (error) {
      console.error(error);
    } finally {
      setLastUser(handle);
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userHandle.trim()) return;
    setIsLoading(true);
    setCheatedContests([]);
    fetchUserData(userHandle.trim());
  };

  return (
    <div className="min-h-screen p-8">
      {/* Header Section */}
      <div className="text-center mb-12 animate-fade-in">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl mb-6 shadow-large">
          <span className="text-3xl">🔍</span>
        </div>
        <h1 className="text-5xl lg:text-6xl font-extrabold mb-4 bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
          Plagiarism Detection
        </h1>
        <p className="text-lg text-secondary-600 max-w-2xl mx-auto leading-relaxed">
          Detect potential plagiarism by analyzing skipped contest submissions
        </p>
      </div>

      {/* Form Section */}
      <div className="max-w-2xl mx-auto mb-12">
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
                  className="w-full text-center px-6 py-4 text-lg border-2 border-secondary-200 rounded-xl shadow-soft focus:outline-none focus:ring-4 focus:ring-red-200 focus:border-red-500 transition-all duration-300 bg-white placeholder-secondary-400"
                  placeholder="Example: tourist, jiangly, Benq"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 opacity-0 hover:opacity-5 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={isLoading || !userHandle.trim()}
                className={`inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold rounded-xl shadow-large transition-all duration-300 transform ${
                  isLoading || !userHandle.trim()
                    ? "bg-secondary-300 text-secondary-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-red-600 to-pink-600 text-white hover:from-red-700 hover:to-pink-700 hover:scale-105 hover:shadow-glow focus:outline-none focus:ring-4 focus:ring-red-200"
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <span>Check for Plagiarism</span>
                    <span className="text-xl">🔍</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Results Section */}
      <div className="flex items-center justify-center">
        {isLoading ? (
          <div className="text-center animate-fade-in">
            <Loader />
            <p className="mt-4 text-secondary-600 font-medium">Analyzing submissions...</p>
          </div>
        ) : (
          <div className="w-full max-w-6xl">
            {userNotFound ? (
              <div className="bg-card-gradient rounded-2xl p-8 shadow-large border border-red-200 text-center animate-fade-in">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                  <span className="text-2xl">❌</span>
                </div>
                <h3 className="text-2xl font-bold text-red-600 mb-2">User Not Found</h3>
                <p className="text-secondary-600">The specified user handle does not exist on Codeforces.</p>
              </div>
            ) : isGenuine !== null ? (
              <div className="animate-fade-in">
                {/* Result Header */}
                <div className={`bg-card-gradient rounded-2xl p-8 shadow-large border mb-8 text-center ${
                  isGenuine ? "border-green-200" : "border-red-200"
                }`}>
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                    isGenuine ? "bg-green-100" : "bg-red-100"
                  }`}>
                    <span className="text-2xl">{isGenuine ? "✅" : "🚩"}</span>
                  </div>
                  <h2 className={`text-3xl font-bold mb-2 ${isGenuine ? "text-green-600" : "text-red-600"}`}>
                    {isGenuine
                      ? `${lastUser} appears genuine`
                      : `${lastUser} has ${cheatedContests.length} suspicious contest${cheatedContests.length > 1 ? 's' : ''}`}
                  </h2>
                  <p className="text-secondary-600">
                    {isGenuine
                      ? "No suspicious patterns detected in contest submissions."
                      : "Found contests where all submissions were skipped, which may indicate plagiarism."}
                  </p>
                </div>

                {/* Contest Details Table */}
                {cheatedContests.length > 0 && (
                  <div className="bg-card-gradient rounded-2xl p-8 shadow-large border border-secondary-200">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-secondary-800 mb-2">Suspicious Contest Details</h3>
                      <p className="text-secondary-600">Contests where all submissions were skipped</p>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-secondary-50 border-b-2 border-secondary-200">
                            <th className="px-6 py-4 text-left font-semibold text-secondary-700">Contest ID</th>
                            <th className="px-6 py-4 text-left font-semibold text-secondary-700">Contest Name</th>
                            <th className="px-6 py-4 text-left font-semibold text-secondary-700 hidden sm:table-cell">Skipped Problems</th>
                            <th className="px-6 py-4 text-center font-semibold text-secondary-700">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cheatedContests.map((contest, index) => (
                            <tr
                              key={contest.contestId}
                              className={`border-b border-secondary-100 hover:bg-secondary-50 transition-colors duration-200 ${
                                index % 2 === 0 ? "bg-white" : "bg-secondary-25"
                              }`}
                            >
                              <td className="px-6 py-4 font-mono text-secondary-800 font-semibold">
                                {contest.contestId}
                              </td>
                              <td className="px-6 py-4 text-secondary-800 font-medium">
                                {contest.name}
                              </td>
                              <td className="px-6 py-4 text-secondary-600 hidden sm:table-cell">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-red-100 text-red-700">
                                  {contest.skippedProblems} problems
                                </span>
                              </td>
                              <td className="px-6 py-4 text-center">
                                <a
                                  href={`https://codeforces.com/submissions/${lastUser}/contest/${contest.contestId}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white text-sm font-semibold rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all duration-300 transform hover:scale-105 shadow-medium hover:shadow-glow"
                                >
                                  <span>View</span>
                                  <span>↗</span>
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-card-gradient rounded-2xl p-12 shadow-large border border-secondary-200 text-center animate-fade-in">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary-100 rounded-full mb-4">
                  <span className="text-2xl">🔍</span>
                </div>
                <h3 className="text-xl font-semibold text-secondary-700 mb-2">Ready to Analyze</h3>
                <p className="text-secondary-600">Enter a user handle above to check for potential plagiarism patterns.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Plag;
