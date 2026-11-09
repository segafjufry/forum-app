import PropTypes from 'prop-types';

function LeaderboardItem({ rank, user, score }) {
  return (
    <li className="leaderboard-item">
      <span className="leaderboard-item__rank">{rank}</span>
      <span className="thread-item__owner">
        <img src={user.avatar} alt="" width="32" height="32" />
        {user.name}
      </span>
      <strong className="leaderboard-item__score">{score}</strong>
    </li>
  );
}

LeaderboardItem.propTypes = {
  rank: PropTypes.number.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  score: PropTypes.number.isRequired,
};

export default LeaderboardItem;
