
const Home = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-extrabold text-center mb-8">
                Welcome to CF User Insights!
            </h1>
            <p className="text-lg text-center mb-12">
                CF User Insights is a powerful tool designed for Codeforces users to analyze and track their competitive programming activity. Whether you're a seasoned programmer or just starting out, our platform offers valuable insights into your Codeforces profile, contest performance, and progress.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">1. Plagiarism Detection</h2>
                    <p className="text-lg text-center mb-4">
                        Quickly identify contests where a user has skipped all problems, potentially indicating plagiarism. This feature helps you spot suspicious behavior and ensure the integrity of Codeforces contests.
                    </p>
                    <p className="text-md text-center text-gray-600">
                        - Identify contests with suspicious behavior.<br />
                        - Analyze user submissions and skipped questions.<br />
                        - Improve transparency in competitive programming.
                    </p>
                </div>

                <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">2. Profile Overview</h2>
                    <p className="text-lg text-center mb-4">
                        View detailed information about any Codeforces user, including their solved problems, contest participation, ranking history, and performance statistics. This feature provides a comprehensive view of your competitive programming journey.
                    </p>
                    <p className="text-md text-center text-gray-600">
                        - View solved problems and contest performance.<br />
                        - Track user ranking and improvements over time.<br />
                        - Get a complete overview of a Codeforces profile.
                    </p>
                </div>

                <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">3. Recent Stats and History</h2>
                    <p className="text-lg text-center mb-4">
                        Analyze recent contests and questions solved within a defined time range. This feature helps users keep track of their progress and pinpoint areas for improvement, making it easier to monitor and refine their coding skills.
                    </p>
                    <p className="text-md text-center text-gray-600">
                        - Track recent questions solved.<br />
                        - Filter and analyze contests based on specific time frames.<br />
                        - Monitor your coding progress and identify growth areas.
                    </p>
                </div>
            </div>

            <div className="mt-12 text-center">
                <h3 className="text-xl font-semibold mb-4">Start exploring your Codeforces journey now!</h3>
                <p className="text-lg">
                    With CF User Insights, you can easily track your performance, monitor your progress, and ensure the integrity of your Codeforces contests. Dive into your data today and enhance your competitive programming experience.
                </p>
            </div>
        </div>
    );
};


export default Home
