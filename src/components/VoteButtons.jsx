import PropTypes from 'prop-types';

function VoteButtons({
  upVotesBy, downVotesBy, authUserId, onVote,
}) {
  const isLoggedIn = Boolean(authUserId);
  const hasUpVoted = isLoggedIn && upVotesBy.includes(authUserId);
  const hasDownVoted = isLoggedIn && downVotesBy.includes(authUserId);
  const disabledHint = isLoggedIn ? undefined : 'Masuk untuk memberi vote';

  return (
    <div className="vote-buttons">
      <button
        type="button"
        className={`vote-button${hasUpVoted ? ' vote-button--up' : ''}`}
        aria-pressed={hasUpVoted}
        aria-label={`Suka, ${upVotesBy.length} suara`}
        title={disabledHint}
        disabled={!isLoggedIn}
        onClick={() => onVote(hasUpVoted ? 'neutral' : 'up')}
      >
        <span aria-hidden="true">▲</span>
        {' '}
        <span aria-hidden="true">{upVotesBy.length}</span>
      </button>
      <button
        type="button"
        className={`vote-button${hasDownVoted ? ' vote-button--down' : ''}`}
        aria-pressed={hasDownVoted}
        aria-label={`Tidak suka, ${downVotesBy.length} suara`}
        title={disabledHint}
        disabled={!isLoggedIn}
        onClick={() => onVote(hasDownVoted ? 'neutral' : 'down')}
      >
        <span aria-hidden="true">▼</span>
        {' '}
        <span aria-hidden="true">{downVotesBy.length}</span>
      </button>
    </div>
  );
}

VoteButtons.propTypes = {
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUserId: PropTypes.string,
  onVote: PropTypes.func.isRequired,
};

VoteButtons.defaultProps = {
  authUserId: '',
};

export default VoteButtons;
