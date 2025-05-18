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
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-5xl font-extrabold text-center mb-10 text-gray-700">Plagiarism Detection</h1>
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
          disabled={isLoading || !userHandle.trim()}
          className={`px-6 py-3 rounded-lg shadow transition-transform transform ${
            isLoading || !userHandle.trim()
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700 hover:scale-105"
          }`}
        >
          Submit
        </button>
      </form>

      <div className="flex items-center justify-center mt-12">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="w-full">
            {userNotFound ? (
              <div className="text-3xl text-center font-bold mb-8 text-gray-700">User not found</div>
            ) : isGenuine !== null ? (
              <>
                <h2 className={`text-3xl text-center font-bold mb-8 ${isGenuine ? "text-green-600" : "text-red-600"}`}>
                  {isGenuine
                    ? `${lastUser} is genuine. 😊`
                    : `${lastUser} has ${cheatedContests.length} Skipped Contests. 🚩`}
                </h2>
                {cheatedContests.length > 0 && (
                  <div>
                    <div className="text-xl text-center font-bold mt-12 mb-4">Skipped Contest Details</div>
                    <table className="table-auto w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 px-4 py-2 text-left">Contest ID</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">Contest Name</th>
                          <th className="border border-gray-300 px-4 py-2 text-left sm:block hidden">Skipped Questions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cheatedContests.map((contest) => (
                          <tr key={contest.contestId}>
                            <td className="border border-gray-300 px-4 py-4">
                              <a
                                className="font-semibold hover:text-blue-600"
                                href={`https://codeforces.com/submissions/${lastUser}/contest/${contest.contestId}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {contest.contestId}
                              </a>
                            </td>
                            <td className="border border-gray-300 px-4 py-4">
                              <a
                                className="font-semibold hover:text-blue-600"
                                href={`https://codeforces.com/submissions/${lastUser}/contest/${contest.contestId}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {contest.name}
                              </a>
                            </td>
                            <td className="border border-gray-300 px-4 py-4 sm:block hidden">{contest.skippedProblems}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center text-gray-600">Enter a user handle to check for plagiarism.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Plag;
