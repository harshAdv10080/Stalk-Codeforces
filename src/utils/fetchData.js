// utils/fetchData.js

export const fetchUserData = async (handle) => {
    const response = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`);
    if (!response.ok) throw new Error("Failed to fetch user info");
    const data = await response.json();
    return data.result[0]; // Return user data
};

export const fetchUserSubmissions = async (handle) => {
    const response = await fetch(`https://codeforces.com/api/user.status?handle=${handle}`);
    if (!response.ok) throw new Error("Failed to fetch submissions");
    const data = await response.json();
    const submissions = data.result;

    // Categorize the submissions by difficulty
    const difficultyCount = {
        easy: 0,
        medium: 0,
        hard: 0
    };

    submissions.forEach(submission => {
        if (submission.problem.rating <= 1200) difficultyCount.easy++;
        else if (submission.problem.rating <= 1600) difficultyCount.medium++;
        else difficultyCount.hard++;
    });

    return difficultyCount; // Return categorized data
};
