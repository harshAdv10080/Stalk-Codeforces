const UserProfile = ({ user }) => {
  return (
    <div className="bg-white p-6 rounded shadow mb-6">
      <h2 className="text-3xl font-bold mb-2">{user.handle}</h2>
      <p>Rating: {user.rating ?? "Unrated"}</p>
      <p>Max Rating: {user.maxRating ?? "N/A"}</p>
      <p>Rank: {user.rank ?? "N/A"}</p>
      <p>Max Rank: {user.maxRank ?? "N/A"}</p>
      <p>Contribution: {user.contribution}</p>
      <p>Country: {user.country ?? "Unknown"}</p>
      <p>Organization: {user.organization ?? "Unknown"}</p>
      <p>Friend of Count: {user.friendOfCount}</p>
    </div>
  );
};

export default UserProfile;
