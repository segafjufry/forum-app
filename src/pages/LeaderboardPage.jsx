import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LeaderboardItem from '../components/LeaderboardItem';
import asyncReceiveLeaderboards from '../states/leaderboards/thunk';

function LeaderboardPage() {
  const leaderboards = useSelector((states) => states.leaderboards);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  return (
    <section>
      <h1>Papan peringkat</h1>
      {leaderboards.length === 0 ? (
        <p>Belum ada data peringkat.</p>
      ) : (
        <ol className="leaderboard">
          {leaderboards.map(({ user, score }, index) => (
            <LeaderboardItem
              key={user.id}
              rank={index + 1}
              user={user}
              score={score}
            />
          ))}
        </ol>
      )}
    </section>
  );
}

export default LeaderboardPage;
