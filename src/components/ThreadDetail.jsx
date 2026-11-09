import PropTypes from 'prop-types';
import { formatDate, htmlToText } from '../utils';
import VoteButtons from './VoteButtons';

function ThreadDetail({ thread, authUserId, vote }) {
  const {
    title, body, category, createdAt, owner, upVotesBy, downVotesBy,
  } = thread;

  return (
    <article className="thread-detail">
      <p className="thread-item__category">{`#${category}`}</p>
      <h1>{title}</h1>
      <p className="text-body">{htmlToText(body)}</p>
      <VoteButtons
        upVotesBy={upVotesBy}
        downVotesBy={downVotesBy}
        authUserId={authUserId}
        onVote={vote}
      />
      <footer className="thread-item__meta">
        <span className="thread-item__owner">
          <img src={owner.avatar} alt="" width="32" height="32" />
          {owner.name}
        </span>
        <time dateTime={createdAt}>{formatDate(createdAt)}</time>
      </footer>
    </article>
  );
}

ThreadDetail.propTypes = {
  thread: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    owner: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  authUserId: PropTypes.string,
  vote: PropTypes.func.isRequired,
};

ThreadDetail.defaultProps = {
  authUserId: '',
};

export default ThreadDetail;
