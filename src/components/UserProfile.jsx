const UserProfile = ({ user }) => {
  const getRankColor = (rank) => {
    if (!rank) return "text-secondary-500";

    const rankColors = {
      'newbie': 'text-gray-600',
      'pupil': 'text-green-600',
      'specialist': 'text-cyan-600',
      'expert': 'text-blue-600',
      'candidate master': 'text-purple-600',
      'master': 'text-orange-600',
      'international master': 'text-orange-500',
      'grandmaster': 'text-red-600',
      'international grandmaster': 'text-red-500',
      'legendary grandmaster': 'text-red-400'
    };

    return rankColors[rank.toLowerCase()] || "text-secondary-600";
  };

  const profileStats = [
    { label: "Rating", value: user.rating ?? "Unrated", icon: "⭐" },
    { label: "Max Rating", value: user.maxRating ?? "N/A", icon: "🏆" },
    { label: "Rank", value: user.rank ?? "N/A", icon: "🎯", colorClass: getRankColor(user.rank) },
    { label: "Max Rank", value: user.maxRank ?? "N/A", icon: "👑", colorClass: getRankColor(user.maxRank) },
    { label: "Contribution", value: user.contribution ?? 0, icon: "💡" },
    { label: "Country", value: user.country ?? "Unknown", icon: "🌍" },
    { label: "Organization", value: user.organization ?? "Unknown", icon: "🏢" },
    { label: "Friends", value: user.friendOfCount ?? 0, icon: "👥" },
  ];

  return (
    <div className="bg-card-gradient rounded-2xl p-8 shadow-large border border-secondary-200 mb-8 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl mb-4 shadow-medium">
          <span className="text-2xl">👤</span>
        </div>
        <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
          {user.handle}
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mx-auto"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {profileStats.map((stat, index) => (
          <div
            key={stat.label}
            className="bg-white bg-opacity-60 rounded-xl p-4 border border-secondary-100 hover:shadow-medium transition-all duration-300 transform hover:-translate-y-1"
            style={{animationDelay: `${index * 0.1}s`}}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-lg">{stat.icon}</span>
              <span className="text-sm font-medium text-secondary-600">{stat.label}</span>
            </div>
            <div className={`text-lg font-bold ${stat.colorClass || 'text-secondary-800'}`}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Additional Info */}
      {(user.titlePhoto || user.avatar) && (
        <div className="mt-6 pt-6 border-t border-secondary-200">
          <div className="flex justify-center">
            <img
              src={user.titlePhoto || user.avatar}
              alt={`${user.handle}'s avatar`}
              className="w-16 h-16 rounded-full border-2 border-primary-200 shadow-medium"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
